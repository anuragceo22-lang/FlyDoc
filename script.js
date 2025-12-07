document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initScrollAnimations();
    initContactForm();
    initSmoothScrolling();
    initDroneAnimation();
});

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }

    function handleScrollAnimation() {
        animatedElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('aos-animate');
            }
        });
    }

    handleScrollAnimation();

    window.addEventListener('scroll', handleScrollAnimation);

    setTimeout(() => {
        animatedElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('aos-animate');
            }
        });
    }, 100);
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrors();
        
        const isValid = validateForm();
        
        if (isValid) {
            simulateFormSubmission();
        }
    });
    
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });
    
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    formInputs.forEach(input => {
        input.style.borderColor = '#e9ecef';
    });
}

function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    if (!validateField(name)) isValid = false;
    if (!validateField(email)) isValid = false;
    if (!validateField(subject)) isValid = false;
    if (!validateField(message)) isValid = false;
    
    return isValid;
}

function validateField(field) {
    const fieldId = field.id;
    const value = field.value.trim();
    const errorElement = document.getElementById(fieldId + 'Error');
    
    field.style.borderColor = '#e9ecef';
    
    if (field.hasAttribute('required') && value === '') {
        showError(field, errorElement, 'This field is required');
        return false;
    }
    
    if (fieldId === 'email' && value !== '') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            showError(field, errorElement, 'Please enter a valid email address');
            return false;
        }
    }
    
    if (fieldId === 'phone' && value !== '') {
        const phonePattern = /^[\+]?[0-9\s\-\(\)]+$/;
        if (!phonePattern.test(value)) {
            showError(field, errorElement, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

function showError(field, errorElement, message) {
    field.style.borderColor = '#e63946';
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function simulateFormSubmission() {
    const submitButton = document.querySelector('.form-submit');
    const originalText = submitButton.querySelector('span').textContent;
    const originalIcon = submitButton.querySelector('i').className;
    
    submitButton.querySelector('span').textContent = 'Sending...';
    submitButton.querySelector('i').className = 'fas fa-spinner fa-spin';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! Our team will get back to you soon.');
        
        document.getElementById('contactForm').reset();
        
        submitButton.querySelector('span').textContent = originalText;
        submitButton.querySelector('i').className = originalIcon;
        submitButton.disabled = false;
    }, 1500);
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initDroneAnimation() {
    const drone = document.querySelector('.drone');
    
    if (!drone) return;
    
    drone.addEventListener('mouseenter', function() {
        this.style.animationDuration = '3s';
    });
    
    drone.addEventListener('mouseleave', function() {
        this.style.animationDuration = '6s';
    });
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const droneContainer = document.querySelector('.drone-container');
        
        if (droneContainer) {
            const moveY = scrollPosition * 0.05;
            droneContainer.style.transform = `translateY(${moveY}px)`;
        }
    });
}