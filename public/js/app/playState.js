(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var PlayState = Asteroids.PlayState = function (game) {
    this.game = game;
    this.world = new Asteroids.World(game);
  };
  
  PlayState.prototype.enter = function () {
    key('w, up', function () { this.world.ship.power([0, -1]); }.bind(this));
    key('s, down', function () { this.world.ship.power([0, 1]);  }.bind(this));
    key('a, left', function () { this.world.ship.power([-1, 0]); }.bind(this));
    key('d, right', function () { this.world.ship.power([1, 0]);  }.bind(this));
    key('z, space', function () { this.world.ship.fireBullets();  }.bind(this));
  };
  
  PlayState.prototype.exit = function () {
    key.unbind('w, s, d, a, z, up, down, left, right, space');
  };
  
  PlayState.prototype.draw = function (ctx) {
    this.drawEntities(ctx);
    this.drawUI(ctx);
  };

  PlayState.prototype.drawEntities = function (ctx) {
    var entities = this.world.entities();
    var entityCount = entities.length;
    
    for (var i = 0; i < entityCount; ++i) {
      entities[i].draw(ctx);
    }
  };

  PlayState.prototype.drawUI = function (ctx) {
    var scoreTxt = "Score:" + this.game.score;
    var livesTxt = "Lives:" + this.game.lives;
    
    Asteroids.Utils.drawText(ctx, scoreTxt, 20, 44, "14pt Courier New");
    Asteroids.Utils.drawText(ctx, livesTxt, 20, 80, "14pt Courier New");
  };
  
  PlayState.prototype.step = function () {
    this.world.step();

    if (this.game.lives === 0) {
      this.game.changeState(new Asteroids.GameOverState(this.game));
    } else if (this.world.asteroids.length === 0) {
      this.game.changeState(new Asteroids.WinState(this.game));
    }
  };
})();
