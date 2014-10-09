(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var MenuState = Asteroids.MenuState = function (game) {
    this.game = game;
  };
    
  MenuState.prototype.enter = function () {
    key('enter', function () { this.playGame(); }.bind(this));
  };
  
  MenuState.prototype.exit = function () {
    key.unbind('enter');
  };
    
  MenuState.prototype.draw = function (ctx) {
    Asteroids.Utils.drawCenteredText(ctx, "Press [ENTER] to play. . .");
  };
  
  MenuState.prototype.step = function () {
  };
  
  MenuState.prototype.playGame = function () {
    game.changeState(new Asteroids.PlayState(this.game));
  };
})();
