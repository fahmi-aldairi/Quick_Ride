CREATE DATABASE QuickRide

CREATE TABLE provider  (
  provider_id SERIAL PRIMARY KEY,
  role VARCHAR(10) NOT NULL,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(50) NOT NULL,
  is_delete BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT false
);

CREATE TABLE customers  (
  customers_id SERIAL PRIMARY KEY,
  role VARCHAR(10) NOT NULL,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(50) NOT NULL,
  popular_cars TEXT,
  credit_card TEXT,
  cardholder_name TEXT,
  card_expiration_date TEXT,
  CVV_CVC_code TEXT,
  is_delete BOOLEAN DEFAULT false
);

CREATE TABLE cars  (
  cars_id SERIAL PRIMARY KEY,
  discrabtion TEXT NOT NULL,
  type VARCHAR(20) NOT NULL,
  energy_type VARCHAR(20) NOT NULL,
  model VARCHAR(20) NOT NULL,
  year INTEGER NOT NULL,
  rental_price INTEGER NOT NULL,
  available BOOLEAN DEFAULT true,
  images_data TEXT,
  start_date DATE,
  end_date DATE,
  start_location TEXT,
  end_location TEXT,
  seats_number INTEGER,
  user_id INTEGER,
  is_delete BOOLEAN DEFAULT false,
  provider_id INTEGER REFERENCES provider(provider_id)
  active BOOLEAN DEFAULT false
);

CREATE TABLE provider_movements  (
  provider_movements_id SERIAL PRIMARY KEY,
  move_type VARCHAR(10) NOT NULL,
  date DATE NOT NULL,
  car_id INTEGER NOT NULL,
  provider_id INTEGER REFERENCES provider(provider_id)
);

CREATE TABLE customer_movements  (
  customer_movements_id SERIAL PRIMARY KEY,
  move_type VARCHAR(10) NOT NULL,
  date DATE NOT NULL,
  car_id INTEGER NOT NULL,
  customers_id INTEGER REFERENCES customers(customers_id)
);

CREATE TABLE admin  (
  admin_id SERIAL PRIMARY KEY,
  role VARCHAR(10) NOT NULL,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(50) NOT NULL,
  is_delete BOOLEAN DEFAULT false 
);