const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serves your frontend files

// Configure your PostgreSQL connection here
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres', // Change if you named your db differently
    password: 'YOUR_DB_PASSWORD', // ENTER YOUR PASSWORD HERE
    port: 5432,
});

// GET: Fetch Menu (Includes Advanced Features: Search & Filter)
app.get('/api/menu', async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = 'SELECT * FROM menu_items WHERE 1=1';
        let values = [];
        let index = 1;

        if (search) {
            query += ` AND ILIKE $${index}`; // Case-insensitive search
            values.push(`%${search}%`);
            index++;
        }
        
        if (category && category !== 'All') {
            query += ` AND category = $${index}`;
            values.push(category);
        }

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching menu' });
    }
});

// POST: Create a new order
app.post('/api/orders', async (req, res) => {
    try {
        const { customer_name, total_price } = req.body;
        
        // Basic Validation
        if (!customer_name || !total_price) {
            return res.status(400).json({ error: 'Name and total are required' });
        }

        const newOrder = await pool.query(
            'INSERT INTO orders (customer_name, total_price) VALUES ($1, $2) RETURNING *',
            [customer_name, total_price]
        );
        
        res.status(201).json(newOrder.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error creating order' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`NFC Server running on http://localhost:${PORT}`));