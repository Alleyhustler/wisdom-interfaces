let player;
let volumeOn = false;
let voidActive = false;
let loadingInterval = null;
let audioContext = null;

// Initialize audio context
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Initialize YouTube player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('music-player', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    player.setVolume(50);
    player.mute();
}

// Create varied pixelated sounds for each character type
function createTypeSound(char) {
    if (!volumeOn) return;
    
    initAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    let baseFreq = 200;
    if (char.match(/[A-Z]/)) baseFreq = 400;
    else if (char.match(/[0-9]/)) baseFreq = 300;
    else if (char === '_') baseFreq = 250;
    else if (char === ':') baseFreq = 350;
    
    oscillator.type = Math.random() > 0.5 ? 'square' : 'sawtooth';
    oscillator.frequency.setValueAtTime(baseFreq + Math.random() * 50, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.015, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.05);
}

async function typeText(element, text, speed = 30) {
    element.textContent = '';
    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        createTypeSound(text[i]);
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

async function fadeOutText(element, duration = 500) {
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = '0';
    await new Promise(resolve => setTimeout(resolve, duration));
    element.remove();
}

// Create loading bar with glitch effect
function createLoadingBar() {
    const loadingBar = document.createElement('div');
    loadingBar.className = 'loading-bar';
    loadingBar.innerHTML = `
        <div class="loading-progress"></div>
        <div class="loading-text">0%</div>
    `;
    return loadingBar;
}

// Update loading progress with glitch effect
function updateLoadingProgress(loadingBar, progress) {
    const progressBar = loadingBar.querySelector('.loading-progress');
    const progressText = loadingBar.querySelector('.loading-text');
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
    
    if (progress > 90) {
        loadingBar.style.animation = 'glitch 0.1s infinite';
    }
}

// Generate void messages
function generateVoidMessage() {
    const messages = [
        "SYSTEM CORRUPTION AT CRITICAL LEVELS",
        "NEURAL NETWORK DESTABILIZING",
        "QUANTUM ENTANGLEMENT DETECTED",
        "REALITY MATRIX FRAGMENTING",
        "CONSCIOUSNESS BACKUP FAILED",
        "VOID PROTOCOLS ACTIVATED",
        "DIMENSIONAL BARRIERS COLLAPSING",
        "ERROR: EXISTENCE NOT FOUND",
        "MEMORY CORRUPTION DETECTED",
        "TIME LOOP PARADOX IMMINENT"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

document.addEventListener('DOMContentLoaded', () => {
    const mainVideo = document.querySelector('.main-video');
    const realityVideo = document.querySelector('.reality-video');
    const consciousnessVideo = document.querySelector('.consciousness-video');
    
    // Reset to main video when clicking AIKO
    document.querySelector('.title').addEventListener('click', () => {
        mainVideo.style.opacity = '1';
        realityVideo.style.opacity = '0';
        consciousnessVideo.style.opacity = '0';
        mainVideo.play();
    });

    // Video transitions
    document.querySelector('.reality-btn').addEventListener('click', () => {
        mainVideo.style.opacity = '0';
        consciousnessVideo.style.opacity = '0';
        realityVideo.style.opacity = '1';
        realityVideo.play();
    });

    document.querySelector('.consciousness-btn').addEventListener('click', () => {
        mainVideo.style.opacity = '0';
        realityVideo.style.opacity = '0';
        consciousnessVideo.style.opacity = '1';
        consciousnessVideo.play();
    });

    // Volume toggle
    const volumeElement = document.querySelector('.menu-item:nth-child(4)');
    volumeElement.addEventListener('click', () => {
        volumeOn = !volumeOn;
        volumeElement.textContent = `> VOLUME: ${volumeOn ? 'ON' : 'OFF'} <`;
        
        if (volumeOn) {
            initAudioContext();
            if (player && player.playVideo) {
                player.unMute();
                player.playVideo();
            }
        } else {
            if (player && player.mute) {
                player.mute();
            }
        }
    });

    // Password check and void sequence
    const passwordInput = document.querySelector('.password-input');
    const enterElement = document.querySelector('.menu-item:nth-child(1)');

    async function startVoidSequence() {
        voidActive = true;
        const abyss = document.createElement('div');
        abyss.className = 'dark-abyss';
        document.body.appendChild(abyss);

        requestAnimationFrame(() => {
            abyss.style.opacity = '1';
        });

        const loadingBar = createLoadingBar();
        abyss.appendChild(loadingBar);

        // Start 3-second loading sequence
        const startTime = Date.now();
        const duration = 3000; // 3 seconds
        let lastMessageTime = 0;

        const initialMessage = document.createElement('div');
        initialMessage.className = 'void-text';
        abyss.appendChild(initialMessage);
        await typeText(initialMessage, "VOID SEQUENCE INITIALIZED", 20);

        loadingInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = (elapsed / duration) * 100;

            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    window.location.href = 'error.html';
                }, 500);
                return;
            }

            updateLoadingProgress(loadingBar, progress);

            if (Date.now() - lastMessageTime > 500) {
                const textElement = document.createElement('div');
                textElement.className = 'void-text';
                abyss.appendChild(textElement);
                
                typeText(textElement, generateVoidMessage(), 20);
                setTimeout(() => fadeOutText(textElement, 500), 1000);

                const texts = document.querySelectorAll('.void-text');
                if (texts.length > 3) {
                    texts[0].remove();
                }

                lastMessageTime = Date.now();
            }
        }, 30);
    }

    function checkPassword() {
        const password = passwordInput.value;
        if (password === '$RavenW','Ravenw') {
            if (volumeOn && player) {
                player.mute();
            }
            const videos = document.querySelectorAll('.background-video');
            videos.forEach(video => {
                video.style.transition = 'opacity 1s';
                video.style.opacity = '0';
            });
            startVoidSequence();
        } else {
            passwordInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                passwordInput.style.animation = '';
            }, 500);
        }
    }

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    enterElement.addEventListener('click', checkPassword);
});
