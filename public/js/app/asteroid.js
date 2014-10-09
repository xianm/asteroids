(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (world, pos) {
    Asteroids.MovingObject.call(this, 
      {
        world: world,
        pos: pos, 
        vel: [this.randomSpeed(), this.randomSpeed()], 
        color: Asteroid.COLOR,
        radius: Asteroid.RADIUS
      }
    );
  };

  Asteroids.Utils.inherits(Asteroids.MovingObject, Asteroid);
  
  Asteroid.COLOR = "#AAAAAA";
  Asteroid.RADIUS = 80;
  Asteroid.MAX_SPEED = 5;
  
  Asteroid.prototype.randomSpeed = function () {
    return -Asteroid.MAX_SPEED + (Math.random() * (Asteroid.MAX_SPEED * 2));
  };
})();
