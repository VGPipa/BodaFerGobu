const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load images
const backgroundImg = new Image();
backgroundImg.src = 'forest-background.jpg';

const fernandaImg = new Image();
fernandaImg.src = 'fernanda.png';

const juanDiegoImg = new Image();
juanDiegoImg.src = 'juan-diego.png';

// Character positions and sizes
const fernanda = {
    x: 50,
    y: 250,
    width: 100,
    height: 200,
    speed: 5
};

const juanDiego = {
    x: 700,
    y: 250,
    width: 100,
    height: 200
};

let gameOver = false;

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    if (gameOver) return;

    switch (event.key) {
        case 'ArrowUp':
            fernanda.y -= fernanda.speed;
            break;
        case 'ArrowDown':
            fernanda.y += fernanda.speed;
            break;
        case 'ArrowLeft':
            fernanda.x -= fernanda.speed;
            break;
        case 'ArrowRight':
            fernanda.x += fernanda.speed;
            break;
    }
});

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

    // Draw characters
    ctx.drawImage(fernandaImg, fernanda.x, fernanda.y, fernanda.width, fernanda.height);
    ctx.drawImage(juanDiegoImg, juanDiego.x, juanDiego.y, juanDiego.width, juanDiego.height);

    // Check if they meet
    if (fernanda.x < juanDiego.x + juanDiego.width &&
        fernanda.x + fernanda.width > juanDiego.x &&
        fernanda.y < juanDiego.y + juanDiego.height &&
        fernanda.y + fernanda.height > juanDiego.y) {
        gameOver = true;
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('Congratulations!', canvas.width / 2 - 100, canvas.height / 2);
    }

    // Keep Fernanda on screen
    if (fernanda.x < 0) fernanda.x = 0;
    if (fernanda.x > canvas.width - fernanda.width) fernanda.x = canvas.width - fernanda.width;
    if (fernanda.y < 0) fernanda.y = 0;
    if (fernanda.y > canvas.height - fernanda.height) fernanda.y = canvas.height - fernanda.height;

    if (!gameOver) requestAnimationFrame(gameLoop);
}

// Start game after images load
Promise.all([new Promise(resolve => backgroundImg.onload = resolve),
             new Promise(resolve => fernandaImg.onload = resolve),
             new Promise(resolve => juanDiegoImg.onload = resolve)])
    .then(() => gameLoop());