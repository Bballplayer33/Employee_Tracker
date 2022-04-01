
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
('VP', 150000, 2),
('Executive', 100000, 3),
('Manager', 80000, 4),
('Shift Lead', 60000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Earl', 'Adams', 1, NULL),
('James', 'Bell', 2, 1),
('Quincy', 'Jones', 3, NULL),
('Demarcus', 'Martin', 4, 3),
('DeVarus', 'Martin', 5, 3);

