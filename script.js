// ===========================
// CUSTOMER REVIEWS CAROUSEL AUTOPLAY LOOP
// ===========================
const reviewsCarousel = document.getElementById('reviewsCarousel');
if (reviewsCarousel) {
    let scrollAmount = 0;
    const speed = 1.1; // px per frame
    const interval = 16; // ms per frame (about 60fps)
    let animationId;

    // Duplicate cards for seamless infinite loop
    const cards = Array.from(reviewsCarousel.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        reviewsCarousel.appendChild(clone);
    });

    function animateCarousel() {
        scrollAmount += speed;
        if (scrollAmount >= reviewsCarousel.scrollWidth / 2) {
            scrollAmount = 0;
        }
        reviewsCarousel.scrollLeft = scrollAmount;
        animationId = requestAnimationFrame(animateCarousel);
    }

    // Prevent user scroll (lock to autoplay)
    reviewsCarousel.addEventListener('wheel', e => e.preventDefault(), { passive: false });
    reviewsCarousel.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

    animateCarousel();
}
// ===========================
// MANUFACTURING PROCESS TABS FUNCTIONALITY
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.process-tab');
    const contents = document.querySelectorAll('.process-content');
    if (tabs.length && contents.length) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                // Remove active from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                // Add active to clicked tab and corresponding content
                this.classList.add('active');
                const idx = this.getAttribute('data-tab');
                const content = document.querySelector('.process-content[data-content="' + idx + '"]');
                if (content) content.classList.add('active');
            });
        });
    }

    // Process image carousels for each tab
    document.querySelectorAll('.process-carousel').forEach(function(carousel) {
        const images = carousel.querySelectorAll('.process-step-image');
        const prevBtn = carousel.querySelector('.process-carousel-btn.prev');
        const nextBtn = carousel.querySelector('.process-carousel-btn.next');
        let current = 0;
        function showImage(idx) {
            images.forEach((img, i) => {
                img.classList.toggle('active', i === idx);
            });
        }
        if (prevBtn && nextBtn && images.length > 1) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                current = (current - 1 + images.length) % images.length;
                showImage(current);
            });
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                current = (current + 1) % images.length;
                showImage(current);
            });
        }
        // Show first image by default
        showImage(current);
    });

    // ===========================
    // MOBILE PROCESS STEP NAVIGATION (Below 950px)
    // ===========================
    const processNavPrev = document.getElementById('processNavPrev');
    const processNavNext = document.getElementById('processNavNext');
    const processStepBadge = document.getElementById('processStepBadge');
    const processContents = document.querySelectorAll('.process-content');
    
    if (processNavPrev && processNavNext && processContents.length) {
        const stepNames = [
            'Raw Material',
            'Extrusion',
            'Cooling',
            'Sizing',
            'Quality Control',
            'Marking',
            'Cutting',
            'Packaging'
        ];
        
        let currentStep = 0;
        
        function updateMobileStep(step) {
            // Hide all contents
            processContents.forEach(content => content.classList.remove('active'));
            
            // Show only current step content
            const currentContent = document.querySelector('.process-content[data-content="' + step + '"]');
            if (currentContent) {
                currentContent.classList.add('active');
            }
            
            // Update step badge
            if (processStepBadge) {
                processStepBadge.textContent = 'Step ' + (step + 1) + '/8: ' + stepNames[step];
            }
            
            // Update button states
            if (step === 0) {
                processNavPrev.classList.add('disabled');
            } else {
                processNavPrev.classList.remove('disabled');
            }
            
            if (step === stepNames.length - 1) {
                processNavNext.classList.add('disabled');
            } else {
                processNavNext.classList.remove('disabled');
            }
            
            currentStep = step;
        }
        
        processNavPrev.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentStep > 0) {
                updateMobileStep(currentStep - 1);
            }
        });
        
        processNavNext.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentStep < stepNames.length - 1) {
                updateMobileStep(currentStep + 1);
            }
        });
        
        // Initialize with first step
        updateMobileStep(0);
    }
});
// APPLICATIONS CAROUSEL FUNCTIONALITY
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    const appsCarousel = document.getElementById('applicationsCarousel');
    const appsPrevBtn = document.getElementById('appsPrevBtn');
    const appsNextBtn = document.getElementById('appsNextBtn');
    if (appsCarousel && appsPrevBtn && appsNextBtn) {
        const getCard = () => appsCarousel.querySelector('.application-card');
        const getCards = () => Array.from(appsCarousel.querySelectorAll('.application-card'));
        let scrollAmount = getCard() ? getCard().offsetWidth + 16 : 420 + 16;

        function scrollToStart() {
            appsCarousel.scrollTo({ left: 0, behavior: 'smooth' });
        }
        function scrollToEnd() {
            const cards = getCards();
            if (cards.length > 0) {
                const lastCard = cards[cards.length - 1];
                appsCarousel.scrollTo({ left: lastCard.offsetLeft, behavior: 'smooth' });
            }
        }

        appsPrevBtn.addEventListener('click', function () {
            if (appsCarousel.scrollLeft <= 0) {
                // Loop to end
                scrollToEnd();
            } else {
                appsCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });
        appsNextBtn.addEventListener('click', function () {
            const maxScroll = appsCarousel.scrollWidth - appsCarousel.clientWidth - 2; // fudge for rounding
            if (appsCarousel.scrollLeft >= maxScroll) {
                // Loop to start
                scrollToStart();
            } else {
                appsCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
        // Responsive: recalculate scrollAmount on resize
        window.addEventListener('resize', function () {
            scrollAmount = getCard() ? getCard().offsetWidth + 16 : 420 + 16;
        });
    }
});
// ===========================
// FAQ ACCORDION FUNCTIONALITY (with smooth transition)
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (question && answer) {
            // Set initial max-height for open item
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
            } else {
                answer.style.maxHeight = '0px';
                answer.style.opacity = '0';
            }
            question.addEventListener('click', function () {
                // Close all others
                faqItems.forEach(i => {
                    if (i !== item) {
                        i.classList.remove('active');
                        const a = i.querySelector('.faq-answer');
                        if (a) {
                            a.style.maxHeight = '0px';
                            a.style.opacity = '0';
                        }
                    }
                });
                // Toggle current
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0px';
                    answer.style.opacity = '0';
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                }
            });
        }
    });
});
// ===========================
// BRAND LOGOS DATA
// ===========================

const brandLogos = [
    { id: 'euroflex-1', imgSrc: 'Images/company_icon.svg', alt: 'EUROFLEX' },
    { id: 'euroflex-2', imgSrc: 'Images/company_icon.svg', alt: 'EUROFLEX' },
    { id: 'euroflex-3', imgSrc: 'Images/company_icon.svg', alt: 'EUROFLEX' },
    { id: 'euroflex-4', imgSrc: 'Images/company_icon.svg', alt: 'EUROFLEX' },
    { id: 'euroflex-5', imgSrc: 'Images/company_icon.svg', alt: 'EUROFLEX' },
    { id: 'euroflex-6', imgSrc: 'Images/company_icon.svg', alt: 'EUROFLEX' }
];

// ===========================
// IMAGE CAROUSEL FUNCTIONALITY
// ===========================

const images = [
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
    'https://plus.unsplash.com/premium_photo-1661577094877-725f859aff3e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1682145624824-e5d53a5a9cf3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1661373709869-dc361f34cf05?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1661373709869-dc361f34cf05?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1542274368-443d694d79aa?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

let currentImageIndex = 0;

// DOM Elements
const mainImage = document.getElementById('mainImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImageContainer = document.querySelector('.main-image-container');
const zoomOverlay = document.getElementById('zoomOverlay');

// Initialize carousel
function initCarousel() {
    prevBtn.addEventListener('click', previousImage);
    nextBtn.addEventListener('click', nextImage);
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => goToImage(index));
    });
    mainImageContainer.addEventListener('mousemove', handleZoom);
    mainImageContainer.addEventListener('mouseleave', resetZoom);
}

// Navigate to previous image
function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateCarousel();
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateCarousel();
}

// Go to specific image
function goToImage(index) {
    currentImageIndex = index;
    updateCarousel();
}

// Update carousel display
function updateCarousel() {
    // Update main image with fade transition
    mainImage.style.opacity = '0';
    
    setTimeout(() => {
        mainImage.src = images[currentImageIndex];
        mainImage.style.opacity = '1';
    }, 100);

    // Update thumbnails
    thumbnails.forEach((thumbnail, index) => {
        if (index === currentImageIndex) {
            thumbnail.classList.add('active');
        } else {
            thumbnail.classList.remove('active');
        }
    });
}

// Zoom functionality on hover
function handleZoom(e) {
    const rect = mainImageContainer.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Set CSS variables for zoom effect
    zoomOverlay.style.setProperty('--zoom-x', `${x}%`);
    zoomOverlay.style.setProperty('--zoom-y', `${y}%`);
}

// Reset zoom when mouse leaves
function resetZoom() {
    zoomOverlay.style.setProperty('--zoom-x', '50%');
    zoomOverlay.style.setProperty('--zoom-y', '50%');
}

// Add smooth fade transition to main image
mainImage.style.transition = 'opacity 0.3s ease-in-out';

// ===========================
// STICKY HEADER FUNCTIONALITY
// ===========================

const stickyHeader = document.getElementById('stickyHeader');
const navbar = document.querySelector('.navbar');
const navbarHeight = navbar.offsetHeight;

let lastScrollTop = 0;
let isScrollingDown = false;
let scrollTriggerPoint = 0; // Will be set after page loads

// Set scroll trigger point (beyond first fold)
function calculateScrollTriggerPoint() {
    // Trigger when scrolled past navbar + breadcrumb + some product content
    const viewportHeight = window.innerHeight;
    scrollTriggerPoint = viewportHeight; // Show header after scrolling past first viewport
}

// Handle scroll event
function handleScroll() {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    // Determine scroll direction
    if (currentScroll > lastScrollTop) {
        isScrollingDown = true;
    } else {
        isScrollingDown = false;
    }

    // Show/hide sticky header
    if (currentScroll > scrollTriggerPoint && isScrollingDown) {
        stickyHeader.classList.add('active');
    } else if (currentScroll < scrollTriggerPoint || !isScrollingDown) {
        stickyHeader.classList.remove('active');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
}

// Optimize scroll event with throttling
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Initialize on page load
window.addEventListener('load', () => {
    calculateScrollTriggerPoint();
});

// Recalculate on resize
window.addEventListener('resize', () => {
    calculateScrollTriggerPoint();
});

// ===========================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for internal links
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            // Calculate offset to account for sticky header
            const headerHeight = stickyHeader.classList.contains('active') ? 60 : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// KEYBOARD NAVIGATION FOR CAROUSEL
// ===========================

document.addEventListener('keydown', (e) => {
    if (document.activeElement === document.body) {
        if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    }
});

// ===========================
// TOUCH SUPPORT FOR CAROUSEL (MOBILE)
// ===========================

let touchStartX = 0;
let touchEndX = 0;

mainImageContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

mainImageContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    // Swipe left - show next image
    if (touchStartX - touchEndX > 50) {
        nextImage();
    }
    // Swipe right - show previous image
    else if (touchEndX - touchStartX > 50) {
        previousImage();
    }
}

// ===========================
// LAZY LOADING IMAGES
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// ACCESSIBILITY ENHANCEMENTS
// ===========================

// Add focus styles for keyboard navigation
const focusableElements = document.querySelectorAll(
    'a, button, input, [tabindex]:not([tabindex="-1"])'
);

focusableElements.forEach(element => {
    element.addEventListener('focus', function () {
        this.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', function () {
        this.style.outlineOffset = '0';
    });
});

// ===========================
// ANIMATION ON SCROLL
// ===========================

// Animate elements when they come into view
if ('IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe product info elements
    document.querySelectorAll('.product-info > div').forEach(el => {
        animationObserver.observe(el);
    });
}

// ===========================
// BRAND LOGOS RENDERING
// ===========================

/**
 * Renders brand logos dynamically from JSON data
 * Easy to add/remove logos by modifying the brandLogos array
 */
function renderBrandLogos() {
    const brandLogosContainer = document.getElementById('brandLogosContainer');
    
    if (!brandLogosContainer) {
        console.warn('Brand logos container not found');
        return;
    }
    
    // Clear existing content
    brandLogosContainer.innerHTML = '';
    
    // Create and append only the first 3 logo elements from JSON data
    brandLogos.slice(0, 3).forEach((brand, index) => {
        const logoElement = document.createElement('div');
        logoElement.className = 'brand-logo';
        logoElement.id = brand.id;
        // Create image element
        const imgElement = document.createElement('img');
        imgElement.src = brand.imgSrc;
        imgElement.alt = brand.alt;
        logoElement.appendChild(imgElement);
        logoElement.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s forwards`;
        logoElement.style.opacity = '0';
        brandLogosContainer.appendChild(logoElement);
    });
}

// ===========================
// INITIALIZATION
// ===========================

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    calculateScrollTriggerPoint();
    updateCarousel(); // Ensure first image has correct thumbnail
    renderBrandLogos(); // Render brand logos from JSON data
});