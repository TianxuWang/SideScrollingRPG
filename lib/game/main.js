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
	'game.system.comboManager'
)
.defines(function(){

	var MyGame = ig.Game.extend({

		font: new ig.Font( 'media/04b03.font.png' ),

		//gravity: 400,

		init: function() {

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
            if (ig.game.player) {
                this.screen.y = ig.game.player.pos.y - ig.system.height/2;
                if (ig.game.player.pos.x - ig.system.width/2 < 0) {
                    this.screen.x = 0;
                }
                else if (ig.game.player.pos.x + ig.system.width/2 > 2032) {
                    this.screen.x = 2032;
                }
                else {
                    this.screen.x = ig.game.player.pos.x - ig.system.width/2;
                }
            }

			// Update all entities and backgroundMaps
			this.parent();
		},

		draw: function() {
			// Draw all entities and backgroundMaps
			this.parent();
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


