// Hamburger menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Highlight active navigation on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('text-blue-400');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('text-blue-400');
        }
    });
});

// Blog tag filters
const filterBtns = document.querySelectorAll('.filter-btn');
const blogPosts = document.querySelectorAll('.blog-post');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tag = btn.dataset.tag;
        blogPosts.forEach(post => {
            if (tag === 'all' || post.dataset.tags.split(',').includes(tag)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });
});
