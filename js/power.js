function Power(x, y) {
    this.x = x;
    this.y = y;
}
Power.prototype.render = function() {
    game.ctx.beginPath();
    game.ctx.arc(this.x, this.y, 15, 0, Math.PI * 2, false);
    game.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, true);
    game.ctx.closePath();
    game.ctx.fillStyle = "#339d28";
    game.ctx.fill();

    game.ctx.beginPath();
    game.ctx.moveTo(this.x, this.y);
    game.ctx.lineTo(game.x2, game.y2);
    game.ctx.closePath();
    game.ctx.lineWidth = 2;
    game.ctx.strokeStyle = "#fff";
    game.ctx.stroke();
}