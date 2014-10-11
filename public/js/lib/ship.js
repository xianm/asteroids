(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    Asteroids.Entity.call(this, options);

    this.color = "#EEE";
    this.size = { width: 20, height: 30 };
    this.rotation = Math.random() * 360;
  };

  Asteroids.Util.inherits(Ship, Asteroids.Entity);

  Ship.prototype.render = function (ctx) {
    var bounds = this.bounds();

    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.moveTo(bounds.nose.x, bounds.nose.y);
    ctx.lineTo(bounds.tailLeft.x, bounds.tailLeft.y);
    ctx.lineTo(bounds.tailRight.x, bounds.tailRight.y);

    ctx.fill();
    ctx.closePath();
  };

  Ship.prototype.bounds = function () {
    var halfH = this.size.height / 2;
    var halfW = this.size.width / 2;

    var bounds = {
      nose: { 
        x: this.pos.x, 
        y: this.pos.y - halfH
      },

      tailLeft: {
        x: this.pos.x - halfW,
        y: this.pos.y + halfH
      },

      tailRight: {
        x: this.pos.x + halfW, 
        y: this.pos.y + halfH
      }
    };

    var rotate = Asteroids.Util.rotateVector;

    return {
      nose: rotate(bounds.nose, this.pos, this.rotation),
      tailLeft: rotate(bounds.tailLeft, this.pos, this.rotation),
      tailRight: rotate(bounds.tailRight, this.pos, this.rotation)
    };
  };
})();
