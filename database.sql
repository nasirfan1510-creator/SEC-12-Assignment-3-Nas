-- Create the menu table
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url TEXT
);

-- Create the orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Seed Data for NFC
INSERT INTO menu_items (name, description, price, category, image_url) VALUES
('Nas''s Spicy Chicken', '2 pieces of our signature spicy fried chicken.', 12.99, 'Spicy', '🍗'),
('Original Recipe Drumsticks', '3 crispy drumsticks with secret herbs.', 10.99, 'Original', '🍗'),
('Cheesy Wedges', 'Potato wedges loaded with cheese sauce.', 5.99, 'Sides', '🍟'),
('Spicy Chicken Burger', 'Crispy spicy patty with fresh lettuce and mayo.', 8.99, 'Spicy', '🍔'),
('Coleslaw', 'Freshly diced cabbage and carrots in mayo.', 3.99, 'Sides', '🥗');