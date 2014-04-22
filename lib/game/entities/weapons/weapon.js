/**
 * Created by Tianxu on 14-4-14.
 */
ig.module (
    'game.entities.weapons.weapon'
)
.requires (
    'impact.entity',
    'impact.sound'
)
.defines ( function() {

    EntityWeapon = ig.Entity.extend ({

        name: 'Weapon',
        size: {x: 40, y: 40},
        owner: null,
        visible: true,
        gravityFactor: 0,

        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NEVER,

        range: 0,
        _minDamage: 0,
        _maxDamage: 0,
        _attackSpeed: 0,
        specialEffect: {
            poison: { chance: 0, value: 0, lastTime: 0 },
            freeze: { chance: 0, value: 0, lastTime: 0 },
            ignite: { chance: 0, value: 0, lastTime: 0 },
            lifeSteal: 0,
            manaSteal: 0
        },

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.isShadowClone = settings.isShadowClone;
            this.animSheet = this.isShadowClone ? this.shadowCloneSheet : this.normalSheet;
            this.name = this.isShadowClone ? this.name+'_shadowClone' : this.name;
            this.owner = settings.owner;
            this.flip = settings.flip;
            this.attackSpeed = (this._attackSpeed + this.owner._attackSpeed)/2;

            this.initAnimations();
        },

        initAnimations: function() {
            this.anims.idle.timer = EntityPlayer.animationTimer;
        },

        update: function() {
            this.updateFlip();

            this.parent();
        },

        handleMovementTrace: function(res) {
            // totally ignore collision with tiles, maybe not true for all weapons
            this.pos.x += this.vel.x * ig.system.tick;
            this.pos.y += this.vel.y * ig.system.tick;
        },

        updateFlip: function() {
            this.flip = this.owner.flip;
            if (this.currentAnim == this.anims.idle)
                this.currentAnim.flip.x = this.flip;
        },

        idle: function() {
            // offset position
            //this.stop();
            this.offsetIdlePos();

            this.removeCollision();
            this.setVisible();
            this.currentAnim = this.anims.idle;
        },

        attackGround: function() {
            // offset position
            //this.stop();
            this.offsetAttackPos();

            this.getCollision();
            this.setVisible();
            this.currentAnim = this.owner.flip ?
                               this.anims.attackGroundLeft.rewind() : this.anims.attackGroundRight.rewind();
        },

        attackAir: function() {
            this.offsetAttackPos();

            this.getCollision();
            this.setVisible();
            this.currentAnim = this.owner.flip ?
                               this.anims.attackAirLeft.rewind() : this.anims.attackAirRight.rewind();
        },

        offsetIdlePos: function() {

        },

        offsetAttackPos: function() {

        },

        hide: function() {
            this.removeCollision();
            this.setInvisible();
        },

        stop: function() {
            this.accel.x = 0;
        },

        getCollision: function() {
            this.checkAgainst = ig.Entity.TYPE.B;
        },

        removeCollision: function() {
            this.checkAgainst = ig.Entity.TYPE.NONE;
        },

        setVisible: function() {
            if (!this.visible)
                this.visible = true;
        },

        setInvisible: function() {
            if (this.visible) {
                this.currentAnim = null;
                this.visible = false;
            }
        },

        setAnimNormal: function() {
            this.animSheet = this.normalSheet;
            this.initAnimations();
        },

        setAnimPoison: function() {
            this.animSheet = this.poisonSheet;
            this.initAnimations();
        },

        setSpecialEffect: function(type, chance, value, lastTime) {
            var effect = this.specialEffect[type];
            effect.chance += chance;
            effect.value += value;
            effect.lastTime += lastTime;
        }
    });

    EntityWeapon.EFFECT_TYPE = {
        POISON: 0,
        FREEZE: 1,
        IGNITE: 2,
        LIFESTEAL: 3,
        EXTRADAMAGE_DAEMON: 4,
        EXTRADAMAGE_BEAST: 5,
        EXTRADAMAGE_HUMAN: 6
    }
});