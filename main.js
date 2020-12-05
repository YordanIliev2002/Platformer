
function pressButton(button) {
    button.active = false;
    button.height /= 2;
    button.y += button.height;
    platforms.filter((platform) => platform.group == button.group).forEach((platform) => platform.active = !platform.active);
}

function moveCharacter(index) {
    var player = characters[index];
    player.deltaX = 0;
    if (keyStates[player.left]) {
        player.deltaX -= 2.5;
    }
    if (keyStates[player.right]) {
        player.deltaX += 2.5;
    }

    player.deltaY += player.gravity;

    var oldX = player.x;
    var oldY = player.y;
    player.y += player.deltaY;
    platforms.filter(platform => platform.active).forEach((platform) =>{
        if (colides(player, platform)) {
            if (player.deltaY > 0) {
                player.y = platform.y - player.height;
                player.deltaY = 0;
                player.airborne = false;
                if (keyStates[player.up]) {
                    player.deltaY = player.jumpStrength;
                    player.airborne = true;
                }
            }
            else {
                player.y = oldY;
                player.deltaY = 0;
                player.airborne = true;
            }
        }
    });
    
    for (var i = 0; i < characters.length; i++) {
        if (i != index) {
            if (colides(player, characters[i])) {
                if (player.deltaY > 0) {
                    player.y = characters[i].y - player.height;
                    player.deltaY = 0;
                    player.airborne = false;
                    if (keyStates[player.up]) {
                        player.deltaY = player.jumpStrength;
                        player.airborne = true;
                    }
                }
                else {
                    player.y = oldY;
                    player.deltaY = 0;
                    player.airborne = true;
                }
                break;
            }
        }
    }
    
    buttons.forEach((button) => {
        if (colides(player, button)) {
            if(button.active) {
                pressButton(button);
            }
            player.y = button.y - player.height;
            player.deltaY = 0;
            player.airborne = false;
            if (keyStates[player.up]) {
                player.deltaY = player.jumpStrength;
                console.log("jump");
                player.airborne = true;
            }
    }
    });

    player.x += player.deltaX;
    platforms.filter(platform => platform.active).forEach((platform) =>{
        if (colides(player, platform)) {
            player.x = oldX;
            player.deltaX = 0;
        }
    });

    buttons.forEach((button) => {
        if (colides(player, button)) {
            player.x = oldX;
            player.deltaX = 0;
        }
    });

    for (var i = 0; i < characters.length; i++) {
        if (i != index) {
            if (colides(player, characters[i])) {
                player.x = oldX;
                player.deltaX = 0;
                break;
            }
        }
    }
    coins.filter(coin => coin.active).forEach((coin) => { 
        if (coinCollides(player, coin)) {
            coin.active = false;
        }
    });
}

function loop() {
    for (var i = 0; i < characters.length; i++) {
        moveCharacter(i);
    }
    renderBackground();
    renderPlatforms();
    renderButtons();
    renderCoins();
    renderCharacters();
    renderTexts();
    if(isCompleted()) {
        state = "completed";
        renderLevelCompletedText();
        window.clearInterval(timer);
    }
}


function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.height = 720;
    ctx.canvas.width = 1280;
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);   
};

init();
loadLevel(1);
var timer; //~60FPS