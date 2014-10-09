(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var PlayState = Asteroids.PlayState = function (game) {
    this.game = game;
    this.world = new Asteroids.World(game, {
      onAsteroidShot: function () { this.score++; }.bind(this),
      onPlayerHit: function () { 
        this.lives--; 
        this.world.player.relocate();
      }.bind(this)
    });

    this.lives = Asteroids.Game.MAX_LIVES;
    this.score = 0;
  };
  
  PlayState.prototype.enter = function () {
    var player = this.world.player;

    key('w, up',    player.power.bind(player, [ 0, -1]));
    key('s, down',  player.power.bind(player, [ 0,  1]));
    key('a, left',  player.power.bind(player, [-1,  0]));
    key('d, right', player.power.bind(player, [ 1,  0]));
    key('z, space', player.fireBullets.bind(player));
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
    var scoreTxt = "Score: " + this.score;
    var livesTxt = "Lives: " + this.lives;
    
    Asteroids.Utils.drawText(ctx, scoreTxt, 20, 44, "14pt Courier New");
    Asteroids.Utils.drawText(ctx, livesTxt, 20, 80, "14pt Courier New");
  };
  
  PlayState.prototype.step = function () {
    this.world.step();

    if (this.lives === 0 || this.world.asteroids.length === 0) {
      this.game.changeState(new Asteroids.GameOverState(this.game, this.score));
    }
  };
})();
