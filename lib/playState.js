(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var PlayState = Asteroids.PlayState = function (game) {
    this.game = game;
    
    this.lives = Asteroids.Game.LIVES;
    this.score = 0;
    
    this.ship = new Asteroids.Ship(this);

    this.asteroids = [];
    this.createAsteroids();
    
    this.bullets = [];
  };
  
  PlayState.prototype.enter = function () {
    key('w, up', function () { this.ship.power([0, -1]); }.bind(this));
    key('s, down', function () { this.ship.power([0, 1]);  }.bind(this));
    key('a, left', function () { this.ship.power([-1, 0]); }.bind(this));
    key('d, right', function () { this.ship.power([1, 0]);  }.bind(this));
    key('z, space', function () { this.ship.fireBullets();  }.bind(this));
  };
  
  PlayState.prototype.exit = function () {
    key.unbind('w, s, d, a, z, up, down, left, right, space');
  };
  
  PlayState.prototype.createAsteroids = function () {
    for (var i = 0; i < Asteroids.Game.NUM_ASTEROIDS; ++i) {
      this.add(new Asteroids.Asteroid(this, this.randomPosition()));
    }
  };
  
  PlayState.prototype.randomPosition = function () {
    return [Asteroids.Game.DIM_X * Math.random(), Asteroids.Game.DIM_Y * Math.random()];
  };
  
  PlayState.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    } else if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    }
  };
  
  PlayState.prototype.remove = function (obj) {
    if (obj instanceof Asteroids.Bullet) {
      var index = this.bullets.indexOf(obj);
      if (index > -1) {
        this.bullets.splice(index, 1);
      }
    } else if (obj instanceof Asteroids.Asteroid) {
      var index = this.asteroids.indexOf(obj);
      if (index > -1) {
        this.asteroids.splice(index, 1);
      }
    }
  };
  
  PlayState.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship).concat(this.bullets);
  };
  
  PlayState.prototype.draw = function (ctx) {
    var objs = this.allObjects();
    var length = objs.length;
    
    for (var i = 0; i < length; ++i) {
      objs[i].draw(ctx);
    }
    
    var scoreTxt = "Score:" + this.score;
    var livesTxt = "Lives:" + this.lives;
    
    Asteroids.Utils.drawText(ctx, scoreTxt, 20, 44, "14pt Courier New");
    Asteroids.Utils.drawText(ctx, livesTxt, 20, 80, "14pt Courier New");
  };
  
  PlayState.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();

    if (this.lives === 0) {
      this.game.changeState(new Asteroids.GameOverState(this.game));
    } else if (this.asteroids.length === 0) {
      this.game.changeState(new Asteroids.WinState(this.game, this.score));
    }
  };
  
  PlayState.prototype.moveObjects = function() {
    var objs = this.allObjects();
    var length = objs.length;

    for (var i = 0; i < length; ++i) {
      objs[i].move();
    }
  };

  Object.prototype.isA = function (what) {
    return (this instanceof what);
  };
    
  PlayState.prototype.checkCollisions = function () {
    var objs = this.bullets.concat(this.ship);
    var objsLength = objs.length;
    var asteroidsLength = this.asteroids.length;

    for (var i = 0; i < objsLength; ++i) {
      var obj1 = objs[i];
      for (var j = 0; j < asteroidsLength; ++j) {
        var obj2 = this.asteroids[j];
        if (obj1.collidesWith(obj2)) {
          obj1.collidedWith(obj2);
        }
      }
    }
  };
  
  PlayState.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0 || pos[0] > Asteroids.Game.DIM_X || pos[1] < 0 ||
            pos[1] > Asteroids.Game.DIM_Y);
  };
  
  PlayState.prototype.wrap = function (pos) {
    if(pos[0] > Asteroids.Game.DIM_X) pos[0] = 0;
    if(pos[1]> Asteroids.Game.DIM_Y) pos[1] = 0;
    if(pos[0] < 0) pos[0] = Asteroids.Game.DIM_X;
    if(pos[1] < 0) pos[1] = Asteroids.Game.DIM_Y;
  };
})();
