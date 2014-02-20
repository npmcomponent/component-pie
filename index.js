
/**
 * Module dependencies.
 */

var style = require('component-style');

/**
 * Expose `Pie()`.
 */

module.exports = Pie;

/**
 * Initialize a new `Pie` with
 * an optional css `selector`,
 * defaulting to ".pie".
 *
 * @param {String} selector
 * @api public
 */

function Pie(selector) {
  if (!(this instanceof Pie)) return new Pie(selector);
  selector = selector || '.pie';
  this.background = style(selector, 'background-color');
  this.borderWidth = parseInt(style(selector, 'border-width'), 10);
  this.borderColor = style(selector, 'border-color');
  this.color = style(selector, 'color');
  this.size(16);
}

/**
 * Update percentage to `n`.
 *
 * @param {Number} n
 * @return {Pie}
 * @api public
 */

Pie.prototype.update = function(n){
  this.percent = n;
  return this;
};

/**
 * Set size to `n`.
 *
 * @param {Number} n
 * @return {Pie}
 * @api public
 */

Pie.prototype.size = function(n){
  this._size = n;
  return this;
};

/**
 * Draw on to `ctx`.
 *
 * @param {CanvasContext2d} ctx
 * @return {Pie}
 * @api public
 */

Pie.prototype.draw = function(ctx){
  var size = this._size;
  var half = size / 2;
  var n = this.percent / 100;
  var pi = Math.PI * 2;

  // clear
  ctx.clearRect(0, 0, size, size);

  // border
  ctx.beginPath();
  ctx.moveTo(half, half);
  ctx.arc(half, half, half, 0, pi, false);
  ctx.fillStyle = this.borderColor;
  ctx.fill();

  // background
  ctx.beginPath();
  ctx.moveTo(half, half);
  ctx.arc(half, half, half - this.borderWidth, 0, pi, false);
  ctx.fillStyle = this.background;
  ctx.fill();

  // pie
  ctx.beginPath();
  ctx.moveTo(half, half);
  ctx.arc(half, half, half - this.borderWidth, 0, pi * n, false);
  ctx.fillStyle = this.color;
  ctx.fill();

  return this;
};
