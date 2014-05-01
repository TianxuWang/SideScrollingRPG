/**
 * Created by Tianxu on 14-4-30.
 */
ig.module (
    'game.entities.eatable'
)
.requires (
    'game.entities.droppable'
)
.defines( function() {

    EntityEatable = EntityDroppable.extend({

        size: {x: 8, y: 8},
        gravityFactor: 0.5,
        friction: {x: 20, y: 0},
        life: 6,
        _fadeTime: 3,

        healthRecover: 0,
        manaRecover: 0,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.index = settings.index;
            this.animSheet = ig.game.assets.animSheet_fruits;
            this.currentAnim = new ig.Animation(this.animSheet, 0.1, [this.index], true);
            this.currentAnim.flip.x = Math.random() <= 0.5;
            this.healthRecover = EntityEatable.DataTable[this.index].hp;
            this.manaRecover = EntityEatable.DataTable[this.index].mp;
        },

        check: function(other) {
            if (other.state != other.State.DEAD) {
                if (this.healthRecover > 0) {
                    other._healAccum += this.healthRecover;
                    other.textEmitter.emit({
                        text: '+ ' + this.healthRecover,
                        color: '#00FF00',
                        fontSize: 12,
                        gravityFactor: 0,
                        vel: {x: 0, y: -10},
                        life: 1
                    })
                }
                if (this.manaRecover > 0) {
                    other._manaGainAccum += this.manaRecover;
                    other.textEmitter.emit({
                        text: '+ ' + this.manaRecover,
                        color: '#0000FF',
                        fontSize: 12,
                        gravityFactor: 0,
                        vel: {x: 0, y: -10},
                        life: 1
                    })
                }
            }
            this.kill();
        }
    });

    EntityEatable.DataTable = [
        {hp: 5, mp: 0},
        {hp: 0, mp: 5},
        {hp: 10, mp: 0},
        {hp: 0, mp: 10},
        {hp: 10, mp: 10},
        {hp: 20, mp: 0},
        {hp: 0, mp: 20},
        {hp: 20, mp: 10},
        {hp: 10, mp: 20},
        {hp: 20, mp: 20},
        {hp: 30, mp: 0}
    ];
});