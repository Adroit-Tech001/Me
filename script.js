// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const backToTop = document.querySelector('.back-to-top');
const projectModal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const modalBody = document.getElementById('modalBody');
const projectLinks = document.querySelectorAll('.project-link');

// Project Data
const projectsData = {
    1: {
        title: "Space Defender",
        description: "A complete PyGame space shooter with advanced features including enemy AI, power-up system, and boss battles.",
        fullDescription: "Space Defender is a 2D space shooter built with Python and PyGame. The game features multiple enemy types with different behaviors, a power-up system that gives temporary abilities, and challenging boss battles at the end of each level. The project includes particle effects for explosions, smooth parallax scrolling background, and a scoring system with online leaderboard integration.",
        technologies: ["Python", "PyGame", "NumPy", "JSON"],
        features: [
            "5 different enemy types with unique AI",
            "3 types of power-ups (shield, rapid fire, spread shot)",
            "4 challenging boss battles",
            "Particle effects system",
            "Online leaderboard",
            "Configurable difficulty levels"
        ],
        image: "fas fa-space-shuttle",
        github: "https://github.com/username/space-defender",
        demo: "https://alexmorgan.itch.io/space-defender"
    },
    2: {
        title: "Dungeon Crawler",
        description: "3D dungeon exploration game with procedural generation and RPG elements.",
        fullDescription: "A Unity-based 3D dungeon crawler featuring procedurally generated levels, enemy AI with pathfinding, and a loot system with randomized items. The game includes character progression, skill trees, and combat mechanics with different weapon types. Built with C# using Unity's new Input System and Addressables for asset management.",
        technologies: ["C#", "Unity", "ProBuilder", "NavMesh"],
        features: [
            "Procedural dungeon generation",
            "Enemy AI with behavior trees",
            "Inventory and loot system",
            "Character progression with skills",
            "3 different weapon types",
            "Save system with cloud backup"
        ],
        image: "fas fa-dungeon",
        github: "https://github.com/username/dungeon-crawler",
        demo: "https://alexmorgan.itch.io/dungeon-crawler"
    },
    3: {
        title: "Puzzle Blocks",
        description: "Mobile puzzle game for Android with touch controls and social features.",
        fullDescription: "A mobile puzzle game developed for Android using Java and Android Studio. The game features 100+ hand-crafted levels, smooth touch controls, and integration with Google Play Services for achievements and leaderboards. Includes daily challenges, power-ups, and a hint system to help players through difficult puzzles.",
        technologies: ["Java", "Android Studio", "Google Play Services", "SQLite"],
        features: [
            "100+ handcrafted levels",
            "Daily challenges and events",
            "Google Play integration",
            "Offline gameplay support",
            "Hint system",
            "Multiple game modes"
        ],
        image: "fas fa-mobile-alt",
        github: "https://github.com/puzzle-blocks",
        demo: "https://play.google.com/store/apps/details?id=com.alex.puzzleblocks"
    },
    4: {
        title: "Chess Engine",
        description: "Python chess game with AI opponent and move analysis.",
        fullDescription: "A complete chess implementation in Python with a graphical interface using PyGame. Features include AI opponent using minimax algorithm with alpha-beta pruning, move validation, check/checkmate detection, and move history. The engine supports different difficulty levels and can analyze positions to suggest the best moves.",
        technologies: ["Python", "PyGame", "AI Algorithms"],
        features: [
            "Minimax AI with alpha-beta pruning",
            "Move validation and game rules",
            "Move history and undo/redo",
            "3 difficulty levels",
            "Position evaluation",
            "PGN import/export"
        ],
        image: "fas fa-chess-board",
        github: "https://github.com/username/python-chess",
        demo: "https://alexmorgan.itch.io/python-chess"
    }
};

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    // Animate skill bars on scroll
    animateSkillBars();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize project filtering
    initProjectFiltering();
    
    // Initialize form submission
    initContactForm();
    
    // Initialize modal functionality
    initModal();
    
    // Initialize scroll events
    initScrollEvents();
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Animate Skill Bars on Scroll
function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const level = skillLevel.getAttribute('data-level');
                skillLevel.style.width = `${level}%`;
            }
        });
    }, { threshold: 0.5 });
    
    skillLevels.forEach(skill => observer.observe(skill));
}

// Smooth Scrolling for Navigation Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Project Filtering
function initProjectFiltering() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form Submission
function initContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
        const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
        const message = formData.get('message') || contactForm.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add keyframes for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
}

// Modal Functionality
function initModal() {
    // Open modal when clicking project links
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = link.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    // Close modal when clicking close button
    modalClose.addEventListener('click', () => {
        closeModal();
    });
    
    // Close modal when clicking outside
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;
    
    modalBody.innerHTML = `
        <div class="modal-project">
            <div class="modal-header" style="margin-bottom: 30px;">
                <div class="modal-icon" style="font-size: 3rem; color: var(--primary); margin-bottom: 20px;">
                    <i class="${project.image}"></i>
                </div>
                <h2 style="font-size: 2.5rem; margin-bottom: 10px;">${project.title}</h2>
                <p style="color: var(--gray); font-size: 1.1rem;">${project.description}</p>
            </div>
            
            <div class="modal-section" style="margin-bottom: 30px;">
                <h3 style="font-size: 1.5rem; margin-bottom: 15px; color: var(--light);">Project Overview</h3>
                <p style="color: var(--gray); line-height: 1.8;">${project.fullDescription}</p>
            </div>
            
            <div class="modal-section" style="margin-bottom: 30px;">
                <h3 style="font-size: 1.5rem; margin-bottom: 15px; color: var(--light);">Key Features</h3>
                <ul style="color: var(--gray); padding-left: 20px;">
                    ${project.features.map(feature => `<li style="margin-bottom: 10px;">${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-section" style="margin-bottom: 30px;">
                <h3 style="font-size: 1.5rem; margin-bottom: 15px; color: var(--light);">Technologies Used</h3>
                <div class="modal-tags" style="display: flex; gap: 10px; flex-wrap: wrap;">
                    ${project.technologies.map(tech => `
                        <span style="background: rgba(108, 99, 255, 0.1); color: var(--primary); padding: 8px 15px; border-radius: 20px;">
                            ${tech}
                        </span>
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-links" style="display: flex; gap: 20px; margin-top: 40px;">
                <a href="${project.github}" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; background: var(--primary); color: white; padding: 12px 25px; border-radius: 30px; text-decoration: none; transition: var(--transition);">
                    <i class="fab fa-github"></i> View Code
                </a>
                <a href="${project.demo}" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; background: transparent; color: var(--primary); padding: 10px 25px; border-radius: 30px; text-decoration: none; border: 2px solid var(--primary); transition: var(--transition);">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        </div>
    `;
    
    // Add hover effects to links
    modalBody.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px)';
            link.style.boxShadow = '0 10px 20px rgba(108, 99, 255, 0.3)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
            link.style.boxShadow = 'none';
        });
    });
    
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Scroll Events
function initScrollEvents() {
    // Back to Top Button
    window.addEventListener('scroll', () => {
        // Show/hide back to top button
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
    
    // Back to Top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Update Active Navigation Link on Scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--primary) !important;
    }
    .nav-links a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Initialize animations on load
window.addEventListener('load', () => {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
});