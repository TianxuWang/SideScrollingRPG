/**
 * Created by Tianxu on 14-4-26.
 */
ig.module(
    'game.entities.spells.shuriken'
)
.requires(
    'game.entities.bullet',
    'impact.entity'
)
.defines( function() {

    EntityShuriken = EntityBullet.extend ({

        name: 'Shuriken',
        checkAgainst: ig.Entity.TYPE.B,

        size: {x: 8, y: 8},
        gravityFactor: 0.5,
        bounciness: 0.2,
        maxVel: {x: 250, y: 50},
        friction: {x: 100, y: 0},
        _fadeTime: 3,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.animSheet = ig.game.assets.animSheet_shuriken;
            this.addAnim('idle', 1, [0]);
            this.addAnim('fly', 0.1, [0, 1]);
            this.addAnim('ground', 0.2, [0, 1]);

            this.damage = this.owner._attack*2;

            this.flip = this.owner.flip;
            this.vel.x = this.flip ? -250 : 250;
            this.pos.x += this.flip ? -this.size.x : this.owner.size.x;
            this.pos.y += 6;
        },

        update: function() {
            this.friction.x = this.standing ? 400 : 50;

            if (Math.abs(this.vel.x) > 50)
                this.currentAnim = this.anims.fly;
            else if (Math.abs(this.vel.x) > 15)
                this.currentAnim = this.anims.ground;
            else
                this.currentAnim = this.anims.idle;

            if (this.vel.x == 0 && !this.fadeKillTimer) {
                this.collides = ig.Entity.COLLIDES.NONE;
                this.fadeKill();
            }

            this.parent();
        },

        check: function(other) {
            if (other.state != other.State.BLOCK && other.state != other.State.INVINCIBLE) {
                this.checkAgainst = ig.Entity.TYPE.NONE;
                this.owner.target = other;

                other.bloodEmitter.setPos(this.pos.x + (this.flip ? -8 : 8), this.pos.y);
                other.hurt(!this.flip, {
                    value: this.damage,
                    attacker: this.owner
                });
            }
        }
    });
});