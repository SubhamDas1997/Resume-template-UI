const usernameEle = document.getElementById('username');
const passwordEle = document.getElementById('password');
const btnEle = document.querySelector('.submit');

localStorage.setItem('username', 'subhamDas');
localStorage.setItem('password', '123456789');

btnEle.addEventListener("click", function() {
    let correctUsername = validateFields(username.value, localStorage.getItem('username'));
    let correctPassword = validateFields(password.value, localStorage.getItem('password'));

    if (correctUsername && correctPassword)
        window.location.href = 'resume.html';
    else
        alert('Invalid username/password.');
});

disableBackFunction();

function validateFields(userEntry, storedValue) {
    if (userEntry === storedValue)
        return 1;
}

function disableBackFunction() {
    setTimeout("window.history.forward()",0);
    window.onunload = function() {null};
}