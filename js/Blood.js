function Blood(x, y) {
    this.x = x;
    this.y = y;
    this.col = 1;
    // 随机方向
    this.directionx = Math.random() > 0.5 ? Math.floor(Math.random() * 6) : -Math.floor(Math.random() * 6);
    this.directiony = Math.random() > 0.5 ? Math.floor(Math.random() * 6) : -Math.floor(Math.random() * 6);
    game.arr1.push(this);
}
Blood.prototype.render = function() {
    game.ctx.save();
    game.ctx.globalAlpha = this.col;
    game.ctx.beginPath();
    game.ctx.arc(this.x + 100, this.y + 45, 5, 0, Math.PI * 2);
    game.ctx.arc(this.x + 100, this.y + 45, 5, 0, Math.PI * 2);
    game.ctx.fillStyle = "red";
    game.ctx.fill();
    game.ctx.restore();
}
Blood.prototype.updata = function() {
    this.x += this.directionx;
    this.y += this.directiony;
    // 改变透明度
    this.col -= 0.05;
    if (this.col <= 0) {
        game.arr1 = _.without(game.arr1, this);
    }
}