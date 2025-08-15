-- Drop the database if it exists
DROP DATABASE IF EXISTS mamacare;

-- Create the database
CREATE DATABASE mamacare;

-- Switch to the database
USE mamacare;

-- Users table (already provided)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Departments table
CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    department_code VARCHAR(50) NOT NULL UNIQUE
);

-- Documents table
CREATE TABLE documents (
    document_id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    document_name VARCHAR(100) NOT NULL,
    document_pdf LONGBLOB NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) 
        ON DELETE CASCADE
);

-- Submitted Documents table
CREATE TABLE submitted_documents (
    submitted_id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    user_id INT NOT NULL,
    document_pdf LONGBLOB NOT NULL,
    submitted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) 
        ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) 
        ON DELETE CASCADE
);

-- Appointments table
CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    user_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    booked_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    queue_place INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) 
        ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) 
        ON DELETE CASCADE
);
