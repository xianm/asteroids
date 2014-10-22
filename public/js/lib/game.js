(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.FPS = 30;
  Asteroids.DIMS = {
    x: 800,
    y: 600
  };
  Asteroids.DIM_PADDING = 15;
  Asteroids.DEFAULT_LIVES = 3;
  Asteroids.BULLET_PENALTY = 1;

  var Game = Asteroids.Game = function (canvasId) {
    this.ctx = this.initializeCanvas(canvasId);

    this.lives = Asteroids.DEFAULT_LIVES;
    this.level = 0;
    this.score = 0;
    this.shotsFired = 0;
    this.shotsHit = 0;

    this.asteroids = [];
    this.bullets = [];

    this.spawnPlayerShip();

    this.bindKeys();
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
    this.handleKeys(delta);

    if (this.lives > 0) {
      this.entities().forEach(function (e) {
        e.update(delta);
      });

      this.checkCollisions();

      if (this.asteroids.length === 0) {
        this.spawnAsteroids(++this.level * 2);
        this.ship.makeImmune();
      }
    }
  };

  Game.prototype.checkCollisions = function () {
    var self = this;
    var nonAsteroids = self.bullets.concat(this.ship);

    this.asteroids.forEach(function (a) {
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

    if (this.lives > 0) {
      this.entities().forEach(function (e) {
        e.render(ctx);
      });

      this.renderUI(ctx);
    } else {
      this.renderGameOver(ctx);
    }
  };

  Game.prototype.accuracy = function () {
    var accuracy = this.shotsHit / this.shotsFired;
    return (accuracy) ? accuracy : 0;
  };

  Game.prototype.renderUI = function (ctx) {
    var infoTxt = "Level    " + this.level;
    infoTxt +=  "\nScore    " + this.score.toLocaleString();
    infoTxt +=  "\nAccuracy " + (this.accuracy() * 100).toFixed(2) + "%";

    Asteroids.Util.drawText(ctx, infoTxt, 10, 25);

    this.renderLives(ctx);
  };

  Game.prototype.renderLives = function (ctx) {
    var height = Asteroids.Ship.SIZE.height * 0.6;
    var width = Asteroids.Ship.SIZE.width * 0.6;
    var halfH = height / 2;
    var halfW = width / 2;
    var xOff = 10;
    var pos = {
      x: Asteroids.DIMS.x - ((width + xOff) * this.lives),
      y: 25 
    };

    for (var i = 0; i < this.lives; ++i) {
      var bounds = {
        nose: { x: pos.x, y: pos.y - halfH },
        tailLeft: { x: pos.x - halfW, y: pos.y + halfH },
        tailCenter: { x: pos.x, y: pos.y + (halfH / 2) },
        tailRight: { x: pos.x + halfW, y: pos.y + halfH }
      };

      ctx.beginPath();

      ctx.moveTo(bounds.nose.x, bounds.nose.y);
      ctx.lineTo(bounds.tailLeft.x, bounds.tailLeft.y);
      ctx.lineTo(bounds.tailCenter.x, bounds.tailCenter.y);
      ctx.lineTo(bounds.tailRight.x, bounds.tailRight.y);

      ctx.fill();
      ctx.closePath();

      pos.x += width + xOff;
    }
  };

  Game.prototype.renderGameOver = function (ctx) {
    var gameOverTxt = "Game Over!\nScore: " + 
      this.score.toLocaleString();
    Asteroids.Util.drawTextCentered(ctx, gameOverTxt, 14);
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

    this.ship.makeImmune();
  };

  Game.prototype.spawnAsteroids = function (amount) {
    var minPos = { x: 50, y: 50 };
    var maxPos = { x: Asteroids.DIMS.x - 50, y: Asteroids.DIMS.y - 50};

    for (var i = 0; i < amount; ++i) {
      this.addEntity(new Asteroids.Asteroid({
        game: this,
        pos: Asteroids.Util.randomVector(minPos, maxPos),
      }));
    }
  };

  Game.prototype.wrap = function (pos) {
    var pad = Asteroids.DIM_PADDING;
    var w = Asteroids.DIMS.x + pad;
    var h = Asteroids.DIMS.y + pad;

    return {
      x: (pos.x > w) ? pos.x % w : (pos.x < -pad) ? (pos.x + w) % w : pos.x,
      y: (pos.y > h) ? pos.y % h : (pos.y < -pad) ? (pos.y + h) % h : pos.y
    };
  };

  Game.prototype.updateScore = function (amount) {
    this.score = Math.max(0, this.score + (amount * this.level));
  };

  keys = [];
  Game.prototype.bindKeys = function () {
    document.onkeyup = function (e) { keys[e.keyCode] = false; };
    document.onkeydown = function (e) { keys[e.keyCode] = true; };
  };

  Game.prototype.handleKeys = function (delta) {
    if (keys[38]) { // UP
      this.ship.accelerate(Asteroids.Ship.ACCELERATION * delta);
    }
    if (keys[40]) { // DOWN
      this.ship.brake();
    }
    if (keys[37]) { // LEFT
      this.ship.rotate(-Asteroids.Ship.ROTATE_SPEED * delta);
    }
    if (keys[39]) { // RIGHT
      this.ship.rotate(Asteroids.Ship.ROTATE_SPEED * delta);
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
