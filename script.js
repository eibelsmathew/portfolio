document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true
    });
});

// Initialize AOS
AOS.init();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    fetch(form.action, {
        method: form.method,
        body: new FormData(form)
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        } else {
            alert('Oops! There was a problem submitting your form. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Oops! There was a problem submitting your form. Please try again.');
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    });
});

// Typing effect for the tagline
const tagline = document.querySelector('#home h2');
const text = tagline.textContent;
tagline.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

typeWriter();

// Project hover effect
const projectCards = document.querySelectorAll('#projects .card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Skill progress bars
const skills = {
    'Python': 90,
    'R': 80,
    'SQL': 85,
    'Machine Learning': 75,
    'Data Visualization': 85
};

const skillsSection = document.querySelector('#skills .row');
for (let skill in skills) {
    const skillDiv = document.createElement('div');
    skillDiv.className = 'col-md-6 mb-3';
    skillDiv.innerHTML = `
        <h4>${skill}</h4>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${skills[skill]}%;" 
                 aria-valuenow="${skills[skill]}" aria-valuemin="0" aria-valuemax="100">
                ${skills[skill]}%
            </div>
        </div>
    `;
    skillsSection.appendChild(skillDiv);
}