
function startGame() {

var canvas = document.getElementById('breakOut');
var ctx = canvas.getContext('2d');
var start = document.getElementById('start');
var ballRadius = 10;
var x = ballRadius;
var y = ballRadius;
var dx = 2;
var dy = -3;
var paddleHeight = 15;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleY = (canvas.height-paddleHeight)/1.1;
var leftPress = false;
var rightPress = false;
var brickRowCount = 3;
var brickColumnCount = 6;
var brickWidth = 60;
var brickHeight = 15;
var brickPadding = 5;
var brickOffsetTop = 25;
var brickOffsetLeft = 70;
var UpLevel = ['Low', 'Middle', 'Hight']
var score = 0



var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function Bricks() {
	 for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
			var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "orange";
            ctx.fill();
            ctx.closePath();
			}
        }
    }
} 



function keyDownHandler(event) {
	if(event.key =='Right' || event.key == 'ArrowRight') {
		rightPress = true;
	}
	else if (event.key == 'Left' || event.key == 'ArrowLeft'){
		leftPress = true;
	}  
}

function keyUpHandler(event) {
	if(event.key == 'Right' || event.key == 'ArrowRight') {
		rightPress = false;
	}
	else if (event.key == 'Left' || event.key == 'ArrowLeft'){
		leftPress = false;
	}  
}
	function detectingBricks() {
	for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
			if(b.status == 1) {
					if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;					
					if(score == brickRowCount*brickColumnCount) {
                        alert("ВЫ ПОБЕДИЛИ!");
                        document.location.reload();
                    }
				}
			}
		}
	}
}

function Level() {
	ctx.font = "16px Arial";
    ctx.fillStyle = "black";
	ctx.fillText("Level: "+ UpLevel[0], 520, 20);
}





function Score() {
    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+score, 8, 20);
}

function ball() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0,2 * Math.PI);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.closePath();
} 

function paddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.closePath();
}


	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ball();
		paddle();
		Bricks();
		detectingBricks();
		Score();
		Level();
		
		
		
		if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
			dx = -dx
		}
		if(y + dy < ballRadius) {
		dy = -dy;
		} 
		else if(y + dy > canvas.height-ballRadius) {
			if(x > paddleX && x < paddleX + paddleWidth) {
				dy = -dy;
		}
		
		else {
			alert("ВЫ ПРОИГРАЛИ");
			document.location.reload();
			clearInterval(interval);
		}
		}
		if(rightPress && paddleX < canvas.width-paddleWidth) {
			paddleX += 7;
		}
		else if(leftPress && paddleX > 0) {
			paddleX -= 7;
		}
		x += dx;
		y += dy
	}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup',  keyUpHandler, false);
var interval = setInterval(draw, 10);

}