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
        center: null,
        size: {x: 0, y: 0},

        life: 0,
        _age: 0,
        _isInteracting: false,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.center = {x: x+this.size.x/2, y: y+this.size.y/2};
        },

        update: function() {
            this.center.x = this.pos.x + this.size.x/2;
            this.center.y = this.pos.y + this.size.y/2;

            if (this.life > 0) {
                this._age += ig.system.tick;
                if(this._age >= this.life && !this.fadeKillTimer) {
                    this.checkAgainst = ig.Entity.TYPE.NONE;
                    this.fadeKill();
                    return;
                }
            }

            if (this.isAbleToInteract()) {
                switch (this.interactType) {
                    case EntityInteractable.TYPE.NONE:
                        this.interact(ig.game.player);
                        break;
                    case EntityInteractable.TYPE.PRESS:
                        if (ig.input.pressed('interact')) {
                            this.interact(ig.game.player);
                        }
                        break;
                    case EntityInteractable.TYPE.HOLD:
                        break;
                    default:
                        break;
                }
            }

            this.parent();
        },

        interact: function(other) {
            this._isInteracting = true;
        },

        isAbleToInteract: function() {}
    });

    EntityInteractable.TYPE = {
        NONE: 0,
        PRESS: 1,
        HOLD: 2
    };
});