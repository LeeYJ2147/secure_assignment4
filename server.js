const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
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
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ message: '로그인 성공!', user });
    } else {
        res.status(401).json({ message: '로그인 실패: 사용자 이름 또는 비밀번호가 잘못되었습니다.' });
    }
});

app.post('/api/signup', (req, res) => {
    const { username, password, email } = req.body;
    const exists = users.some(u => u.username === username);
    if (exists) {
        res.status(409).json({ message: '회원가입 실패: 사용자 이름이 이미 존재합니다.' });
    } else {
        users.push({ username, password, email });
        res.json({ message: '회원가입 성공!', username });
    }
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
