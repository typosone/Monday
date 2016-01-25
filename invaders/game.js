$(function () {
    var FPS = 30;
    var WIDTH = 600;
    var HEIGHT = 400;

    $("canvas#game_window").width(WIDTH);
    $("canvas#game_window").height(HEIGHT);
    var canvas = $("canvas#game_window").get(0);
    var context = canvas.getContext("2d");

    var player = new Player();
    player.pos.x = WIDTH / 2;
    player.pos.y = 380;

    $(document).keydown(function (event) {
        switch (event.which) {
            case 37: // cursor left
                player.pos.x -= 5;
                break;
            case 39: // cursor right
                player.pos.x += 5;
                break;
        }
    });

    var mainLoop = function() {
        context.fillStyle = "#000";
        context.fillRect(0, 0, WIDTH, HEIGHT);

        player.draw(context);

        setTimeout(mainLoop, 1000 / FPS);
    }

    mainLoop();

});

var Player = function () {
    this.pos = {'x': 0, 'y': 0};

    Player.prototype.draw = function (context) {
        context.save()
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
    }
}