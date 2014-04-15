/**
 * Created by Tianxu on 14-4-11.
 */
ig.module (
    'game.entities.spells.shadowClone'
)
.requires (
    'impact.sound',
    'game.entities.character',
    'game.system.eventChain',
    'game.entities.weapons.katana'
)
.defines ( function() {

    EntityShadowClone = EntityCharacter.extend ({

        name: 'Player_shadowClone',

        zIndex: 44,
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,

        animSheet: new ig.AnimationSheet('media/ninja_shadowclone.png', 24, 23),
        activeWeapon: null,
        activeSkill: null,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.flip = settings.flip;
            this.size = settings.size;
            this.offset = settings.offset;
            this.maxVel = settings.maxVel;
            this.health = this.maxHealth = settings.maxHealth/2;
            this._attack = settings._attack;
            this.defence = settings.defence;
            this._attackSpeed = settings._attackSpeed;
            this.activeWeapon = ig.game.spawnEntity(settings.activeWeapon, x, y, {
                flip: this.flip,
                owner: this,
                isShadowClone: true
            });
            this.activeWeapon.zIndex = 45;

            // idle
            this.addAnim('idleRight', 0.3, [6, 7, 8, 7]);
            this.addAnim('idleLeft', 0.3, [9, 10, 11, 10]);

            // move
            this.addAnim('walkRight', 0.2, [0, 1, 2, 1]);
            this.addAnim('walkLeft', 0.2, [3, 4, 5, 4]);
            this.addAnim('runRight', 0.1, [0, 1, 2, 1]);
            this.addAnim('runLeft', 0.1, [3, 4, 5, 4]);

            // jump
            this.addAnim('jumpGroundRight', 0.14, [24, 25, 26, 27, 28, 29], true);
            this.addAnim('jumpGroundLeft', 0.14, [30, 31, 32, 33, 34, 35], true);
            this.addAnim('fallRight', 1, [29], true);
            this.addAnim('fallLeft', 1, [35], true);

            // attack
            this.addAnim('attackGroundRight', this.attackSpeed, [12, 13, 14, 15, 16, 17], true);
            this.addAnim('attackGroundLeft', this.attackSpeed, [18, 19, 20, 21, 22, 23], true);
            this.addAnim('attackAirRight', this.attackSpeed, [12, 13, 14, 15, 16, 17], true);
            this.addAnim('attackAirLeft', this.attackSpeed, [18, 19, 20, 21, 22, 23], true);

            // skill
            this.addAnim('castRight', 1, [29], true);
            this.addAnim('castLeft', 1, [35], true);

            this.addStates();
            this.addTransitions();
        },

        update: function() {
            this.parent();
        },

        updateFlip: function() {
            if (this.state != this.State.HURT && this.state != this.State.DEAD) {
                if (this.vel.x > 0)
                    this.flip = false;
                else if (this.vel.x < 0)
                    this.flip = true;
            }

            this.parent();
        },

        addStates: function() {
            var self = this;
            var weapon = self.activeWeapon;

            this.stateMachine.state(this.State.IDLE, {
                enter: function() {
                    self.state = self.State.IDLE;
                },
                update: function() {
                    self.idle();
                    weapon.idle();
                }
            })
        },

        addTransitions: function() {
            var self = this;

        },

        idle: function() {
            this.stop();
            this.currentAnim = this.flip ?
                               this.anims.idleLeft : this.anims.idleRight;
        }

    });

});