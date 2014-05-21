/**
 * Created by Tianxu on 14-5-17.
 */
ig.module(
    'game.entities.interactables.npcs.talkableFemale'
)
.requires(
    'game.entities.interactables.talkable'
)
.defines( function(){

    EntityTalkableFemale = EntityTalkable.extend({

        size: {x: 18, y: 26},

        init: function(x, y, settings) {
            this.animSheet = new ig.AnimationSheet('media/npcs/villager_female.png', 18, 26);
            this.parent(x, y, settings);
        },

        initAnimations: function() {
            this.addAnim('idle', 0.15, [1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 4]);
            this.addAnim('talk', 0.2, [0, 0, 0, 0, 0, 0, 0, 0, 0, 4]);
        }
    });

});