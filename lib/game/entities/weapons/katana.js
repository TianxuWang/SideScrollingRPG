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

        name: 'Katana',
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
            this.addAnim('attackGroundRight', this.attackSpeed, [6, 7, 8, 9, 10, 11], true);
            this.addAnim('attackGroundLeft', this.attackSpeed, [12, 13, 14, 15, 16, 17], true);
            this.addAnim('attackAirRight', this.attackSpeed, [6, 7, 8, 9, 10, 11], true);
            this.addAnim('attackAirLeft', this.attackSpeed, [12, 13, 14, 15, 16, 17], true);

            this.anims.idle.timer = EntityWeapon.animationTimer;
        },

        check: function(other) {
            if (other.state != other.State.BLOCK &&
                other.state != other.State.INVINCIBLE &&
                !this.owner._justMadeDamage &&
                (this.currentAnim.frame == 3 || this.currentAnim.frame == 4)) {

                var damageTaken = this.owner.makeRandDamage();
                var realDamageTaken = damageTaken.value - other._defence;
                var specialEffects = damageTaken.effects;

                if (Object.keys(specialEffects).length > 0) {
                    if (specialEffects.poison) {
                        other._poisonDamageAccum = specialEffects.poison.value;
                        other._poisonDamageTaken = 0;
                        other._poisonLastTime = specialEffects.poison.lastTime;
                    }
                    if (specialEffects.freeze) {}
                    if (specialEffects.ignite) {}
                    if (specialEffects.lifeStealRate) {
                        var lifeStealAmount = Math.floor(realDamageTaken * specialEffects.lifeStealRate);
                        this.owner._healAccum += lifeStealAmount;
                        this.owner.textEmitter.emit({
                            text: lifeStealAmount,
                            color: '#00FF00',
                            fontSize: 12,
                            gravityFactor: 0.25
                        });
                    }
                }

                // set target
                other.state = other.State.HURT;
                other.hurt(this.owner.isOnLeftOf(other));
                other._damageAccum += realDamageTaken;

                // set target's flip and blood effect
                other.flip = this.owner.isOnLeftOf(other);
                other.bloodEmitter.setPos(this.pos.x + (this.flip ? -12 : 36), this.pos.y + 12);
                other.textEmitter.emit({
                    text: realDamageTaken,
                    color: damageTaken.isCritical ? '#FFEE00' : '#FFFFFF',
                    fontSize: damageTaken.isCritical ? 14 : 12,
                    gravityFactor: damageTaken.isCritical ? 0.4 : 0.25
                });

                // set owner
                this.owner._justMadeDamage = true;
                this.owner.target = other;
            }
        },

        offsetIdlePos: function() {
            this.pos.x = this.owner.pos.x - (this.owner.flip ? 2 : 18);
            this.pos.y = this.owner.pos.y - 9;
        },

        offsetAttackPos: function() {
            this.pos.x = this.owner.pos.x - (this.owner.flip ? 12 : 8);
            this.pos.y = this.owner.pos.y - 18;
        }
    });
});