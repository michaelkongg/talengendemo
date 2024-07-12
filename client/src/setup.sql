CREATE DATABASE employability_survey;

USE employability_survey;

CREATE TABLE surveys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    employmentStatus VARCHAR(50),
    jobRelevance VARCHAR(10),
    skillsUtilized TEXT,
    satisfaction INT
);
