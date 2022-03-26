
Insert INTO department (name)
VALUES 
('Sales'),
('Warehouse'),
('Delivery'),
('Management'),
('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES 
('CEO', 300000, 1),
('VP', 150000, 2)
('Executive', 100000, 3),
('Manager', 80000, 4),
('Shift Lead', 60000, 5),
('Crew', 50000, 6),
('Vendor', 35000, 7),
('Temp', 35000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Earl', 'Adams', 1, null),
('James', 'Bell', 2, 1),
('Quincy', 'Jones', 3, 1),
('Demarcus', 'Martin', 4, 3),
('DeVarus', 'Martin', 5, 3),
('Jasmine', 'Lee', 6, 3),
('Roger', 'Mason', 6, 3),
('Jack', 'Jill', 6, 3),
('Blu', 'Cater', 7, 5),
('Ezola', 'Adams', 8, 5);
