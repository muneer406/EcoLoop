-- Micro Actions Seed Data

-- ============================================================
-- TRANSPORT ACTIONS
-- ============================================================

INSERT INTO micro_actions (category, title, description, co2_saving_kg, equivalence, difficulty, estimated_minutes)
VALUES
  ('transport', 'Walk short distances',
   'Replace a short car trip (under 2km) with walking today.',
   0.384, '~2km car trip avoided', 'easy', 25),

  ('transport', 'Take public transport',
   'Use bus or train for your commute instead of driving alone.',
   2.060, '~20km car commute saved', 'moderate', 30),

  ('transport', 'Combine errands',
   'Plan a single trip to cover multiple errands instead of multiple trips.',
   1.150, '~6km driving saved', 'easy', 10),

  ('transport', 'Carpool today',
   'Share a ride with a colleague or neighbor for shared destinations.',
   1.920, '~10km shared ride', 'moderate', 15),

  ('transport', 'Use bike for commute',
   'Cycle to work or for errands instead of driving.',
   2.304, '~12km car trip avoided', 'moderate', 40),

  ('transport', 'Avoid one short flight',
   'Choose train or video call instead of a short-haul flight.',
   51.00, '~200km flight avoided', 'hard', 120);

-- ============================================================
-- FOOD ACTIONS
-- ============================================================

INSERT INTO micro_actions (category, title, description, co2_saving_kg, equivalence, difficulty, estimated_minutes)
VALUES
  ('food', 'Swap beef for chicken',
   'Replace one beef meal with chicken today.',
   3.015, '~150g beef replaced', 'easy', 5),

  ('food', 'Go vegetarian today',
   'Skip meat entirely for all meals today.',
   7.200, '~3 meat meals avoided', 'moderate', 10),

  ('food', 'Try plant-based milk',
   'Replace dairy milk with oat or soy milk today.',
   1.520, '~800ml dairy milk saved', 'easy', 2),

  ('food', 'Reduce food waste',
   'Plan portions carefully and use leftovers creatively.',
   2.400, '~0.5kg food waste avoided', 'easy', 10),

  ('food', 'Choose local produce',
   'Buy seasonal, locally-grown vegetables instead of imported ones.',
   1.800, '~3kg imported produce avoided', 'easy', 5),

  ('food', 'Skip cheese today',
   'Avoid cheese in meals to reduce dairy emissions.',
   2.025, '~150g cheese avoided', 'easy', 2);

-- ============================================================
-- ENERGY ACTIONS
-- ============================================================

INSERT INTO micro_actions (category, title, description, co2_saving_kg, equivalence, difficulty, estimated_minutes)
VALUES
  ('energy', 'Adjust thermostat by 2°C',
   'Lower heating or raise cooling setpoint by 2 degrees.',
   2.200, '~2 hours heater use saved', 'easy', 2),

  ('energy', 'Air dry laundry',
   'Skip the electric dryer and hang clothes to dry.',
   2.500, '~1 dryer cycle avoided', 'easy', 5),

  ('energy', 'Unplug idle devices',
   'Disconnect electronics that are not in use to avoid phantom load.',
   0.475, '~1kWh phantom load saved', 'easy', 5),

  ('energy', 'Use LED bulbs',
   'Replace one incandescent bulb with an LED for today''s usage.',
   0.380, '~0.8kWh lighting saved', 'easy', 3),

  ('energy', 'Take shorter showers',
   'Reduce shower time by 3 minutes to save water heating energy.',
   1.100, '~1 hour water heating saved', 'easy', 3),

  ('energy', 'Run full dishwasher',
   'Wait until dishwasher is full before running to save cycles.',
   0.600, '~1 washing cycle saved', 'easy', 2);

-- ============================================================
-- SHOPPING ACTIONS
-- ============================================================

INSERT INTO micro_actions (category, title, description, co2_saving_kg, equivalence, difficulty, estimated_minutes)
VALUES
  ('shopping', 'Buy second-hand clothing',
   'Purchase a pre-owned item instead of a new one today.',
   14.00, '~1 new clothing item avoided', 'easy', 20),

  ('shopping', 'Repair instead of replace',
   'Fix a broken item rather than buying new.',
   33.00, '~1 new item manufacturing avoided', 'moderate', 30),

  ('shopping', 'Borrow or rent',
   'Rent or borrow an item you need once instead of buying new.',
   80.00, '~1 furniture purchase avoided', 'moderate', 15),

  ('shopping', 'Choose minimal packaging',
   'Purchase products with less or recyclable packaging.',
   3.500, '~packaging waste from 5 items', 'easy', 5),

  ('shopping', 'Extend device lifespan',
   'Keep your current phone or laptop another year before upgrading.',
   70.00, '~1 new smartphone manufacturing avoided', 'hard', 5),

  ('shopping', 'Buy in bulk',
   'Purchase consumables in larger quantities to reduce packaging.',
   4.200, '~packaging from 6 small containers', 'easy', 10);
