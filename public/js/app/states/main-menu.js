(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var MainMenuState = Asteroids.MainMenuState = function (game) {
    this.game = game;
  };
    
  MainMenuState.prototype.enter = function () {
    key('enter', this.playGame.bind(this));
  };
  
  MainMenuState.prototype.exit = function () {
    key.unbind('enter');
  };
    
  MainMenuState.prototype.draw = function (ctx) {
    Asteroids.Utils.drawCenteredText(ctx, "Press [ENTER] to play. . .");
  };
  
  MainMenuState.prototype.step = function () {
  };
  
  MainMenuState.prototype.playGame = function () {
    game.changeState(new Asteroids.PlayState(this.game));
  };
})();
