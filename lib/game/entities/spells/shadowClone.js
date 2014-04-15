/**
 * Created by Tianxu on 14-4-11.
 */
ig.module (
    'game.entities.spells.shadowClone'
)
.requires (
    'impact.sound',
    'game.entities.character',
    'game.entities.weapons.katana',
    'game.system.eventChain'
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

            this.owner = settings.owner;
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
            this.attack = this.activeWeapon == null ?
                          this._attack/2 : (this._attack + this.activeWeapon._attack)/2;
            this.attackSpeed = this.activeWeapon == null ?
                               this._attackSpeed : (this._attackSpeed + this.activeWeapon._attackSpeed)/2;
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

            this.attackChain1 = EventChain(this)
                .wait(Math.random()*1.5+0.5)
                .then(this.chasing)
                .wait(0.1)
                .then(this.jumpGround)
                .wait(0.3)
                .then(this.attackAir)
                .wait(this.attackSpeed*6)
                .then(this.idle).repeat();

            this.attackChain2 = EventChain(this)
                .wait(Math.random()*3+0.5)
                .then(this.attackGround)
                .wait(this.attackSpeed*6)
                .then(this.idle).repeat();
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
                }
            });

            this.stateMachine.state(this.State.CHASING, {
                enter: function() {
                    self.state = self.State.CHASING;
                },
                update: function() {
                    self.chasing();
                }
            });

            this.stateMachine.state(this.State.ATTACKING, {
                enter: function() {
                    self.state = self.State.ATTACKING;
                },
                update: function() {
                    self.attackChain2();
                    if (self.owner.target)
                        self.flip = !self.isOnLeftOf(self.owner.target);
                }
            });
        },

        addTransitions: function() {
            var self = this;

            this.stateMachine.transition('IdleToChasing', 'idle', 'chasing', function(){
                return self.owner.target != null && !self.isNear(self.owner.target, 30, 30);
            });

            this.stateMachine.transition('IdleToAttacking', 'idle', 'attacking', function(){
                return self.owner.target != null && self.isNear(self.owner.target, 30, 30);
            });

            this.stateMachine.transition('ChasingToAttacking', 'chasing', 'attacking', function(){
                return self.owner.target != null && self.isNear(self.owner.target, 30, 30);     //TODO:Threshold should be related to diff of (self.lvl - target.lvl)
            });

            this.stateMachine.transition('ChasingToIdle', 'chasing', 'idle', function(){
                return self.owner.target == null || self.owner.target.state == 'dead';
            });

            this.stateMachine.transition('AttackingToIdle', 'attacking', 'idle', function(){
                return self.owner.target == null || self.owner.target.state == 'dead';
            });

            this.stateMachine.transition('AttackingToChasing', 'attacking', 'chasing', function(){
                return self.owner.target != null && !self.isNear(self.owner.target, 30, 30);
            })
        },

        idle: function() {
            this.stop();
            this.activeWeapon.stop();
            this.currentAnim = this.flip ?
                               this.anims.idleLeft : this.anims.idleRight;
            this.activeWeapon.idle();
        },

        chasing: function() {
            if (this.isOnLeftOf(this.owner.target))
                this.walkTo('right');
            else
                this.walkTo('left');
            this.currentAnim = this.flip ?
                               this.anims.walkLeft : this.anims.walkRight;
            this.activeWeapon.hide();
        },

        jumpGround: function() {
            this.jump();
            this.currentAnim = this.flip ?
                this.anims.jumpGroundLeft.rewind() : this.anims.jumpGroundRight.rewind();
            this.activeWeapon.hide();
        },

        attackGround: function() {
            this.stop();
            this.vel.x = 0;     // need this?
            this.currentAnim = this.flip ?
                               this.anims.attackGroundLeft.rewind() : this.anims.attackGroundRight.rewind();
            this.activeWeapon.attackGround();
        },

        attackAir: function() {
            this.currentAnim = this.flip ?
                               this.anims.attackAirLeft.rewind() : this.anims.attackAirRight.rewind();
            this.activeWeapon.attackAir();
//            this.activeWeapon.vel.x = this.vel.x;
//            this.activeWeapon.vel.y = this.vel.y;
        }



    });

});