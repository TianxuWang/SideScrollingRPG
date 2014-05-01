/**
 * Created by Tianxu on 14-5-1.
 */
ig.module(
    'game.entities.droppable'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityDroppable = ig.Entity.extend({

        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NEVER,

        life: 0,
        _age: 0,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
        },

        update: function() {
            if (this.life > 0) {
                this._age += ig.system.tick;
                if(this._age >= this.life) {
                    this.checkAgainst = ig.Entity.TYPE.NONE;
                    this.fadeKill();
                    return;
                }
            }
            this.parent();
        }
    })
});