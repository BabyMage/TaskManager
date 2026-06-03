USE task_manager;

CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);


CREATE TABLE tasks(
    id INT PRIMARY KEY AUTO_INCREMENT,
    task VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    priority VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    done BOOLEAN DEFAULT FALSE,
    
    user_id INT NOT NULL, 
    FOREIGN KEY (user_id) 
    REFERENCES users(id) 
    ON DELETE CASCADE
);

SELECT * FROM users;
