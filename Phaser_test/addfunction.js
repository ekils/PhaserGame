/**
 * Created by danny on 2018/3/9.
 */

function ballLeaveScreen() {
    lives--;
    if (lives){ //!=0
        liveText.setText('Lives:'+lives);
        liveLostText.visible =true;
        ball.reset(400, 300);
        paddle.reset(game.world.width*0.5,game.world.height-10);
        game.input.onDown.addOnce(function(){
            liveLostText.visible = false;
            ball.body.velocity.set(150,-150);
        })
    }
    else{
        alert(" XXXXX OUT ");
        location.reload(); // js 刷新頁面語法
    }
}


function initBricks(){
    brickinfo ={
        width: 50,
        height: 20,
        count:{
            row:12,
            col:5
        },
        offset:{
            top: 50,
            left: 60
        },
        padding:10
    };
    bricks = game.add.group();
    for(var c = 0; c< brickinfo.count.col; c++){
        for(var r=0 ; r < brickinfo.count.row; r++ ){
            var brickX = r*(brickinfo.width+brickinfo.padding)+brickinfo.offset.left;
            var brickY = c*(brickinfo.height+brickinfo.padding)+brickinfo.offset.top;
            newbrick = game.add.sprite(brickX,brickY,'brick');
            game.physics.enable(newbrick,Phaser.Physics.ARCADE);
            newbrick.body.immovable= true;
            newbrick.anchor.set(0.5);
            bricks.add(newbrick);
        }
    }

}


function ballHitBrick(ball,brick){  //brick 為隨意參數命名 不能為bricks 是因為第21行有先宣告了

    var killTween = game.add.tween(brick.scale);
    killTween.to({x:0,y:0},200,Phaser.Easing.Linear.None);
    killTween.onComplete.addOnce(function (){
        brick.kill();
    },this);
    killTween.start();


    score+= 10;
    scoreText.setText('points: '+score);
    console.log("points :%d",score);

    if(score === brickinfo.count.row*brickinfo.count.col*10) {
        alert('You won the game, congratulations!');
        location.reload();
    }
}

function  ballHitPaddle(ball,paddle) {
    ball.animations.play('wobble');
}


function startGame() {
    startButton.destroy();
    ball.body.velocity.set(150,-150);
    playing = true;
}