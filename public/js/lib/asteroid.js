(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    Asteroids.Entity.call(this, options);

    this.color = "#999";
    this.vel = options.vel || Asteroid.randomVelocity();
    this.radius = options.radius || Asteroid.DEFAULT_RADIUS;
    this.bounty = options.bounty || Asteroid.DEFAULT_BOUNTY;
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.Entity);

  Asteroid.DEFAULT_BOUNTY = 1;
  Asteroid.DEFAULT_SPEED = 30;
  Asteroid.DEFAULT_RADIUS = 60;
  Asteroid.MIN_RADIUS = 15;

  Asteroid.randomVelocity = function () {
    var c2 = Asteroid.DEFAULT_SPEED * Asteroid.DEFAULT_SPEED;
    var a2 = c2 * Math.random();
    var b2 = c2 - a2;

    return {
      x: Math.sqrt(a2) * ((Math.random() > 0.5) ? 1 : -1),
      y: Math.sqrt(b2) * ((Math.random() > 0.5) ? 1 : -1),
    }
  };

  Asteroid.prototype.render = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  };

  Asteroid.prototype.collidesWith = function (entity) {
    var dist = 0;

    if (entity instanceof Asteroids.Bullet) {
      dist = Asteroids.Util.distance(this.pos, entity.pos);
      return dist < (this.radius + entity.radius);
    }

    if (entity instanceof Asteroids.Ship) {
      dist = Asteroids.Util.distance(this.pos, entity.pos);
      return dist < (this.radius + entity.size.width / 2);
    }

    return false;
  };
})();
