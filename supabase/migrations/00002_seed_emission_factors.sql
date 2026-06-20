-- Emission Factors Seed Data
-- Sources: DEFRA 2024, IPCC, Our World In Data, IEA

-- ============================================================
-- TRANSPORT (kg CO2 per km)
-- ============================================================

INSERT INTO emission_factors (category, mode, country, unit, factor, source)
VALUES
  ('transport', 'walk',         'global', 'km', 0.000, 'DEFRA 2024'),
  ('transport', 'bike',         'global', 'km', 0.000, 'DEFRA 2024'),
  ('transport', 'bus',          'global', 'km', 0.089, 'DEFRA 2024'),
  ('transport', 'train',        'global', 'km', 0.041, 'DEFRA 2024'),
  ('transport', 'car_electric', 'global', 'km', 0.053, 'DEFRA 2024'),
  ('transport', 'car_hybrid',   'global', 'km', 0.120, 'DEFRA 2024'),
  ('transport', 'car_petrol',   'global', 'km', 0.192, 'DEFRA 2024'),
  ('transport', 'motorcycle',   'global', 'km', 0.103, 'DEFRA 2024'),
  ('transport', 'flight_short', 'global', 'km', 0.255, 'DEFRA 2024'),
  ('transport', 'flight_long',  'global', 'km', 0.195, 'DEFRA 2024');

-- ============================================================
-- FOOD (kg CO2 per kg food)
-- ============================================================

INSERT INTO emission_factors (category, mode, country, unit, factor, source)
VALUES
  ('food', 'beef',       'global', 'kg', 27.0, 'Our World In Data'),
  ('food', 'lamb',       'global', 'kg', 24.0, 'Our World In Data'),
  ('food', 'pork',       'global', 'kg', 12.1, 'Our World In Data'),
  ('food', 'cheese',     'global', 'kg', 13.5, 'Our World In Data'),
  ('food', 'chicken',    'global', 'kg', 6.9,  'Our World In Data'),
  ('food', 'fish',       'global', 'kg', 5.4,  'Our World In Data'),
  ('food', 'eggs',       'global', 'kg', 4.8,  'Our World In Data'),
  ('food', 'rice',       'global', 'kg', 2.7,  'Our World In Data'),
  ('food', 'milk',       'global', 'kg', 1.9,  'Our World In Data'),
  ('food', 'vegetables', 'global', 'kg', 0.5,  'Our World In Data'),
  ('food', 'fruits',     'global', 'kg', 0.4,  'Our World In Data'),
  ('food', 'nuts',       'global', 'kg', 0.3,  'Our World In Data');

-- ============================================================
-- ENERGY (kg CO2 per unit)
-- ============================================================

INSERT INTO emission_factors (category, mode, country, unit, factor, source)
VALUES
  ('energy', 'grid_electricity', 'global',  'kWh',   0.475, 'IEA'),
  ('energy', 'grid_electricity', 'US',      'kWh',   0.386, 'IEA'),
  ('energy', 'grid_electricity', 'UK',      'kWh',   0.193, 'IEA'),
  ('energy', 'grid_electricity', 'Germany', 'kWh',   0.348, 'IEA'),
  ('energy', 'grid_electricity', 'India',   'kWh',   0.708, 'IEA'),
  ('energy', 'natural_gas',      'global',  'm3',    2.02,  'DEFRA 2024'),
  ('energy', 'ac_hour',          'global',  'hour',  0.80,  'IEA + DEFRA'),
  ('energy', 'heater_hour',      'global',  'hour',  1.10,  'IEA + DEFRA'),
  ('energy', 'dryer_hour',       'global',  'cycle', 2.50,  'DEFRA 2024'),
  ('energy', 'washing_machine',  'global',  'cycle', 0.60,  'DEFRA 2024');

-- ============================================================
-- SHOPPING (kg CO2 per item)
-- ============================================================

INSERT INTO emission_factors (category, mode, country, unit, factor, source)
VALUES
  ('shopping', 'tshirt',     'global', 'item', 7,   'OWID + Industry Lifecycle'),
  ('shopping', 'jeans',      'global', 'item', 33,  'OWID + Industry Lifecycle'),
  ('shopping', 'shoes',      'global', 'item', 14,  'OWID + Industry Lifecycle'),
  ('shopping', 'smartphone', 'global', 'item', 70,  'OWID + Industry Lifecycle'),
  ('shopping', 'laptop',     'global', 'item', 250, 'OWID + Industry Lifecycle'),
  ('shopping', 'furniture',  'global', 'item', 80,  'OWID + Industry Lifecycle');
