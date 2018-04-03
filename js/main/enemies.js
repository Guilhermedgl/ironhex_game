function Enemy(game) {
  this._game = game;

  this._life = ENEMY_LIFE;
  this._strength = 0;

  this._diagonal = Math.floor(this._life / 2);
  this._side = Math.sqrt(
    Math.pow(this._diagonal, 2) - Math.pow(this._diagonal / 2, 2)
  );

  this._position_X = Math.floor(
    Math.random() * (this._game._board.width - 2 * this._side) + this._side
  );
  this._position_Y = Math.floor(
    Math.random() * (this._game._board.height - 2 * this._diagonal) +
      this._diagonal
  );

  this._velocity_X = 1;
  this._velocity_Y = 1;
}

Enemy.prototype.move = function() {
  this._position_X += this._velocity_X;
  this._position_Y += this._velocity_Y;
  
  if (
    this._position_X - this._side <= 0 ||
    this._position_X + this._side >= this._game._board.width
  ) {
    this._velocity_X *= -1;
  }
  if (
    this._position_Y - this._diagonal <= 0 ||
    this._position_Y + this._diagonal >= this._game._board.height
  ) {
    this._velocity_Y *= -1;
  }
};

Enemy.prototype.draw = function() {
  drawHex(
    this._game,
    this._position_X,
    this._position_Y,
    this._side,
    this._diagonal,
    "#C40500",
    this._life
  );
};

Enemy.prototype.eatSnack = function(snack) {
  if (this._life <= MAX_SIZE) {
    this._life += snack._energy;
    this._strength = this._life * 1.5;
    console.log(this._strength);
  }
};