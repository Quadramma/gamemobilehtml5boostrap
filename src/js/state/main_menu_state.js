var MainMenuState = function(game) {
	this.game = game;
};

MainMenuState.prototype = {
	preload: function() {
		this.game.stage.backgroundColor = '#0080C0';
	},

	create: function() {
		var state = this;
		s = state;

		state.background = state.game.add.sprite(0, 0, 'desert');

		state.scene = {
			music: new state.game.Phaser.Sound(state.game, 'party1', 1, false),
			musicPlay: function() {
				//state.scene.music.play('', 0, 0.5, true, false);
			}
		};
		setTimeout(function() {
			state.scene.musicPlay();
		}, 5000);

		state.startbutton = state.game.add.sprite(100, 100, 'start');
		//state.startbutton.input.start(); // start the inputHandler of the sprite
	},
	update: function() {
		var state = this;

		//if (state.game.Phaser.Physics.P2.hitTest(state.startbutton, state.game.input.activePointer.id)) {
		if (state.game.input.keyboard.justPressed(this.game.Phaser.Keyboard.SPACEBAR)) {
			state.game.state.start('PlayState');
		} else {

		}


	},
	shutdown: function() {
		var state = this;
		//state.scene.music.stop();
		console.info('shutdown');
	}
};

module.exports = MainMenuState;