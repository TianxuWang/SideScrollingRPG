/**
 * Created by Tianxu on 14-5-17.
 */
ig.module(
    'game.entities.interactables.npcs.talkableDog'
)
.requires(
    'game.entities.interactables.talkable'
)
.defines( function() {

    EntityTalkableDog = EntityTalkable.extend({

        size: {x: 21, y: 17},

        init: function(x, y, settings) {
            this.animSheet = new ig.AnimationSheet('media/npcs/dog.png', 21, 17);
            this.parent(x, y, settings);
        },

        initAnimations: function() {
            this.addAnim('idle', 0.2, [0, 1, 0, 1, 0, 1, 0, 1, 2, 1]);
            this.addAnim('talk', 0.2, [3, 4]);
        },

        interact: function() {
            this.parent();

            console.log('Woof-!');
        }
    });
});