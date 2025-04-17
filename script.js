document.addEventListener('DOMContentLoaded', () => {
    // Set the launch date - 30 days from now
    const launchDate = new Date();

    // Initialize confetti effect for future use
    initConfetti();
    
    // Update countdown timer
    updateCountdown();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    
    // Handle form submission
    const form = document.getElementById('notify-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Add mousemove effect to the blobs
    document.addEventListener('mousemove', handleMouseMove);
});

// Function to update countdown timer
//function updateCountdown() {
    // Set the launch date - 30 days from now if not already set
    //const launchDate = new Date();
    //launchDate.setDate(launchDate.getDate() + 30);
    
    //const currentTime = new Date();
    //const diff = launchDate - currentTime;
    
    // Calculate days, hours, minutes, seconds
    //const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    //const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    //const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Update the HTML elements
    //document.getElementById('days').textContent = days.toString().padStart(2, '0');
    //document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    //document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    //document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // If the launch date has passed
    //if (diff <= 0) {
    //    clearInterval(updateCountdown);
    //    document.getElementById('days').textContent = '00';
    //    document.getElementById('hours').textContent = '00';
    //    document.getElementById('minutes').textContent = '00';
    //    document.getElementById('seconds').textContent = '00';
        
        // Trigger confetti
        //launchConfetti();
    //}
//}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (email) {
        // In a real app, you would send this to a server
        console.log(`Email submitted: ${email}`);
        
        // Show success message
        const form = e.target;
        form.innerHTML = '<p class="success-message">Thanks! We wont notify you when we launch! 🚀(its not yet implemented im sorry)</p>';
        
        // Add success message styling
        const successMessage = form.querySelector('.success-message');
        successMessage.style.fontSize = '1.2rem';
        successMessage.style.fontWeight = 'bold';
        successMessage.style.color = 'var(--secondary-color)';
        
        // Trigger a mini confetti celebration
        launchConfetti(50);
    }
}

// Handle mouse movement to make blobs interactive
function handleMouseMove(e) {
    const blobs = document.querySelectorAll('.blob');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    blobs.forEach((blob, index) => {
        const speed = 0.05;
        const offsetX = (mouseX - 0.5) * speed * (index + 1);
        const offsetY = (mouseY - 0.5) * speed * (index + 1);
        
        blob.style.transform = `translate(${offsetX * 30}px, ${offsetY * 30}px)`;
    });
}

// Confetti effect for celebrations
function initConfetti() {
    window.confetti = {
        particles: [],
        colors: ['#ff00aa', '#00ffdd', '#ff9100', '#ffffff'],
        
        create: function(count = 100) {
            const container = document.querySelector('.container');
            
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.classList.add('confetti-particle');
                
                const size = Math.random() * 10 + 5;
                const colorIndex = Math.floor(Math.random() * this.colors.length);
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.backgroundColor = this.colors[colorIndex];
                particle.style.position = 'absolute';
                particle.style.top = '-20px';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                particle.style.opacity = Math.random() + 0.5;
                
                // Set animation properties
                particle.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
                particle.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                container.appendChild(particle);
                this.particles.push(particle);
                
                // Remove particle after animation completes
                setTimeout(() => {
                    particle.remove();
                    this.particles.splice(this.particles.indexOf(particle), 1);
                }, 5000);
            }
        }
    };
    
    // Add CSS for confetti animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
            }
        }
        
        .confetti-particle {
            z-index: 20;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

// Function to launch confetti
function launchConfetti(count = 200) {
    if (window.confetti) {
        window.confetti.create(count);
    }
}

// Add funky rainbow cursor trail effect
(function createCursorTrail() {
    const style = document.createElement('style');
    style.textContent = `
        .cursor-trail {
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            mix-blend-mode: screen;
            animation: trailFade 1s ease-out forwards;
            opacity: 0.7;
        }
        
        @keyframes trailFade {
            0% { transform: scale(1); opacity: 0.7; }
            100% { transform: scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.addEventListener('mousemove', (e) => {
        // Create trail particle
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        
        // Set position to mouse position
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        
        // Get a random color from a funky palette
        const colors = ['#ff00aa', '#00ffdd', '#ff9100'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        trail.style.backgroundColor = randomColor;
        
        // Add to document
        document.body.appendChild(trail);
        
        // Remove after animation completes
        setTimeout(() => {
            trail.remove();
        }, 1000);
    });
})(); 