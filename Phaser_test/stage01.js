/**
 * Created by danny on 2018/3/15.
 */

world.stage01= function () {};

world.stage01.prototype = {

    preload: function preload( ) {
            loading= game.add.sprite(game.world.width*0.5,game.world.height*0.5,'loading');
            loading.anchor.setTo(0.5);
            loading.animations.add('spining');
            loading.animations.play('spining',10,true);

            game.load.image('background','img/sky.png');
            game.load.image('ground','img/platform.png');

            game.load.tilemap('level','test.json',null,Phaser.Tilemap.TILED_JSON);
            game.load.image('gameTiles', 'images/tiles.png');

            game.load.image('greencup', 'images/greencup.png');

            game.load.image('star','img/star.png');
            game.load.spritesheet('dude','img/dude.png',38,48);//38,48
            game.load.onLoadComplete.add(this.create);

    },
    create: function create(){
            game.physics.startSystem(Phaser.Physics.ARCADE);

    // background:
            map = game.add.tilemap('level');
            map.addTilesetImage('tiles','gameTiles');
            backgroundlayer = map.createLayer('background');
            blockedLayer = map.createLayer('things');
            map.setCollisionBetween(0,4000,true,'things');
            backgroundlayer.resizeWorld();


    // player:
            player = game.add.sprite(300,100,'dude',4);
            player.anchor.set(0.5);
            game.physics.arcade.enable(player);
            player.body.bounce.y= 0.2;
            player.body.gravity.y= 300;
            player.body.collideWorldBounds = true;

            player.animations.add('left',[0,1,2,3],10,true);
            player.animations.add('right',[5,6,7,8],10,true);

    // stars:

            stars = game.add.group();
            stars.enableBody = true;

            for (var i = 0;i<12;i++){
                var star =stars.create(i*70,0,'star');
                star.body.gravity.y= 60;
                star.body.bounce.y = 0.3+Math.random()*0.02;
            }


     // coin"
        coins = game.add.group();
        coins.enableBody = true;
        map.createFromObjects('obj', "", 'greencup', 0, true, false, coins);

        coins.forEach(function(e){
            e.body.gravity.y= 60;
            e.body.bounce.y = 0.3+Math.random()*0.02;
        });




    // camera:
            game.camera.follow(player);

    // text:
            score = 0;
            scoreText = game.add.text(20,20,'scoe:0',{fontSize: '32px', fill: '	#DC143C'});
            scoreText.fixedToCamera = true;

    // Control:
            cursors = game.input.keyboard.createCursorKeys();

    },
    update: function update(){

        hitblockedLayer = game.physics.arcade.collide(player,blockedLayer);
        starhitblockedLayer = game.physics.arcade.collide(stars,blockedLayer);
        coinhitblockedLayer =  game.physics.arcade.collide(coins,blockedLayer);



        overlaps = game.physics.arcade.overlap(player,stars,collectStar);
        overlaps2= game.physics.arcade.overlap(player,coins,collectStar);

        player.body.velocity.x = 0;



        if (game.input.mousePointer.isDown){
            if (player.x <game.input.mousePointer.x ){
                player.body.velocity.x = 150;
                player.animations.play('right');
            }
            else if (player.x >game.input.mousePointer.x ){
                // player.scale.setTo(-1.0,1.0);
                player.body.velocity.x = -150;
                player.animations.play('left');
            }
        }
        else if (cursors.left.isDown){
            player.body.velocity.x = -150;
            player.animations.play('left');
        }
        else if(cursors.right.isDown){
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else {
            player.animations.stop();
            player.frame = 4;
        }

        if(cursors.up.isDown  && player.body.blocked.down && hitblockedLayer ){ // if blocked.down is true 表示已不能往下為真
            player.body.velocity.y = -350;
        }

    }
};


