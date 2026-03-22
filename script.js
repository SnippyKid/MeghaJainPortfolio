// =====================================================
// PORTFOLIO WEBSITE - MAIN JAVASCRIPT
// Author: Megha Jain
// =====================================================

// =====================================================
// GSAP & SCROLLTRIGGER SETUP
// =====================================================

gsap.registerPlugin(ScrollTrigger);

// =====================================================
// LOADING ANIMATION - SIMPLE
// =====================================================

window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const body = document.body;
    
    // Hide loading screen after 1.5 seconds
    setTimeout(() => {
        if (typeof gsap !== 'undefined') {
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 0.6,
                ease: 'power2.inOut',
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                    body.classList.remove('loading');
                    initHeroAnimations();
                }
            });
        } else {
            // Fallback if GSAP fails to load
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.6s ease';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                body.classList.remove('loading');
            }, 600);
        }
    }, 1500);
});

// Failsafe: Force hide loader after 5 seconds no matter what
setTimeout(() => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen && loadingScreen.style.display !== 'none') {
        loadingScreen.style.display = 'none';
        document.body.classList.remove('loading');
    }
}, 5000);

// Cursor removed for better UX

// =====================================================
// SCROLL PROGRESS BAR
// =====================================================

const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// =====================================================
// HERO SECTION ANIMATIONS
// =====================================================

function initHeroAnimations() {
    // Hero content animations
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    heroTimeline
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 1
        })
        .to('.hero-name', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.1
        }, '-=0.5')
        .to('.hero-tagline', {
            opacity: 1,
            y: 0,
            duration: 1
        }, '-=0.7')
        .to('.hero-cta', {
            opacity: 1,
            y: 0,
            duration: 1
        }, '-=0.5');
    
    // Animated letter splitting for hero name
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.innerHTML = '';
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            heroName.appendChild(span);
            
            gsap.to(span, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 1 + (i * 0.05),
                ease: 'power2.out'
            });
        });
    }
}

// Particle canvas disabled for minimal design
const canvas = document.getElementById('particles-canvas');
if (canvas) canvas.style.display = 'none';

// =====================================================
// SCROLL-TRIGGERED ANIMATIONS
// =====================================================

// About section animations
gsap.fromTo('.about-initials', 
    { opacity: 0 },
    {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            toggleActions: 'play none none none',
            once: true
        },
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
    }
);

gsap.fromTo('.about-text p', 
    {
        y: 30,
        opacity: 0
    },
    {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    }
);

// Decorative elements animation
gsap.fromTo('.decorative-element', 
    {
        scale: 0,
        opacity: 0
    },
    {
        scrollTrigger: {
            trigger: '.about-image-wrapper',
            start: 'top 70%',
            toggleActions: 'play none none none',
            once: true
        },
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out'
    }
);

// Skills section animations
gsap.fromTo('.skill-card', 
    { opacity: 0, y: 15 },
    {
        scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out'
    }
);

// Progress bar animations
const progressBars = document.querySelectorAll('.progress-bar');

progressBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    
    ScrollTrigger.create({
        trigger: bar,
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.to(bar, {
                width: progress + '%',
                duration: 1.5,
                ease: 'power2.out',
                delay: 0.2
            });
        }
    });
});

// Projects section animations
gsap.fromTo('.project-card', 
    {
        y: 50,
        opacity: 0,
        scale: 0.95
    },
    {
        scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
    }
);

// Timeline animations
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    gsap.fromTo(item, 
        {
            x: 0,
            opacity: 0
        },
        {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        }
    );
    
    // Dot animation
    const dot = item.querySelector('.timeline-dot');
    if (dot) {
        gsap.fromTo(dot, 
            {
                scale: 0
            },
            {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    once: true
                },
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            }
        );
    }
});

// Timeline line drawing animation
const timelineLine = document.querySelector('.timeline-line');
if (timelineLine) {
    ScrollTrigger.create({
        trigger: '.timeline',
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1,
        onUpdate: (self) => {
            const progress = self.progress;
            timelineLine.style.height = (progress * 100) + '%';
        }
    });
}

// Coffee section animations (only when section exists)
if (document.querySelector('.coffee-section')) {
    gsap.fromTo('.coffee-maker', 
        {
            scale: 0.9,
            opacity: 0,
            y: 50
        },
        {
            scrollTrigger: {
                trigger: '.coffee-section',
                start: 'top 70%',
                toggleActions: 'play none none none',
                once: true
            },
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out'
        }
    );

    gsap.fromTo('.coffee-cup', 
        {
            y: 100,
            opacity: 0,
            rotation: -15
        },
        {
            scrollTrigger: {
                trigger: '.coffee-section',
                start: 'top 65%',
                toggleActions: 'play none none none',
                once: true
            },
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 1.5,
            ease: 'power2.out',
            delay: 0.3
        }
    );

    gsap.fromTo('.ingredients-panel', 
        {
            x: 50,
            opacity: 0
        },
        {
            scrollTrigger: {
                trigger: '.coffee-section',
                start: 'top 70%',
                toggleActions: 'play none none none',
                once: true
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
        }
    );

    gsap.fromTo('.ingredient-btn', 
        {
            y: 30,
            opacity: 0
        },
        {
            scrollTrigger: {
                trigger: '.ingredients-panel',
                start: 'top 75%',
                toggleActions: 'play none none none',
                once: true
            },
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        }
    );
}

// Contact section animations
gsap.fromTo('.contact-email', 
    {
        scale: 0.9,
        opacity: 0
    },
    {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
            toggleActions: 'play none none none',
            once: true
        },
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }
);

gsap.fromTo('.social-link', 
    {
        y: 30,
        opacity: 0
    },
    {
        scrollTrigger: {
            trigger: '.social-links',
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    }
);

// Section headers animation - simplified
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.fromTo(header, 
        {
            y: 40,
            opacity: 0
        },
        {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none',
                markers: false,
                once: true
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        }
    );
});

// Magnetic button effect disabled for minimal design

// Smooth scroll already handled below

// =====================================================
// PARALLAX EFFECTS - SIMPLIFIED
// =====================================================

// Hero parallax - gentler effect
gsap.to('.hero-content', {
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 2
    },
    y: 100,
    opacity: 0.5,
    ease: 'none'
});

gsap.to('.floating-shapes .shape', {
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 2
    },
    y: -100,
    ease: 'none'
});

// =====================================================
// HOVER EFFECTS & INTERACTIONS
// =====================================================

// Skill cards 3D tilt effect
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// Project number animation on hover
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const number = card.querySelector('.project-number');
    
    card.addEventListener('mouseenter', () => {
        if (number) {
            gsap.to(number, {
                rotation: 10,
                scale: 1.1,
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (number) {
            gsap.to(number, {
                rotation: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    });
});

// Floating shapes handled in initHeroAnimations

// =====================================================
// EMAIL COPY TO CLIPBOARD
// =====================================================

const emailLink = document.querySelector('.contact-email');

if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailLink.textContent.trim();
        
        navigator.clipboard.writeText(email).then(() => {
            // Create temporary tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Email copied!';
            tooltip.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--color-accent);
                color: var(--color-white);
                padding: 1rem 2rem;
                border-radius: 10px;
                font-family: var(--font-accent);
                font-weight: 600;
                z-index: 10000;
                opacity: 0;
            `;
            document.body.appendChild(tooltip);
            
            gsap.to(tooltip, {
                opacity: 1,
                duration: 0.3,
                onComplete: () => {
                    gsap.to(tooltip, {
                        opacity: 0,
                        duration: 0.3,
                        delay: 2,
                        onComplete: () => tooltip.remove()
                    });
                }
            });
        });
    });
}

// =====================================================
// PERFORMANCE OPTIMIZATIONS
// =====================================================

// Debounce resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// =====================================================
// ACCESSIBILITY
// =====================================================

// Detect if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable or reduce animations
    gsap.globalTimeline.timeScale(0.01);
}

// Cursor removed

// =====================================================
// SCROLL TO TOP FUNCTIONALITY (Optional)
// =====================================================

// Add scroll to top button dynamically
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        gsap.to(scrollTopBtn, { opacity: 1, pointerEvents: 'auto', duration: 0.3 });
    } else {
        gsap.to(scrollTopBtn, { opacity: 0, pointerEvents: 'none', duration: 0.3 });
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Navigation removed

// Intersection Observer removed - using GSAP only for consistency

// =====================================================
// SMOOTH SCROLL BEHAVIOR
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =====================================================
// INTERACTIVE COFFEE EXPERIENCE
// =====================================================

if (document.querySelector('.coffee-section')) {
    const ingredientButtons = document.querySelectorAll('.ingredient-btn');
    const brewBtn = document.getElementById('brewBtn');
    const resetBtn = document.getElementById('resetBtn');
    const coffeeLiquid = document.querySelector('.coffee-liquid');
    const coffeeCup = document.querySelector('.coffee-cup');
    const steams = document.querySelectorAll('.steam');
    const statusText = document.querySelector('.status-text');
    const selectedList = document.querySelector('.selected-list');

    let selectedIngredients = [];

    function createSparkles() {
        const container = document.querySelector('.coffee-cup-container');
        if (!container) return;

        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #FFD700, transparent);
            border-radius: 50%;
            pointer-events: none;
            left: ${45 + Math.random() * 20}%;
            top: ${30 + Math.random() * 30}%;
            opacity: 0;
            filter: blur(1px);
        `;
            container.appendChild(sparkle);

            gsap.to(sparkle, {
                y: -50 - Math.random() * 50,
                x: (Math.random() - 0.5) * 100,
                opacity: 1,
                scale: Math.random() * 1.5 + 0.5,
                duration: 1 + Math.random(),
                delay: Math.random() * 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.to(sparkle, {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => sparkle.remove()
                    });
                }
            });
        }
    }

    ingredientButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const skill = btn.getAttribute('data-skill');

            if (btn.classList.contains('selected')) {
                btn.classList.remove('selected');
                selectedIngredients = selectedIngredients.filter(i => i !== skill);

                const skillTag = selectedList.querySelector(`[data-skill="${skill}"]`);
                if (skillTag) {
                    gsap.to(skillTag, {
                        scale: 0,
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => skillTag.remove()
                    });
                }
            } else {
                btn.classList.add('selected');
                selectedIngredients.push(skill);

                const skillTag = document.createElement('span');
                skillTag.className = 'selected-skill';
                skillTag.textContent = skill;
                skillTag.setAttribute('data-skill', skill);
                selectedList.appendChild(skillTag);

                gsap.timeline()
                    .to(btn, {
                        scale: 1.15,
                        duration: 0.2,
                        ease: 'power2.out'
                    })
                    .to(btn, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
            }

            brewBtn.disabled = selectedIngredients.length === 0;

            if (selectedIngredients.length === 0) {
                statusText.textContent = 'Select your ingredients to brew';
            } else if (selectedIngredients.length < 3) {
                statusText.textContent = `${selectedIngredients.length} ingredient${selectedIngredients.length > 1 ? 's' : ''} selected. Add more for a perfect blend!`;
            } else {
                statusText.textContent = `Perfect blend! Ready to brew your ${selectedIngredients.length}-skill coffee`;
            }
        });
    });

    brewBtn.addEventListener('click', () => {
        if (selectedIngredients.length === 0) return;

        brewBtn.disabled = true;
        ingredientButtons.forEach(b => b.style.pointerEvents = 'none');

        coffeeCup.classList.add('brewing');

        setTimeout(() => {
            coffeeLiquid.classList.add('filling');
            statusText.textContent = '☕ Brewing your perfect blend...';

            const colors = [
                'linear-gradient(180deg, #8B6F47, #6B5446, #5A4332)',
                'linear-gradient(180deg, #A0826D, #8B6F47, #6B5446)',
                'linear-gradient(180deg, #B8956B, #A0826D, #7D5E47)',
                'linear-gradient(180deg, #C19A6B, #B8956B, #8B6F47)',
                'linear-gradient(180deg, #D4A574, #C19A6B, #A67B5B)',
                'linear-gradient(180deg, #E8C9A1, #D4A574, #B88E5E)'
            ];
            const colorIndex = Math.min(selectedIngredients.length - 1, colors.length - 1);
            coffeeLiquid.style.background = colors[colorIndex];

            createSparkles();
        }, 500);

        setTimeout(() => {
            steams.forEach(steam => steam.classList.add('active'));
            statusText.textContent = `✨ Your ${selectedIngredients.join(' + ')} coffee is ready!`;
            coffeeCup.classList.remove('brewing');

            ingredientButtons.forEach(b => b.style.pointerEvents = 'auto');
        }, 2500);
    });

    resetBtn.addEventListener('click', () => {
        ingredientButtons.forEach(btn => btn.classList.remove('selected'));
        selectedIngredients = [];
        selectedList.innerHTML = '';

        coffeeLiquid.classList.remove('filling');
        steams.forEach(steam => steam.classList.remove('active'));
        coffeeCup.classList.remove('brewing');

        statusText.textContent = 'Select your ingredients to brew';
        brewBtn.disabled = true;

        document.querySelectorAll('.sparkle').forEach(s => s.remove());

        gsap.timeline()
            .to(coffeeCup, {
                rotation: 360,
                scale: 0.85,
                duration: 0.5,
                ease: 'power2.in',
                x: '-50%'
            })
            .to(coffeeCup, {
                scale: 1,
                duration: 0.4,
                ease: 'power2.out',
                x: '-50%'
            });
    });
}

// =====================================================
// CONSOLE MESSAGE
// =====================================================

console.log('%c✨ Megha Jain Portfolio ✨', 'background: linear-gradient(135deg, #C19A6B, #A67B5B); color: #FFFBF5; font-size: 18px; padding: 15px 30px; border-radius: 10px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');

// =====================================================
// END OF SCRIPT
// =====================================================
