// A simple script to demonstrate JS file inclusion.
// For this layout, advanced JS isn't strictly necessary.
// You could add:
// - Smooth scrolling for navigation links
// - Dynamic content loading (e.g., if team members were from an API)
// - Simple animations on scroll (e.g., using Intersection Observer API)

document.addEventListener('DOMContentLoaded', () => {
    // Example: Log when the page is loaded
    console.log('Page loaded successfully!');

    // You could add a simple alert for "View Profile" button clicks
    const viewProfileButtons = document.querySelectorAll('.primary-btn');
    viewProfileButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('View Profile clicked! (Functionality not implemented in this demo)');
        });
    });

    // You could add a simple alert for "Contact" button clicks
    const contactButtons = document.querySelectorAll('.secondary-btn');
    contactButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Contact clicked! (Functionality not implemented in this demo)');
        });
    });
});
