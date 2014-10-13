(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.FPS = 30;
  Asteroids.DIMS = { 
    x: 800, 
    y: 600 
  };
  Asteroids.NUM_ASTEROIDS = 1;

  var Game = Asteroids.Game = function (canvasId) {
    this.ctx = this.initializeCanvas(canvasId);

    this.asteroids = [];
    this.bullets = [];

    this.spawnPlayerShip();
    this.spawnAsteroids(Asteroids.NUM_ASTEROIDS);

    this.bindKeys();
 };

  Game.prototype.start = function () {
    var then = Date.now();

    setInterval(function () {
      var now = Date.now();

      this.handleKeys();
      this.update((now - then) / 1000.0);
      this.render(this.ctx);

      then = now;
    }.bind(this), 1000.0 / Asteroids.FPS);
  };

  Game.prototype.update = function (delta) {
    var self = this;

    self.entities().forEach(function (e) {
      e.update(delta);
    });

    var nonAsteroids = self.bullets.concat(this.ship);

    self.asteroids.forEach(function (a) {
      var bulletsLength = self.bullets.length;
      for (var i = 0; i < bulletsLength; ++i) {
        var b = self.bullets[i];
        if (a.collidesWith(b)) {
          b.collidedWith(a);
          return;
        }
      }

      if (a.collidesWith(self.ship)) {
        self.ship.collidedWith(a);
      }
    });
  };

  Game.prototype.render = function (ctx) {
    ctx.clearRect(0, 0, Asteroids.DIMS.x, Asteroids.DIMS.y);

    this.entities().forEach(function (e) {
      e.render(ctx);
    });
  };

  Game.prototype.initializeCanvas = function (canvasId) {
    var canvas = document.getElementById(canvasId);
    canvas.width = Asteroids.DIMS.x;
    canvas.height = Asteroids.DIMS.y;
    return canvas.getContext('2d');
  };

  Game.prototype.spawnPlayerShip = function () {
    var minPos = { x: 150, y: 150 };
    var maxPos = { x: Asteroids.DIMS.x - 150, y: Asteroids.DIMS.y - 150};

    this.ship = new Asteroids.Ship({
      game: this,
      pos: Asteroids.Util.randomVector(minPos, maxPos),
      vel: { x: 0, y: 0 }
    });

    this.ship.makeImmune(Asteroids.Ship.IMMUNITY_TTL);
  };

  Game.prototype.spawnAsteroids = function (amount) {
    var minPos = { x: 50, y: 50 };
    var maxPos = { x: Asteroids.DIMS.x - 50, y: Asteroids.DIMS.y - 50};

    var minVel = { x: -50, y: -50 };
    var maxVel = { x: 50, y: 50 };

    for (var i = 0; i < amount; ++i) {
      this.addEntity(new Asteroids.Asteroid({
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

  keys = [];
  Game.prototype.bindKeys = function () {
    document.onkeyup = function (e) { keys[e.keyCode] = false; };
    document.onkeydown = function (e) { keys[e.keyCode] = true; };
  };

  Game.prototype.handleKeys = function () {
    if (keys[38]) { // UP
      this.ship.accelerate(30);
    }
    if (keys[40]) { // DOWN
      this.ship.brake();
    }
    if (keys[37]) { // LEFT
      this.ship.rotate(-15);
    }
    if (keys[39]) { // RIGHT
      this.ship.rotate(15);
    }
    if (keys[32]) { // SPACE
      this.ship.shoot();
    }
  };

  Game.prototype.entities = function () {
    return [this.ship].concat(this.asteroids).concat(this.bullets);
  };

  Game.prototype.addEntity = function (entity) {
    if (entity instanceof Asteroids.Bullet) {
      this.bullets.push(entity);
    } else if (entity instanceof Asteroids.Asteroid) {
      this.asteroids.push(entity);
    } 
  };

  Game.prototype.removeEntity = function (entity) {
    var index = -1;

    if (entity instanceof Asteroids.Bullet) {
      index = this.bullets.indexOf(entity);
      if (index > -1) {
        this.bullets.splice(index, 1);
      }
    } else if (entity instanceof Asteroids.Asteroid) {
      index = this.asteroids.indexOf(entity);
      if (index > -1) {
        this.asteroids.splice(index, 1);
      }
    } 
  };
})();
