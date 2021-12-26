CREATE DATABASE todos;

CREATE TABLE todos(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);