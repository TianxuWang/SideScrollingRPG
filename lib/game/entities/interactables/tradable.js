/**
 * Created by Tianxu on 14-5-22.
 */
ig.module(
    'game.entities.interactables.tradable'
)
.requires(
    'game.entities.abstracts.interactable',
    'game.effects.emotionParticle',
    'game.data.inventory'
)
.defines( function() {

    EntityTradable = EntityInteractable.extend({

        interactType: EntityInteractable.TYPE.PRESS,
        size: {x: 18, y: 26},
        offset: {x: 0, y: 0},
        flip: false,

        emotionParticle: null,
        inventory: null,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            if (!ig.global.wm) {
                this.emotionParticle = ig.game.spawnEntity('EntityEmotionParticle', this.center.x, this.pos.y-12, {
                    life: 0,
                    owner: this,
                    type: 'trade'
                });
                this.emotionParticle.zIndex = this.zIndex+1;
                this.emotionParticle._float = true;
                ig.game.sortEntitiesDeferred();

                this._emotionMinPos = {x: this.emotionParticle.pos.x, y: this.emotionParticle.pos.y};
                this._emotionMaxPos = {x: this._emotionMinPos.x+1, y: this._emotionMinPos.y+1};
            }
            this.initAnimations();
            this.initInventory();
        },

        initAnimations: function() {
            this.animSheet = new ig.AnimationSheet('media/npcs/merchant_female.png', 18, 26);
            this.addAnim('idle', 0.2, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
        },

        initInventory: function() {
            this.inventory = new Inventory(this);
            this.inventory.addItem(ig.game.itemFactory.generateItem(0));
        },

        update: function() {
            this.updateEmotion();
            if (this._isInteracting &&
                (this.distanceTo(ig.game.player) > EntityTalkable.HEAR_DISTANCE ||
                this._isInteracting && ig.input.pressed('inventory'))) {
                this._isInteracting = false;
                ig.game.menuTrade.toggleMenu(false);

                if (this.distanceTo(ig.game.player) > EntityTalkable.HEAR_DISTANCE)
                 ig.game.menuInventory.toggleMenu(false);
            }

            this.parent();
        },

        updateEmotion: function() {
            if (this.emotionParticle.pos.x <= this._emotionMaxPos.x && this.emotionParticle.pos.y<=this._emotionMinPos.y){
                this.emotionParticle.vel = {x: 5, y: 0};
            }
            else if (this.emotionParticle.pos.y <= this._emotionMaxPos.y && this.emotionParticle.pos.x>=this._emotionMaxPos.x){
                this.emotionParticle.vel = {x: 0, y: 5};
            }
            else if (this.emotionParticle.pos.x>=this._emotionMinPos.x && this.emotionParticle.pos.y>=this._emotionMaxPos.y){
                this.emotionParticle.vel = {x: -5, y: 0};
            }
            else if (this.emotionParticle.pos.y >= this._emotionMinPos.y && this.emotionParticle.pos.x<=this._emotionMinPos.x){
                this.emotionParticle.vel = {x: 0, y: -5};
            }
        },

        updateFlip: function() {
            this.flip = this.center.x > ig.game.player.center.x;
            if (this.currentAnim)
                this.currentAnim.flip.x = this.flip;
        },

        interact: function(other) {
            this.parent(other);
            this.updateFlip();
            ig.game.menuTrade._inventory = this.inventory;
            ig.game.menuTrade.toggleMenu(true);
            ig.game.menuInventory.toggleMenu(true);
        },

        isAbleToInteract: function() {
            return this.distanceTo(ig.game.player) < EntityTalkable.HEAR_DISTANCE &&
                !this._isInteracting;
        }
    })
});