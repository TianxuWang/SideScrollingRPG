/**
 * Created by Tianxu on 14-4-30.
 */
ig.module (
    'game.entities.interactables.eatable'
)
.requires (
    'game.entities.abstracts.interactable'
)
.defines( function() {

    EntityEatable = EntityInteractable.extend({

        interactType: EntityInteractable.TYPE.NONE,

        size: {x: 8, y: 8},
        offset: {x: 1, y: 1},
        gravityFactor: 0.5,
        friction: {x: 50, y: 0},
        life: 6,
        _fadeTime: 3,

        id: -1,
        healthRecover: 0,
        manaRecover: 0,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.id = settings.id;
            this.animSheet = ig.game.assets.animSheet_fruits;
            this.currentAnim = new ig.Animation(this.animSheet, 0.1, [this.id], true);
            this.currentAnim.flip.x = Math.random() <= 0.5;
            this.healthRecover = EntityEatable.DataTable[this.id].hp;
            this.manaRecover = EntityEatable.DataTable[this.id].mp;
        },

        update: function() {
            this.friction.x = this.standing ? 400 : 50;
            this.parent();
        },

        interact: function(other) {
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
                    });
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
                    });
                }
            }
            this.kill();
        },

        isAbleToInteract: function() {
            return this.touches(ig.game.player);
        }
    });

    EntityEatable.DataTable = [
        {hp: 2, mp: 0},
        {hp: 0, mp: 2},
        {hp: 2, mp: 2},
        {hp: 3, mp: 0},
        {hp: 0, mp: 3},
        {hp: 3, mp: 3},
        {hp: 4, mp: 0},
        {hp: 0, mp: 4},
        {hp: 4, mp: 4},
        {hp: 5, mp: 0},
        {hp: 0, mp: 5},
        {hp: 5, mp: 5},
        {hp: 6, mp: 0},
        {hp: 0, mp: 6},
        {hp: 6, mp: 6},
        {hp: 7, mp: 0},
        {hp: 0, mp: 7},
        {hp: 7, mp: 7},
        {hp: 8, mp: 0},
        {hp: 0, mp: 8},
        {hp: 8, mp: 8},
        {hp: 9, mp: 0},
        {hp: 0, mp: 9},
        {hp: 9, mp: 9},
        {hp: 10, mp: 0}
    ];
});