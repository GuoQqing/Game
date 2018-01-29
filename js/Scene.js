function Scene() {
    // 当前场景编号
    this.sceneNumber = 1;
    this.bindEvent();
}
Scene.prototype.render = function() {
    switch (this.sceneNumber) {
        case 1:
             //分数清零 
            game.score = 0;
            game.bao = 0;
            game.ctx.save();
            game.ctx.globalAlpha = this.col;
            game.canvas.style.background = "#FFCC66";
            game.ctx.drawImage(game.res["title"], 350, 20);
            game.ctx.drawImage(game.res["start"], 410, 400, 171, 84);
            game.ctx.restore();
            break;
        case 2:
            game.ctx.beginPath();
            game.ctx.drawImage(game.res["bg"], 0, 0, 1000, 600);
            game.ctx.font = "bold 20px 微软雅黑";
            game.ctx.fillStyle = "#fff";
            game.ctx.fillText(`${game.score}`, 70, 25);
            game.ctx.fillText(`${game.bao}`, 70, 68);
            if (game.f % 40 == 0) {
                game.arrow = new Arrow((Math.random() + 1) * -game.rot, game.enemy.x + 100, game.enemy.y + 15);
                // 改变弓与胳膊的坐标（动作）
                game.enemy.enemygong = true;
                // 敌方射箭时的角度
                game.enemy.rot = game.arrow.ownerrot - Math.atan2(29, 20);
            } else {
                game.enemy.enemygong = false;
            }
            if (game.arrow) {
                for (var i = 0; i < game.arr.length; i++) {
                    game.arr[i].render();
                    game.arr[i].updata();
                }
            }
            if (game.power) {
                this.lock && game.power.render();
            }
            if (game.baotou) {
                game.baotou.render();
            }
            game.enemy.render();
            game.enemy.updata();
            game.user.render();
            game.user.updata();
            if (game.blood) {
                for (var j = 0; j < game.arr1.length; j++) {
                    game.arr1[j].render();
                    game.arr1[j].updata();
                }
            }
            break;
        case 3:
            if (game.arrow) {
                for (var i = 0; i < game.arr.length; i++) {
                    game.arr[i].render();
                    game.arr[i].updata();
                }
            }
            game.ctx.beginPath();
            game.ctx.drawImage(game.res["end"], 300, 10);
            game.ctx.drawImage(game.res["again"], 445, 480);
            game.ctx.drawImage(game.res["score"], 380, 400, 30, 30);
            game.ctx.drawImage(game.res["bao"], 460, 360);
            game.canvas.style.background = "#FFCC99";
            game.ctx.font = "bold 20px 微软雅黑";
            game.ctx.fillStyle = "#000";
            game.ctx.fillText(`${game.score}`, 430, 425);
            game.ctx.fillText(`${game.bao}`, 560, 425);
            break;
    }
}
Scene.prototype.bindEvent = function() {
    var self = this;
    this.lock = false;
    // 鼠标按下
    game.canvas.onmousedown = function(event) {
        switch (self.sceneNumber) {
            case 1:
                if (event.pageX - game.canvas.offsetLeft >= 410 && event.pageX - game.canvas.offsetLeft <= 581 && event.pageY - game.canvas.offsetTop >= 400 && event.pageY - game.canvas.offsetTop <= 484) {
                    self.sceneNumber = 2;
                }
                break;
            case 2:
                document.getElementById('bgm').volume = 0.6;
                self.lock = true;
                // 重置移动后的坐标（画白线的时候）
                game.x2 = x1;
                game.x2 = y1;
                // 改变角度
                var x1 = event.pageX - game.canvas.offsetLeft;
                var y1 = event.pageY - game.canvas.offsetTop;
                // 获得鼠标点击的位置
                // self.xxx=x1;
                // self.yyy=y1;
                drawrot(x1, y1);
                // 停止摆动
                game.user.direction = "none";
                // 改变胳膊·弓的位置
                game.user.gong = false;
                // 改变箭的位置
                game.user.x = 7;
                game.user.y = 10.15;
                // 圆环
                game.power = new Power(x1, y1);
                break;
            case 3:
                if (event.pageX - game.canvas.offsetLeft >= 445 && event.pageX - game.canvas.offsetLeft <= 509 && event.pageY - game.canvas.offsetTop >= 480 && event.pageY - game.canvas.offsetTop <= 544) {
                    self.sceneNumber = 1;
                }
                break;
        }

    }
    // 鼠标按下后移动
    game.canvas.onmousemove = function(event) {
        // 获取相对于canvas的坐标
        if (self.lock) {
            game.x2 = event.pageX - game.canvas.offsetLeft;
            game.y2 = event.pageY - game.canvas.offsetTop;
            drawrot(game.x2, game.y2);
        }
    }
    // 鼠标松开
    game.canvas.onmouseup = function() {
        // 返回初始值
        self.lock = false;
        game.user.rot = 0;
        game.user.direction = "up";
        game.user.gong = true;
        game.user.x = 20;
        game.user.y = 29;
        // 画箭
        if (self.sceneNumber == 2) {
            game.arrow = new Arrow(game.rot, game.user.userx, game.user.usery);
        }
        document.getElementById("arrow").load();
        document.getElementById("arrow").play();
    }

    function drawrot(x, y) {
        // 根据斜率得到转动的角度
        var dx = x - 100;
        var dy = y - 316;
        game.rot = Math.atan2(dy, dx) - Math.atan2(29, 20);
        game.user.rot = game.rot;
    }
}