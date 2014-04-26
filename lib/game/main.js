ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.debug.debug',
	'game.levels.level1',
	'game.entities.classes.ninja',
    'game.entities.enemy',
    //'plugins.perpixel',
    'plugins.fadeOutKill',
    'plugins.font',
    'game.gui.bar',
    'game.data.assets'
)
.defines(function(){

	var MyGame = ig.Game.extend({

        assets: null,
        player: null,
        gui: null,

		gravity: 400,

		init: function() {
            this.assets = new Assets();

            // gui
            this.playerHud = this.assets.img_player_hud;
            this.playerHealthBar = new Bar(this.assets.img_player_healthBar);
            this.playerManaBar = new Bar(this.assets.img_player_manaBar);
            this.enemyHealthBar = new Bar(this.assets.img_enemy_healthBar, this.assets.img_enemy_trackBar);

			// move
			ig.input.bind(ig.KEY.A, 'left');
			ig.input.bind(ig.KEY.D, 'right');
			ig.input.bind(ig.KEY.W, 'jump');
			ig.input.bind(ig.KEY.S, 'crouch');

			// attack
			ig.input.bind(ig.KEY.J, 'attack');

			this.loadLevel(LevelLevel1);
		},

		update: function() {
			// screen follows the player
            var player = ig.game.player;

            if (player) {
                //if (player.state != player.State.JUMPGROUND)
                this.screen.y = player.pos.y - ig.system.height/2;
                //this.updateCamera();

                if (player.center.x - ig.system.width/2 < 0) {
                    this.screen.x = 0;
                }
                else if (player.center.x - ig.system.width/2 > 2032) {
                    this.screen.x = 2032;
                }
                else {
                    this.screen.x = player.center.x - ig.system.width/2;
                }
            }

			// Update all entities and backgroundMaps
			this.parent();
		},

		draw: function() {
			this.parent();
            var enemy = this.player.target;

            // draw player HUD
            if (this.playerHud) {
                this.playerHud.draw(28, 12);
            }

            // draw player's healthbar and manabar
            if (this.playerHealthBar) {
                this.playerHealthBar.maxValue = this.player.maxHealth;
                this.playerHealthBar.value = this.player.health;
                this.playerHealthBar.draw(44, 18);
            }

            if (this.playerManaBar) {
                this.playerManaBar.maxValue = this.player.maxMana;
                this.playerManaBar.value = this.player.mana;
                this.playerManaBar.draw(44, 26);
            }

            // draw enemy's healthbar
            if (this.enemyHealthBar && enemy) {
                this.enemyHealthBar.maxValue = enemy.maxHealth;
                this.enemyHealthBar.value = enemy.health;
                this.enemyHealthBar.draw(ig.system.width - 8 - this.enemyHealthBar.barImage.width, 16);
            }

            // draw name tags
            if (this.assets.font_default) {
                this.assets.font_default.draw(this.player.name, this.playerHealthBar.pos.x, this.playerHealthBar.pos.y - 8, ig.Font.ALIGN.LEFT);
                this.assets.font_default.draw('Lv.' + this.player.level, this.playerHealthBar.pos.x + 48, this.playerHealthBar.pos.y - 8, ig.Font.ALIGN.LEFT);
            }

            if (this.assets.font_default && enemy) {
                this.assets.font_default.draw(enemy.name, this.enemyHealthBar.pos.x, this.enemyHealthBar.pos.y - 8, ig.Font.ALIGN.LEFT);
            }

		},

        updateCamera: function() {
            var dx = Math.abs(ig.game.player.pos.x - ig.system.width/2 - this.screen.x);
            var dy = Math.abs(ig.game.player.pos.y - ig.system.height/2 - this.screen.y);
            if (dx <= 1 && dy <= 1)
                return;

            if (this.screen.x < ig.game.player.pos.x - ig.system.width/2 && this.screen.x < 2032)
                this.screen.x++;
            else if (this.screen.x > ig.game.player.pos.x - ig.system.width/2 && this.screen.x > 0)
                this.screen.x--;

            if (this.screen.y < ig.game.player.pos.y - ig.system.height/2)
                this.screen.y++;
            else if (this.screen.y > ig.game.player.pos.y - ig.system.height/2)
                this.screen.y--;
        }
	});
	
	// turn on sub-pixel rendering
	//ig.System.inject({
	//    getDrawPos: function( p ) {
	//	return p * this.scale;
	//    }
	//});
	//
	//ig.Entity.inject({
	//    draw: function() {
	//	if( this.currentAnim ) {
	//	    this.currentAnim.draw(
	//		this.pos.x - this.offset.x - ig.game.screen.x,
	//		this.pos.y - this.offset.y - ig.game.screen.y
	//	    );
	//	}
	//    }
	//});
	
	ig.main( '#canvas', MyGame, 60, 320, 180, 2 );

});


