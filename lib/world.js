(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var World = Asteroids.World = function (game) {
    this.game = game;
    this.ship = new Asteroids.Ship(this);
    this.bullets = [];
    this.asteroids = [];
    this.populate(Asteroids.Game.NUM_ASTEROIDS);
  };

  World.prototype.entities = function () {
    return this.asteroids.concat(this.ship).concat(this.bullets);
  };

  World.prototype.populate = function (count) {
    for (var i = 0; i < count; ++i) {
      this.add(new Asteroids.Asteroid(this, Asteroids.Utils.randomPos()));
    }
  };

  World.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
  };

  World.prototype.remove = function (obj) {
    var index = -1;

    if (obj instanceof Asteroids.Asteroid) {
      index = this.asteroids.indexOf(obj);
      if (index > -1) {
        this.asteroids.splice(index, 1);
      }
    } else if (obj instanceof Asteroids.Bullet) {
      index = this.bullets.indexOf(obj);
      if (index > -1) {
        this.bullets.splice(index, 1);
      }
    }
  };

  World.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  World.prototype.moveObjects = function () {
    this.entities().forEach(function (entity) {
      entity.move();
    });
  };

  World.prototype.checkCollisions = function () {
    var entities = this.bullets.concat(this.ship);
    var world = this;
    
    entities.forEach(function (entity) {
      world.asteroids.forEach(function (asteroid) {
        if (entity.collidesWith(asteroid)) {
          entity.collidedWith(asteroid);
        }
      });
    });
  };

  World.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0 || pos[0] > Asteroids.Game.DIM_X || pos[1] < 0 ||
        pos[1] > Asteroids.Game.DIM_Y);
  };

  World.prototype.wrap = function (pos) {
    if(pos[0] > Asteroids.Game.DIM_X) pos[0] = 0;
    if(pos[1]> Asteroids.Game.DIM_Y) pos[1] = 0;
    if(pos[0] < 0) pos[0] = Asteroids.Game.DIM_X;
    if(pos[1] < 0) pos[1] = Asteroids.Game.DIM_Y;
  };
})();
