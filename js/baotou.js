function Baotou(x, y) {
    this.x = x;
    this.y = y;
    this.col = 1;
}
Baotou.prototype.render = function() {
    game.ctx.save();
    game.ctx.globalAlpha = this.col;
    game.ctx.beginPath();
    game.ctx.drawImage(game.res["bao"], this.x, this.y);
    game.ctx.restore();
    this.y--;
    this.col -= 0.01;
    if (this.col <= 0) {
        this.col = 0;
    }
}