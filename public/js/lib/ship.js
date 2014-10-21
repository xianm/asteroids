(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    Asteroids.Entity.call(this, options);

    this.color = "#EEE";
    this.immuneColor = "#00FF00";
    this.size = { width: 20, height: 30 };
    this.rotation = Math.random() * 360;
    this.thrusterCooldown = 0;
    this.gunCooldown = 0;
  };

  Asteroids.Util.inherits(Ship, Asteroids.Entity);

  Ship.IMMUNITY_TTL = 3;
  Ship.MAX_SPEED = 250;
  Ship.ACCELERATION = 750;
  Ship.ROTATE_SPEED = 375;
  Ship.GUN_COOLDOWN = 0.15;

  Ship.prototype.update = function (delta) {
    this.$super.update.call(this, delta);

    if (this.gunCooldown > 0) {
      this.gunCooldown -= delta;
    }
  };

  Ship.prototype.render = function (ctx) {
    var bounds = this.bounds();

    ctx.fillStyle = this.immune ? this.immuneColor : this.color;
    ctx.beginPath();

    ctx.moveTo(bounds.nose.x, bounds.nose.y);
    ctx.lineTo(bounds.tailLeft.x, bounds.tailLeft.y);
    ctx.lineTo(bounds.tailCenter.x, bounds.tailCenter.y);
    ctx.lineTo(bounds.tailRight.x, bounds.tailRight.y);

    ctx.fill();
    ctx.closePath();
  };

  Ship.prototype.bounds = function () {
    var halfH = this.size.height / 2;
    var halfW = this.size.width / 2;

    var bounds = {
      nose: { x: this.pos.x, y: this.pos.y - halfH },
      tailLeft: { x: this.pos.x - halfW, y: this.pos.y + halfH },
      tailCenter: { x: this.pos.x, y: this.pos.y + (halfH / 2) },
      tailRight: { x: this.pos.x + halfW, y: this.pos.y + halfH }
    };

    var rotate = Asteroids.Util.rotateVector;

    return {
      nose: rotate(bounds.nose, this.pos, this.rotation),
      tailLeft: rotate(bounds.tailLeft, this.pos, this.rotation),
      tailCenter: rotate(bounds.tailCenter, this.pos, this.rotation),
      tailRight: rotate(bounds.tailRight, this.pos, this.rotation)
    };
  };

  Ship.prototype.dir = function () {
    var bounds = this.bounds();

    return {
      x: (bounds.nose.x - this.pos.x) / (this.size.height / 2),
      y: (bounds.nose.y - this.pos.y) / (this.size.height / 2),
    };
  };

  Ship.prototype.speed = function () {
    return Asteroids.Util.distance(this.pos,
      Asteroids.Util.addVectors(this.pos, this.vel));
  };

  Ship.prototype.accelerate = function (impulse) {
    var dv = Asteroids.Util.scaleVector(this.dir(), impulse);
    this.vel = Asteroids.Util.addVectors(this.vel, dv);

    if (this.speed() > Ship.MAX_SPEED) {
      var absX = Math.abs(this.vel.x);
      var absY = Math.abs(this.vel.y);
      var scalar = Ship.MAX_SPEED / ((absX > absY) ? absX : absY);
      this.vel = Asteroids.Util.scaleVector(this.vel, scalar);
    }
  };

  Ship.prototype.brake = function () {
    this.vel = Asteroids.Util.scaleVector(this.vel, 0.8);
  };

  Ship.prototype.rotate = function (da) {
    this.rotation += da;
  };

  Ship.prototype.shoot = function () {
    if (this.gunCooldown <= 0) {
      var bounds = this.bounds();
      var dir = this.dir();

      this.shootBullet(bounds.nose, dir);

      for (var i = 1, l = this.game.level / 2; i < l; ++i) {
        this.shootBullet(bounds.nose, dir, i *  5);
        this.shootBullet(bounds.nose, dir, i * -5);
      }

      this.gunCooldown = Ship.GUN_COOLDOWN;
    }
  };

  Ship.prototype.shootBullet = function (pos, dir, rotation) {
    if (rotation) {
      dir = Asteroids.Util.rotateVector(dir, { x: 0, y: 0 }, rotation);
    }

    this.game.addEntity(new Asteroids.Bullet({
      game: this.game,
      pos: pos,
      vel: Asteroids.Util.scaleVector(dir, Asteroids.Bullet.SPEED)
    }));

    ++this.game.shotsFired;
  };

  Ship.prototype.makeImmune = function (seconds) {
    this.immune = true;

    setTimeout(function () {
      this.immune = false;
    }.bind(this), seconds * 1000);
  };

  Ship.prototype.collidedWith = function (entity) {
    if (this.immune) {
      return;
    }

    if (entity instanceof Asteroids.Asteroid) {
      this.game.removeEntity(this);
      this.game.spawnPlayerShip();
    }
  };
})();
