// Initialize AOS
AOS.init();

// Loading Screen Timer
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        initParticles();
        startFloatingNotes();
        startFireworks();
    }, 3400);
});

// Music Player
let isPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '🎵';
        isPlaying = false;
    } else {
        bgMusic.play();
        musicBtn.textContent = '⏸️';
        isPlaying = true;
    }
});

// Scroll to Story
function scrollToStory() {
    const storySection = document.querySelector('.story-section');
    storySection.scrollIntoView({ behavior: 'smooth' });
}

// Particle System for Hero
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 200, 219, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        if (window.location.hash !== '' || document.getElementById('mainContent').classList.contains('hidden')) {
            requestAnimationFrame(animate);
        }
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Gallery Lightbox
function openLightbox(element) {
    const img = element.querySelector('img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');

    lightboxImage.src = img.src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// Blow Candles
function blowCandles() {
    const flames = document.querySelectorAll('.flame');
    
    // Trigger confetti
    triggerConfetti();

    // Extinguish flames
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.classList.add('extinguished');
        }, index * 100);
    });

    // Show wish text
    setTimeout(() => {
        document.getElementById('wishText').classList.remove('hidden');
    }, 400);
}

// Open Gift
function openGift() {
    const giftMessage = document.getElementById('giftMessage');
    giftMessage.classList.remove('hidden');
    triggerConfetti();
}

// Launch Lantern on Sky Section
function launchLantern() {
    const container = document.querySelector('.lanterns-container');
    const lantern = document.createElement('div');
    lantern.className = 'lantern';

    const randomX = Math.random() * 100;
    lantern.style.left = randomX + '%';
    lantern.style.bottom = '0';

    const loveMessages = [
        'Forever Yours ❤️',
        'With Love 💕',
        'Happy Birthday 🎂',
        'You are Amazing ✨',
        'I Love You 💖',
        'Stay Happy 😊',
        'Best Wishes 🌟'
    ];

    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    lantern.title = randomMessage;

    container.appendChild(lantern);

    setTimeout(() => {
        lantern.remove();
    }, 4000);
}

// Floating Notes
function startFloatingNotes() {
    const notesContainer = document.querySelector('.notes-container');
    const notes = [
        'You are amazing ❤️',
        'Stay happy forever ✨',
        'Happy Birthday Princess 👑',
        'Your smile lights up everything 🌹',
        'You deserve the best 💫',
        'Keep shining ⭐',
        'Forever beautiful 🦋',
        'My favorite person 💕'
    ];

    notes.forEach((noteText, index) => {
        setTimeout(() => {
            const note = document.createElement('div');
            note.className = 'note';
            note.textContent = noteText;

            const randomX = Math.random() * 100;
            const randomY = Math.random() * 400;
            const tx = (Math.random() - 0.5) * 200;
            const ty = (Math.random() - 0.5) * 200;

            note.style.left = randomX + '%';
            note.style.top = randomY + 'px';
            note.style.setProperty('--tx', tx + 'px');
            note.style.setProperty('--ty', ty + 'px');

            notesContainer.appendChild(note);

            setTimeout(() => {
                note.remove();
            }, 8000);
        }, index * 1000);
    });
}

// Open Letter
function openLetter() {
    const letterContent = document.getElementById('letterContent');
    letterContent.classList.remove('hidden');
    triggerConfetti();
}

// Confetti
function triggerConfetti() {
    const colors = ['#ff6b9d', '#ffc0db', '#b76e79', '#ff1493', '#ffb6c1'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '0px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';

        document.body.appendChild(confetti);

        const duration = 2 + Math.random() * 1;
        const randomX = (Math.random() - 0.5) * 200;

        gsap.to(confetti, {
            duration: duration,
            y: window.innerHeight + 100,
            x: randomX,
            opacity: 0,
            ease: 'power2.in',
            onComplete: () => {
                confetti.remove();
            }
        });
    }
}

// Fireworks
function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.particles = [];

            const colors = ['#ff6b9d', '#ffc0db', '#b76e79', '#ffff00', '#ff1493'];

            for (let i = 0; i < 30; i++) {
                const angle = (Math.PI * 2 * i) / 30;
                this.particles.push({
                    x: this.x,
                    y: this.y,
                    vx: Math.cos(angle) * (3 + Math.random() * 4),
                    vy: Math.sin(angle) * (3 + Math.random() * 4),
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 1
                });
            }
        }

        update() {
            this.particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.1; // Gravity
                p.life -= 0.02;
            });
        }

        draw() {
            this.particles.forEach(p => {
                if (p.life > 0) {
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.life;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            ctx.globalAlpha = 1;
        }

        isAlive() {
            return this.particles.some(p => p.life > 0);
        }
    }

    let fireworks = [];

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5;
        fireworks.push(new Firework(x, y));
    }

    // Create initial fireworks
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 300);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fireworks.forEach((fw, index) => {
            fw.update();
            fw.draw();

            if (!fw.isAlive()) {
                fireworks.splice(index, 1);
            }
        });

        if (fireworks.length > 0 || Date.now() % 1000 < 500) {
            requestAnimationFrame(animate);
        }
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Close letter when clicking outside
document.addEventListener('click', (e) => {
    const letterContent = document.getElementById('letterContent');
    if (letterContent && !letterContent.classList.contains('hidden')) {
        if (e.target === document.body || e.target.closest('.finale-section')) {
            letterContent.classList.add('hidden');
        }
    }
});

// Heart animation in hero
document.addEventListener('DOMContentLoaded', () => {
    // Add subtle heart particle effects
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => {
        heart.style.animation = 'pulse 1.5s ease-in-out infinite';
    });
});
