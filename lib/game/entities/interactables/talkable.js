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
        size: {x: 18, y: 26},
        offset: {x: 0, y: 0},
        flip: false,

        emotionParticle: null,
        dialogContent: null,
        _dialogStr: null,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            if (!ig.global.wm) {
                this.emotionParticle = ig.game.spawnEntity('EntityEmotionParticle', this.pos.x, this.pos.y, {
                    life: 0,
                    owner: this,
                    type: null
                });
                this.emotionParticle.zIndex = this.zIndex+1;
                ig.game.sortEntitiesDeferred();
            }
            this.initAnimations();

            this.dialogContent = this.parseConversation(this._dialogStr);
        },

        initAnimations: function() {},

        update: function() {
            this.updateAnimations();
            this.updateFlip();

            if (this.distanceTo(ig.game.player) > EntityTalkable.HEAR_DISTANCE ||
                (!ig.game.dialogue.display && this.dialogContent)) {
                this._isInteracting = false;
            }

            this.parent();
        },

        updateAnimations: function() {
            this.currentAnim = this._isInteracting ?
                this.anims.talk : this.anims.idle;

            if (this.isAbleToInteract()) {
                this.emotionParticle.currentAnim = this.emotionParticle.anims.talk;
            }
            else {
                this.emotionParticle.currentAnim = null;
                this.emotionParticle.anims.talk.rewind();
            }
        },

        updateFlip: function() {
            if (this.distanceTo(ig.game.player) > EntityTalkable.HEAR_DISTANCE) {
                if (this._isInteracting) {
                    ig.game.dialogue.display = false;
                }
                return;
            }

            this.flip = this.center.x > ig.game.player.center.x;
            if (this.currentAnim)
                this.currentAnim.flip.x = this.flip;
        },

        interact: function(other) {
            if (this.dialogContent && this.dialogContent.length > 0) {
                this.parent();
                ig.game.dialogue.title = this.name;
                ig.game.dialogue.pages = this.dialogContent.slice(0);
                ig.game.dialogue.toggleMenu(true);
            }
        },

        isAbleToInteract: function() {
            return this.distanceTo(ig.game.player) < EntityTalkable.HEAR_DISTANCE &&
                   !this._isInteracting;
        },

        parseConversation: function(str) {
            if (!str)
                return null;

            return str.split('&');
        }
    });

    EntityTalkable.HEAR_DISTANCE = 25;
});