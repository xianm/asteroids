(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {
    Asteroids.Entity.call(this, options);

    this.life = 0;
    this.radius = 3;
  };

  Asteroids.Util.inherits(Bullet, Asteroids.Entity);

  Bullet.COLOR = "#00FF00";
  Bullet.SPEED = 450;
  Bullet.TTL = 1.5;

  Bullet.prototype.update = function (delta) {
    this.$super.update.call(this, delta);

    this.life += delta;
    if (this.life > Bullet.TTL) {
      this.game.removeEntity(this);
    }
  };

  Bullet.prototype.render = function (ctx) {
    ctx.fillStyle = Bullet.COLOR;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  };

  Bullet.prototype.collidedWith = function (entity) {
    if (entity instanceof Asteroids.Asteroid) {
      this.game.removeEntity(this);
      this.game.removeEntity(entity);
      this.game.spawnAsteroids(1);
    }
  };
})();