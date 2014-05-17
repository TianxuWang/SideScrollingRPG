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
                ig.game.levelDirector.loadLevel(this.level, this.spawn);
            }
        },

        update: function(){}
    });
});