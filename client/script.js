// script.js

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Basic form validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (!form) {
        console.error('Form not found');
        return;
    }

    const nameField = document.querySelector('#name');
    const emailField = document.querySelector('#email');
    const messageField = document.querySelector('#message');

    if (!nameField || !emailField || !messageField) {
        console.error('One or more form fields not found');
        return;
    }

    form.addEventListener('submit', function(e) {
        const name = nameField.value;
        const email = emailField.value;
        const message = messageField.value;

        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);

        if (name === '' || email === '' || message === '') {
            e.preventDefault();
            alert('Please fill in all fields.');
        }
    });
});