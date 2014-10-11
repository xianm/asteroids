(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = function () {
  };

  Util.inherits = function (child, parent) {
    function Surrogate () { this.constructor = child; }
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  };

  Util.wrap = function (pos) {
    var pad = 100;
    var w = Asteroids.DIMS.x + pad;
    var h = Asteroids.DIMS.y + pad;

    return {
      x: (pos.x > w) ? pos.x % w : (pos.x < -pad) ? (pos.x + w) % w : pos.x,
      y: (pos.y > h) ? pos.y % h : (pos.y < -pad) ? (pos.y + h) % h : pos.y
    };
  };

  Util.randomVector = function (min, max) {
    return {
      x: min.x + (Math.random() * (max.x - min.x)),
      y: min.y + (Math.random() * (max.y - min.y))
    };
  };

  Util.scaleVector = function (vector, scalar) {
    return {
      x: vector.x * scalar,
      y: vector.y * scalar
    };
  };

  Util.addVectors = function (v1, v2) {
    return {
      x: v1.x + v2.x,
      y: v1.y + v2.y
    };
  };
})();
