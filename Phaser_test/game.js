/**
 * Created by danny on 2018/3/6.
 */

var ball;
var paddle;
var bricks;
var newbrick;
var brickinfo;
var score =0;
var scoreText;
var lives = 3;
var liveText ;
var liveLostText;
var playing = false;
var startButton;

var game = new Phaser.Game(800,600,Phaser.AUTO,'#container',{preload: preload,create: create,update: update});

