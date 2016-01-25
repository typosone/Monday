var FPS = 30;
var WIDTH = 600;
var HEIGHT = 400;

$(function () {
    var canvas = $("canvas#game_window")
        .width(WIDTH).height(HEIGHT).get(0);
    var context = canvas.getContext("2d");

    var input = new Input();

    var player = new Player(input);
    player.pos.x = WIDTH / 2;
    player.pos.y = 380;

    $(document).keydown(function (event) {
        switch (event.which) {
            case 37: // cursor left
                input.isLeft = true;
                break;
            case 39: // cursor right
                input.isRight = true;
                break;
            case 32:
                input.isSpace = true;
                break;
        }
    });
    $(document).keyup(function (event) {
        switch (event.which) {
            case 37: // cursor left
                input.isLeft = false;
                break;
            case 39: // cursor right
                input.isRight = false;
                break;
            case 32:
                input.isSpace = false;
                break;
        }
    });

    var mainLoop = function () {
        context.fillStyle = "#000";
        context.fillRect(0, 0, WIDTH, HEIGHT);

        player.draw(context);

        setTimeout(mainLoop, 1000 / FPS);
    };

    mainLoop();

});

var Player = function (input) {
    Player.prototype.SPEED = 5;
    Player.prototype.OFFSET_X = 20;
    Player.prototype.BULLET_SPEED = -10;

    this.input = input;
    this.pos = {'x': 0, 'y': 0};
    this.bullet = null;
};

Player.prototype.move = function () {
    if (this.input.isLeft && this.input.isRight) {
        // なにもしない
    } else if (this.input.isLeft) {
        this.pos.x -= this.SPEED;
        if (this.pos.x < this.OFFSET_X) {
            this.pos.x = this.OFFSET_X;
        }
    } else if (this.input.isRight) {
        this.pos.x += this.SPEED;
        if (this.pos.x + this.OFFSET_X > WIDTH) {
            this.pos.x = WIDTH - this.OFFSET_X;
        }
    }
};

Player.prototype.draw = function (context) {
    if (this.input.isSpace && this.bullet == null) {
        this.bullet = new Bullet(
            this.pos.x, this.pos.y, this.BULLET_SPEED);
    }
    if (this.bullet != null) {
        this.bullet.draw(context);
        if (!this.bullet.isValid()) {
            this.bullet = null;
        }
    }
    this.move();
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.strokeStyle = "#FFF";
    context.fillStyle = "#FFF";

    context.beginPath();
    context.moveTo(0, 10);
    context.lineTo(-20, 10);
    context.lineTo(-20, -7);
    context.lineTo(-3, -7);
    context.lineTo(0, -10);
    context.lineTo(3, -7);
    context.lineTo(20, -7);
    context.lineTo(20, 10);
    context.closePath();
    context.stroke();
    context.fill();

    context.restore();
};

var Input = function () {
    Input.prototype.isLeft = false;
    Input.prototype.isRight = false;
    Input.prototype.isSpace = false;
};

var Bullet = function (x, y, speed) {
    Bullet.prototype.OFFSET_Y = 5;
    this.pos = {x: x, y: y};
    this.speed = speed;
};

Bullet.prototype.move = function () {
    this.pos.y += this.speed;
};

Bullet.prototype.isValid = function () {
    return this.pos.y + this.OFFSET_Y > 0;
};

Bullet.prototype.draw = function (context) {
    this.move();
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.strokeStyle = "#FFF";

    context.beginPath();
    context.moveTo(2, 5);
    context.lineTo(-2, 3);
    context.lineTo(2, 1);
    context.lineTo(-2, -1);
    context.lineTo(2, -3);
    context.lineTo(-2, -5);
    context.stroke();

    context.restore();
};