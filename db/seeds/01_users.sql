-- Users table seeds

-- Customers
INSERT INTO users (name, email, password, phone_number)
VALUES
('Bubbletea Lover', 'example@gmail.com', 'password', 4161231234),
('Dylan Du', 'dylan@gmail.com', 'password', 4161235678),
('Khurram Virani', 'kv@gmail.com', 'password', 4161239876);

-- Admin
INSERT INTO users (name, email, password, phone_number, is_admin)
VALUES
('Admin', 'admin@bubbles.com', 'password', 4161230000, TRUE);
