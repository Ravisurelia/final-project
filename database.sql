 DROP TABLE IF EXISTS users CASCADE; 
DROP TABLE IF EXISTS travelers CASCADE;
DROP TABLE IF EXISTS chats CASCADE;

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

CREATE TABLE chats(
  id SERIAL PRIMARY KEY,
  sender_id INT NOT NULL REFERENCES users(id),
  message VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


INSERT INTO chats (sender_id, message) VALUES (1, 'Hello!');
INSERT INTO chats (sender_id, message) VALUES (5, 'Hello');
INSERT INTO chats (sender_id, message) VALUES (1, 'How are you?');
INSERT INTO chats (sender_id, message) VALUES (5, 'I am good and what about you?');
INSERT INTO chats (sender_id, message) VALUES (1, 'I am good too!');
INSERT INTO chats (sender_id, message) VALUES (5, 'How is your course going on?');
INSERT INTO chats (sender_id, message) VALUES (1, 'Its going good! about to present my final project!');
INSERT INTO chats (sender_id, message) VALUES (5, 'thats great! all the best for that.');
INSERT INTO chats (sender_id, message) VALUES (1, 'Thanks! What are you doing now a days?');
INSERT INTO chats (sender_id, message) VALUES (5, 'I am thinking of applying for the same course!');