const usernameEle = document.getElementById('username');
const passwordEle = document.getElementById('password');
const btnEle = document.querySelector('.submit');

localStorage.setItem('username', 'subhamDas');
localStorage.setItem('password', '123456789');

usernameEle.addEventListener("keypress", login)
passwordEle.addEventListener("keypress", login)
btnEle.addEventListener("click", showStatus);
disableBackFunction();

function validateFields(userEntry, storedValue) {
    if (userEntry === storedValue)
        return 1;
}

function showStatus() {
    let correctUsername = validateFields(username.value, localStorage.getItem('username'));
    let correctPassword = validateFields(password.value, localStorage.getItem('password'));

    if (correctUsername && correctPassword)
        window.location.href = 'resume.html';
    else
        alert('Invalid username/password.');
}

function login(e) {
    if (e.keyCode == 13) showStatus();
}

function disableBackFunction() {
    setTimeout("window.history.forward()",0);
    window.onunload = function() {null};
}
