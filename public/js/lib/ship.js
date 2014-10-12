(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    Asteroids.Entity.call(this, options);

    this.color = "#EEE";
    this.size = { width: 20, height: 30 };
    this.rotation = Math.random() * 360;

    this.immuneTimer = 3;
    this.immuneColor = "#00AA00";
    this.immune = true;
  };

  Asteroids.Util.inherits(Ship, Asteroids.Entity);

  Ship.MAX_SPEED = 250;

  Ship.prototype.update = function (delta) {
    if (this.immune) {
      this.immuneTimer -= delta;
      if (this.immuneTimer <= 0) {
        this.immune = false;
      }
    }
    this.$super.update.call(this, delta);
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

  Ship.prototype.accelerate = function (impulse) {
    var bounds = this.bounds();
    var foo = {
      x: (bounds.nose.x - this.pos.x) / (this.size.height / 2),
      y: (bounds.nose.y - this.pos.y) / (this.size.height / 2)
    };
    var dv = Asteroids.Util.scaleVector(foo, impulse);

    this.vel = Asteroids.Util.addVectors(this.vel, dv);
    this.vel = Asteroids.Util.clampVector(this.vel, -Ship.MAX_SPEED, Ship.MAX_SPEED);
  };

  Ship.prototype.brake = function () {
    this.vel = Asteroids.Util.scaleVector(this.vel, 0.8);
  };

  Ship.prototype.rotate = function (da) {
    // TODO: rotation velocity
    this.rotation += da;
  };
})();
