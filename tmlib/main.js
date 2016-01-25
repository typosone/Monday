phina.globalize();

var BRICK_WIDTH = 40 * 2;
var BRICK_HEIGHT = 60 / 2;
var PADDLE_WIDTH = BRICK_WIDTH * 1.5;
var PADDLE_HEIGHT = BRICK_HEIGHT;
var BALL_RADIUS = PADDLE_HEIGHT / 4;

phina.define('MainScene', {
    superClass: 'CanvasScene',
    init: function () {
        this.superInit();
        this.backgroundColor = 'black';
        this.brickGroup = CanvasElement().addChildTo(this);
        var screenRect = Rect(0, 0, 640, 960);

        var self = this;
        Array.range(2, 16, 2).each(function (spanX) {
            Array.range(1, 4, 0.5).each(function (spanY) {
                Brick().addChildTo(self.brickGroup)
                    .setPosition(self.gridX.span(spanX), self.gridY.span(spanY));
            });
        });
        this.paddleY = this.gridY.span(14.5);
        var paddle = Paddle().addChildTo(this)
            .setPosition(this.gridX.center(), this.paddleY);

        paddle.onpointmove = function (e) {
            paddle.setPosition(e.pointer.x | 0, self.paddleY);

            if (paddle.left < screenRect.left) {
                paddle.left = screenRect.left;
            }
        }
    }
})