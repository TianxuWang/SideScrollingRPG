/**
 * Created by Tianxu on 14-4-26.
 */
ig.module(
    'game.entities.spells.shuriken'
)
.requires(
    'game.entities.abstracts.bullet',
    'impact.entity'
)
.defines( function() {

    EntityShuriken = EntityBullet.extend ({

        name: 'Shuriken',
        checkAgainst: ig.Entity.TYPE.B,

        size: {x: 8, y: 8},
        gravityFactor: 0.3,
        bounciness: 0.2,
        maxVel: {x: 300, y: 50},
        friction: {x: 50, y: 0},
        _fadeTime: 3,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.animSheet = ig.game.assets.animSheet_shuriken;
            this.addAnim('idleY', 1, [0]);
            this.addAnim('idleX', 1, [1]);
            this.addAnim('fly', 0.1, [2, 3]);

            this.damage = this.owner._attack*2;

            this.flip = this.owner.flip;
            this.vel.x = this.flip ? -this.maxVel.x : this.maxVel.x;
            this.vel.y = -1;
            this.pos.x += this.flip ? -this.size.x : this.owner.size.x;
            this.pos.y += 5;
        },

        update: function() {

            if (this.vel.x != 0 && this.vel.y != 0) {
                this.currentAnim = this.anims.fly;
            }
            else if (this.vel.y == 0 && this.vel.x != 0) {
                this.currentAnim = this.anims.idleY;
                this.vel.x = 0;
            }
            else if (this.vel.x == 0 && this.vel.y != 0) {
                this.currentAnim = this.anims.idleX;
                this.vel.y = 0;
            }

            if (this.vel.x == 0 && !this.fadeKillTimer) {
                this.collides = ig.Entity.COLLIDES.NONE;
                this.fadeKill();
            }

            this.parent();
        },

        check: function(other) {
            if (other.state != other.State.BLOCK && other.state != other.State.INVINCIBLE) {
                this.checkAgainst = ig.Entity.TYPE.NONE;
                this.gravityFactor = 0.6;
                this.owner.target = other;

                other.bloodEmitter.setPos(this.pos.x + (this.flip ? -8 : 8), this.pos.y);
                other.hurt(!this.flip, {
                    value: this.damage,
                    attacker: this.owner
                });
            }
        },

        handleMovementTrace: function(res) {
            if (res.collision.x || res.collision.y || res.collision.slope) {
                if (res.collision.x) {
                    this.vel.x = 0;
                }
                else if (res.collision.y || res.collision.slope)
                    this.vel.y = 0;

                this.gravityFactor = 0;
            }

            this.parent(res);
        }
    });
});