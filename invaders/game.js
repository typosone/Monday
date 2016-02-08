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

    var manager = new EnemyManager();
    manager.generateEnemies();

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

        if (player.getBullet() != null) {
            if (manager.collision(player.getBullet().getCoordinates())) {
                player.removeBullet();
            }
        }

        manager.draw(context);

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

Player.prototype.getBullet = function () {
    return this.bullet;
};

Player.prototype.removeBullet = function () {
    this.bullet = null;
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

Bullet.prototype.getCoordinates = function () {
    return {
        left: this.pos.x - 2, top: this.pos.y - 5,
        right: this.pos.x + 2, bottom: this.pos.y + 5
    };
};

var Enemy = function (image) {
    Enemy.prototype.SIZE = 32;
    this.image = image;
    this.pos = {x: 0, y: 0};
};


Enemy.prototype.move = function (dx, dy) {
    this.pos.x += dx;
    this.pos.y += dy;
};

Enemy.prototype.draw = function (context) {
    context.save();

    context.translate(this.pos.x, this.pos.y);
    var offset = this.SIZE / 2;
    context.drawImage(this.image, -offset, -offset, this.SIZE, this.SIZE);

    context.restore();
};

Enemy.prototype.isCollision = function (bullet) {
    var left = this.pos.x - this.SIZE / 2;
    var top = this.pos.y - this.SIZE / 2;
    var right = this.pos.x + this.SIZE / 2;
    var bottom = this.pos.y + this.SIZE / 2;
    var isHorizontal = left < bullet.left && bullet.left < right
        || left < bullet.right && bullet.right < right;

    if (!isHorizontal) {
        return false;
    }
    return top < bullet.top && bullet.top < bottom;
};

var EnemyManager = function () {
    EnemyManager.prototype.HORIZONTAL_COUNT = 8;
    EnemyManager.prototype.VERTICAL_COUNT = 4;
    this.enemyList = [];
    this.enemyImageList = [];
    this.loadImage();
};

EnemyManager.prototype.loadImage = function () {
    var img = new Image();
    img.src = "invader1.png";
    this.enemyImageList.push(img);
    /*
     img = new Image();
     img.src = "invader2.png";
     this.enemyImageList.push(img);
     */
};

EnemyManager.prototype.generateEnemies = function () {
    for (var y = 0; y < this.VERTICAL_COUNT; y++) {
        for (var x = 0; x < this.HORIZONTAL_COUNT; x++) {
            var enemy = new Enemy(this.enemyImageList[0]);
            var dx = (x + 1) * enemy.SIZE * 2;
            var dy = (y + 1) * enemy.SIZE;
            enemy.move(dx, dy);
            this.enemyList.push(enemy);
        }
    }
};

EnemyManager.prototype.draw = function (context) {
    this.enemyList.forEach(function (enemy) {
        enemy.draw(context);
    });
};

EnemyManager.prototype.collision = function (bullet) {
    var target = null;
    this.enemyList.forEach(function (enemy) {
        if (target != null) {
            return;
        }
        if (enemy.isCollision(bullet)) {
            target = enemy;
        }
    });
    if (target != null) {
        var index = this.enemyList.indexOf(target);
        this.enemyList.splice(index, 1);
        return true;
    }
    return false;
};

test = 'test'