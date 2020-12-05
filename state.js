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