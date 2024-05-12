const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'secure_assign4'
});

db.connect(err => {
    if (err) {
        console.error('Database connection error: ' + err);
        return;
    }
    console.log('Database connected successfully');
});

const users = [];
const items = [
    { id: 1, name: '커피 머신', description: '빠르고 편리한 커피 머신' },
    { id: 2, name: '전자레인지', description: '고성능 전자레인지' },
    { id: 3, name: '에어프라이어', description: '건강한 요리를 위한 필수 아이템' }
];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Database error during login:', err);
            return res.status(500).send({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        res.send({ message: 'Logged in successfully' });
    });
});

app.post('/api/signup', (req, res) => {
    const { username, password, email } = req.body;
    const checkUserQuery = 'SELECT username FROM users WHERE username = ?';
    
    db.query(checkUserQuery, [username], (err, results) => {
        if (err) {
            console.error('Database error during user check:', err);
            return res.status(500).send({ message: 'Database error during user check' });
        }
        if (results.length > 0) {
            return res.status(409).send({ message: 'Username already exists.' });
        }

        const signupQuery = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        db.query(signupQuery, [username, password, email], (err, result) => {
            if (err) {
                console.error('Database error during user registration:', err);
                return res.status(500).send({ message: 'Database error during user registration' });
            }
            res.send({ message: 'User registered successfully.' });
        });
    });
});


app.get('/api/search', (req, res) => {
    const { query } = req.query;
    const results = items.filter(item => item.name.includes(query));
    res.json(results);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
