/**
 * Created by Tianxu on 14-4-14.
 */
ig.module (
    'game.entities.weapons.katana'
)
.requires (
    'impact.sound',
    'game.entities.weapons.weapon'
)
.defines( function() {

    EntityKatana = EntityWeapon.extend({

        name: 'EntityKatana',
        size:{x: 40, y: 40},

        range: 25,
        _minDamage: 1,
        _maxDamage: 2,
        _attackSpeed: 0.1,

        specialEffect: {
            poison: { chance: 0, value: 0, lastTime: 0 },
            freeze: { chance: 0, value: 0, lastTime: 0 },
            ignite: { chance: 0, value: 0, lastTime: 0 },
            lifeSteal: 0.2
        },

        init: function(x, y, settings) {
            this.normalSheet = ig.game.assets.animSheet_katana;
            this.shadowCloneSheet = ig.game.assets.animSheet_katana_shadowClone;
            this.poisonSheet = ig.game.assets.animSheet_katana_poison;

            this.parent(x, y, settings);
        },

        initAnimations: function() {
            this.addAnim('idle', 0.3, [0, 1, 2, 1]);
            this.addAnim('attackGround', this.attackSpeed, [6, 7, 8, 9, 10, 11], true);
            this.addAnim('attackAir', this.attackSpeed, [6, 7, 8, 9, 10, 11], true);
            this.addAnim('block', 1, [12], true);

            this.parent();
        },

        check: function(other) {
            if (!other.isAbleToBlock(this) &&
                other.state != other.State.INVINCIBLE &&
                (this.owner.stateMachine.currentState == this.owner.State.ATTACKGROUND ||
                this.owner.stateMachine.currentState == this.owner.State.ATTACKAIR) &&
                !this.owner._justMadeDamage &&
                (this.currentAnim.frame == 3 || this.currentAnim.frame == 4)) {

                other.bloodEmitter.setPos(this.pos.x + (this.flip ? -12 : 12), this.pos.y + 4);
                other.hurt(this.owner.isOnLeftOf(other), this.owner.makeRandDamage());

                this.owner._justMadeDamage = true;
                this.owner.target = other;
            }
            else if (other.isAbleToBlock(this) &&
                !other._justMadeBlock &&
                (this.currentAnim.frame == 3 || this.currentAnim.frame == 4)) {
                other.slideBack(this.owner.isOnLeftOf(other));
                other._justMadeBlock = true;

                other.sparkEmitter.setPos(this.pos.x + (this.flip ? 4 : 36), this.pos.y + 8);
                other.sparkEmitter.revive(0.1);
                other.sparkEmitter.enabled = true;
            }
        },

        offsetIdlePos: function() {
            this.pos.x = this.owner.pos.x - (this.owner.flip ? 5 : 21);
            this.pos.y = this.owner.pos.y - 9;
        },

        offsetAttackPos: function() {
            this.pos.x = this.owner.pos.x - (this.owner.flip ? 15 : -15);
            this.pos.y = this.owner.pos.y - 5;
        },

        resizeToAttackBox: function() {
            this.size.x = 14;
            this.size.y = 27;
            this.offset.x = this.flip ? 0 : 26;
            this.offset.y = 13;
        }
    });
});