/**
 * Created by Tianxu on 14-4-22.
 */
ig.module(
    'game.effects.emotionParticle'
)
.requires(
    'game.effects.particle'
)
.defines( function() {

    EntityEmotionParticle = EntityParticle.extend({

        size: {x: 16, y: 17},
        offset: {x: 0, y: 0},
        gravityFactor: 0,
        owner: null,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.life = settings.life;
            this.owner = settings.owner;
            this.flip = this.owner.flip;

            this.animSheet = ig.game.assets.animSheet_emotionParticle;
            this.addAnim('question', 1, [1]);
            this.addAnim('surprise', 0.2, [6, 7]);
            this.addAnim('angry', 0.5, [12, 13]);
            this.addAnim('poison', 1, [0]);

            this.currentAnim = this.anims[settings.type];
        },

        update: function() {
            if (this.owner.state == this.owner.State.DEAD) {
                this.currentAnim = null;
            }
            if (this.currentAnim){
                this.flip = this.currentAnim.flip.x = !this.owner.flip;
            }
            this.setPosition(this.owner.center.x+(this.flip?-16:0), this.owner.pos.y-8);
            this.parent();
        },

        setPosition: function(x, y) {
            this.pos.x = x;
            this.pos.y = y;
        }
    });
});