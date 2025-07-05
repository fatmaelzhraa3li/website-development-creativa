document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const loginModal = document.getElementById('loginModal');
    const closeButton = document.querySelector('.close-button');

    // Function to open the modal
    loginButton.addEventListener('click', () => {
        loginModal.style.display = 'flex'; // Use flex to center content
    });

    // Function to close the modal when clicking the close button
    closeButton.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Function to close the modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Handle form submission (placeholder - in a real app, you'd send data to a server)
    const loginForm = loginModal.querySelector('form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Basic validation (replace with actual authentication logic)
        if (username && password) {
            alert(`Logged in as: ${username}`);
            loginModal.style.display = 'none'; // Close modal on successful login (for demo)
            // In a real app, you'd redirect or update UI
            // For this demo, let's change the login button to show the username
            loginButton.textContent = username;
            loginButton.removeEventListener('click', () => { loginModal.style.display = 'flex'; }); // Remove original click listener
            loginButton.style.cursor = 'default'; // Make it not look clickable
            loginButton.style.backgroundColor = 'transparent';
            loginButton.style.color = 'var(--primary-color)';
            loginButton.style.boxShadow = 'none';
        } else {
            alert('Please enter both username and password.');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact form submission (placeholder)
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert(`Message sent by ${name} from ${email}. Message: "${message}"`);
            contactForm.reset(); // Clear the form
        } else {
            alert('Please fill in all fields to send your message.');
        }
    });
});

