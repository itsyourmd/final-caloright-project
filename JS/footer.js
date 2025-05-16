/* FOOTER */

function subscribeNewsletter() {
    var emailInput = document.getElementById('newsletter-email').value;
    var emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (emailPattern.test(emailInput)) {
        var button = document.getElementById('subscribe-btn');
        button.textContent = 'Subscribed';
        button.disabled = true;
    } else {
        alert('Please enter a valid email address.');
    }
}

document.getElementById('newsletter-email').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        subscribeNewsletter();
    }
});