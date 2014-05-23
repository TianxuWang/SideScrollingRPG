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

        _float: false,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.life = settings.life;
            this.owner = settings.owner;
            this.flip = this.owner.flip;

            this.animSheet = ig.game.assets.animSheet_emotionParticle;
            this.addAnim('hide', 1, [0]);
            this.addAnim('talk', 0.2, [0, 1, 2, 3, 4, 5, 2, 3, 4, 5, 0]);
            this.addAnim('question', 1, [9]);
            this.addAnim('surprise', 0.2, [6, 7]);
            this.addAnim('angry', 0.5, [10, 11]);
            this.addAnim('poison', 1, [8]);
            this.addAnim('trade', 1, [12]);

            this.currentAnim = settings.type ? this.anims[settings.type] : null;
        },

        update: function() {
            if (this.owner.state && this.owner.state == this.owner.State.DEAD) {
                this.currentAnim = null;
            }
            if (!this._float){
                if (this.currentAnim){
                    this.flip = this.currentAnim.flip.x = !this.owner.flip;
                }

                this.setPosition(this.owner.center.x+(this.flip?-16:0), this.owner.pos.y-12);
            }
            this.parent();
        },

        setPosition: function(x, y) {
            this.pos.x = x;
            this.pos.y = y;
        }
    });
});