var myGamePiece = [];
var player;

function startGame() {
  myGamePiece.push(new component(30, 30, "red", 0, 0, "obstacle"));
  player = new component(30, 30, "blue", 240, 450, "player");
  myGameArea.start();
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 480;
    this.canvas.height = 480;
    this.context = this.canvas.getContext("2d");
    //body에 canvas 삽입
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    //udpateGameArea 함수를 20간격으로 반복 호출
    this.interval = setInterval(updateGameArea, 20);
  },
  stop: function() {
    clearInterval(this.interval);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}


function component(width, height, color, x, y, type) {
  this.type = type;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.gravity = 0.05;
  this.gravitySpeed = 0;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function() {
    if (type == "obstacle") {
      this.gravitySpeed += this.gravity;
    }
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
  }
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}

var date = new Date().getTime();

function updateGameArea() {
  for (var i = 0; i < myGamePiece.length; i++) {
    if (player.crashWith(myGamePiece[i])) {
      myGameArea.stop();
      return;
    }
  }

  myGameArea.clear();
  for (var i = 0; i < myGamePiece.length; i++) {
    if (myGamePiece[i].y > myGameArea.canvas.height) {
      myGamePiece.splice(i, 1);
    }
    myGamePiece[i].newPos();
    myGamePiece[i].update();
  }

  player.newPos();
  player.update();
  var t = (new Date().getTime() - date);
  if (t >= 1500) {
    var randX = Math.floor(Math.random() * (myGameArea.canvas.width);
    date = new Date().getTime();
    myGamePiece.push(new component(30, 30, "red", randX, 10, "obstacle"));
  }
}

function moveleft() {
  player.speedX -= 1;
}

function moveright() {
  player.speedX += 1;
}

function clearmove() {
  player.speedX = 0;
  player.speedY = 0;
}
