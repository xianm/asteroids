(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.FPS = 24;
  Asteroids.DIMS = { 
    x: 800, 
    y: 600 
  };
  Asteroids.NUM_ASTEROIDS = 5;

  var Game = Asteroids.Game = function (canvasId) {
    this.ctx = this.initializeCanvas(canvasId);

    this.asteroids = [];
    this.spawnAsteroids(Asteroids.NUM_ASTEROIDS);
 };

  Game.prototype.start = function () {
    var then = Date.now();

    setInterval(function () {
      var now = Date.now();

      this.update((now - then) / 1000.0);
      this.render(this.ctx);

      then = now;
    }.bind(this), 1000.0 / Asteroids.FPS);
  };

  Game.prototype.update = function (delta) {
    console.log(delta);
    this.asteroids.forEach(function (e) {
      e.update(delta);
    });
  };

  Game.prototype.render = function (ctx) {
    ctx.clearRect(0, 0, Asteroids.DIMS.x, Asteroids.DIMS.y);

    this.asteroids.forEach(function (e) {
      e.render(ctx);
    });
  };

  Game.prototype.initializeCanvas = function (canvasId) {
    var canvas = document.getElementById(canvasId);
    canvas.width = Asteroids.DIMS.x;
    canvas.height = Asteroids.DIMS.y;
    return canvas.getContext('2d');
  };

  Game.prototype.spawnAsteroids = function (amount) {
    var minPos = { x: 50, y: 50 };
    var maxPos = { x: Asteroids.DIMS.x - 50, y: Asteroids.DIMS.y - 50};

    var minVel = { x: -150, y: -150 };
    var maxVel = { x: 150, y: 150 };

    for (var i = 0; i < amount; ++i) {
      this.asteroids.push(new Asteroids.Asteroid({
        game: this,
        pos: Asteroids.Util.randomVector(minPos, maxPos),
        vel: Asteroids.Util.randomVector(minVel, maxVel)
      }));
    }
  };

  Game.prototype.wrap = function (pos) {
    var pad = 75;
    var w = Asteroids.DIMS.x + pad;
    var h = Asteroids.DIMS.y + pad;

    return {
      x: (pos.x > w) ? pos.x % w : (pos.x < -pad) ? (pos.x + w) % w : pos.x,
      y: (pos.y > h) ? pos.y % h : (pos.y < -pad) ? (pos.y + h) % h : pos.y
    };
  };
})();
