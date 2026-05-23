USE task_manager;

CREATE TABLE users(
    id INT primary KEY AUTO_INCREMENT,
    username VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255)
);

ALTER TABLE tasks
ADD CONSTRAINT fk_user_task
FOREIGN KEY (user_id)
REFERENCES users(id);

SELECT * FROM tasks