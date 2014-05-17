/**
 * Created by Tianxu on 14-5-1.
 */
ig.module(
    'game.entities.abstracts.interactable'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityInteractable = ig.Entity.extend({

        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NEVER,

        interactType: 0,

        life: 0,
        _age: 0,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
        },

        update: function() {
            if (this.life > 0) {
                this._age += ig.system.tick;
                if(this._age >= this.life && !this.fadeKillTimer) {
                    this.checkAgainst = ig.Entity.TYPE.NONE;
                    this.fadeKill();
                    return;
                }
            }
            this.parent();
        },

        check: function(other) {
            switch (this.interactType) {
                case EntityInteractable.TYPE.NONE:
                    this.interact(other);
                    break;
                case EntityInteractable.TYPE.PRESS:
                    if (ig.input.pressed('interact')) {
                        this.interact(other);
                    }
                    break;
                case EntityInteractable.TYPE.HOLD:
                    break;
                default:
                    break;
            }
        },

        interact: function(other) {}
    });

    EntityInteractable.TYPE = {
        NONE: 0,
        PRESS: 1,
        HOLD: 2
    };
});