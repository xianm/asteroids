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
    child.prototype.$super = parent.prototype;
  };

  Util.randomVector = function (min, max) {
    return {
      x: min.x + (Math.random() * (max.x - min.x)),
      y: min.y + (Math.random() * (max.y - min.y))
    };
  };

  Util.addVectors = function (vec1, vec2) {
    return {
      x: vec1.x + vec2.x,
      y: vec1.y + vec2.y
    };
  };

  Util.distance = function (vec1, vec2) {
    var a2 = Math.pow(vec1.x - vec2.x, 2);
    var b2 = Math.pow(vec1.y - vec2.y, 2);
    return Math.sqrt(a2 + b2);
  };

  Util.scaleVector = function (vec, scalar) {
    return {
      x: vec.x * scalar,
      y: vec.y * scalar
    };
  };

  Util.rotateVector = function (vec, origin, angle) {
    var radians = (Math.PI / 180) * angle;
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);

    return {
      x: (cos * (vec.x - origin.x)) - (sin * (vec.y - origin.y)) + origin.x,
      y: (sin * (vec.x - origin.x)) + (cos * (vec.y - origin.y)) + origin.y
    };
  };

  Util.drawText = function (ctx, text, x, y, size) {
    size = size || 12;
    
    ctx.font = size + "pt Courier New, Courier, monospace";
    ctx.fillStyle = "#FFFFFF";

    var lines = text.split("\n");
    var yOff = size;

    for (var i = 0, l = lines.length; i < l; ++i) {
      ctx.fillText(lines[i], x, y);
      y += size + yOff;
    }
  };

  Util.drawTextCentered = function (ctx, text, size) {
    size = size || 12;

    ctx.font = size + "pt Courier New, Courier, monospace";
    ctx.fillStyle = "#FFFFFF";

    var lines = text.split("\n");
    var yOff = size;
    var y = (Asteroids.DIMS.y - (lines.length * (size + yOff) - yOff)) / 2;

    for (var i = 0, l = lines.length; i < l; ++i) {
      var line = lines[i];
      var x = (Asteroids.DIMS.x - ctx.measureText(line).width) / 2;
      ctx.fillText(line, x, y);
      y += size + yOff;
    }
  };
})();
