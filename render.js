function renderBackground() {
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, 1280, 720);
}

function renderCharacters() {
    characters.forEach(element => {
        ctx.fillStyle = element.color;
        ctx.fillRect(element.x, element.y, element.width, element.height);
    });
}

function renderPlatforms() {
    ctx.fillStyle = "#45597E";
    platforms.forEach(element => {
        ctx.fillRect(element.x, element.y, element.width, element.height);
    });
}

function renderCoins() {
    ctx.fillStyle = "#FF951D";
    coins.filter(element => element.active).forEach(element => {
        ctx.beginPath();
        ctx.arc(element.x, element.y, element.radius, 0, 2 * Math.PI, false);
        ctx.fill();
    });
}