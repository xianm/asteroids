(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var WinState = Asteroids.WinState = function (game) {
    this.game = game;
  };
    
  WinState.prototype.enter = function () {
    key('r', function () { this.backToMenu(); }.bind(this));
  };
  
  WinState.prototype.exit = function () {
    key.unbind('r');
  };
    
  WinState.prototype.draw = function (ctx) {
    var bigTxt = "You win! Score: " + this.game.score;
    var smlTxt = "Press [R] to play again...";

    Asteroids.Utils.drawCenteredText(ctx, bigTxt, 36);
    Asteroids.Utils.drawCenteredText(ctx, smlTxt, -9, "12pt Courier New");
  };
  
  WinState.prototype.step = function () {
  };
  
  WinState.prototype.backToMenu = function () {
    game.changeState(new Asteroids.MenuState(this.game));
  };
})();
