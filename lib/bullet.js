(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Bullet = Asteroids.Bullet = function (world, pos, vel) {  
    Asteroids.MovingObject.call(this,
      {
        world: world,
        pos: pos,
        vel: vel,
        color : Bullet.COLOR,
        radius: Bullet.RADIUS 
      }
    );  
  };

  Asteroids.Utils.inherits(Asteroids.MovingObject, Bullet);
    
  Bullet.COLOR = "#00FF00";
  Bullet.RADIUS = 2;
  
  Bullet.prototype.isWrappable = false;

  Bullet.prototype.collidedWith = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.world.remove(this);
      this.world.remove(obj);
      this.world.game.score++;
    }
  };
})();
