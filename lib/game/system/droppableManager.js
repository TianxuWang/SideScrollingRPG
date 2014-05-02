/**
 * Created by Tianxu on 14-5-1.
 */
ig.module(
    'game.system.droppableManager'
)
.requires(
    'game.entities.eatable',
    'game.entities.pickable'
)
.defines( function() {

    DroppableManager = ig.Class.extend({

        owner: null,
        pos: {x: 0, y: 0},
        emitStrengthX: 70,
        emitStrengthY: 30,
        _eatableTable: null,
        _pickableTable: null,
        _eatableDropRate: 0,

        init: function(owner) {
            this.owner = owner;
            this._eatableDropRate = owner.eatableDropRate;
            this._eatableTable = owner.eatableTable;
            this._pickableTable = owner.pickableTable;
        },

        emit: function() {
            if (this._eatableTable && this._eatableTable.length > 0) {
                for (var i = 0; i < this._eatableTable.length; i ++) {
                    if (Math.random() <= this._eatableDropRate) {
                        var settings = {
                            id: this._eatableTable[i],
                            vel: {
                                x: this.emitStrengthX*Math.random()*(Math.random()<=0.5?-1:1),
                                y: -this.emitStrengthY*Math.random()
                            }
                        };
                        ig.game.spawnEntity(EntityEatable, this.owner.center.x, this.owner.center.y, settings);
                    }
                }
            }

            // TODO: Implement pickableTable
        }
    });
});