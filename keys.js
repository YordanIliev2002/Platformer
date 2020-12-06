function keydown(e) {
    if (state == "completed" && e.keyCode == 32)
    {
        if(levels[level] != undefined) {
            loadLevel(++level);
        }
    }
    if(e.keyCode == 82) { // R key
        window.clearInterval(timer);
        loadLevel(level);
    }
    if (e.keyCode == 70) { // F key
        fullscreen = !fullscreen;
        fullscreen ? openFullscreen(): exitFullscreen();
        return;
    }
    if (keyStates[e.keyCode] != undefined) {
        keyStates[e.keyCode] = true;
    }
    for (var i = 0; i < characters.length; i++) {
        if (e.keyCode == characters[i].up) {
            if (characters[i].airborne == false) {
                characters[i].deltaY = characters[i].jumpStrength;
                characters[i].airborne = true;
            }
        }
    }
}

function keyup(e) {
    if (keyStates[e.keyCode] != undefined) {
        keyStates[e.keyCode] = false;
    }
    for (var i = 0; i < characters.length; i++) {
        if (e.keyCode == characters[i].up) {
            if (characters[i].deltaY < -2) {
                characters[i].deltaY = -3;
            }
        }
    }
}