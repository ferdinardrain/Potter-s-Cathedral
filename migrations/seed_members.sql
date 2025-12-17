-- Seed data for members table
-- This script adds sample members to the porters_db database

USE porters_db;

-- Insert sample members
INSERT INTO members (fullName, age, dob, residence, gpsAddress, phoneNumber, altPhoneNumber, nationality, maritalStatus, joiningDate, avatar) VALUES
('John Mensah', 35, '1989-03-15', 'East Legon, Accra', 'GA-039-5678', '+233244567890', '+233201234567', 'Ghanaian', 'Married', '2020-01-10', NULL),
('Mary Osei', 28, '1996-07-22', 'Tema Community 1', 'GA-198-2345', '+233554321098', NULL, 'Ghanaian', 'Single', '2021-05-15', NULL),
('Kwame Asante', 42, '1982-11-08', 'Dansoman, Accra', 'GA-456-7890', '+233277889900', '+233244556677', 'Ghanaian', 'Married', '2019-03-20', NULL),
('Grace Boateng', 31, '1993-02-14', 'Madina, Accra', 'GA-234-5678', '+233208765432', NULL, 'Ghanaian', 'Single', '2022-08-05', NULL),
('Samuel Owusu', 45, '1979-09-30', 'Achimota, Accra', 'GA-567-8901', '+233501234567', '+233244998877', 'Ghanaian', 'Married', '2018-06-12', NULL),
('Abena Adjei', 26, '1998-05-18', 'Kasoa', 'CR-123-4567', '+233559876543', NULL, 'Ghanaian', 'Single', '2023-02-28', NULL),
('Kofi Darko', 38, '1986-12-25', 'Spintex, Accra', 'GA-789-0123', '+233246789012', '+233207654321', 'Ghanaian', 'Married', '2020-11-15', NULL),
('Ama Frimpong', 33, '1991-08-07', 'Lapaz, Accra', 'GA-345-6789', '+233556543210', NULL, 'Ghanaian', 'Divorced', '2021-09-10', NULL),
('Yaw Agyeman', 29, '1995-04-12', 'Teshie, Accra', 'GA-678-9012', '+233245678901', NULL, 'Ghanaian', 'Single', '2022-01-20', NULL),
('Akosua Mensah', 40, '1984-10-03', 'Osu, Accra', 'GA-890-1234', '+233508901234', '+233244332211', 'Ghanaian', 'Married', '2019-07-18', NULL),
('Kwabena Appiah', 36, '1988-06-28', 'Kaneshie, Accra', 'GA-012-3456', '+233277654321', NULL, 'Ghanaian', 'Married', '2020-04-22', NULL),
('Efua Amoah', 27, '1997-01-16', 'Haatso, Accra', 'GA-234-5670', '+233559012345', NULL, 'Ghanaian', 'Single', '2023-06-30', NULL),
('Kojo Ansah', 44, '1980-03-09', 'Nungua, Accra', 'GA-456-7891', '+233246012345', '+233201122334', 'Ghanaian', 'Married', '2018-12-05', NULL),
('Adwoa Sarpong', 32, '1992-11-21', 'Dome, Accra', 'GA-678-9013', '+233555432109', NULL, 'Ghanaian', 'Single', '2021-10-14', NULL),
('Fiifi Quansah', 39, '1985-07-04', 'Weija, Accra', 'GA-890-1235', '+233508765432', '+233244778899', 'Ghanaian', 'Married', '2019-09-08', NULL);

-- Verify the inserted data
SELECT COUNT(*) as total_members FROM members;
SELECT * FROM members ORDER BY createdAt DESC LIMIT 5;
