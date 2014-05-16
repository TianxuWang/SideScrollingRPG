/*
This entity calls ig.game.loadLevel() when its triggeredBy() method is called -
usually through an EntityTrigger entity.
*/

ig.module(
    'game.entities.utils.levelchange'
)
.requires(
    'impact.entity'
)
.defines(function(){
        
    EntityLevelchange = ig.Entity.extend({
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(0, 0, 255, 0.7)',
            _wmScalable: true,

            size: {x: 8, y: 8},
            level: null,
            spawn : null, // NAME OF THE VOID FOR THE POS

            triggeredBy: function( entity, trigger ) {
                if(this.level) {
                    var levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function( m, l, a, b ) {
                            return a.toUpperCase() + b;
                    });
                    ig.game.loadLevel( ig.global['Level'+levelName] );
                    if(this.spawn){
                        var spawnpoint = ig.game.getEntityByName(this.spawn);
                        var player = ig.game.player;
                        if(spawnpoint)
                        {
                            ig.game.entities.push(player);
                            player.pos = spawnpoint.pos;
                            player.updateEquipment();
                            //ig.game.player.kill();
                            //.game.spawnEntity('EntityNinja', spawnpoint.pos.x, spawnpoint.pos.y);
                            //ig.game.sortEntitiesDeferred();
                            ig.game.camera.set(ig.game.player);
                        }
                    }
                }
            },

            update: function(){}
    });
});