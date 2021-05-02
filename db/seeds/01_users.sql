-- Users table seeds here (Example)
-- INSERT INTO users (name) VALUES ('Alice');
-- INSERT INTO users (name) VALUES ('Kira');

INSERT INTO users (name, email, password, phone_number)
VALUES ('Alice', alice@gmail.com, password, 4161231234),
('Kira', aira@gmail.com, password, 4161235678);

INSERT INTO users (name, email, password, phone_number, role)
VALUES ('Ruby', ruby@gmail.com, password, 4161230000, 'ADMIN');
