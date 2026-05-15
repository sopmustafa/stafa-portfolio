/* =============================================
   SOP MUSTAFA PORTFOLIO — script.js
   Functionality: Navigation, Scroll Reveals, & Skill Bars
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    lucide.createIcons();

    // --- 1. MOBILE MENU LOGIC ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        // Prevent scrolling when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : 'auto';
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });


    // --- 2. NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // --- 3. REVEAL ON SCROLL (Intersection Observer) ---
    // This looks for elements with the .reveal class
    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special check: If this is a skill card, animate the progress bar inside
                const skillBar = entry.target.querySelector('.skill-bar-fill');
                if (skillBar) {
                    skillBar.classList.add('animated');
                }
                
                // Stop observing once visible
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));


    // --- 4. SMOOTH SCROLLING FOR NAV LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 5. FLOATING TAG INTERACTIVITY (Optional) ---
    // Makes the hero tags react slightly to mouse movement
    const tags = document.querySelectorAll('.floating-tag');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        
        tags.forEach((tag, index) => {
            const speed = (index + 1) * 0.5;
            tag.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

});