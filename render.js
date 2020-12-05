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
    platforms.filter(element => element.active != false).forEach(element => {
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

function renderButtons() {
    buttons.forEach(element => {
        // button
        ctx.fillStyle = element.color;
        ctx.fillRect(element.x, element.y, element.width, element.height);
        // base
        ctx.fillStyle = "#111111";
        ctx.fillRect(element.x, element.y + element.height - element.base_height,
                     element.width, element.base_height);
    });
}

function renderTexts() {
    fading_text.filter(element => element.opacity > 0).forEach(element => {
        
        ctx.font = element.font;
        ctx.fillStyle = element.color;
        ctx.textAlign = "center";

        ctx.globalAlpha = element.opacity / 100;
        element.opacity -= element.decay;
        console.log(element.opacity);
        ctx.fillText(element.text, element.x, element.y);
        ctx.globalAlpha = 1;
    });
}

function renderLevelCompletedText() {
    ctx.fillStyle = "grey";
    ctx.textAlign = "center";

    ctx.font = "90px Comic Sans MS";
    ctx.fillText("Level Completed!", 1280/2, 720/2);

    ctx.font = "20px Comic Sans MS";
    ctx.fillText("Press any key to continue", 1280/2, 720/2 + 50);
    
    ctx.globalAlpha = 1;
}