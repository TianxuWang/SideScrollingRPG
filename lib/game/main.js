ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'impact.sound',
	'impact.debug.debug',
    'plugins.pause',
    'plugins.gui',
    'plugins.fadeOutKill',
    'plugins.font',
    'plugins.camera',
    'plugins.musicCrossFader',
    'game.data.assets',
    'game.system.levelDirector',
    'game.effects.screenFader',
	'game.levels.forest',
    'game.levels.town',
	'game.entities.classes.ninja',
    'game.gui.bar',
    'game.gui.menuPause',
    'game.gui.menuStats',
    'game.gui.menuInventory',
    'game.gui.tooltip'
)
.defines(function(){

	var MyGame = ig.Game.extend({

        assets: new Assets(),
        levelDirector: null,
        player: null,
        enemyGroup: [],
        gui: null,
        cursorItem: null,
        tooltip: null,

		gravity: 400,

		init: function() {
            this.initLevelDirector();
            this.initGUI();
            this.initInputKeys();
        },

        initLevelDirector: function() {
            this.levelDirector = new LevelDirector();
            this.levelDirector.loadLevel('town', 'TownSpawn_0');
        },

        initGUI: function() {
            this.playerHud = this.assets.img_player_hud;
            this.menuPause = new MenuPause();
            this.menuStats = new MenuStats();
            this.menuInventory = new MenuInventory();
            this.tooltip = new Tooltip();
        },

        initInputKeys: function() {
            // Controls
            ig.input.bind(ig.KEY.A, 'left');
            ig.input.bind(ig.KEY.D, 'right');
            ig.input.bind(ig.KEY.W, 'jump');
            ig.input.bind(ig.KEY.S, 'crouch');
            ig.input.bind(ig.KEY.J, 'attack');
            ig.input.bind(ig.KEY.K, 'block');
            ig.input.bind(ig.KEY.SPACE, 'interact');

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

            if (this.camera && !this.paused)
                this.camera.update();

            if (this.cursorItem)
                ig.gui.cursor.set(this.assets.img_cursor_loot);
            else
                ig.gui.cursor.set(this.assets.img_cursor_hand);

            if (ig.input.pressed('pause')) {
                this.togglePause();
            }
            if (ig.input.pressed('stats')) {
                this.menuStats.toggleMenu();
            }
            if (ig.input.pressed('inventory')) {
                this.menuInventory.toggleMenu();
            }

            this.tooltip.update();
		},

		draw: function() {
			this.parent();

            if (this.camera)
                this.camera.draw();

            // draw player HUD
            if (this.player) {
                this.playerHud.draw(28, 12);
                this.player.healthBar.draw();
                this.player.manaBar.draw();
                this.assets.font_default.draw(this.player.name, this.player.healthBar.pos.x, this.player.healthBar.pos.y - 8, ig.Font.ALIGN.LEFT);
                this.assets.font_default.draw('Lv.' + this.player.level, this.player.healthBar.pos.x + 48, this.player.healthBar.pos.y - 8, ig.Font.ALIGN.LEFT);
            }

            if (this.menuPause.display) {
                this.menuPause.draw();
            }

            if (this.menuInventory.display) {
                this.menuInventory.update();
                this.menuInventory.draw();
            }
            else if (this.menuInventory.aroundCursor()) {
                this.tooltip.hide();
            }

            if (this.menuStats.display) {
                this.menuStats.update();
                this.menuStats.draw();
            }
            else if (this.menuStats.aroundCursor()) {
                this.tooltip.hide();
            }

            if (this.cursorItem) {
                this.cursorItem.icon.draw(ig.input.mouse.x-8, ig.input.mouse.y-8);
            }

            if (this.tooltip.visible) {
                this.tooltip.draw();
            }

            if (this.screenFader) {
                this.screenFader.draw();
            }

            if (ig.gui.show) {
                ig.gui.draw();
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
	
	ig.main( '#canvas', MyGame, 60, 320, 176, 2 );
});


