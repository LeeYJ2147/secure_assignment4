function login() {
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: username, password: password})
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
        } else {
            alert('로그인 실패: 서버로부터 응답을 받지 못했습니다.');
        }
    })
    .catch(error => alert('로그인 실패: ' + error));
}

function signup() {
    var username = document.getElementById('signup-username').value;
    var password = document.getElementById('signup-password').value;
    var email = document.getElementById('signup-email').value;
    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: username, password: password, email: email})
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
        } else {
            alert('회원가입 실패: 서버로부터 응답을 받지 못했습니다.');
        }
    })
    .catch(error => alert('회원가입 실패: ' + error));
}

function searchItems() {
    var query = document.getElementById('search-query').value;
    fetch(`/api/search?query=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
        const results = document.getElementById('search-results');
        results.innerHTML = '';
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name + ' - ' + item.description;
            results.appendChild(li);
        });
    })
    .catch(error => alert('검색 오류: ' + error));
}
function searchItems() {
    var query = document.getElementById('search-query').value;
    fetch(`/api/search?query=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
        const results = document.getElementById('search-results');
        results.innerHTML = '';
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name + ' - ' + item.description;
            results.appendChild(li);
        });
    })
    .catch(error => alert('검색 오류: ' + error));
}