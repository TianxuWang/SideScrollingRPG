/**
 * Created by Tianxu on 14-4-14.
 */
ig.module (
    'game.entities.abstracts.weapon'
)
.requires (
    'impact.entity',
    'impact.sound'
)
.defines ( function() {

    EntityWeapon = ig.Entity.extend ({

        name: 'EntityWeapon',
        size: {x: 40, y: 40},
        _originalSize: {x: 40, y: 40},
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
            if (this.currentAnim)
                this.currentAnim.flip.x = this.flip;
        },

        idle: function() {
            this.resizeToNormalBox();
            this.offsetIdlePos();

            this.removeCollision();
            this.setVisible();
            this.currentAnim = this.anims.idle;
        },

        attackGround: function() {
            this.resizeToAttackBox();
            this.offsetAttackPos();

            this.getCollision();
            this.setVisible();
            this.currentAnim = this.anims.attackGround.rewind();
        },

        attackGround2: function() {
            this.resizeToAttackBox();
            this.offsetAttackPos();

            this.getCollision();
            this.setVisible();
            this.currentAnim = this.anims.attackGround2.rewind();
        },

        attackGround3: function() {
            this.resizeToAttackBox();
            this.offsetAttackPos();

            this.getCollision();
            this.setVisible();
            this.currentAnim = this.anims.attackGround3.rewind();
        },

        attackAir: function() {
            this.resizeToAttackBox();
            this.offsetAttackPos();

            this.getCollision();
            this.setVisible();
            this.currentAnim = this.anims.attackAir.rewind();
        },

        block: function() {
            this.resizeToNormalBox();
            this.offsetIdlePos();

            this.removeCollision();
            this.setVisible();
            this.currentAnim = this.anims.block.rewind();
        },

        cast: function() {
            this.resizeToNormalBox();
            this.offsetIdlePos();
            this.hide();
        },

        offsetIdlePos: function() {

        },

        offsetAttackPos: function() {

        },

        resizeToAttackBox: function() {

        },

        resizeToNormalBox: function() {
            this.size.x = this._originalSize.x;
            this.size.y = this._originalSize.y;
            this.offset.x = 0;
            this.offset.y = 0;
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
        NORMAL: 0,
        POISON: 1,
        FREEZE: 2,
        IGNITE: 3,
        LIFESTEAL: 4,
        EXTRADAMAGE_DAEMON: 5,
        EXTRADAMAGE_BEAST: 6,
        EXTRADAMAGE_HUMAN: 7
    }
});