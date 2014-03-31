/**
 * Created by Tianxu on 14-3-30.
 */
ig.module(
    'game.entities.effects.particle'
)
.requires(
    'impact.entity'
)
.defines( function(){

    EntityParticle = ig.Entity.extend({

        collides: ig.Entity.COLLIDES.NEVER,
        //type: ig.Entity.TYPE.NONE,
        //checkAgainst: ig.Entity.TYPE.NONE,
        emitter: null,
        life: 2,
        _age: 0,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
        },

        update: function() {
            this._age += ig.system.tick;
            if(this._age >= this.life) {
                this.kill();
                return;
            }
            this.parent();
        }
    });

});