/**
 * Created by Tianxu on 14-5-17.
 */
ig.module(
    'game.entities.interactables.talkableDog'
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
            this.addAnim('beforeTalk', 0.2, [3, 4]);
        },

        updateAnimations: function() {
            this.currentAnim = this.isAbleToInteract() ?
                this.anims.beforeTalk : this.anims.idle;

            this.parent();
        },

        interact: function() {
            console.log('Woof-!');
        }
    });
});