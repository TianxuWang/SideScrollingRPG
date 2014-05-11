/**
 * Created by Tianxu on 14-5-1.
 */
ig.module(
    'game.system.droppableManager'
)
.requires(
    'game.entities.eatable',
    'game.entities.pickable',
    'game.data.items.itemFactory'
)
.defines( function() {

    DroppableManager = ig.Class.extend({

        owner: null,
        pos: {x: 0, y: 0},
        emitStrengthX: 70,
        emitStrengthY: 30,
        _itemFactory: null,
        _eatableTable: null,
        _pickableTable: null,
        _eatableDropRate: 0,

        init: function(owner) {
            this.owner = owner;
            this._eatableDropRate = owner.eatableDropRate;
            this._eatableTable = owner.eatableTable;
            this._pickableTable = owner.pickableTable;
            this._itemFactory = new ItemFactory(owner);
        },

        emit: function() {
            if (this._eatableTable && this._eatableTable.length > 0) {
                for (var i = 0; i < this._eatableTable.length; i ++) {
                    if (Math.random() <= this._eatableDropRate) {
                        var est_settings = {
                            id: this._eatableTable[i],
                            vel: {
                                x: this.emitStrengthX*Math.random()*(Math.random()<=0.5?-1:1),
                                y: -this.emitStrengthY*Math.random()
                            }
                        };
                        ig.game.spawnEntity('EntityEatable', this.owner.center.x, this.owner.center.y, est_settings);
                    }
                }
            }

            if (this._pickableTable && this._pickableTable.length > 0) {
                for (i = 0; i < this._pickableTable.length; i++) {
                    if (Math.random() <= this._pickableTable[i].dropRate) {
                        var item = this._itemFactory.generateItem(this._pickableTable[i].itemID);
                        var pick_settings = {
                            item: item,
                            vel: {
                                x: this.emitStrengthX*Math.random()*(Math.random()<=0.5?-1:1),
                                y: -this.emitStrengthY*Math.random()
                            }
                        };
                        ig.game.spawnEntity('EntityPickable', this.owner.center.x, this.owner.center.y, pick_settings);
                    }
                }
            }
        }
    });
});