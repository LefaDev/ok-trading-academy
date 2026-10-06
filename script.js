// Mobile navigation panel toggles
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('#mobile-menu a');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full');
});

menuClose.addEventListener('click', () => {
    mobileMenu.classList.add('translate-x-full');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) mobileMenu.classList.add('translate-x-full');
});

// Maintains standard header size and transparency transitions on scroll.
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('shadow-lg', 'h-16', 'bg-[#1E1610]');
        header.classList.remove('h-20', 'bg-[#1E1610]/80');
    } else {
        header.classList.remove('shadow-lg', 'h-16', 'bg-[#1E1610]');
        header.classList.add('h-20', 'bg-[#1E1610]/80');
    }
});

// Custom slow smooth scroll implementation for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (!target) return;
        
        e.preventDefault();
        
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        const startPosition = window.scrollY || document.documentElement.scrollTop;
        const targetPosition = target.getBoundingClientRect().top + startPosition - headerHeight;
        const distance = targetPosition - startPosition;
        
        // Custom slow duration (1500ms = 1.5 seconds)
        const duration = 1500; 
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            
            // Quadratic ease-in-out curve
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    });
});
