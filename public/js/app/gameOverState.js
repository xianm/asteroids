(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var GameOverState = Asteroids.GameOverState = function (game) {
    this.game = game;
  };
    
  GameOverState.prototype.enter = function () {
    key('r', function () { this.backToMenu(); }.bind(this));
  };
  
  GameOverState.prototype.exit = function () {
    key.unbind('r');
  };
    
  GameOverState.prototype.draw = function (ctx) {
    var bigTxt = "Game Over, You Lose!";
    var smlTxt = "Press [R] to play again...";

    Asteroids.Utils.drawCenteredText(ctx, bigTxt, 36);
    Asteroids.Utils.drawCenteredText(ctx, smlTxt, -9, "12pt Courier New");
  };
  
  GameOverState.prototype.step = function () {
  };

  GameOverState.prototype.backToMenu = function () {
    this.game.changeState(new Asteroids.MenuState(this.game));
  };
})();
