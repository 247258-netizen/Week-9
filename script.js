// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.style.display = 'none';
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Enroll Program
function enrollProgram(programName) {
    alert(`🎉 Thanks for your interest in ${programName}!\n\nPlease fill out the contact form or call us to complete your enrollment.`);
    scrollToSection('contact');
}

// Select Plan
function selectPlan(planName) {
    alert(`✓ You selected the ${planName} plan!\n\nOur team will contact you shortly to complete the subscription process.`);
}

// Form Submission
function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Validate form
    if (!name || !email || !message) {
        alert('Please fill in all required fields!');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }

    // Show success message
    alert(`✓ Thank you, ${name}!\n\nYour message has been sent successfully. We'll contact you shortly at ${email}.`);

    // Reset form
    event.target.reset();

    // Log data (in real app, this would be sent to server)
    console.log('Form Data:', {
        name,
        email,
        phone,
        message,
        timestamp: new Date().toLocaleString()
    });
}

// Scroll animation for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.program-card, .trainer-card, .pricing-card, .testimonial-card').forEach(card => {
    observer.observe(card);
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Navbar active link highlight
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--white)';
        }
    });
});

// Counter animation for stats (optional feature)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 200;

        const updateCounter = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    });
}

// Phone number formatting
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            if (value.length > 6) {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
            } else if (value.length > 3) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            }
            e.target.value = value;
        });
    }
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Theme toggle (optional dark mode)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load saved dark mode preference
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        toggleDarkMode();
    }
});

// Export data to CSV (for admin)
function exportContactData() {
    const data = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    if (data.length === 0) {
        alert('No submissions to export');
        return;
    }

    let csv = 'Name,Email,Phone,Message,Date\n';
    data.forEach(submission => {
        csv += `"${submission.name}","${submission.email}","${submission.phone}","${submission.message}","${submission.timestamp}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact_submissions.csv';
    a.click();
}

console.log('✓ FitZone website loaded successfully!');