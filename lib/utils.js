(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Utils = Asteroids.Utils = {};

  Utils.inherits = function (sup, sub) {
    function Surrogate () {}
    Surrogate.prototype = sup.prototype;
    sub.prototype = new Surrogate();
  };
  
  Utils.getDocWidth = function (fallback) {
    return Math.max(document.documentElement.clientWidth, 
      window.innerWidth || fallback);
  };
  
  Utils.getDocHeight = function (fallback) {
    return Math.max(document.documentElement.clientHeight, 
      window.innerHeight || fallback);
  };

  Utils.drawText = function (ctx, text, x, y, font, color) {
    ctx.font = font || "24pt Courier New";
    ctx.fillStyle = color || "#FFFFFF";
    ctx.fillText(text, x, y);
  };

  Utils.drawCenteredText = function (ctx, text, yOffset, font, color) {
    font = font || "24pt Courier New";
    color = color || "#FFFFFF";

    ctx.font = font;
    ctx.fillStyle = color;

    var size = ctx.measureText(text);
    var x = Asteroids.Game.DIM_X / 2 - (size.width / 2);
    var y = Asteroids.Game.DIM_Y / 2 - (yOffset || 12);

    Utils.drawText(ctx, text, x, y, font, color);
  };
})();
