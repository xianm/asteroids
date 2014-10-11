(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Entity = Asteroids.Entity = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
  };

  Entity.prototype.update = function (delta) {
    var dv = Asteroids.Util.scaleVector(this.vel, delta);
    this.pos = Asteroids.Util.addVectors(this.pos, dv);
  };

  Entity.prototype.render = function (ctx) { };
})();
