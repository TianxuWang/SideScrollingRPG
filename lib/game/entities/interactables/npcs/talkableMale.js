/**
 * Created by Tianxu on 14-5-18.
 */
ig.module(
    'game.entities.interactables.npcs.talkableMale'
)
.requires(
    'game.entities.interactables.talkable'
)
.defines( function(){

    EntityTalkableMale = EntityTalkable.extend({

        size: {x: 18, y: 26},

        init: function(x, y, settings) {
            this.animSheet = new ig.AnimationSheet('media/npcs/villager_male.png', 18, 26);
            this.parent(x, y, settings);
        },

        initAnimations: function() {
            this.addAnim('idle', 0.15, [1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 4]);
            this.addAnim('talk', 0.2, [0, 0, 0, 0, 0, 0, 0, 0, 0, 4]);
        },

        interact: function(other) {
            this.parent();

            console.log('Sup!');
        }
    });

});