-- Create USERS table
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- create CATEGORIES table
CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

-- create MOVIES table
CREATE TABLE movies(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category INTEGER NOT NULL REFERENCES categories(id),
    description TEXT NOT NULL,
    release_date DATE NOT NULL
);

-- create USERS_MOVIES table
CREATE TABLE user_movies(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    movie_id INTEGER NOT NULL REFERENCES movies(id)
);