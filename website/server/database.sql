CREATE DATABASE authentication ;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4() ,
    user_name VARCHAR(255) NOT NULL ,
    user_email VARCHAR(255) NOT NULL ,
    user_pass VARCHAR(255) NOT NULL
);

-- A default one

INSERT INTO users (user_name , user_email , user_pass) VALUES ('Light' , 'light1234@yahoo.com' , 'qwerty123@12');

