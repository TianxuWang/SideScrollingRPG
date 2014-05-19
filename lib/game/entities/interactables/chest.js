/**
 * Created by Tianxu on 14-5-18.
 */
ig.module(
    'game.entities.interactables.chest'
)
.requires(
    'game.entities.abstracts.interactable'
)
.defines( function() {

    EntityChest = EntityInteractable.extend({

        interactType: EntityInteractable.TYPE.PRESS,
        size: {x: 24, y: 24},
        flip: false,

        eatableDropRate: null,
        eatableTable: null,
        pickableTable: null,
        _eatableStr: null,
        _pickableStr: null,
        _opened: false,
        _resetOnLevelChanged: false,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.initAnimations();
            this.currentAnim = this.anims.idle;
            this.currentAnim.flip.x = this.flip;

            this.eatableTable = this.parseEatableTable(this._eatableStr);
            this.pickableTable = this.parsePickableTable(this._pickableStr);
        },

        initAnimations: function() {
            this.animSheet = new ig.AnimationSheet('media/items/chest_0.png', 24, 24);
            this.addAnim('idle', 0.1, [0]);
            this.addAnim('opening', 0.03, [0, 1, 1, 1, 2, 3, 4, 5], true);
            this.addAnim('idleOpened', 0.1, [5]);
        },

        update: function() {
            if (this.currentAnim == this.anims.opening && this.currentAnim.loopCount) {
                this._opened = true;
                this._isInteracting = false;
            }

            this.parent();
        },

        interact: function(other) {
            this.parent();

            this.currentAnim = this.anims.opening.rewind();
            this.currentAnim.flip.x = this.flip;
            ig.game.lootFactory.generateLoot(this);

            if (!this._resetOnLevelChanged) {
                ig.game.levelDirector.openedChestCollection.push(this.name);
            }
        },

        isAbleToInteract: function() {
            return this.touches(ig.game.player) && !this._opened && !this._isInteracting &&
                  ((this.flip && !ig.game.player.flip && ig.game.player.center.x < this.center.x) ||
                   (!this.flip && ig.game.player.flip && ig.game.player.center.x > this.center.x));
        },

        parseEatableTable: function(str) {
            if (!str)
                return null;

            return str.split(',').map(Number);
        },

        parsePickableTable: function(str) {
            if (!str)
                return null;

            var res = [];
            var itemArray = str.split(',');
            var item;
            for (var i = 0; i < itemArray.length; i++) {
                item = itemArray[i].split('-').map(Number);
                res.push({itemID: item[0], dropRate: item[1]});
            }
            return res;
        },

        setToOpened: function() {
            this._opened = true;
            this.currentAnim = this.anims.idleOpened;
            this.currentAnim.flip.x = this.flip;
        }
    });
});