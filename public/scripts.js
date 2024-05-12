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

function submitPost() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    fetch('/api/posts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password, title, body })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error during post submission:', error));
}