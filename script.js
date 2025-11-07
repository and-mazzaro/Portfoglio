document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const contactForm = document.getElementById('contactForm');
    const sections = document.querySelectorAll('section[id]');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            scrollTopBtn.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            scrollTopBtn.classList.remove('visible');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                if (entry.target.classList.contains('skill-bar')) {
                    const progressFill = entry.target.querySelector('.skill-progress-fill');
                    const width = progressFill.getAttribute('data-width');
                    setTimeout(() => {
                        progressFill.style.width = width + '%';
                    }, 200);
                }
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.service-card, .project-card, .stat-card, .timeline-item, .skill-bar, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const submitBtn = contactForm.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        btnText.textContent = 'Invio in corso...';
        submitBtn.disabled = true;

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        console.log('Form Data:', formData);

        setTimeout(() => {
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Messaggio inviato con successo! Ti risponderò al più presto.';
            
            contactForm.reset();
            btnText.textContent = originalText;
            submitBtn.disabled = false;

            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.className = 'form-message';
            }, 5000);
        }, 1500);
    });

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const typingEffect = () => {
        const name = document.querySelector('.name');
        if (name) {
            const text = name.textContent;
            name.textContent = '';
            let i = 0;
            
            const typing = setInterval(() => {
                if (i < text.length) {
                    name.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 100);
        }
    };

    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
        setTimeout(() => {
            cursorFollower.style.left = e.pageX + 'px';
            cursorFollower.style.top = e.pageY + 'px';
        }, 100);
    });

    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    const createParticles = () => {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 5 + 2}px;
                height: ${Math.random() * 5 + 2}px;
                background: rgba(102, 126, 234, ${Math.random() * 0.5});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            hero.appendChild(particle);
        }
    };

    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Link al progetto - sostituisci con i tuoi URL reali!');
        });
    });

    console.log('%c Portfolio Loaded Successfully! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
    console.log('%c Developed with ❤️ ', 'background: #1a202c; color: white; padding: 5px 10px; font-size: 12px;');
});
