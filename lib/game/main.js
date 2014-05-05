ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.debug.debug',
    'plugins.fadeOutKill',
    'plugins.font',
    'plugins.pause',
    'plugins.camera',
	'game.levels.level1',
	'game.entities.classes.ninja',
    'game.entities.enemy',
    'game.gui.bar',
    'game.gui.menuPause',
    'game.gui.menuStats',
    'game.gui.menuInventory',
    'game.data.assets'
)
.defines(function(){

	var MyGame = ig.Game.extend({

        assets: null,
        player: null,
        gui: null,

		gravity: 400,

		init: function() {
            this.initAssets();
            this.initGUI();
            this.initCamera();
            this.initInputKeys();

			this.loadLevel(LevelLevel1);
		},

        initAssets: function() {
            this.assets = new Assets();
        },

        initCamera: function() {
            //this.camera.debug = true;
            this.camera.offset.x = ig.system.width/2;
            this.camera.offset.y = ig.system.height/3;
            this.camera.trap.size.x = EntityPlayer.SIZE.x*2;
            this.camera.trap.size.y = EntityPlayer.SIZE.y*2.5;
            this.camera.lookAhead.x = 50;
            this.camera.damping = 2;
        },

        initGUI: function() {
            this.playerHud = this.assets.img_player_hud;
            this.playerHealthBar = new Bar(this.assets.img_player_healthBar);
            this.playerManaBar = new Bar(this.assets.img_player_manaBar);
            this.enemyHealthBar = new Bar(this.assets.img_enemy_healthBar, this.assets.img_enemy_trackBar);
            this.menuPause = new MenuPause();
            this.menuStats = new MenuStats();
            this.menuInventory = new MenuInventory();
        },

        initInputKeys: function() {
            // Controls
            ig.input.bind(ig.KEY.A, 'left');
            ig.input.bind(ig.KEY.D, 'right');
            ig.input.bind(ig.KEY.W, 'jump');
            ig.input.bind(ig.KEY.S, 'crouch');
            ig.input.bind(ig.KEY.J, 'attack');
            ig.input.bind(ig.KEY.K, 'block');

            // UI
            ig.input.bind(ig.KEY.ESC, 'pause');
            ig.input.bind(ig.KEY.C, 'stats');
            ig.input.bind(ig.KEY.B, 'inventory');
            ig.input.bind(ig.KEY.X, 'skills');
            ig.input.bind(ig.KEY.MOUSE1, 'mouseLeft');
            ig.input.bind(ig.KEY.MOUSE2, 'mouseRight');
        },

		update: function() {
			this.parent();

            if (ig.input.pressed('pause')) {
                this.togglePause();
            }
            if (ig.input.pressed('stats')) {
                this.menuStats.toggleMenu();
            }
            if (ig.input.pressed('inventory')) {
                this.menuInventory.toggleMenu();
            }
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

            // draw name tags, instructions, etc.
            if (this.assets.font_default) {
                this.assets.font_default.draw(this.player.name, this.playerHealthBar.pos.x, this.playerHealthBar.pos.y - 8, ig.Font.ALIGN.LEFT);
                this.assets.font_default.draw('Lv.' + this.player.level, this.playerHealthBar.pos.x + 48, this.playerHealthBar.pos.y - 8, ig.Font.ALIGN.LEFT);

                if (enemy) {
                    this.assets.font_default.draw(enemy.name, this.enemyHealthBar.pos.x, this.enemyHealthBar.pos.y - 8, ig.Font.ALIGN.LEFT);
                }
            }

            if (this.menuPause.display) {
                this.menuPause.draw();
            }

            if (this.menuInventory.display) {
                this.menuInventory.draw();
            }

            if (this.menuStats.display) {
                this.menuStats.draw();
            }
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


