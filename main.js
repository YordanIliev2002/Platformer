var characters = [
    {
        name: "rat",
        x: 200,
        y: 500,
        deltaX: 0,
        deltaY: 0,
        airborne: true,
        height: 20,
        width: 20,
        color: "#228B22",
        up: 38,
        left: 37,
        right: 39,
        gravity: 0.2,
        jumpStrength: -6,
    },
    {
        name: "bat",
        x: 300,
        y: 500,
        deltaX: 0,
        deltaY: 0,
        airborne: true,
        height: 30,
        width: 30,
        color: "#D2691E",
        up: 87,
        left: 65,
        right: 68,
        gravity: 0.2,
        jumpStrength: -6,
    }
];
var platforms = [
    {
        x: 0,
        y: 0,
        width: 10,
        height: 710,
        active: true,
    },
    {
        x: 0,
        y: 710,
        width: 1270,
        height: 10,
        active: true,
    },
    {
        x: 10,
        y: 0,
        width: 1270,
        height: 10,
        active: true,
    },
    {
        x: 1270,
        y: 10,
        width: 10,
        height: 710,
        active: true,
    },

];
var keyStates = {
    38: false, // arrow up
    37: false, // arrow left
    39: false, // arrow right

    87: false, // W
    65: false, // A
    68: false, // D
};
var coins = [
    {
        x: 600,
        y: 530,
        active: true,
        radius: 13,
    },
    {
        x: 700,
        y: 400,
        active: true,
        radius: 13,
    },
];
var buttons = [
    {
        x: 120,
        y: 585,
        height: 15,
        width: 20,
        base_height: 5,
        active: true,
        group: "group1",
        color: "#DC143C",
    },
    {
        x: 150,
        y: 585,
        height: 15,
        width: 20,
        base_height: 5,
        active: true,
        group: "group1",
        color: "#2CD307",
    },
];
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
    for (platform in platforms) {
        if(platforms[platform].active != true) {
            continue;
        }
        if (colides(player, platforms[platform])) {
            if (player.deltaY > 0) {
                player.y = platforms[platform].y - player.height;
                player.deltaY = 0;
                player.airborne = false;
                if (keyStates[player.up]) {
                    player.deltaY = player.jumpStrength;
                    console.log("jump");
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
    for (var i = 0; i < characters.length; i++) {
        if (i != index) {
            if (colides(player, characters[i])) {
                if (player.deltaY > 0) {
                    player.y = characters[i].y - player.height;
                    player.deltaY = 0;
                    console.log(false);
                    player.airborne = false;
                    if (keyStates[player.up]) {
                        player.deltaY = player.jumpStrength;
                        console.log("jump");
                        player.airborne = true;
                    }
                }
                else {
                    player.y = oldY;
                    player.deltaY = 0;
                    console.log(true);
                    player.airborne = true;
                }
                break;
            }
        }
    }
    
    for (button in buttons) {
        if (colides(player, buttons[button])) {
                if(buttons[button].active) {
                    pressButton(buttons[button]);
                }
                player.y = buttons[button].y - player.height;
                player.deltaY = 0;
                player.airborne = false;
                if (keyStates[player.up]) {
                    player.deltaY = player.jumpStrength;
                    console.log("jump");
                    player.airborne = true;
                }
        }
    }

    player.x += player.deltaX;
    for (platform in platforms) {
        if(platforms[platform].active != true) {
            continue;
        }
        if (colides(player, platforms[platform])) {
            player.x = oldX;
            player.deltaX = 0;
            break;
        }
    }
    for (button in buttons) {
        if (colides(player, buttons[button])) {
            player.x = oldX;
            player.deltaX = 0;
            break;
        }
    }
    for (var i = 0; i < characters.length; i++) {
        if (i != index) {
            if (colides(player, characters[i])) {
                player.x = oldX;
                player.deltaX = 0;
                break;
            }
        }
    }

    for (coin in coins) {
        if (coins[coin].active) {
            if (coinCollides(player, coins[coin])) {
                coins[coin].active = false;
            }
        }
    }
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
}

function loadLevel() {
    platforms.push(
        {
            x: 100,
            y: 600,
            width: 200,
            height: 10,
            active: true,
        },
        {
            x: 350,
            y: 650,
            width: 200,
            height: 10,
            active: true,
        },
        {
            x: 450,
            y: 550,
            width: 200,
            height: 10,
            active: true,
        },
        {
            x: 620,
            y: 515,
            width: 100,
            height: 10,
            group: "group1",
            active: true,
        },
        {
            x: 620,
            y: 560,
            width: 10,
            height: 180,
            active: true,
        },
        {
            x: 720,
            y: 515,
            width: 10,
            height: 170,
            active: true,
        },
        {
            x: 730,
            y: 630,
            width: 10,
            height: 10,
            active: true,
        },
        {
            x: 730,
            y: 570,
            width: 10,
            height: 10,
            active: true,
        },
        {
            x: 670,
            y: 345,
            width: 10,
            height: 170,
            active: true,
        },
    );
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
loadLevel();

setInterval(loop, 17); //~60FPS