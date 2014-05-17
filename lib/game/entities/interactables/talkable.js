/**
 * Created by Tianxu on 14-5-17.
 */
ig.module (
    'game.entities.interactables.talkable'
)
.requires (
    'game.entities.abstracts.interactable',
    'game.effects.emotionParticle'
)
.defines( function() {

    EntityTalkable = EntityInteractable.extend({

        interactType: EntityInteractable.TYPE.PRESS,

        size: {x: 20, y: 26},
        offset: {x: 0, y: 0},
        flip: false,

        emotionParticle: null,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.center = {x: x+this.size.x/2, y: y+this.size.y/2};
            if (!ig.global.wm) {
                this.emotionParticle = ig.game.spawnEntity('EntityEmotionParticle', this.pos.x, this.pos.y, {
                    life: 0,
                    owner: this,
                    type: null
                });
            }
            this.initAnimations();
        },

        initAnimations: function() {},

        update: function() {
            this.updateCenter();
            this.updateAnimations();

            this.parent();
        },

        updateCenter: function() {
            this.center.x = this.pos.x + this.size.x/2;
            this.center.y = this.pos.y + this.size.y/2;
        },

        updateAnimations: function() {
            if (this.isAbleToInteract())
                this.emotionParticle.currentAnim = this.emotionParticle.anims.talk;
            else {
                this.emotionParticle.currentAnim = null;
                this.emotionParticle.anims.talk.rewind();
            }
        },

        isAbleToInteract: function() {
            return this.distanceTo(ig.game.player) < EntityTalkable.HEAR_DISTANCE;
        }
    });

    EntityTalkable.HEAR_DISTANCE = 25;
});