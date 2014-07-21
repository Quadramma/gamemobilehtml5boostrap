'use strict';

// Load modules
var Constant = require('./constant');
var Phaser = require('./lib/phaser');
var PreloaderState = require('./state/preloader_state');
var MainMenuState = require('./state/main_menu_state');
var PlayState = require('./state/play_state');

// Init Phaser
function init() {
    var game = new Phaser.Game(
        Constant.SCREEN_WIDTH,
        Constant.SCREEN_HEIGHT,
        Phaser.AUTO,
        Constant.STAGE_NAME
    );

    game.Phaser = Phaser;

    var preloader = new PreloaderState(game);
    var mainmenu = new MainMenuState(game);
    var playstate = new PlayState(game);


    game.state.add('PreloaderState', preloader);
    game.state.add('MainMenuState', mainmenu);
    game.state.add('PlayState', playstate);
    game.state.start('PreloaderState');
}

window.onload = function() {
    init();
}