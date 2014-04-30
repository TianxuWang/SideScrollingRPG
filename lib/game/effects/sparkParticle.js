/**
 * Created by Tianxu on 14-3-31.
 */
ig.module(
    'game.effects.sparkParticle'
)
.requires(
    'game.effects.particle'
)
.defines( function() {

    EntitySparkParticle = EntityParticle.extend ({

        size: {x: 1, y: 1},
        offset: {x: 0, y: 0},
        maxVel: {x: 150, y: 150},
        friction: {x: 20, y: 0},
        gravityFactor: 0.25,
        _alpha: 1.0,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = ig.game.assets.animSheet_sparkParticle;
            this.addAnim('spray', 20, [0,1,2,3,4,5,6,7]);
            //this._alpha = 0.5 + Math.random()*0.5;
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