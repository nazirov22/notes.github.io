import { saveToLocalStorage, getFromLocalStorage, redirectTo } from './utils.js';

export function registerUser(email, password) {
    if (!email || !password) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    const user = {
        email: email,
        password: password
    };

    saveToLocalStorage('user', user);
    alert('Регистрация прошла успешно!');
    redirectTo('login.html');
}

export function loginUser(email, password) {
    if (!email || !password) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    const user = getFromLocalStorage('user');

    if (user && user.email === email && user.password === password) {
        alert('Авторизация прошла успешно!');
        redirectTo('notes.html');
    } else {
        alert('Неверный email или пароль');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.querySelector('form');
    if (registerForm && window.location.pathname.includes('register.html')) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = registerForm.querySelector('input[type="email"]').value;
            const password = registerForm.querySelector('input[type="password"]').value;
            registerUser(email, password);
        });
    }

    const loginForm = document.querySelector('form');
    if (loginForm && window.location.pathname.includes('login.html')) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;
            loginUser(email, password);
        });
    }
});