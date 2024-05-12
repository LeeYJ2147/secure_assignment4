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

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error during login:', err);
            return res.status(500).send({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        res.send({ message: 'Logged in successfully', username: results });
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

app.post('/api/posts', (req, res) => {
    const { username, password, title, body } = req.body;
    // 먼저 사용자의 유효성을 검증합니다.
    const userCheckQuery = "SELECT user_id FROM users WHERE username = '" + username + "' AND password = '" + password + "'";

    db.query(userCheckQuery, (err, results) => {
        if (err) {
            res.status(500).send({ message: 'Database error while checking user' });
            return;
        }
        if (results.length === 0) {
            res.status(401).send({ message: 'Invalid username or password' });
            return;
        }
        const userId = results[0].user_id;
        const postQuery = "INSERT INTO posts (user_id, title, body) VALUES (" + userId + ", '" + title + "', '" + body + "')";
        
        db.query(postQuery, (err, result) => {
            if (err) {
                res.status(500).send({ message: 'Error creating post' });
            } else {
                res.send({ message: 'Post created successfully' });
            }
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
