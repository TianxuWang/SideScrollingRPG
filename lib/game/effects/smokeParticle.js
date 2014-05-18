/**
 * Created by Tianxu on 14-5-18.
 */
ig.module(
    'game.effects.smokeParticle'
)
.requires(
    'game.effects.particle'
)
.defines( function() {

    EntitySmokeParticle = EntityParticle.extend({

        size: {x: 13, y: 8},
        life: 0.4,
        gravityFactor: 0,
        owner: null,
        _alpha: 1,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.owner = settings.owner;
            this.pos.x = x + (this.owner.flip ? this.owner.size.x : -this.size.x);
            this.pos.y = y + this.owner.size.y - this.size.y;
            this.animSheet = ig.game.assets.animSheet_smokeParticle;
            this.addAnim('emit', 0.06, [0, 1, 2, 3], true);
            this.currentAnim = this.anims.emit;
            this.currentAnim.flip.x = this.flip = this.owner.flip;
        },

        update: function() {
            this.currentAnim.alpha = this._alpha*(1-this._age/this.life);
            this.parent();
        }
    });
});