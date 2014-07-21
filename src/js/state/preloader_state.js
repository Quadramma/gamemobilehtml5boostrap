'use strict';

var Constant = require('../constant');
var $ = require('../lib/jquery');

var PreloaderState = function(game) {
    this.game = game;
};

PreloaderState.prototype = {

    preload: function() {
        this.game.stage.backgroundColor = '#000000';

        $('#' + Constant.STAGE_NAME).append(' \
            <div class="loading-container"> \
                <div class="loading-text"> \
                    LOADING... \
                </div> \
                <div class="loadingbar-container"> \
                    <div class="loadingbar"> \
                    </div> \
                </div> \
            </div>'
        );

        this.load.text('GameConstant', './res/game_constant.json');

        this.game.load.image('desert', './res/desert.png');
        this.game.load.image('start', './res/start.png');


        //SOUNDS
        this.game.load.audio('tension1', ['./res/sound/tension1.mp3']);
        this.game.load.audio('party1', ['./res/sound/party1.mp3']);
        this.game.load.audio('shoot1', ['./res/sound/shoot1.mp3']);
        this.game.load.audio('weaponoverheat', ['./res/sound/weaponoverheat.mp3']);
        this.game.load.audio('footstep1', ['./res/sound/footstep1.mp3']);
        

        this.game.load.atlas('entities', './res/entities.png'
            , './res/entities.txt');

        this.load.onFileComplete.add(this.onFileLoaded, this);

        console.log(this.load.progress);
    },

    create: function() {
        var state = this;
        $('.loading-container').remove();

        

        state.game.state.start('MainMenuState');
    },

    destroy: function() {

    },

    onFileLoaded: function (progress) {
        var barSize = 200;

        $('.loading-bar').width(barSize * progress / 100);

        console.log(progress);
    }
};

module.exports = PreloaderState;
