CREATE DATABASE delivereat;

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) NOT NULL
);

INSERT INTO category (name)
VALUES
('Salads'), 
('Sides'), 
('Starters'), 
('Mains'),
('Burgers'),
('Steaks'),
('Ribs'),
('Drinks');

CREATE TABLE dish (
    id SERIAL PRIMARY KEY,
    category_id INT,
    name VARCHAR(50) NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category (id)
);

INSERT INTO dish (category_id, name, price)
VALUES 
(1, 'Chicken Ceaser Salad', 5.60),
(1, 'Grilled Salad', 4.99),
(1, 'Deep Fried Lettuce', 7.00),
(1, 'Roasted Tomatoes', 5.20),
(2, 'Bowl of Chips', 2.70),
(2, 'Garlic Bread', 3.40),
(2, 'Nachos', 4.20),
(2, 'Potato Salad', 4.99),
(2, 'French Fries', 6),
(2, 'Bacon', 2.20),
(2, 'Bacon with Cheese', 3.20),
(2, 'Bacon with Bacon', 4.20),
(3, 'Soup of the Day', 5),
(3, 'Soup of the Month', 6),
(3, 'Crusty Bread', 4.80),
(3, 'Salad', 5.80),
(4, 'Pulled Pork', 15.40),
(4, 'Steak Lasagne', 15.30),
(4, 'Mystery Meat', 20),
(4, 'Farmers Suprise', 18.30),
(4, 'Yesterdays Leftovers', 5.00),
(5, 'Classic Burger', 10),
(5, 'Cheese Burger', 10),
(5, 'Texas BBQ Burger', 10),
(5, 'Triple Burger', 13),
(5, 'Fowl Burger', 13),
(6, 'Rump Steak', 20),
(6, 'Sirloin Steak', 22),
(6, 'Rib-eye Steak', 24),
(6, 'T-Bone Steak', 26),
(6, 'Flat Iron Steak', 28),
(7, 'Pork Ribs', 20.20),
(7, 'BBQ Pork Ribs', 20.90),
(7, 'Sweet Chilli Ribs', 20.40),
(7, 'Hot & Spicy Ribs', 25.90),
(7, 'Full Rack of Ribs', 30.30),
(7, 'Coke', 2.50),
(7, 'Fanta', 2.50),
(7, 'Brew Dog Punk IPA', 6),
(7, 'Brew Dog Dead Pony Club', 6),
(7, 'Peroni', 7),
(7, 'Ghost Ship Pale Ale', 6.50);

CREATE TABLE transaction (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15) NOT NULL,
    mobile VARCHAR(11)
);

INSERT INTO transaction
VALUES (1, 'placed', '07912345678');

CREATE TABLE dish_transaction (
    id SERIAL PRIMARY KEY,
    order_id INT,
    dish_id INT,
    quantity INT NOT NULL
);

INSERT INTO dish_transaction (order_id, dish_id, quantity)
VALUES 
(1, 5, 1),
(1, 10, 2),
(1, 7, 1),
(1, 15, 4),
(1, 11, 3);