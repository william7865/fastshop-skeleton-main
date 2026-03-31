CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500),
    stock INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id)
);

INSERT INTO products (name, description, price, image_url, stock) VALUES
    ('Wireless Headphones', 'Casque Bluetooth avec reduction de bruit active', 79.99, 'https://via.placeholder.com/300x300?text=Headphones', 50),
    ('USB-C Hub', 'Hub USB-C 7-en-1 avec HDMI, USB 3.0 et lecteur SD', 34.99, 'https://via.placeholder.com/300x300?text=USB-C+Hub', 120),
    ('Mechanical Keyboard', 'Clavier mecanique RGB avec switches Cherry MX', 129.99, 'https://via.placeholder.com/300x300?text=Keyboard', 35),
    ('Laptop Stand', 'Support ergonomique en aluminium, hauteur reglable', 49.99, 'https://via.placeholder.com/300x300?text=Laptop+Stand', 75),
    ('Webcam HD', 'Webcam 1080p avec microphone integre', 59.99, 'https://via.placeholder.com/300x300?text=Webcam', 60),
    ('Mouse Pad XL', 'Tapis de souris extra-large avec bords cousus', 19.99, 'https://via.placeholder.com/300x300?text=Mouse+Pad', 200);
