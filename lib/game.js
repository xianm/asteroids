(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
    
  var Game = Asteroids.Game = function () {
    this.state = null;
    this.changeState(new Asteroids.MenuState(this));
  };
  
  Game.DIM_X = Asteroids.Utils.getDocWidth(500) - 10; 
  Game.DIM_Y = Asteroids.Utils.getDocHeight(500) - 10;
  Game.NUM_ASTEROIDS = 3;
  Game.LIVES = 5;
  
  Game.prototype.changeState = function (newState) {
    if (this.state != null) {
      this.state.exit();
    }
    
    this.state = newState;
    this.state.enter();
  };
    
  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    
    this.state.draw(ctx);
  };
  
  Game.prototype.step = function () {
    this.state.step();
  };
})();
