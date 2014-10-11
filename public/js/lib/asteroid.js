(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    Asteroids.Entity.call(this, options);

    this.radius = 55;
    this.color = "#999";
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.Entity); 

  Asteroid.prototype.render = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  };
})();
