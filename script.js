var container = document.getElementById("container");
var canvas = document.getElementById("myCanvas");
var pointSpan = document.getElementById("pointSpan");
var hsSpan = document.getElementById("hsSpan");
canvas.width = 500;
canvas.height = 500;
var ctx = canvas.getContext("2d");
var pointX = 15;
var pointY = 245;
var HS = 0;
if (localStorage.getItem('HS')) {
    HS = JSON.parse(localStorage.getItem('HS'));
    hsSpan.innerHTML = " " + HS;
}
var towerSpeed = 1;
var jumpPower = 25;
var fallingPower = 3;
var pointTowerX = 498;
var topHeight = Math.floor(Math.random() * 400);
var bottomHeight = 500 - (topHeight + 50);
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function point(x, y, ctx, size) {
    ctx.fillRect(x, y, size, size);
}
function topLine(startX, startY, ctx, height) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, startY + height);
    ctx.stroke();
    ctx.closePath();
}
function bottomLine(startX, startY, ctx, height) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, startY - height);
    ctx.stroke();
    ctx.closePath();
}
document.addEventListener('keydown', function (event) {
    if (event.key == 'ArrowDown') {
        if (pointY >= 495)
            return;
        pointY += 3;
    }
});
document.addEventListener('keyup', function (event) {
    if (event.key == 'ArrowUp') {
        if (pointY <= 16)
            return;
        pointY -= jumpPower;
    }
});
function gravity() {
    if (pointY >= 495)
        return;
    pointY++;
}
function draw() {
    point(pointX, pointY, ctx, 5);
    topLine(pointTowerX, 0, ctx, topHeight);
    bottomLine(pointTowerX, 500, ctx, bottomHeight);
    gravity();
    if (pointTowerX <= 0) {
        pointTowerX = 500;
        topHeight = Math.floor(Math.random() * 400), bottomHeight = 500 - (topHeight + 50);
        towerSpeed++;
        pointSpan.innerHTML = " ".concat(towerSpeed - 1);
    }
    pointTowerX -= Math.ceil((Math.log(towerSpeed) + 1));
}
requestAnimationFrame(update);
function update() {
    ctx.clearRect(0, 0, 500, 500);
    if (pointX <= pointTowerX + 5 && pointX > pointTowerX - 5 && (pointY <= topHeight || pointY >= 500 - bottomHeight)) {
        alert("YOU DIED!\nScore: ".concat(towerSpeed - 1));
        if (HS < towerSpeed - 1) {
            localStorage.setItem('HS', JSON.stringify(towerSpeed - 1));
        }
        ;
        location.reload();
        return;
    }
    draw();
    requestAnimationFrame(update);
}
//# sourceMappingURL=script.js.map