// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Validation
const form = document.querySelector('#contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const message = document.querySelector('#message').value.trim();

        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill out all fields.');
        }
    });
}

// Lazy Loading Images (Intersection Observer)
const images = document.querySelectorAll('img[loading="lazy"]');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            observer.unobserve(img);
        }
    });
});

images.forEach(img => observer.observe(img));

// Light/Dark Mode Toggle (Optional)
const toggleButton = document.createElement('button');
toggleButton.textContent = 'Toggle Theme';
toggleButton.className = 'theme-toggle';
document.querySelector('.navbar').appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#1a1a1a';
        document.querySelector('.navbar').style.backgroundColor = '#f0f0f0';
    } else {
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#fff';
        document.querySelector('.navbar').style.backgroundColor = '#2c2c2c';
    }
});
