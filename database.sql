 DROP TABLE IF EXISTS users CASCADE; 
DROP TABLE IF EXISTS travelers CASCADE;

 CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first VARCHAR NOT NULL CHECK (first != ''),
  last VARCHAR NOT NULL CHECK (last != ''),
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
CREATE TABLE travelers(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  nationality VARCHAR NOT NULL CHECK (nationality != ''),
  dep_date VARCHAR NOT NULL,
  dep_time VARCHAR NOT NULL,
  arr_date VARCHAR NOT NULL,
  arr_time VARCHAR NOT NULL,
  flight_name VARCHAR NOT NULL,
  flight_number VARCHAR NOT NULL,
  seat_number VARCHAR NOT NULL,
  arr_place VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);