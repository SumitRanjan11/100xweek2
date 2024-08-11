const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON bodies

// Write File Endpoint
app.post('/write-file', async (req, res) => {
    const { filePath, content } = req.body;
    try {
        await fs.writeFile(path.join(__dirname, filePath), content, 'utf-8');
        res.json({ message: 'File written successfully' });
    } catch (error) {
        console.error('Error writing file:', error);
        res.status(500).json({ message: 'Failed to write file' });
    }
});

// Read File Endpoint
app.get('/read-file', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'file.text'), 'utf-8');
        res.json({ content: data });
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ message: 'Failed to read file' });
    }
});

// Fetch Data Endpoint
app.get('/fetch-data', (req, res) => {
    res.json({ message: 'This is some data' });
});

// Serve static files (like HTML, JS, CSS)
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
