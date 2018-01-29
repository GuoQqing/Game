function User() {
    this.rot = 0;
    this.direction = "up";
    this.gong = true;
    this.x = 20;
    this.y = 29;
    this.userx = 100;
    this.usery = 316;
    this.index = 3;
    this.color = "green";
}
User.prototype.render = function() {
    game.ctx.beginPath();
    game.ctx.arc(100, 300, 10, 0, Math.PI * 2);
    game.ctx.fillStyle = "black";
    game.ctx.fill();
    // 身子
    game.ctx.beginPath();
    game.ctx.moveTo(100, 315);
    game.ctx.lineTo(100, 345);
    game.ctx.lineWidth = 12;
    game.ctx.lineCap = "round";
    game.ctx.strokeStyle = "black";
    game.ctx.stroke();
    // 腿
    game.ctx.beginPath();
    game.ctx.moveTo(100, 345);
    game.ctx.lineTo(97, 360);
    game.ctx.moveTo(100, 345);
    game.ctx.lineTo(107, 360);
    game.ctx.moveTo(97, 360);
    game.ctx.lineTo(88, 377);
    game.ctx.moveTo(107, 360);
    game.ctx.lineTo(110, 377);
    game.ctx.lineWidth = 8;
    game.ctx.lineCap = "round";
    game.ctx.strokeStyle = "black";
    game.ctx.stroke();
    // 胳膊
    game.ctx.save();
    game.ctx.translate(100, 316);
    game.ctx.rotate(this.rot);
    game.ctx.beginPath();
    game.ctx.moveTo(0, 0);
    game.ctx.lineTo(20, 29);
    game.ctx.moveTo(0, 0);
    game.ctx.lineTo(-10, 14);
    // 收胳膊
    if (this.gong) {
        game.ctx.moveTo(-10, 14);
        game.ctx.lineTo(15, 17);
    } else {
        game.ctx.moveTo(-10, 14);
        game.ctx.lineTo(8, 12);
    }
    game.ctx.lineWidth = 6;
    game.ctx.lineCap = "round";
    game.ctx.strokeStyle = "black";
    game.ctx.stroke();
    // 弓箭的线
    game.ctx.beginPath();
    if (this.gong) {
        game.ctx.moveTo(-4, 36);
        game.ctx.lineTo(31, 9);
    } else {
        game.ctx.moveTo(-4, 30);
        game.ctx.lineTo(8, 12);
        game.ctx.lineTo(26, 6);
    }
    game.ctx.lineWidth = 3;
    game.ctx.strokeStyle = "#fff";
    game.ctx.stroke();
    // 弓
    game.ctx.beginPath();
    if (this.gong) {
        game.ctx.moveTo(-4, 36);
        game.ctx.quadraticCurveTo(30, 41, 31, 9);
    } else {
        game.ctx.moveTo(-4, 30);
        game.ctx.quadraticCurveTo(30, 41, 26, 6);
    }
    game.ctx.lineWidth = 5;
    game.ctx.strokeStyle = "skyblue";
    game.ctx.stroke();
    // 箭
    game.ctx.beginPath();
    game.ctx.moveTo(this.x, this.y);
    game.ctx.lineTo(this.x + 21, this.y + 31);
    game.ctx.lineWidth = 2;
    game.ctx.strokeStyle = "black";
    game.ctx.stroke();
    game.ctx.beginPath();
    game.ctx.moveTo(this.x + 15, this.y + 29);
    game.ctx.lineTo(this.x + 21, this.y + 31);
    game.ctx.lineTo(this.x + 21, this.y + 25);
    game.ctx.closePath();
    game.ctx.fillStyle = "black";
    game.ctx.fill();
    game.ctx.restore();
    // 血量
    game.ctx.beginPath();
    game.ctx.drawImage(game.res["user"], 53, 382, 96, 32);
    game.ctx.fillStyle = this.color;
    game.ctx.fillRect(75, 414, 50, 5);
    // 星星
    game.ctx.beginPath();
    game.ctx.drawImage(game.res["score"], 17, 0, 30, 30);
    game.ctx.beginPath();
    game.ctx.drawImage(game.res["bao"], -32, 0);
}
User.prototype.updata = function() {

    // 胳膊上下摆动
    if (this.direction == "up") {
        this.rot -= 0.01;
        if (this.rot <= -0.4) {
            this.direction = "down";
        }
    } else if (this.direction == "down") {
        this.rot += 0.01;
        if (this.rot >= 0) {
            this.direction = "up";
        }
    }
    // 判断血量
    if (this.index == 2) {
        this.color = "yellow";
    } else if (this.index == 1) {
        this.color = "red";
    }
}