function Enemy() {
    // 敌方的随机位置
    this.x = _.random(500, 800);
    this.y = _.random(0, 500);
    this.direction = "up";
    this.rot = 0;
    // 改变动作
    this.enemygong = true;
    this.index = 3;
    this.color = "green";
}
Enemy.prototype.render = function() {
    game.ctx.beginPath();
    game.ctx.arc(this.x + 100, this.y, 10, 0, Math.PI * 2);
    game.ctx.fillStyle = "black";
    game.ctx.fill();
    // 身子
    game.ctx.beginPath();
    game.ctx.moveTo(this.x + 100, this.y + 15);
    game.ctx.lineTo(this.x + 100, this.y + 45);
    game.ctx.lineWidth = 12;
    game.ctx.lineCap = "round";
    game.ctx.strokeStyle = "black";
    game.ctx.stroke();
    // 腿
    game.ctx.beginPath();
    game.ctx.moveTo(this.x + 100, this.y + 45);
    game.ctx.lineTo(this.x + 93, this.y + 60);

    game.ctx.moveTo(this.x + 100, this.y + 45);
    game.ctx.lineTo(this.x + 103, this.y + 60);

    game.ctx.moveTo(this.x + 103, this.y + 60);
    game.ctx.lineTo(this.x + 112, this.y + 77);

    game.ctx.moveTo(this.x + 93, this.y + 60);
    game.ctx.lineTo(this.x + 90, this.y + 77);
    game.ctx.lineWidth = 8;
    game.ctx.lineCap = "round";
    game.ctx.strokeStyle = "black";
    game.ctx.stroke();
    // 胳膊
    game.ctx.save();
    game.ctx.translate(this.x + 100, this.y + 16);
    game.ctx.rotate(this.rot);
    game.ctx.beginPath();
    game.ctx.moveTo(0, 0);
    game.ctx.lineTo(-20, 29);
    game.ctx.moveTo(0, 0);
    game.ctx.lineTo(10, 14);
    if (this.enemygong) {
        game.ctx.moveTo(10, 14);
        game.ctx.lineTo(-15, 17);
    } else {
        game.ctx.moveTo(10, 14);
        game.ctx.lineTo(-8, 12);
    }
    game.ctx.lineWidth = 6;
    game.ctx.lineCap = "round";
    game.ctx.strokeStyle = "black";
    game.ctx.stroke();
    // 弓箭的线
    game.ctx.beginPath();
    if (this.enemygong) {
        game.ctx.moveTo(4, 36);
        game.ctx.lineTo(-31, 9);
    } else {
        game.ctx.moveTo(4, 30);
        game.ctx.lineTo(-8, 12);
        game.ctx.lineTo(-26, 6);
    }
    game.ctx.lineWidth = 3;
    game.ctx.strokeStyle = "#fff";
    game.ctx.stroke();
    // 弓
    game.ctx.beginPath();
    if (this.enemygong) {
        game.ctx.moveTo(4, 36);
        game.ctx.quadraticCurveTo(-30, 41, -31, 9);
    } else {
        game.ctx.moveTo(4, 30);
        game.ctx.quadraticCurveTo(-30, 41, -26, 6);
    }
    game.ctx.lineWidth = 5;
    game.ctx.strokeStyle = "yellow";
    game.ctx.stroke();
    // 箭
    if (this.enemygong) {
        game.ctx.beginPath();
        game.ctx.moveTo(-20, 29);
        game.ctx.lineTo(-20 - 21, 29 + 31);
        game.ctx.lineWidth = 2;
        game.ctx.strokeStyle = "black";
        game.ctx.stroke();
        game.ctx.beginPath();
        game.ctx.moveTo(-20 - 15, 29 + 29);
        game.ctx.lineTo(-20 - 21, 29 + 31);
        game.ctx.lineTo(-20 - 21, 29 + 25);
        game.ctx.closePath();
        game.ctx.fillStyle = "black";
        game.ctx.fill();
        game.ctx.restore();
    } else {
        game.ctx.beginPath();
        game.ctx.moveTo(-7, 10.15);
        game.ctx.lineTo(-7 - 21, 10.15 + 31);
        game.ctx.lineWidth = 2;
        game.ctx.strokeStyle = "black";
        game.ctx.stroke();
        game.ctx.beginPath();
        game.ctx.moveTo(-7 - 15, 10.15 + 29);
        game.ctx.lineTo(-7 - 21, 10.15 + 31);
        game.ctx.lineTo(-7 - 21, 10.15 + 25);
        game.ctx.closePath();
        game.ctx.fillStyle = "black";
        game.ctx.fill();
        game.ctx.restore();
    }
    // 血量
    game.ctx.beginPath();
    game.ctx.drawImage(game.res["enemy"], this.x + 58, this.y + 68, 88, 63);
    game.ctx.fillStyle = this.color;
    game.ctx.fillRect(this.x + 78, this.y + 68 + 63, 50, 5);
}
Enemy.prototype.updata = function() {

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