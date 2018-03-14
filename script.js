const canv = document.getElementById('canvas');
const cont = canv.getContext('2d');

let amountWayPoints = 4;
let amountPlayers = 3;

let wayPoints = [];
let players = [];


function checkMax(num,max){
  if(num >= max){
    return true;
  }else{
    return false;
  }
}

function pitagoras(a,b){
  let A = a.dx - b.dx;
  let B = a.dy - b.dy;
  let C = Math.sqrt((Math.pow(A,2) + Math.pow(B,2)));
  return C;
}

function clamp(number, min, max) {
  return Math.min(Math.max(number, min),max);
}

function playerLoop(p,arr){
  p.vel.subVector(arr[p.toPoint].vector,p.vector);
  console.log(p.vel);
  p.vector.add(p.vel);
  p.vel.r = p.speed;
  // p.trav = pitagoras(arr[p.toPoint].vector,p.vector);
  // if(checkMax(p.trav,p.dist)){
  //   if(p.toPoint == amountWayPoints-1){
  //     p.toPoint = 0;
  //   }else{
  //     p.toPoint++;
  //   }
  //   p.dist = pitagoras(arr[toPoint].vector,p.vector);
  // }
}

function drawArray(type,arr){
  switch (type) {
    case "player":
    for(let i = 0;i < arr.length;i++){
      arr[i].point.rePos(arr[i].vector.dx,arr[i].vector.dy);
      arr[i].point.drawNow();
    }
    break;
    case "waypoint":
    for(let i = 0;i < arr.length;i++){
      arr[i].point.drawNow();
    }
    break;
    default:
    console.log("type not recognized.");
    break;
  }
}

for(let i = 0;i < amountWayPoints;i++){
  let obj = {};
  obj.vector = new Vector2(clamp(Math.random()*canv.width,100,canv.width-100),clamp(Math.random()*canv.height,100,canv.height-100),"");
  obj.point = new Point(obj.vector.dx,obj.vector.dy,"#9370DB",5);
  wayPoints.push(obj);
}
for(let i = 0; i < amountPlayers;i++){
  let obj = {};
  obj.vector = new Vector2(clamp(Math.random()*canv.width,100,canv.width-100),clamp(Math.random()*canv.height,100,canv.height-100),"");
  obj.point = new Point(obj.vector.dx,obj.vector.dy,"#5F9EA0",4.5);
  obj.vel = new Vector2(1,1);
  obj.toPoint = Math.round(clamp((Math.random()*amountWayPoints)-1,0,amountWayPoints-1),0);
  obj.dist = pitagoras(obj.vector,wayPoints[obj.toPoint].vector);
  obj.trav;
  obj.speed = clamp(Math.random()*8,1,8);
  console.log(obj.vel.r);
  players.push(obj);
}


function loop(){
  cont.clearRect(0,0,canv.width,canv.height);
  requestAnimationFrame(loop);
  for(let i = 0;i < players.length;i++){
    playerLoop(players[i],wayPoints);
  }
  drawArray("player",players);
  drawArray("waypoint",wayPoints);
}

loop();
