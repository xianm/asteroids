(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var GameOverState = Asteroids.GameOverState = function (game, score) {
    this.game = game;
    this.score = score;
  };
    
  GameOverState.prototype.enter = function () {
    key('r', this.backToMenu.bind(this));
  };
  
  GameOverState.prototype.exit = function () {
    key.unbind('r');
  };
    
  GameOverState.prototype.draw = function (ctx) {
    var gameOverTxt = "Game Over! Score: " + this.score;
    var tryAgainTxt = "Press [R] to play again...";

    Asteroids.Utils.drawCenteredText(ctx, gameOverTxt, 36);
    Asteroids.Utils.drawCenteredText(ctx, tryAgainTxt, -9, "12pt Courier New");
  };
  
  GameOverState.prototype.step = function () {};

  GameOverState.prototype.backToMenu = function () {
    this.game.changeState(new Asteroids.MainMenuState(this.game));
  };
})();
