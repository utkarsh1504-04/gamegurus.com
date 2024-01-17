let player;
let lanes;
let score;
let gameInterval;

function startGame() {
    player = { x: 10, y: 3 };
    lanes = Array.from({ length: 5 }, () => []);
    score = 0;
    createLanes();
    document.getElementById('start').style.display = 'none';
    gameInterval = setInterval(updateGame, 200);
}

function createLanes() {
    lanes.forEach((lane, index) => {
        for (let i = 0; i < 30; i++) {
            lane.push(false);
        }
        lane[player.x] = true; // Player's initial position
        drawLane(index);
    });
}

function drawLane(laneIndex) {
    const gameContainer = document.getElementById('game-container');
    const laneElement = document.createElement('div');
    laneElement.className = 'lane';
    for (let i = 0; i < 30; i++) {
        const char = lanes[laneIndex][i] ? 'X' : '&nbsp;';
        const span = document.createElement('span');
        span.innerHTML = char;
        laneElement.appendChild(span);
    }
    gameContainer.appendChild(laneElement);
}

function drawPlayer() {
    const playerLane = lanes[player.y];
    playerLane[player.x] = true;
    drawLane(player.y);
    playerLane[player.x] = false;
}

function drawGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    lanes.forEach((_, index) => drawLane(index));
    drawPlayer();
    document.getElementById('score').innerText = `Score: ${score}`;
}

function updateGame() {
    moveCars();
    movePlayer();
    drawGame();
    checkCollision();
    checkWin();
}

function moveCars() {
    lanes.forEach((lane) => {
        lane.pop();
        lane.unshift(Math.random() < 0.1);
    });
}

function movePlayer() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp' && player.y > 0) {
            player.y--;
        }
        if (event.key === 'ArrowDown' && player.y < 4) {
            player.y++;
        }
        if (event.key === 'ArrowLeft' && player.x > 0) {
            player.x--;
        }
        if (event.key === 'ArrowRight' && player.x < 29) {
            player.x++;
        }
    });
}

function checkCollision() {
    if (lanes[player.y][player.x]) {
        endGame();
    }
}

function checkWin() {
    if (player.y === 0) {
        score++;
        player.y = 3;
    }
}

function endGame() {
    clearInterval(gameInterval);
    document.getElementById('start').style.display = 'block';
}
