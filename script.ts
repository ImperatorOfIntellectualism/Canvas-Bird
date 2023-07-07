const container = document.getElementById("container") as HTMLDivElement;
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const pointSpan = document.getElementById("pointSpan");
const hsSpan = document.getElementById("hsSpan");
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

let pointX:number = 15
let pointY:number = 245

let HS = 0

if (localStorage.getItem('HS')){
   HS = JSON.parse(localStorage.getItem('HS'))
   hsSpan.innerHTML = " " + HS
}

let towerSpeed = 1
const jumpPower = 25
const fallingPower = 3
let pointTowerX:number = 498

let topHeight = Math.floor(Math.random() * 400)
let bottomHeight = 500 - (topHeight + 50)

function setCookie(name:string,value:number,days:number) {
   var expires = "";
   if (days) {
       var date = new Date();
       date.setTime(date.getTime() + (days*24*60*60*1000));
       expires = "; expires=" + date.toUTCString();
   }
   document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name:string) {
   var nameEQ = name + "=";
   var ca = document.cookie.split(';');
   for(var i=0;i < ca.length;i++) {
       var c = ca[i];
       while (c.charAt(0)==' ') c = c.substring(1,c.length);
       if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
   }
   return null;
}

function point(x:number, y:number, ctx:CanvasRenderingContext2D, size:number){
   ctx.fillRect(x,y,size,size);
 }

function topLine(startX:number, startY:number, ctx:CanvasRenderingContext2D, height:number){
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX, startY+height);
  ctx.stroke();
  ctx.closePath();
}

function bottomLine(startX:number, startY:number, ctx:CanvasRenderingContext2D, height:number){
   ctx.beginPath();
   ctx.moveTo(startX, startY);
   ctx.lineTo(startX, startY-height);
   ctx.stroke();
   ctx.closePath();
 }
 document.addEventListener('keydown', function(event) {
   if (event.key == 'ArrowDown') {
      if(pointY >= 495) return
      pointY+=3;
   }
 });
 document.addEventListener('keyup', function(event) {
   if (event.key == 'ArrowUp') {
      if(pointY <= 16) return
      pointY-= jumpPower;
    }
 });
function gravity()
{
   if(pointY >= 495) return
   pointY++
}
function draw()
{
   point(pointX,pointY,ctx,5)
   topLine(pointTowerX,0,ctx, topHeight)
   bottomLine(pointTowerX,500,ctx, bottomHeight)
   gravity();
   if (pointTowerX <= 0) {pointTowerX = 500; topHeight = Math.floor(Math.random() * 400), bottomHeight = 500 - (topHeight + 50); towerSpeed++; pointSpan.innerHTML = ` ${towerSpeed - 1}`}
   pointTowerX-=Math.ceil((Math.log(towerSpeed) + 1))
}
requestAnimationFrame(update);
function update(){
   ctx.clearRect(0,0,500,500)
   if(pointX <= pointTowerX + 5 && pointX > pointTowerX - 5 && (pointY <= topHeight || pointY >= 500 - bottomHeight)) {alert(`YOU DIED!\nScore: ${towerSpeed - 1}`);if(HS < towerSpeed - 1){localStorage.setItem('HS', JSON.stringify(towerSpeed - 1))};location.reload();return;}
   draw()
   requestAnimationFrame(update);
}