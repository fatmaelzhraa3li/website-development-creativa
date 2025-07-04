document.addEventListener('DOMContentLoaded', () => {
    // 1. User Profile Generator
    const generateProfileBtn = document.getElementById('generateProfileBtn');
    const profileOutput = document.getElementById('profileOutput');

    generateProfileBtn.addEventListener('click', () => {
        // Use prompt() to get user input as seen in the video
        const name = prompt("Enter your name:");
        if (name === null || name.trim() === '') {
            profileOutput.innerHTML = '<p style="color: red;">Profile generation cancelled or name is empty.</p>';
            return;
        }

        let age;
        while (true) {
            const ageInput = prompt("Enter your age:");
            if (ageInput === null) {
                profileOutput.innerHTML = '<p style="color: red;">Profile generation cancelled.</p>';
                return;
            }
            age = parseInt(ageInput);
            if (!isNaN(age) && age > 0) {
                break;
            } else {
                alert("Please enter a valid positive number for age.");
            }
        }

        let isDeveloper;
        while (true) {
            const devInput = prompt("Are you a developer? (yes/no)").toLowerCase();
            if (devInput === null) {
                profileOutput.innerHTML = '<p style="color: red;">Profile generation cancelled.</p>';
                return;
            }
            if (devInput === 'yes') {
                isDeveloper = 'Developer';
                break;
            } else if (devInput === 'no') {
                isDeveloper = 'Non-Developer';
                break;
            } else {
                alert("Please answer 'yes' or 'no'.");
            }
        }
        
        const currentYear = new Date().getFullYear();
        const birthYear = currentYear - age;

        profileOutput.innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Status:</strong> ${isDeveloper}</p>
            <p><strong>Birth Year:</strong> ${birthYear}</p>
        `;
    });

    // 2. Shopping Cart Calculator
    const calculateTotalBtn = document.getElementById('calculateTotalBtn');
    const cartTotalOutput = document.getElementById('cartTotalOutput');

    calculateTotalBtn.addEventListener('click', () => {
        // Based on the video, these seem to be fixed values
        const subtotal = 2397.80;
        const taxRate = 0.08; // 8% tax
        const taxAmount = subtotal * taxRate;
        const total = subtotal + taxAmount;

        cartTotalOutput.innerHTML = `
            <p>Subtotal: $${subtotal.toFixed(2)}</p>
            <p>Tax (8%): $${taxAmount.toFixed(2)}</p>
            <p>Total: $${total.toFixed(2)}</p>
        `;
    });

    // 3. Age Verification
    const ageInput = document.getElementById('ageInput');
    const verifyAgeBtn = document.getElementById('verifyAgeBtn');
    const ageVerificationOutput = document.getElementById('ageVerificationOutput');
    const MIN_AGE = 18; // Example minimum age for access

    verifyAgeBtn.addEventListener('click', () => {
        const age = parseInt(ageInput.value);

        if (isNaN(age) || age <= 0) {
            ageVerificationOutput.innerHTML = `<p style="color: red;">Please enter a valid age.</p>`;
        } else if (age >= MIN_AGE) {
            ageVerificationOutput.innerHTML = `<p style="color: green;">Access granted!</p><p>Welcome to our service!</p>`;
        } else {
            ageVerificationOutput.innerHTML = `<p style="color: red;">Access Denied. You must be at least ${MIN_AGE} years old.</p>`;
        }
    });

    // 4. Dark Mode
    const toggleDarkModeBtn = document.getElementById('toggleDarkModeBtn');
    const body = document.body;

    // Check for saved dark mode preference in localStorage
    // If 'darkMode' is 'enabled' in localStorage, add the 'dark-mode' class
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    toggleDarkModeBtn.addEventListener('click', () => {
        // Toggle the 'dark-mode' class on the body element
        body.classList.toggle('dark-mode');

        // Save the current mode preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // 5. Shopping List (New section based on video)
    const shoppingItemInput = document.getElementById('shoppingItemInput');
    const addItemBtn = document.getElementById('addItemBtn');
    const shoppingListItems = document.getElementById('shoppingListItems');

    addItemBtn.addEventListener('click', () => {
        const itemText = shoppingItemInput.value.trim(); // Get item text and remove whitespace

        if (itemText !== '') { // Only add if input is not empty
            const listItem = document.createElement('li'); // Create a new list item <li>
            listItem.innerHTML = `
                <span>${itemText}</span>
                <button class="delete-btn">x</button>
            `; // Set its content: item text and a delete button

            shoppingListItems.appendChild(listItem); // Add the new item to the <ul>

            // Add event listener for the delete button
            listItem.querySelector('.delete-btn').addEventListener('click', () => {
                listItem.remove(); // Remove the parent <li> when delete button is clicked
            });

            shoppingItemInput.value = ''; // Clear the input field after adding
            shoppingItemInput.focus(); // Keep focus on input for quick entry
        } else {
            alert('Please enter an item to add to the list.');
        }
    });

    // Allow adding item with Enter key
    shoppingItemInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addItemBtn.click(); // Simulate a click on the Add button
        }
    });
});
