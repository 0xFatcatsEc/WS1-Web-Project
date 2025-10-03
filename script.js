
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                animateElement(entry.target);
                entry.target.setAttribute('data-animated', 'true');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    function animateElement(element) {
        const elementType = getElementType(element);
        const delay = parseInt(element.getAttribute('data-delay')) || 0;
        
        switch(elementType) {
            case 'hero-header':
                slideInFromLeft(element, delay);
                break;
            case 'hero-content':
                fadeInUp(element, delay + 300);
                break;
            case 'hero-images':
                scaleInWithRotation(element, delay);
                break;
            case 'about-images':
                slideInFromBottom(element, delay);
                break;
            case 'grid-images':
                popInAnimation(element, delay);
                break;
            case 'services':
                slideInFromRight(element, delay);
                break;
            case 'footer-left':
                slideInFromLeft(element, delay + 200);
                break;
            case 'footer-center':
                slideInFromBottom(element, delay + 400);
                break;
            case 'footer-right':
                slideInFromRight(element, delay + 600);
                break;
            case 'copyright':
                fadeInUp(element, delay + 800);
                break;
            default:
                fadeInUp(element, delay);
        }
    }

    function getElementType(element) {
        if (element.classList.contains('hero-header')) return 'hero-header';
        if (element.classList.contains('hero-content')) return 'hero-content';
        if (element.classList.contains('img-item1') || element.classList.contains('img-item2') || element.classList.contains('img-item3')) return 'hero-images';
        if (element.classList.contains('item1') || element.classList.contains('item2') || element.classList.contains('item3') || element.classList.contains('item4') || element.classList.contains('item5')) return 'about-images';
        if (element.classList.contains('grid-image') || element.className.includes('grid-img') || element.className.includes('women-img')) return 'grid-images';
        if (element.classList.contains('services-flex-item') || element.classList.contains('services-item-img')) return 'services';
        if (element.classList.contains('footer-left')) return 'footer-left';
        if (element.classList.contains('footer-center')) return 'footer-center';
        if (element.classList.contains('footer-right')) return 'footer-right';
        if (element.classList.contains('copyright')) return 'copyright';
        return 'default';
    }

    function slideInFromLeft(element, delay = 0) {
        element.animate([
            {
                opacity: 0,
                transform: 'translateX(-100px)'
            },
            {
                opacity: 1,
                transform: 'translateX(0)'
            }
        ], {
            duration: 1000,
            delay: delay,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        });
    }

    function slideInFromRight(element, delay = 0) {
        element.animate([
            {
                opacity: 0,
                transform: 'translateX(100px)'
            },
            {
                opacity: 1,
                transform: 'translateX(0)'
            }
        ], {
            duration: 800,
            delay: delay,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        });
    }

    function slideInFromBottom(element, delay = 0) {
        element.animate([
            {
                opacity: 0,
                transform: 'translateY(100px)'
            },
            {
                opacity: 1,
                transform: 'translateY(0)'
            }
        ], {
            duration: 1000,
            delay: delay,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        });
    }

    function fadeInUp(element, delay = 0) {
        element.animate([
            {
                opacity: 0,
                transform: 'translateY(50px)'
            },
            {
                opacity: 1,
                transform: 'translateY(0)'
            }
        ], {
            duration: 800,
            delay: delay,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        });
    }

    function scaleInWithRotation(element, delay = 0) {
        element.animate([
            {
                opacity: 0,
                transform: 'scale(0.7) rotate(-5deg)'
            },
            {
                opacity: 1,
                transform: 'scale(1) rotate(0deg)'
            }
        ], {
            duration: 1000,
            delay: delay,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            fill: 'forwards'
        });
    }

    function popInAnimation(element, delay = 0) {
        element.animate([
            {
                opacity: 0,
                transform: 'scale(0.8) translateY(30px)'
            },
            {
                opacity: 0.8,
                transform: 'scale(1.05) translateY(-10px)'
            },
            {
                opacity: 1,
                transform: 'scale(1) translateY(0)'
            }
        ], {
            duration: 600,
            delay: delay,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            fill: 'forwards'
        });
    }

    function setInitialState(element) {
        element.style.opacity = '0';
    }

    const animateElements = document.querySelectorAll(
        '.hero-header, .hero-content, .img-content, ' +
        '.about-header-text, .image-content, .about-content, ' +
        '.visual-header, .grid-header, .grid-item, .women-outfit, ' +
        '.services-header, .services-flex-item, .updates-header, .forms-section'
    );

    const footerElements = document.querySelectorAll('.footer-left, .footer-center, .footer-right, .copyright');

    const observedElements = new Set();

    function safeObserve(element) {
        if (!observedElements.has(element) && !element.hasAttribute('data-animated')) {
            setInitialState(element);
            observer.observe(element);
            observedElements.add(element);
        }
    }

    animateElements.forEach((el) => {
        safeObserve(el);
    });

    footerElements.forEach((el) => {
        safeObserve(el);
    });

    const gridImages = document.querySelectorAll('.grid-image, [class*="women-img"], [class*="grid-img"]');
    gridImages.forEach((img, index) => {
        if (!observedElements.has(img)) {
            setInitialState(img);
            img.setAttribute('data-delay', index * 100);
            observer.observe(img);
            observedElements.add(img);
        }
    });

    const heroImages = document.querySelectorAll('.img-item1, .img-item2, .img-item3');
    heroImages.forEach((img, index) => {
        if (!observedElements.has(img)) {
            setInitialState(img);
            img.setAttribute('data-delay', index * 200);
            observer.observe(img);
            observedElements.add(img);
        }
    });

    const aboutImages = document.querySelectorAll('.item1, .item2, .item3, .item4, .item5');
    aboutImages.forEach((img, index) => {
        if (!observedElements.has(img)) {
            setInitialState(img);
            img.setAttribute('data-delay', index * 150);
            observer.observe(img);
            observedElements.add(img);
        }
    });

    // Only apply JavaScript hover animations to non-visual images (like hero, about, services)
    const nonVisualImages = document.querySelectorAll('.img-item1 img, .img-item2 img, .img-item3 img, .item1 img, .item2 img, .item3 img, .item4 img, .item5 img, .services-item-img img');
    nonVisualImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.animate([
                {
                    transform: 'scale(1)',
                    filter: 'brightness(1) saturate(1)'
                },
                {
                    transform: 'scale(1.05)',
                    filter: 'brightness(1.1) saturate(1.2)'
                }
            ], {
                duration: 300,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fill: 'forwards'
            });
        });
        
        img.addEventListener('mouseleave', () => {
            img.animate([
                {
                    transform: 'scale(1.05)',
                    filter: 'brightness(1.1) saturate(1.2)'
                },
                {
                    transform: 'scale(1)',
                    filter: 'brightness(1) saturate(1)'
                }
            ], {
                duration: 300,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fill: 'forwards'
            });
        });
    });

    // Visual section images (grid-img and women-img) will use CSS transitions only

    const behindText = document.querySelector('.behid-text');
    if (behindText) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            behindText.style.transform = `translate(-50%, -50%) translateY(${rate}px)`;
        });
    }

    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.animate([
                    { backgroundColor: 'rgba(26, 26, 26, 0.5)' },
                    { backgroundColor: 'rgba(26, 26, 26, 0.95)' }
                ], {
                    duration: 300,
                    fill: 'forwards'
                });
            } else {
                nav.animate([
                    { backgroundColor: 'rgba(26, 26, 26, 0.95)' },
                    { backgroundColor: 'rgba(26, 26, 26, 0.5)' }
                ], {
                    duration: 300,
                    fill: 'forwards'
                });
            }
        });
    }
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Page load animation
function initPageLoadAnimation() {
    document.body.animate([
        { opacity: 0 },
        { opacity: 1 }
    ], {
        duration: 500,
        easing: 'ease-in'
    });
}

// Mobile Navigation Functionality
function initMobileNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const body = document.body;
    
    // Mobile dropdown functionality
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    
    // Open mobile menu
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        body.classList.add('menu-open');
        
        // Change hamburger to X
        menuToggle.innerHTML = '<i class="fa-solid fa-times"></i>';
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        body.classList.remove('menu-open');
        
        // Change X back to hamburger
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        
        // Close any open dropdowns
        mobileDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const content = dropdown.querySelector('.mobile-dropdown-content');
            if (content) content.classList.remove('active');
        });
    }
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    // Event listeners
    if (menuToggle) menuToggle.addEventListener('click', toggleMobileMenu);
    if (closeMenu) closeMenu.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking on menu links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a:not(.mobile-dropdown-toggle)');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Handle mobile dropdown toggles
    mobileDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.mobile-dropdown-toggle');
        const content = dropdown.querySelector('.mobile-dropdown-content');
        
        if (toggle && content) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Close other dropdowns
                mobileDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                        const otherContent = otherDropdown.querySelector('.mobile-dropdown-content');
                        if (otherContent) otherContent.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
                content.classList.toggle('active');
            });
        }
    });
    
    // Close menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 640 && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Prevent scrolling issues on mobile
    let touchStartY = 0;
    if (mobileMenu) {
        mobileMenu.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        mobileMenu.addEventListener('touchmove', (e) => {
            const touchY = e.touches[0].clientY;
            const touchDiff = touchStartY - touchY;
            const menuContent = document.querySelector('.mobile-menu-content');
            
            if (menuContent && menuContent.scrollTop === 0 && touchDiff < 0) {
                e.preventDefault();
            }
            
            if (menuContent && menuContent.scrollHeight - menuContent.scrollTop === menuContent.clientHeight && touchDiff > 0) {
                e.preventDefault();
            }
        }, { passive: false });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initPageLoadAnimation();
    setTimeout(() => {
        initScrollAnimations();
        initSmoothScroll();
        initMobileNavigation();
    }, 100);
});
