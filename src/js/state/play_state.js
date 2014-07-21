var PlayState = function(game) {
	this.game = game;
};

PlayState.prototype = {
	preload: function() {
		this.game.stage.backgroundColor = '#0080C0';
	},

	create: function() {
		var state = this;
		s = state;

		this.add.sprite(0, 0, 'desert');

		state.scene = {
			music: new state.game.Phaser.Sound(state.game, 'tension1', 1, false),
			musicPlay: function() {
				state.scene.music.play('', 0, .3, true, false);
			}
		};
		setTimeout(function() {
			//state.scene.musicPlay();
		}, 5000);

		// create player and configure
		this.player = this.game.add.sprite(this.game.stage.width / 3, 200, "entities");
		this.player.animations.add('idle', ['player-idle-1.png'], 10, false, false);
		this.player.animations.add('fire', ['player-fire-1-00.png', 'player-fire-1-01.png', 'player-fire-1-02.png'], 10, true, false);
		this.player.animations.add('walk', ['player-walk-1-00.png', 'player-walk-1-01.png', 'player-walk-1-02.png', 'player-walk-1-03.png', 'player-walk-1-04.png', 'player-walk-1-05.png', 'player-walk-1-06.png', 'player-walk-1-07.png'], 10, true, false);
		this.player.animations.play('idle')
		this.player.anchor.setTo(.5, .5);
		this.player.body.enable = true;
		this.player.flipped = false;


		this.player.weaponshoot = new state.game.Phaser.Sound(state.game, 'shoot1', 1, false);
		this.player.weaponoverheat = new state.game.Phaser.Sound(state.game, 'weaponoverheat', 1, false);
		this.player.footstep = new state.game.Phaser.Sound(state.game, 'footstep1', 1, false);

		this.player.walking = function() {
			state.player.footstep.play('', 0, 1, true, false);
			state.player.footstep.totalDuration = 0.2;
			state.player.footstep.durationMS = 200;
		}
		this.player.idle = function() {
			state.player.footstep.stop();
			this.player.body.velocity.x = 0;
		}

		state.player.y = state.game.stage.bounds.height - 90;



		

		//weapons
		this.weaponId = 1;
		this.fire = false;
		this.bulletGroup = this.game.add.group(null, 'bullets', false, true, 0);
		this.shotDelayTime = 0;
		this.shotDelay = 400;

		state.createBullet = function(state) {
			var bullet = state.bulletGroup.getFirstDead() || state.game.add.sprite('')
			bullet.body.enable = true;
			bullet.exists = true;
			bullet.x = state.player.x + (state.player.flipped ? state.player.width * .5 : state.player.width * .5);
			bullet.y = state.player.y - 13;
			bullet.flipped = state.player.flipped;
			bullet.body.velocity.x = bullet.flipped ? -600 : 600;
			bullet.loadTexture("entities", "bullet-gun.png");

			this.player.weaponshoot.play('', 0, 1, false, true);


			console.info('bullet created');
		}

		this.keyboard = this.game.input.keyboard;
		state.controls = {
			justReleasedRight: function() {
				return state.keyboard.justReleased(state.game.Phaser.Keyboard.RIGHT) ||
					state.keyboard.justReleased(state.game.Phaser.Keyboard.D);

			},
			isDownRight: function() {
				return state.keyboard.isDown(state.game.Phaser.Keyboard.RIGHT) ||
					state.keyboard.isDown(state.game.Phaser.Keyboard.D)
			},
			justReleasedLeft: function() {
				return state.keyboard.justReleased(state.game.Phaser.Keyboard.RIGHT) ||
					state.keyboard.justReleased(state.game.Phaser.Keyboard.D);

			},
			isDownLeft: function() {
				return state.keyboard.isDown(state.game.Phaser.Keyboard.RIGHT) ||
					state.keyboard.isDown(state.game.Phaser.Keyboard.D)
			}
		};



	},
	update: function() {
		var state = this;
		//FIRING
		if (state.keyboard.justPressed(this.game.Phaser.Keyboard.SPACEBAR)) {
			// increase the shotDelayTime based on the game's time delta
			state.shotDelayTime += state.game.time.elapsed;
			// If the delay is greater than 200 create a bullet
			if (state.shotDelayTime > state.shotDelay) {
				state.createBullet(state);
				// reset the shotDelayTime
				state.shotDelayTime = 0;
			} else {
				//console.info(this.shotDelayTime + ' < ' + this.shotDelay);
				if (!state.player.weaponoverheat.isPlaying) {
					state.player.weaponoverheat.play('', 0, 1, false, true);
				}

			}
			state.player.body.velocity.x = state.player.body.acceleration.x = 0;
		}


		// Player controls
		if (state.justReleasedRight() || state.justReleasedLeft()) {
			state.player.idle();
		} else {

			if (state.isDownRight()) {
				state.player.body.velocity.x = 50;
				state.player.scale.x = 1;
				state.player.flipped = false;
				state.player.walking();
			}
			if (state.isDownLeft()) {
				state.player.body.velocity.x = -50;
				state.player.scale.x = -1;
				state.player.flipped = true;
				state.player.walking();
			}
		}



		// Player animations
		if (Math.abs(state.player.body.velocity.x) > 10) {
			state.player.animations.play('walk');
		} else {
			state.player.animations.play('idle');
		}
	},
	shutdown: function() {
		var state = this;
		state.scene.music.stop();
	}
};

module.exports = PlayState;