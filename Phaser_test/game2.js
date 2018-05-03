/**
 * Created by danny on 2018/3/12.
 */


var game = new Phaser.Game(400,600,Phaser.AUTO,'#container');
game.state.add('setting',world.setting);
game.state.add('stage01',world.stage01);
game.state.start('setting');