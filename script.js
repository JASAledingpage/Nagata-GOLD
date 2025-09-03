document.addEventListener('DOMContentLoaded', () => {

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    // Testimonial Slider Logic
    const slidesWrapper = document.querySelector('.slides-wrapper');
    if (slidesWrapper) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const sliderDotsContainer = document.querySelector('.slider-dots');
        let currentSlide = 0; let slideInterval;
        for (let i = 0; i < testimonialCards.length; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.index = i;
            dot.addEventListener('click', () => { goToSlide(i); resetInterval(); });
            sliderDotsContainer.appendChild(dot);
        }
        const dots = document.querySelectorAll('.dot');
        function goToSlide(index) {
            slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
            currentSlide = index;
        }
        function nextSlide() { currentSlide = (currentSlide + 1) % testimonialCards.length; goToSlide(currentSlide); }
        function startSlider() { slideInterval = setInterval(nextSlide, 5000); }
        function resetInterval() { clearInterval(slideInterval); startSlider(); }
        startSlider();
    }

    // Professional Scroll Animation Logic
    const sectionsToAnimate = document.querySelectorAll('.animated-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    sectionsToAnimate.forEach(section => { observer.observe(section); });

    // EFEK 3D INTERAKTIF PADA KARTU
    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10; // Intensitas rotasi
            const rotateY = (centerX - x) / 10;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0)';
        });
    });

});
