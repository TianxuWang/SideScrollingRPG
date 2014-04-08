ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.debug.debug',
	'game.levels.level1',
	'game.entities.player',
    'game.entities.enemy',
	'game.system.comboManager',
    'game.system.eventChain',
    'plugins.perpixel',
    'plugins.fadeOutKill',
    'game.gui.bar'
)
.defines(function(){

	var MyGame = ig.Game.extend({

		font: new ig.Font( 'media/04b03.font.png' ),

		gravity: 400,

		init: function() {

            // gui
            this.playerHealthBar = new Bar();
            this.playerHealthBar.barImage = new ig.Image("media/gui/healthbar.png");

            this.enemyHealthBar = new Bar();
            this.enemyHealthBar.barImage = new ig.Image("media/gui/ragebar.png");
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

                if (player.pos.x - ig.system.width/2 < 0) {
                    this.screen.x = 0;
                }
                else if (player.pos.x - ig.system.width/2 > 2032) {
                    this.screen.x = 2032;
                }
                else {
                    this.screen.x = player.pos.x - ig.system.width/2;
                }
            }

			// Update all entities and backgroundMaps
			this.parent();
		},

		draw: function() {
			this.parent();

            // Draw all entities and backgroundMaps
            var player = ig.game.player;
            var enemy = ig.game.enemy;

            this.playerHealthBar.maxValue = player.maxHealth;
            this.playerHealthBar.value = player.health;
            this.playerHealthBar.draw(4, 4);

            this.enemyHealthBar.maxValue = enemy.maxHealth;
            this.enemyHealthBar.value = enemy.health;
            this.enemyHealthBar.draw(ig.system.width - 4 - this.enemyHealthBar.barImage.width, 4);
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
	
	ig.main( '#canvas', MyGame, 60, 320, 232, 4 );

});


