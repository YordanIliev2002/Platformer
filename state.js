var characters = [];
var platforms = [];
var keyStates = {
    38: false, // arrow up
    37: false, // arrow left
    39: false, // arrow right

    87: false, // W
    65: false, // A
    68: false, // D
};
var coins = [];
var buttons = [];
var fading_text = [
    {
        x: 1280 / 2,
        y: 100,
        text: "Level 1!",
        font:"30px Comic Sans MS",
        color: "red",
        opacity: 100,
        decay: 100.0 / 60.0 / 3, // 10 sec    100 / s / 60 = x
    },
];

var state = "running";
var level = 1;

function isCompleted() {
    return !coins.some(coin => coin.active);
}

function loadLevel(id) {
    id--;
    state = "running";

    characters = [];
    characters = deepCopy(levels[id].characters);

    platforms = [];
    platforms = deepCopy(levels[id].platforms);
    platforms.push(...base_platforms);

    coins = [];
    coins = deepCopy(levels[id].coins);

    buttons = [];
    buttons = deepCopy(levels[id].buttons);

    fading_text[0].opacity = 100;
    fading_text[0].text = `Level ${id+1}!`;
    timer = setInterval(loop, 17);
}
const deepCopy = (inObject) => {
    let outObject, value, key
  
    if (typeof inObject !== "object" || inObject === null) {
      return inObject // Return the value if inObject is not an object
    }
  
    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {}
  
    for (key in inObject) {
      value = inObject[key]
  
      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = deepCopy(value)
    }
  
    return outObject;
  }