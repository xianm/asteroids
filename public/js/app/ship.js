(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Ship = Asteroids.Ship = function (world) {
    Asteroids.MovingObject.call(this, {
        world: world,
        pos: [Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2], 
        vel: [0,0],
        radius: Ship.RADIUS,
        color: Ship.COLOR
      }
    );
  };
  
  Asteroids.Utils.inherits(Asteroids.MovingObject, Ship);

  Ship.MAX_SPEED = 4;
  Ship.RADIUS = 5;
  Ship.COLOR = "#EFEFEF";

  Ship.prototype.collidedWith = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.world.game.lives--;
      this.relocate();
    }
  };

  Ship.prototype.relocate = function () {
    // TODO: should ship respawn randomly? ensure no collisions with 
    // an asteroid?
    this.pos = [Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2];
    this.vel[0] = this.vel[1] = 0;
  };
  
  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];

    if(this.vel[0] > Ship.MAX_SPEED) this.vel[0] = Ship.MAX_SPEED;
    if(this.vel[1] > Ship.MAX_SPEED) this.vel[1] = Ship.MAX_SPEED;
    if(this.vel[0] < -Ship.MAX_SPEED) this.vel[0] = -Ship.MAX_SPEED;
    if(this.vel[1] < -Ship.MAX_SPEED) this.vel[1] = -Ship.MAX_SPEED;
  };
  
  Ship.prototype.fireBullets = function () {
    var mod = this.getModifier();
    var pos = [this.pos[0] + mod[0] * (this.radius + 1),
               this.pos[1] + mod[1] * (this.radius + 1)];
    var vel = [this.vel[0] + mod[0], this.vel[1] + mod[1]];

    this.world.add(new Asteroids.Bullet(this.world, pos, vel));
  };

  Ship.prototype.getModifier = function () {
    switch (this.getDirection()) {
      case 'W': return [-1, 0];
      case 'E': return [1, 0];
      case 'S': return [0, 1];
      case 'NW': return [-1, -1];
      case 'NE': return [1, -1];
      case 'SW': return [-1, 1];
      case 'SE': return [1, 1];
      default: return [0, -1];
    }
  };
  
  Ship.prototype.getDirection = function () {
    var x = this.vel[0];
    var y = this.vel[1];
    
    if (x < 0 && y === 0) return 'W';
    if (x > 0 && y === 0) return 'E';
    if (x === 0 && y > 0) return 'S';
    if (x < 0 && y < 0) return 'NW';
    if (x > 0 && y < 0) return 'NE';
    if (x < 0 && y > 0) return 'SW';
    if (x > 0 && y > 0) return 'SE';
    // default
    return 'N';
  };
})();
