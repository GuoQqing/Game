function Game() {
    this.init();
    this.user = new User();
    this.enemy = new Enemy();
    // 箭
    this.arr = [];
    // 血
    this.arr1 = [];
}
Game.prototype.init = function () {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = 1000;
    this.height = this.canvas.height = 600;
    this.res = {
        "bg": "images/bg.jpg",
        "bao": "images/bao.png",
        "score": "images/score.png",
        "user": "images/user.png",
        "enemy": "images/enemy.png",
        "title": "images/title.png",
        "end": "images/end.png",
        "again": "images/again.png",
        "start": "images/start.png"
    }
    var self = this;
    var length = Object.keys(this.res).length;
    var count = 0;
    for (var k in this.res) {
        var image = new Image();
        image.src = this.res[k];
        this.res[k] = image;
        image.onload = function () {
            count++;
            self.clear();
            self.ctx.save();
            self.ctx.font = "18px 微软雅黑";
            self.ctx.fillStyle = "#000";
            self.ctx.textAlign = "center";
            self.ctx.fillText(`加载中 ${count}/${length}`, self.width / 2, 100);
            self.ctx.restore();
            if (count >= length) {
                self.start();
            }
        }
    }
}
Game.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
};

Game.prototype.start = function () {
    this.scene = new Scene();
    var self = this;
    this.f = 0;
    this.score = 0;
    this.bao = 0;
    this.timer = setInterval(function () {
        self.f++;
        self.clear();
        self.scene.render();
    }, 20)
};