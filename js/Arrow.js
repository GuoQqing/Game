function Arrow(ownerrot, arrowx, arrowy) {
    this.arrowx = arrowx;
    this.arrowy = arrowy;
    this.arrowData = { x: this.arrowx, y: this.arrowy, a: 0.2, vx: 12, vy: 1 };
    // 相对于水平的角度
    this.ownerrot = ownerrot;
    this.arrowrot = this.ownerrot + Math.atan2(29, 20);
    this.color = "black";

    game.arr.push(this);
}
Arrow.prototype.render = function() {
    game.ctx.save();
    // 箭的位置
    game.ctx.translate(this.arrowData.x, this.arrowData.y);
    // 旋转射出去箭的角度（弧度）
    game.ctx.rotate(Math.atan2(this.arrowData.y - this.oldy, this.arrowData.x - this.oldx));
    game.ctx.beginPath();
    game.ctx.moveTo(0, 0);
    game.ctx.lineTo(35, 0);
    game.ctx.lineWidth = 2;
    game.ctx.strokeStyle = this.color;
    game.ctx.stroke();

    game.ctx.beginPath();
    game.ctx.moveTo(35, 0);
    game.ctx.lineTo(30, -5);
    game.ctx.lineTo(30, 5);
    game.ctx.closePath();
    game.ctx.fillStyle = this.color;
    game.ctx.fill();
    game.ctx.restore();
}
Arrow.prototype.updata = function() {
    // 备份上一次的坐标
    this.oldx = this.arrowData.x;
    this.oldy = this.arrowData.y;
    // vy的变化(箭的弧度)
    this.arrowData.vy += this.arrowData.a;
    // 判断弧度的范围 决定射箭的方向
    if (this.arrowrot <= 0 && this.arrowrot > -1.5 || this.arrowrot > 0 && this.arrowrot < 1.5) {
        this.arrowData.x += this.arrowData.vx;
        // y的变化量等于vx的增量*角度对应弧度的tan值
        this.arrowData.y -= (-Math.tan(this.arrowrot)) * (this.arrowData.vx) - this.arrowData.vy;
    } else {
        this.arrowData.x -= this.arrowData.vx;

        this.arrowData.y -= (Math.tan(this.arrowrot)) * (this.arrowData.vx) - this.arrowData.vy;
    }
    // 超出画布后在数组中删除
    if (this.arrowData.x > 1000 || this.arrowData.y > 600) {
        game.arr = _.without(game.arr, this);
    }
    // 判断是否射中敌方
    if (this.arrowData.x >= game.enemy.x + 95 && this.arrowData.x <= game.enemy.x + 110 && this.arrowData.y >= game.enemy.y - 5 && this.arrowData.y <= game.enemy.y + 80) {
        document.getElementById("jizhong").load();
        document.getElementById("jizhong").play();
        this.color = "rgba(0,0,0,0)";
        game.enemy.index--;
        // 当index为0时new一个敌人
        if (game.enemy.index <= 0) {
            game.enemy = new Enemy();
            game.score++;
        }
        // 射中后呲血
        for (var i = 0; i < 50; i++) {
            game.blood = new Blood(game.enemy.x, game.enemy.y);
        }
    }
    // 判断是否爆头
    if (this.arrowData.x >= game.enemy.x + 95 && this.arrowData.x <= game.enemy.x + 105 && this.arrowData.y >= game.enemy.y - 8 && this.arrowData.y <= game.enemy.y + 10) {
        document.getElementById("bao").load();
        document.getElementById("bao").play();
        for (var i = 0; i < 50; i++) {
            game.blood = new Blood(game.enemy.x, game.enemy.y);
        }
        // 爆头数加一
        game.bao++;
        // 分数加二
        game.score += 2;
        // 直接死亡
        game.enemy.index = 0;
        game.baotou = new Baotou(game.enemy.x + 35, game.enemy.y - 40);
        game.enemy = new Enemy();
    }
    // 判断是否被射中
    if (this.arrowData.x >= 95 && this.arrowData.x <= 110 && this.arrowData.y >= 290 && this.arrowData.y <= 377) {
        document.getElementById("jizhong").load();
        document.getElementById("jizhong").play();
        this.color = "rgba(0,0,0,0)";
        game.user.index--;
        if (game.user.index <= 0) {
            setTimeout(function() {
                game.scene.sceneNumber = 3;
                game.user = new User();
                game.enemy = new Enemy();
            }, 500)
        }
        // 射中后呲血
        for (var i = 0; i < 50; i++) {
            game.blood = new Blood(0, 300);
        }
    }
    // 根据白线调整射击的力度
    // if(Math.sqrt(Math.pow(game.x2-game.xxx,2)+Math.pow(game.y2-game.yyy,2))&&!game.arrow){
    //  // 已经new出来的不要管了
    //  this.arrowData.vx=10+Math.sqrt(Math.pow(game.x2-game.xxx,2)+Math.pow(game.y2-game.yyy,2))*(20/1200);
    // }else{
    //  this.arrowData.vx=12;
    // }
}