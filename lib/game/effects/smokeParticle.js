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

        size: {x: 13, y: 13},
        life: 0.4,
        gravityFactor: 0,
        owner: null,
        _alpha: 1,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.owner = settings.owner;

            if (settings.type == 'start')
                this.pos.x = x + (this.owner.flip ? this.owner.size.x : -this.size.x);
            else if (settings.type == 'end')
                this.pos.x = x + (this.owner.flip ? -this.size.x-5 : this.owner.size.x+5);

            this.pos.y = y + this.owner.size.y - this.size.y;
            this.animSheet = ig.game.assets.animSheet_smokeParticle;
            this.addAnim('start', 0.06, [0, 1, 2, 3], true);
            this.addAnim('end', 0.06, [5, 6, 7, 8], true);
            this.currentAnim = this.anims[settings.type].rewind();
            this.currentAnim.flip.x = this.flip = this.owner.flip;
        },

        update: function() {
            this.currentAnim.alpha = this._alpha*(1-this._age/this.life);
            this.parent();
        }
    });
});