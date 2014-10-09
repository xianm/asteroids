(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (canvasId) {
    this.ctx = this.initializeCanvas(canvasId);

    this.changeState(new Asteroids.MainMenuState(this));
  };

  Game.DIM_X = document.documentElement.clientWidth;
  Game.DIM_Y = document.documentElement.clientHeight;
  Game.MAX_LIVES = 3;
  Game.NUM_ASTEROIDS = 3;

  Game.prototype.initializeCanvas = function (canvasId) {
    var canvas = document.getElementById(canvasId);
    canvas.width = Game.DIM_X;
    canvas.height = Game.DIM_Y;
    return canvas.getContext('2d');
  };

  Game.prototype.changeState = function (newState) {
    if (this.state) {
      this.state.exit();
    }

    this.state = newState;
    this.state.enter();
  };
  
  Game.prototype.start = function () {
    setInterval(function () {
      this.step();
      this.draw();
    }.bind(this), 20);
  };

  Game.prototype.step = function () {
    this.state.step();
  };

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.state.draw(this.ctx);
  };
})();
