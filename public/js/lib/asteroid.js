(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    Asteroids.Entity.call(this, options);

    this.color = "#999";
    this.radius = 55;
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.Entity); 

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
