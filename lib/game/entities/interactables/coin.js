/**
 * Created by Tianxu on 14-5-21.
 */
ig.module(
    'game.entities.interactables.coin'
)
.requires(
    'game.entities.abstracts.interactable'
)
.defines( function() {

    EntityCoin = EntityInteractable.extend({

        interactType: EntityInteractable.TYPE.NONE,

        size: {x: 4, y: 4},
        gravityFactor: 1,
        friction: {x: 50, y: 0},
        life: 15,
        _fadeTime: 3,

        value: 1,
        _animOffset: 0,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = ig.game.assets.animSheet_coin;
            this._animOffset = settings.id?settings.id*5:0;
            this.currentAnim = new ig.Animation(
                this.animSheet,
                0.1,
                [this._animOffset,
                 this._animOffset+1,
                 this._animOffset+2,
                 this._animOffset+3,
                 this._animOffset+4,
                 this._animOffset]
            );
            this.value = settings.id?EntityCoin.DataTable[settings.id]:1;
        },

        update: function() {
            this.friction.x = this.standing ? 400 : 50;
            this.parent();
        },

        interact: function(other) {
            other.inventory.gold += this.value;
            ig.game.textMoney.showAndFade();
            this.kill();
        },

        isAbleToInteract: function() {
            return this.touches(ig.game.player) && this.standing;
        }
    });

    EntityCoin.DataTable = [1, 5, 10];
});