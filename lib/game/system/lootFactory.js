/**
 * Created by Tianxu on 14-5-1.
 */
ig.module(
    'game.system.lootFactory'
)
.requires(
    'game.entities.interactables.eatable',
    'game.entities.interactables.pickable',
    'game.entities.interactables.coin'
)
.defines( function() {

    LootFactory = ig.Class.extend({

        pos: {x: 0, y: 0},
        emitStrengthX: 100,
        emitStrengthY: 30,
        _coinTable: null,
        _eatableTable: null,
        _pickableTable: null,
        _eatableDropRate: 0,

        init: function() { },

        generateLoot: function(owner) {
            this._eatableDropRate = owner.eatableDropRate;
            this._eatableTable = owner.eatableTable;
            this._pickableTable = owner.pickableTable;
            this._coinTable = owner.coinTable;

            if (this._coinTable && this._coinTable.length > 0) {
                for (var i = 0; i < this._coinTable.length; i++) {
                    for (var j = 0; j < this._coinTable[i].maxAmt; j++) {
                        if (Math.random() <= this._coinTable[i].dropRate) {
                            var coin_settings = {
                                id: i,
                                vel: {
                                    x: this.emitStrengthX*Math.random()*(Math.random()<=0.5?-1:1),
                                    y: -60-this.emitStrengthY*Math.random()
                                }
                            };
                            ig.game.spawnEntity('EntityCoin', owner.center.x, owner.center.y, coin_settings);
                        }
                    }
                }
            }

            if (this._eatableTable && this._eatableTable.length > 0) {
                for (i = 0; i < this._eatableTable.length; i ++) {
                    if (Math.random() <= this._eatableDropRate) {
                        var eat_settings = {
                            id: this._eatableTable[i],
                            vel: {
                                x: this.emitStrengthX*Math.random()*(Math.random()<=0.5?-1:1),
                                y: -60-this.emitStrengthY*Math.random()
                            }
                        };
                        ig.game.spawnEntity('EntityEatable', owner.center.x, owner.center.y, eat_settings);
                    }
                }
            }

            if (this._pickableTable && this._pickableTable.length > 0) {
                for (i = 0; i < this._pickableTable.length; i++) {
                    if (Math.random() <= this._pickableTable[i].dropRate) {
                        var item = ig.game.itemFactory.generateItem(this._pickableTable[i].itemID);
                        var pick_settings = {
                            item: item,
                            vel: {
                                x: this.emitStrengthX/2*Math.random()*(Math.random()<=0.5?-1:1),
                                y: -50-this.emitStrengthY/2*Math.random()
                            }
                        };
                        ig.game.spawnEntity('EntityPickable', owner.center.x, owner.center.y, pick_settings);
                    }
                }
            }
        }
    });
});