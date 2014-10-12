(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Entity = Asteroids.Entity = function (options) {
    this.game = options.game;
    this.pos = options.pos;
    this.vel = options.vel;
    this.wrap = options.wrap || true;
  };

  Entity.prototype.update = function (delta) {
    var dv = Asteroids.Util.scaleVector(this.vel, delta);
    this.pos = Asteroids.Util.addVectors(this.pos, dv);

    if (this.wrap) {
      this.pos = this.game.wrap(this.pos);
    }
  };

  Entity.prototype.render = function (ctx) { };
  Entity.prototype.collidesWith = function (entity) { };
  Entity.prototype.collidedWith = function (entity) { };
})();
