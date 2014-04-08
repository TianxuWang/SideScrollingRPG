/**
 * Created by Tianxu on 14-3-31.
 */
/**
 * Created by Tianxu on 14-3-30.
 */
ig.module(
        'game.effects.sparkparticle'
    )
    .requires(
        'game.effects.particle'
    )
    .defines( function() {
        EntitySparkParticle = EntityParticle.extend ({

            size: {x: 1, y: 1},
            offset: {x: 0, y: 0},
            maxVel: {x: 100, y: 100},
            friction: {x: 0, y: 0},
            gravityFactor: 0,
            _alpha: 1.0,

            animSheet: new ig.AnimationSheet("media/effects/explosion.png", 1, 1),

            init: function(x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('spray', 20, [0,1,2,3,4,5,6,7]);
                this._alpha = 0.5 + Math.random()*0.5;
                this.currentAnim.gotoRandomFrame();
            },

            update:function() {
                var p = this._age/this.life;
                this.currentAnim.alpha = this._alpha*(1-p);
                //this.currentAnim.angle += 0.02;
                this.parent();
            }
        });
    });