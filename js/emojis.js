// ====================
// Emoji al hacer clic
// ====================
document.addEventListener('click', function(e) {
    const emoji = document.createElement('div');
    emoji.innerHTML = '🔥'; // Cambia aquí por cualquier emoji ⚡❤️⏰💥🔥
    emoji.className = 'click-emoji';
    emoji.style.left = `${e.clientX}px`;
    emoji.style.top = `${e.clientY}px`;
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 2000);
});

// ===========================
// Emoji flotante de fondo
// ===========================
function createFloatingEmoji() {
    const emoji = document.createElement('div');
    emoji.className = 'floating-emoji';
    emoji.innerHTML = '👻 // Cambia aquí por el emoji que desees
    emoji.style.left = Math.random() * window.innerWidth + 'px';
    emoji.style.animationDuration = (Math.random() * 3 + 3) + 's';
    emoji.style.animationDelay = Math.random() * 2 + 's';
    document.getElementById('floating-emojis').appendChild(emoji);
    setTimeout(() => emoji.remove(), 6000);
}

// Ejecuta uno cada 2 segundos
setInterval(createFloatingEmoji, 2000);
