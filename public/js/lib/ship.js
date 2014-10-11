(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    Asteroids.Entity.call(this, options);

    this.color = "#EEE";
    this.size = { width: 20, height: 30 };
    this.rotation = 0;
  };

  Asteroids.Util.inherits(Ship, Asteroids.Entity);

  Ship.prototype.render = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x - (this.size.width / 2),
                 this.pos.y - (this.size.height / 2),
                 this.size.width,
                 this.size.height);
  };
})();
