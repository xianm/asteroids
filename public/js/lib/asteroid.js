(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    Asteroids.Entity.call(this, options);

    this.color = "#999";
    this.radius = options.radius || Asteroid.MAX_RADIUS;
    this.bounty = options.bounty || Asteroid.DEFAULT_BOUNTY;
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.Entity); 

  Asteroid.MAX_RADIUS = 60;
  Asteroid.MIN_RADIUS = 15;
  Asteroid.DEFAULT_BOUNTY = 1;

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
