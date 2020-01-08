window.onload = function () {
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext("2d");

    var cvsW = cvs.width;
    var cvsH = cvs.height;

    var snakeW = 20;
    var snakeH = 20;

    let score = 0;

    var direction = "right";

    this.document.addEventListener("keydown", getDirection);

    function getDirection(e) {
        if (e.keyCode == 37 && direction != "right") {
            direction = "left";
        } else if (e.keyCode == 38 && direction != "down") {
            direction = "up";
        } else if (e.keyCode == 39 && direction != "left") {
            direction = "right";
        } else if (e.keyCode == 40 && direction != "up") {
            direction = "down";
        }
    }

    function drawSnake(x, y) {
        ctx.fillStyle = "#507786";
        ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);

        ctx.fillStyle = "#507786";
        ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH);
    }

    drawSnake(4, 5);

    var len = 4;
    var snake = [];

    for (var i = len - 1; i >= 0; i--) {
        snake.push({
            x: i,
            y: 0
        });
    }

    food = {
        x: Math.floor(Math.random() * (cvsW / snakeW - 1) + 1),
        y: Math.floor(Math.random() * (cvsH / snakeH - 1) + 1)
    }

    function drawFood(x, y) {
        ctx.fillStyle = "black";
        ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);

        ctx.fillStyle = "#507786";
        ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH);
    }

    function checkCollision(x,y,array) {
        for (var i = 0; i < array.length; i++) {
            if (x == array[i].x && y == array[i].y) {
                return true;
            }
        }
        return false;
    }


    function draw() {
        ctx.clearRect(0, 0, cvsW, cvsH);
        for (var i = 0; i < snake.length; i++) {
            var x = snake[i].x;
            var y = snake[i].y;
            drawSnake(x, y);
        }

        drawFood(food.x, food.y);

        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        if (direction == "left") snakeX--;
        else if (direction == "up") snakeY--;
        else if (direction == "right") snakeX++;
        else if (direction == "down") snakeY++;

        if (snakeX < 0 || snakeY < 0 || snakeX >= cvsW / snakeW || snakeY >= cvsH / snakeH
            || checkCollision(snakeX,snakeY,snake)) {
            snake = null;    
            document.getElementById("gameover").innerHTML = "Game Over";
            setInterval(function(){
                location.reload();
            }, 3000);
        }

        if (snakeX == food.x && snakeY == food.y) {
            food = {
                x : Math.floor(Math.random() * (cvsW / snakeW -1) + 1),
                y : Math.floor(Math.random() * (cvsH / snakeH -1) + 1)
            }
            var newHead = {
                x : snakeX,
                y : snakeY
            };
            score += 1
            document.getElementById("gameScore").innerHTML = score;
        } else {
            snake.pop();
            var newHead = {
                x : snakeX,
                y : snakeY
            };
        }
        
        snake.unshift(newHead);
    }

    setInterval(draw, 60);

}