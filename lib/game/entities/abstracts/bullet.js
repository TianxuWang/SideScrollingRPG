/**
 * Created by Tianxu on 14-4-26.
 */
ig.module(
    'game.entities.abstracts.bullet'
)
.requires(
    'impact.entity'
)
.defines( function() {

    EntityBullet = ig.Entity.extend({

        name: 'Bullet',
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.ACTIVE,

        owner: null,
        gravityFactor: 0,
        bounciness: 0,
        posOff: {x: 0, y: 0},
        life: 0,
        _age: 0,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.owner = settings.owner;
        },

        update: function() {
            this.updateFlip();

            if (this.life > 0) {
                this._age += ig.system.tick;
                if (this._age >= this.life) {
                    this.kill();
                    return;
                }
            }

            this.parent();
        },

        updateFlip: function() {
            if (this.vel.x < 0)
                this.flip = true;
            else if (this.vel.x > 0)
                this.flip = false;

            this.currentAnim.flip.x = this.flip;
        }
    });
});