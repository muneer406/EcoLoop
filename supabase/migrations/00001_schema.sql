-- EcoLoop Schema Migration
-- Version: 1.0

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE activity_category AS ENUM (
  'transport',
  'food',
  'energy',
  'shopping'
);

CREATE TYPE diet_type AS ENUM (
  'vegan',
  'vegetarian',
  'pescatarian',
  'omnivore',
  'heavy_meat'
);

CREATE TYPE transport_type AS ENUM (
  'car',
  'public_transport',
  'bike',
  'walk',
  'mixed'
);

CREATE TYPE action_status AS ENUM (
  'done',
  'skipped'
);

-- ============================================================
-- TABLES
-- ============================================================

-- Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  country TEXT NOT NULL,
  transport_mode transport_type NOT NULL,
  diet diet_type NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Logs (one user message = one log)
CREATE TABLE logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  total_co2_kg NUMERIC(10,4) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Activities (parsed from logs)
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log_id UUID NOT NULL REFERENCES logs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category activity_category NOT NULL,
  mode TEXT NOT NULL,
  quantity NUMERIC(10,4) NOT NULL,
  unit TEXT NOT NULL,
  co2_kg NUMERIC(10,4) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Daily Totals (pre-aggregated)
CREATE TABLE daily_totals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_co2_kg NUMERIC(10,4) NOT NULL DEFAULT 0,
  transport_co2_kg NUMERIC(10,4) NOT NULL DEFAULT 0,
  food_co2_kg NUMERIC(10,4) NOT NULL DEFAULT 0,
  energy_co2_kg NUMERIC(10,4) NOT NULL DEFAULT 0,
  shopping_co2_kg NUMERIC(10,4) NOT NULL DEFAULT 0,
  co2_saved_kg NUMERIC(10,4) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Micro Actions (global pool)
CREATE TABLE micro_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category activity_category NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  co2_saving_kg NUMERIC(10,4) NOT NULL,
  equivalence TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  estimated_minutes INTEGER NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User Actions (tracks decisions)
CREATE TABLE user_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_id UUID NOT NULL REFERENCES micro_actions(id) ON DELETE CASCADE,
  status action_status NOT NULL,
  co2_saved_kg NUMERIC(10,4) NOT NULL DEFAULT 0,
  action_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Streaks (one row per user)
CREATE TABLE streaks (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  total_co2_saved_kg NUMERIC(10,4) NOT NULL DEFAULT 0,
  last_completed_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Emission Factors (global lookup, read-only)
CREATE TABLE emission_factors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category activity_category NOT NULL,
  mode TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'global',
  unit TEXT NOT NULL,
  factor NUMERIC(12,6) NOT NULL,
  source TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_profiles_country ON profiles(country);

CREATE INDEX idx_logs_user ON logs(user_id);
CREATE INDEX idx_logs_user_created ON logs(user_id, created_at DESC);

CREATE INDEX idx_activities_user ON activities(user_id);
CREATE INDEX idx_activities_category ON activities(user_id, category);
CREATE INDEX idx_activities_created ON activities(user_id, created_at DESC);

CREATE INDEX idx_daily_totals_user_date ON daily_totals(user_id, date DESC);

CREATE INDEX idx_user_actions_user ON user_actions(user_id);
CREATE INDEX idx_user_actions_date ON user_actions(user_id, action_date DESC);

CREATE INDEX idx_emission_factors_lookup ON emission_factors(category, mode, country);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_totals ENABLE ROW LEVEL SECURITY;
ALTER TABLE micro_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE emission_factors ENABLE ROW LEVEL SECURITY;

-- User-owned tables: only owner can access
CREATE POLICY profiles_policy ON profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY logs_policy ON logs
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY activities_policy ON activities
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY daily_totals_policy ON daily_totals
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY user_actions_policy ON user_actions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY streaks_policy ON streaks
  FOR ALL USING (auth.uid() = user_id);

-- Global tables: read-only for authenticated users
CREATE POLICY micro_actions_policy ON micro_actions
  FOR SELECT USING (active = true);

CREATE POLICY emission_factors_policy ON emission_factors
  FOR SELECT USING (active = true);

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Auto-update updated_at timestamp
CREATE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_logs_updated_at
  BEFORE UPDATE ON logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_daily_totals_updated_at
  BEFORE UPDATE ON daily_totals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_streaks_updated_at
  BEFORE UPDATE ON streaks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Recalculate daily_totals after activity changes
CREATE FUNCTION recalc_daily_totals()
RETURNS TRIGGER AS $$
DECLARE
  v_user_id UUID;
  v_date DATE;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_user_id := OLD.user_id;
    v_date := OLD.created_at::DATE;
  ELSE
    v_user_id := NEW.user_id;
    v_date := NEW.created_at::DATE;
  END IF;

  INSERT INTO daily_totals (user_id, date, total_co2_kg, transport_co2_kg, food_co2_kg, energy_co2_kg, shopping_co2_kg, co2_saved_kg)
  VALUES (
    v_user_id,
    v_date,
    (SELECT COALESCE(SUM(co2_kg), 0) FROM activities WHERE user_id = v_user_id AND created_at::DATE = v_date),
    (SELECT COALESCE(SUM(co2_kg), 0) FROM activities WHERE user_id = v_user_id AND created_at::DATE = v_date AND category = 'transport'),
    (SELECT COALESCE(SUM(co2_kg), 0) FROM activities WHERE user_id = v_user_id AND created_at::DATE = v_date AND category = 'food'),
    (SELECT COALESCE(SUM(co2_kg), 0) FROM activities WHERE user_id = v_user_id AND created_at::DATE = v_date AND category = 'energy'),
    (SELECT COALESCE(SUM(co2_kg), 0) FROM activities WHERE user_id = v_user_id AND created_at::DATE = v_date AND category = 'shopping'),
    0
  )
  ON CONFLICT (user_id, date) DO UPDATE SET
    total_co2_kg = EXCLUDED.total_co2_kg,
    transport_co2_kg = EXCLUDED.transport_co2_kg,
    food_co2_kg = EXCLUDED.food_co2_kg,
    energy_co2_kg = EXCLUDED.energy_co2_kg,
    shopping_co2_kg = EXCLUDED.shopping_co2_kg,
    updated_at = NOW();

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_activity_daily_totals
  AFTER INSERT OR UPDATE OR DELETE ON activities
  FOR EACH ROW EXECUTE FUNCTION recalc_daily_totals();
