const express = require('express');
const app = express();
const PORT = 5000;

// Mock data to simulate API response
const items = ['apple', 'apricot', 'banana', 'grape', 'orange', 'pineapple', 'pear'];

app.use(express.json());

// Endpoint to handle the search request
app.get('/search', (req, res) => {
    const query = req.query.q; 
    if (!query) {
        return res.json([]);
    }

    // Simulate an API delay of 1 second
    setTimeout(() => {
        const results = items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
        res.json(results);
    }, 1000);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
