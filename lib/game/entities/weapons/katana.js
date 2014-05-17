/**
 * Created by Tianxu on 14-4-14.
 */
ig.module (
    'game.entities.weapons.katana'
)
.requires (
    'impact.sound',
    'game.entities.abstracts.weapon'
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
            lifeSteal: 0,
            manaSteal: 0
        },

        init: function(x, y, settings) {
            this.shadowCloneSheet = ig.game.assets.animSheet_katana_shadowClone;
            this.poisonSheet = ig.game.assets.animSheet_katana_poison;

            this.parent(x, y, settings);
        },

        initAnimations: function() {
            this.addAnim('idle', 0.3, [0, 1, 2, 1]);
            this.addAnim('attackGround', this.attackSpeed, [6, 7, 8, 9, 10, 11], true);
            this.addAnim('attackGround2', this.attackSpeed, [18, 19, 20, 21, 22, 23, 23], true);
            this.addAnim('attackGround3', this.attackSpeed, [24, 25, 25, 25, 25, 25, 24], true);
            this.addAnim('attackAir', this.attackSpeed, [6, 7, 8, 9, 10, 11], true);
            this.addAnim('block', 1, [12], true);

            this.parent();
        },

        check: function(other) {
            if (!other.isAbleToBlock(this) &&
                other.state != other.State.INVINCIBLE &&
                this.owner.isAbleToAttack() &&
                this.owner._targetGroup.indexOf(other) == -1) {

                other.bloodEmitter.setPos(this.pos.x + (this.flip ? -12 : 12), this.pos.y + 4);
                other.hurt(this.owner.isOnLeftOf(other), this.owner.makeRandDamage());

                this.owner._targetGroup.push(other);
                this.owner.target = other;
            }
            else if (other.isAbleToBlock(this) &&
                !other._justMadeBlock &&
                this.owner.isAbleToAttack()) {
                other.slideBack(this.owner.isOnLeftOf(other));
                other._justMadeBlock = true;

                other.sparkEmitter.setPos(this.pos.x + (this.flip ? 4 : 36), this.pos.y + 8);
                other.sparkEmitter.revive(0.1);
                other.sparkEmitter.enabled = true;
            }
        },

        offsetIdlePos: function() {
            this.pos.x = this.owner.pos.x - 13;
            this.pos.y = this.owner.pos.y - 18;
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

    EntityKatana_0 = EntityKatana.extend({
        _minDamage: 3,
        _maxDamage: 5,
        _attackSpeed: 0.1,
        init: function(x, y, settings){
            this.normalSheet = ig.game.assets.animSheet_katana_0;
            this.parent(x, y, settings);
        }
    });

    EntityKatana_1 = EntityKatana.extend({
        _minDamage: 2,
        _maxDamage: 4,
        _attackSpeed: 0.05,
        specialEffect: {
            poison: { chance: 0, value: 0, lastTime: 0 },
            freeze: { chance: 0, value: 0, lastTime: 0 },
            ignite: { chance: 0, value: 0, lastTime: 0 },
            lifeSteal: 0.2,
            manaSteal: 0
        },
        init: function(x, y, settings){
            this.normalSheet = ig.game.assets.animSheet_katana_1;
            this.parent(x, y, settings);
        }
    });

    EntityKatana_2 = EntityKatana.extend({
        _minDamage: 6,
        _maxDamage: 10,
        _attackSpeed: 0.1,
        init: function(x, y, settings){
            this.normalSheet = ig.game.assets.animSheet_katana_2;
            this.parent(x, y, settings);
        }
    });
});