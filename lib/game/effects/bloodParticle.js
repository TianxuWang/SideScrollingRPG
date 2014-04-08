/**
 * Created by Tianxu on 14-3-30.
 */
ig.module(
    'game.effects.bloodparticle'
)
.requires(
    'game.effects.particle'
)
.defines( function() {
    EntityBloodParticle = EntityParticle.extend ({

        size: {x: 16, y: 16},
        offset: {x: 0, y: 0},
        maxVel: {x: 100, y: 100},
        friction: {x: 100, y: 0},
        gravityFactor: 0.25,
        _alpha: 1.0,

        animSheet: new ig.AnimationSheet("media/effects/bloodsplatter2.png", 16, 16),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('spray', 20, [0,1,2,3,4,5,6,7,8,9]);
            this._alpha = 0.5 + Math.random()*0.5;
            this.currentAnim.gotoRandomFrame();
        },

        update:function() {
            var p = this._age/this.life;
            this.currentAnim.alpha = this._alpha*(1-p);
            this.currentAnim.angle += 0.02;
            this.parent();
        }
    });
});