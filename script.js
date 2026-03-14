/* ===================================
   PRAKALP 2026 - JavaScript
   Interactive Features & Form Validation
   =================================== */

// ===================================
// Click Spark Animation Class
// ===================================

/**
 * ClickSpark - Creates spark animations on click
 * Converted from React to vanilla JavaScript
 */
class ClickSpark {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            sparkColor: options.sparkColor || '#fff',
            sparkSize: options.sparkSize || 10,
            sparkRadius: options.sparkRadius || 15,
            sparkCount: options.sparkCount || 8,
            duration: options.duration || 400,
            easing: options.easing || 'ease-out',
            extraScale: options.extraScale || 1.0
        };

        this.canvas = null;
        this.ctx = null;
        this.sparks = [];
        this.animationId = null;
        this.resizeObserver = null;
        this.resizeTimeout = null;

        this.init();
    }

    init() {
        // Create wrapper and canvas
        this.wrapper = document.createElement('div');
        this.wrapper.style.cssText = `
            position: relative;
            width: 100%;
            height: 100%;
        `;

        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            width: 100%;
            height: 100%;
            display: block;
            user-select: none;
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
        `;

        this.ctx = this.canvas.getContext('2d');

        // Move element's children into wrapper
        while (this.element.firstChild) {
            this.wrapper.appendChild(this.element.firstChild);
        }

        // Add canvas and wrapper to element
        this.wrapper.appendChild(this.canvas);
        this.element.appendChild(this.wrapper);

        // Setup resize observer
        this.setupResizeObserver();

        // Initial resize
        this.resizeCanvas();

        // Bind click handler
        this.handleClick = this.handleClick.bind(this);
        this.element.addEventListener('click', this.handleClick);

        // Start animation loop
        this.startAnimation();
    }

    setupResizeObserver() {
        if (typeof ResizeObserver !== 'undefined') {
            this.resizeObserver = new ResizeObserver(() => {
                clearTimeout(this.resizeTimeout);
                this.resizeTimeout = setTimeout(() => this.resizeCanvas(), 100);
            });
            this.resizeObserver.observe(this.element);
        } else {
            // Fallback for browsers without ResizeObserver
            window.addEventListener('resize', () => {
                clearTimeout(this.resizeTimeout);
                this.resizeTimeout = setTimeout(() => this.resizeCanvas(), 100);
            });
        }
    }

    resizeCanvas() {
        const rect = this.element.getBoundingClientRect();
        if (this.canvas.width !== rect.width || this.canvas.height !== rect.height) {
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
        }
    }

    easeFunc(t) {
        switch (this.options.easing) {
            case 'linear':
                return t;
            case 'ease-in':
                return t * t;
            case 'ease-in-out':
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            case 'ease-out':
            default:
                return t * (2 - t);
        }
    }

    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const now = performance.now();
        const newSparks = Array.from({ length: this.options.sparkCount }, (_, i) => ({
            x,
            y,
            angle: (2 * Math.PI * i) / this.options.sparkCount,
            startTime: now
        }));

        this.sparks.push(...newSparks);
    }

    draw(timestamp) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.sparks = this.sparks.filter(spark => {
            const elapsed = timestamp - spark.startTime;
            if (elapsed >= this.options.duration) {
                return false;
            }

            const progress = elapsed / this.options.duration;
            const eased = this.easeFunc(progress);

            const distance = eased * this.options.sparkRadius * this.options.extraScale;
            const lineLength = this.options.sparkSize * (1 - eased);

            const x1 = spark.x + distance * Math.cos(spark.angle);
            const y1 = spark.y + distance * Math.sin(spark.angle);
            const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
            const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

            this.ctx.strokeStyle = this.options.sparkColor;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();

            return true;
        });

        this.animationId = requestAnimationFrame(timestamp => this.draw(timestamp));
    }

    startAnimation() {
        this.animationId = requestAnimationFrame(timestamp => this.draw(timestamp));
    }

    destroy() {
        // Cancel animation
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        // Remove event listeners
        this.element.removeEventListener('click', this.handleClick);

        // Disconnect resize observer
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }

        // Clear timeout
        clearTimeout(this.resizeTimeout);

        // Remove elements
        if (this.wrapper && this.wrapper.parentNode) {
            while (this.wrapper.firstChild) {
                if (this.wrapper.firstChild !== this.canvas) {
                    this.element.appendChild(this.wrapper.firstChild);
                } else {
                    this.wrapper.removeChild(this.canvas);
                }
            }
            this.element.removeChild(this.wrapper);
        }
    }
}

// ===================================
// Utility Functions
// ===================================

/**
 * Debounce function to limit rate of function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Smooth scroll to target element
 * @param {string} targetId - ID of target element
 */
function smoothScroll(targetId) {
    const element = document.querySelector(targetId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===================================
// Navigation Functionality
// ===================================

/**
 * Initialize navigation features
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

    // Add shadow on scroll
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 12px 28px rgba(6, 2, 15, 0.42)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }, 10));

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Only handle anchor links on same page
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScroll(href);
            }
        });
    });

    // Mobile menu toggle (basic implementation)
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            const navLinksContainer = document.querySelector('.nav-links');
            if (navLinksContainer) {
                navLinksContainer.classList.toggle('mobile-open');
            }
        });
    }
}

// ===================================
// Scroll Animations
// ===================================

/**
 * Initialize intersection observer for scroll animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with fade-in animation
    const animatedElements = document.querySelectorAll(
        '.about-card, .event-card, .benefit-item, .reward-card, .journey-stage'
    );

    animatedElements.forEach(element => {
        // Set initial state if not already set by CSS animation
        if (window.scrollY > element.offsetTop - window.innerHeight + 100) {
            return; // Skip if already in view
        }
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// ===================================
// Form Validation
// ===================================

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone validation regex (supports various formats)
 */
const PHONE_REGEX = /^[\d\s\-\+\(\)]{10,}$/;

/**
 * Validate a single form field
 * @param {HTMLElement} field - Input field to validate
 * @returns {boolean} Whether field is valid
 */
function validateField(field) {
    const fieldId = field.id;
    const fieldValue = field.value.trim();
    const errorElement = document.getElementById(`${fieldId}Error`);

    if (!errorElement) return true;

    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !fieldValue) {
        errorMessage = 'This field is required';
    }
    // Email validation
    else if (field.type === 'email' && fieldValue && !EMAIL_REGEX.test(fieldValue)) {
        errorMessage = 'Please enter a valid email address';
    }
    // Phone validation
    else if (field.type === 'tel' && fieldValue && !PHONE_REGEX.test(fieldValue)) {
        errorMessage = 'Please enter a valid phone number';
    }
    // Minimum length validation
    else if (field.hasAttribute('minlength')) {
        const minLength = parseInt(field.getAttribute('minlength'));
        if (fieldValue.length > 0 && fieldValue.length < minLength) {
            errorMessage = `Minimum ${minLength} characters required`;
        }
    }
    // Select validation
    else if (field.tagName === 'SELECT' && field.hasAttribute('required') && !fieldValue) {
        errorMessage = 'Please select an option';
    }

    // Update error display
    if (errorMessage) {
        errorElement.textContent = errorMessage;
        field.classList.add('error');
        return false;
    } else {
        errorElement.textContent = '';
        field.classList.remove('error');
        return true;
    }
}

/**
 * Validate checkbox group (track selection)
 * @returns {boolean} Whether at least one checkbox is selected
 */
function validateTrackSelection() {
    const checkboxes = document.querySelectorAll('input[name="tracks"]:checked');
    const errorElement = document.getElementById('tracksError');

    if (!errorElement) return true;

    if (checkboxes.length === 0) {
        errorElement.textContent = 'Please select at least one track';
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

/**
 * Validate terms checkbox
 * @returns {boolean} Whether terms are accepted
 */
function validateTerms() {
    const termsCheckbox = document.getElementById('terms');
    const errorElement = document.getElementById('termsError');

    if (!termsCheckbox || !errorElement) return true;

    if (!termsCheckbox.checked) {
        errorElement.textContent = 'You must agree to the terms and conditions';
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

/**
 * Initialize form validation and handling
 */
function initFormValidation() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    // Get form elements
    const formInputs = form.querySelectorAll('input:not([type="checkbox"]), select, textarea');
    const participationTypeSelect = document.getElementById('participationType');
    const teamNameGroup = document.getElementById('teamNameGroup');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const formMessage = document.getElementById('formMessage');

    // Real-time validation on blur
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        // Clear error on input
        input.addEventListener('input', () => {
            const errorElement = document.getElementById(`${input.id}Error`);
            if (errorElement && errorElement.textContent) {
                validateField(input);
            }
        });
    });

    // Show/hide team name field based on participation type
    if (participationTypeSelect && teamNameGroup) {
        participationTypeSelect.addEventListener('change', () => {
            const teamNameInput = document.getElementById('teamName');
            if (participationTypeSelect.value === 'team') {
                teamNameGroup.style.display = 'block';
                if (teamNameInput) {
                    teamNameInput.setAttribute('required', 'required');
                }
            } else {
                teamNameGroup.style.display = 'none';
                if (teamNameInput) {
                    teamNameInput.removeAttribute('required');
                    teamNameInput.value = '';
                    validateField(teamNameInput);
                }
            }
        });
    }

    // Track checkboxes validation
    const trackCheckboxes = document.querySelectorAll('input[name="tracks"]');
    trackCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkedCount = document.querySelectorAll('input[name="tracks"]:checked').length;
            if (checkedCount > 0) {
                validateTrackSelection();
            }
        });
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;

        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!validateTrackSelection()) {
            isValid = false;
        }

        if (!validateTerms()) {
            isValid = false;
        }

        // If form is valid, simulate submission
        if (isValid) {
            // Disable submit button to prevent double submission
            submitBtn.disabled = true;
            const originalButtonContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Submitting...</span>';

            try {
                // Simulate API call (replace with actual API endpoint)
                await simulateFormSubmission(new FormData(form));

                // Show success message
                formMessage.className = 'form-message success';
                formMessage.textContent = '🎉 Registration successful! Check your email for confirmation.';

                // Reset form after short delay
                setTimeout(() => {
                    form.reset();
                    formMessage.className = 'form-message';
                    formMessage.textContent = '';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalButtonContent;

                    // Hide team name field if shown
                    if (teamNameGroup) {
                        teamNameGroup.style.display = 'none';
                    }
                }, 3000);

            } catch (error) {
                // Show error message
                formMessage.className = 'form-message error';
                formMessage.textContent = '❌ Registration failed. Please try again later.';
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalButtonContent;

                // Log error for debugging
                console.error('Form submission error:', error);
            }
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }

            // Show validation error message
            formMessage.className = 'form-message error';
            formMessage.textContent = '⚠️ Please fix the errors above before submitting.';

            // Hide error message after 5 seconds
            setTimeout(() => {
                if (formMessage.classList.contains('error')) {
                    formMessage.className = 'form-message';
                    formMessage.textContent = '';
                }
            }, 5000);
        }
    });

    // Reset button functionality
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            form.reset();

            // Clear all error messages
            const errorElements = form.querySelectorAll('.form-error');
            errorElements.forEach(error => {
                error.textContent = '';
            });

            // Remove error classes
            const errorInputs = form.querySelectorAll('.error');
            errorInputs.forEach(input => {
                input.classList.remove('error');
            });

            // Hide team name field
            if (teamNameGroup) {
                teamNameGroup.style.display = 'none';
            }

            // Clear form message
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        });
    }
}

/**
 * Simulate form submission (replace with actual API call)
 * @param {FormData} formData - Form data to submit
 * @returns {Promise} Promise that resolves after simulated delay
 */
function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        // Log form data for debugging
        console.log('Form Data:');
        for (let [key, value] of formData.entries()) {
            if (key === 'tracks') {
                // Handle multiple checkboxes
                const tracks = formData.getAll('tracks');
                console.log('  Tracks:', tracks.join(', '));
            } else {
                console.log(`  ${key}:`, value);
            }
        }

        // Simulate network delay
        setTimeout(() => {
            // Simulate 95% success rate
            if (Math.random() < 0.95) {
                resolve({ success: true, message: 'Registration successful' });
            } else {
                reject(new Error('Network error'));
            }
        }, 1500);
    });
}

// ===================================
// Performance Optimization
// ===================================

/**
 * Lazy load images when they come into viewport
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// ===================================
// Analytics & Tracking (Optional)
// ===================================

/**
 * Track user interactions for analytics
 * @param {string} eventName - Name of the event to track
 * @param {object} eventData - Additional data to track
 */
function trackEvent(eventName, eventData = {}) {
    // Replace with your analytics service (Google Analytics, Mixpanel, etc.)
    console.log('Event tracked:', eventName, eventData);

    // Example: Google Analytics 4
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

/**
 * Initialize event tracking
 */
function initEventTracking() {
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn-primary[href*="register"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('register_click', {
                button_location: button.closest('section')?.id || 'unknown'
            });
        });
    });

    // Track navigation clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('nav_click', {
                link_text: link.textContent.trim(),
                link_href: link.getAttribute('href')
            });
        });
    });
}

// ===================================
// Error Handling
// ===================================

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // You can send errors to a logging service here
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // You can send errors to a logging service here
});

// ===================================
// Click Spark Initialization
// ===================================

/**
 * Initialize click spark animations on interactive elements
 */
function initClickSparks() {
    // Add spark effect to primary buttons
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        new ClickSpark(button, {
            sparkColor: '#ffffff',
            sparkSize: 12,
            sparkRadius: 20,
            sparkCount: 10,
            duration: 500,
            easing: 'ease-out',
            extraScale: 1.2
        });
    });

    // Add spark effect to secondary buttons
    const secondaryButtons = document.querySelectorAll('.btn-secondary');
    secondaryButtons.forEach(button => {
        new ClickSpark(button, {
            sparkColor: '#6495ed',
            sparkSize: 10,
            sparkRadius: 18,
            sparkCount: 8,
            duration: 450,
            easing: 'ease-out'
        });
    });

    // Add subtle spark effect to cards (optional)
    const cards = document.querySelectorAll('.about-card, .event-card, .reward-card');
    cards.forEach(card => {
        new ClickSpark(card, {
            sparkColor: '#e6e6fa',
            sparkSize: 8,
            sparkRadius: 15,
            sparkCount: 6,
            duration: 400,
            easing: 'ease-out',
            extraScale: 0.8
        });
    });

    // Add spark effect to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        new ClickSpark(logo, {
            sparkColor: '#6495ed',
            sparkSize: 10,
            sparkRadius: 25,
            sparkCount: 12,
            duration: 600,
            easing: 'ease-out',
            extraScale: 1.5
        });
    }
}

// ===================================
// 3D Scene with Three.js
// ===================================

/**
 * Initialize 3D background scene
 */
function init3DScene() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.015,
        color: 0x6495ed,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create floating geometric shapes
    const shapes = [];
    const geometries = [
        new THREE.OctahedronGeometry(0.3),
        new THREE.TetrahedronGeometry(0.3),
        new THREE.IcosahedronGeometry(0.3),
        new THREE.TorusGeometry(0.3, 0.1, 16, 100)
    ];
    
    for(let i = 0; i < 15; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshPhongMaterial({
            color: Math.random() > 0.5 ? 0x4b0082 : 0x6495ed,
            transparent: true,
            opacity: 0.6,
            wireframe: Math.random() > 0.5
        });
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 10;
        mesh.position.y = (Math.random() - 0.5) * 10;
        mesh.position.z = (Math.random() - 0.5) * 10;
        
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            },
            floatSpeed: Math.random() * 0.002 + 0.001,
            floatOffset: Math.random() * Math.PI * 2
        };
        
        shapes.push(mesh);
        scene.add(mesh);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x6495ed, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x4b0082, 1.5, 50);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        // Rotate particles
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;
        
        // Animate shapes
        shapes.forEach((shape, index) => {
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;
            
            shape.position.y += Math.sin(time + shape.userData.floatOffset) * shape.userData.floatSpeed;
        });
        
        // Camera follows mouse
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ===================================
// GSAP Scroll Animations
// ===================================

/**
 * Initialize GSAP scroll-triggered animations
 */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);

    // Animate cards with stagger
    gsap.utils.toArray('.about-card, .event-card, .benefit-item, .reward-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 60,
            opacity: 0,
            scale: 0.9,
            rotationX: -15,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.1
        });
    });

    // Parallax effect on sections
    gsap.utils.toArray('.section').forEach(section => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -50,
            ease: 'none'
        });
    });

    // Journey stages with special animation
    gsap.utils.toArray('.journey-stage').forEach((stage, i) => {
        gsap.from(stage, {
            scrollTrigger: {
                trigger: stage.parentElement,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 80,
            opacity: 0,
            scale: 0.8,
            duration: 0.7,
            ease: 'back.out(1.4)',
            delay: i * 0.15
        });
    });

    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach(stat => {
        const target = stat.textContent;
        const isNumber = /^\d+/.test(target);
        
        if (isNumber) {
            const num = parseInt(target);
            gsap.from(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                textContent: 0,
                duration: 2,
                ease: 'power1.out',
                snap: { textContent: 1 },
                onUpdate: function() {
                    stat.textContent = Math.ceil(this.targets()[0].textContent) + '+';
                }
            });
        }
    });
}

// ===================================
// 3D Card Tilt Effect
// ===================================

/**
 * Add 3D tilt effect to cards on mouse move
 */
function init3DCardTilt() {
    const cards = document.querySelectorAll('.about-card, .event-card, .benefit-item, .reward-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ===================================
// Interactive Cursor
// ===================================

/**
 * Create custom interactive cursor
 */
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(cursor);
    
    const dot = cursor.querySelector('.cursor-dot');
    const ring = cursor.querySelector('.cursor-ring');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        ring.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .event-card, .about-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
}

// ===================================
// Initialization
// ===================================

/**
 * Initialize all features when DOM is ready
 */
function init() {
    console.log('PRAKALP 2026 - Sankraman (3D Enhanced) initialized');

    // Initialize navigation
    initNavigation();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize 3D scene (only on home page)
    if (document.getElementById('hero-3d-canvas')) {
        init3DScene();
    }

    // Initialize GSAP animations
    initGSAPAnimations();

    // Initialize 3D card tilt
    init3DCardTilt();

    // Initialize custom cursor (desktop only)
    if (window.innerWidth > 768) {
        initCustomCursor();
    }

    // Initialize form validation (only if form exists)
    if (document.getElementById('registrationForm')) {
        initFormValidation();
    }

    // Initialize lazy loading
    initLazyLoading();

    // Initialize event tracking
    initEventTracking();

    // Initialize click spark animations
    initClickSparks();

    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM is already ready
    init();
}

// ===================================
// Export functions for external use (if needed)
// ===================================
window.PRAKALP = {
    smoothScroll,
    trackEvent,
    validateField,
    version: '2.0.0-3D'
};
