const gameSpeed = 1;
const coinGenerationSpeed = 10000;

const characterSize = 100;
const enemySize = 75;
const coinSize = 50;

let enemyX = 700;
let enemyY = 700;
let characterX = 0;
let characterY = 0;
let coinX = 0;
let coinY = 0;
let amountOfCoins = 0;

let idW = null;
let idS = null;
let idA = null;
let idD = null;

let idCoinGenerator = null;
let idGameUpdate = null;

window.onkeypress = handleKeyPress;
window.onkeyup = handleKeyRelease;

startGame();

function handleKeyPress(e) {
    console.log("Handling key press");
    switch(e.code.toString()) {
        case "KeyW":
            if(idW == null)
                idW = window.setInterval(() => handleWPress(), gameSpeed);
            break;
        case "KeyS":
            if(idS == null)
                idS = window.setInterval(() => handleSPress(), gameSpeed);
            break;
        case "KeyA":
            if(idA == null)
                idA = window.setInterval(() => handleAPress(), gameSpeed);
            break;
        case "KeyD":
            if(idD == null)
                idD = window.setInterval(() => handleDPress(), gameSpeed);
            break;
        default:
            break;
    }
}

function handleKeyRelease(e) {
    switch(e.code.toString()) {
        case "KeyW":
            if(idW != null) {
                window.clearInterval(idW);
                idW = null;
            }
            break;
        case "KeyS":
            if(idS != null) {
                window.clearInterval(idS);
                idS = null;
            }
            break;
        case "KeyA":
            if(idA != null) {
                window.clearInterval(idA);
                idA = null;
            }
            break;
        case "KeyD":
            if(idD != null) {
                window.clearInterval(idD);
                idD = null;
            }
            break;
        default:
            break;
    }
}

function handleWPress() {
    characterY--;
}

function handleSPress() {
    characterY++;
}

function handleAPress() {
    characterX--;
}

function handleDPress() {
    characterX++;
}

function update() {
    checkCoinCollission();
    updateEnemy();

    let character = document.getElementById("character");
    character.style.left = characterX + "px";
    character.style.top = characterY + "px";
    character.style.transform = "rotate(" + getDegreesOfRotation() + "deg)";

    let coin = document.getElementById("coin");
    if(coinX != null && coinY != null)
        coin.style.visibility = "visible";
    else
        coin.style.visibility = "hidden";
    coin.style.left = coinX + "px";
    coin.style.top = coinY + "px";

    document.getElementById("points").innerText = amountOfCoins.toString();
}

function getDegreesOfRotation() {
    if(idW != null && idS != null && idA != null && idD != null) {
        return 0;
    } else if(idW != null && idD != null && idA != null) {
        return 0;
    } else if(idD != null && idS != null && idA != null) {
        return 180;
    } else if(idW != null && idS != null && idD != null) {
        return 90;
    } else if(idW != null && idS != null && idA != null) {
        return 270;
    } else if(idW != null && idS != null) {
        return 0;
    } else if(idW != null && idA != null) {
        return 315;
    } else if(idW != null && idD != null) {
        return 45;
    } else if(idS != null && idA != null) {
        return 225;
    } else if(idS != null && idD != null) {
        return 135;
    } else if(idA != null && idD != null) {
        return 90;
    } else if(idW != null) {
        return 0;
    } else if(idS != null) {
        return 180;
    } else if(idA != null) {
        return 270;
    } else if(idD != null) {
        return 90;
    }
}

function checkCoinCollission() {
    if(coinX != null && coinY != null) {
        if((characterX + characterSize >= coinX && characterX <= coinX + coinSize) && (characterY + characterSize >= coinY && characterY <= coinY + coinSize)) {
            handleCoinHit();
        }
    }
}

function handleCoinHit() {
    coinX = null;
    coinY = null;
    amountOfCoins++;
}

function generateCoin() {
    if(coinX == null && coinY == null) {
        coinX = Math.floor(Math.random() * (window.innerWidth - coinSize));
        coinY = Math.floor(Math.random() * (window.innerHeight - coinSize));
    }
}

function updateEnemy() {
    calculateEnemyMovement();

    let enemy = document.getElementById("enemy");
    enemy.style.left = enemyX + "px";
    enemy.style.top = enemyY + "px";

    checkEnemyCollision();
}

function calculateEnemyMovement() {
    if(characterX > enemyX)
        enemyX += .5;
    if(characterX < enemyX)
        enemyX -= .5;
    if(characterY > enemyY)
        enemyY += .5;
    if(characterY < enemyY)
        enemyY -= .5;
}

function checkEnemyCollision() {
    if((characterX + characterSize >= enemyX && characterX <= enemyX + enemySize) && (characterY + characterSize >= enemyY && characterY <= enemyY + enemySize)) {
        console.log("Enemy hit");
        resetGame();
    }
}

function startGame() {
    idCoinGenerator = window.setInterval(() => generateCoin(), coinGenerationSpeed);
    idGameUpdate = window.setInterval(() => update(), gameSpeed);

    let character = document.getElementById("character");
    character.style.width = characterSize + "px";
    character.style.height = characterSize + "px";

    let coin = document.getElementById("coin");
    coin.style.width = coinSize + "px";
    coin.style.height = coinSize + "px";
    coin.style.visibility = "hidden";

    let enemy = document.getElementById("enemy");
    enemy.style.width = enemySize + "px";
    enemy.style.height = enemySize + "px";
}

function resetGame() {
    if(idCoinGenerator != null) {
        window.clearInterval(idCoinGenerator);
        idCoinGenerator = null;
    }
    if(idGameUpdate != null) {
        window.clearInterval(idGameUpdate);
        idGameUpdate = null;
    }
    amountOfCoins = 0;

    characterX = 0;
    characterY = 0;
    enemyX = 700;
    enemyY = 700;

    console.log("reset game");
    startGame();
}