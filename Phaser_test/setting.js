/**
 * Created by danny on 2018/3/15.
 */

var world = {};

world.setting = function (){};

world.setting.prototype = {

    init: function init(){
        game.scale.pageAlignHorizontally =true;
        game.scale.pageAlignVertically = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function preload(){
        game.load.spritesheet('loading','img/loading.png',100,100);

    },
    create: function create(){
        game.stage.backgroundColor = '#696969';
    },
    update: function update(){
        game.state.start('stage01');
    }

};