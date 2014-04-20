/**
 * Created by Tianxu on 14-3-27.
 */
ig.module (
    'game.entities.enemy'
)
.requires (
    'impact.sound',
    'game.entities.character',
    'game.system.eventChain'
)
.defines ( function() {

    EntityEnemy = EntityCharacter.extend ({

        name: 'enemy',
        bounciness: 0.6,
        size: {x: 32, y: 32},
        maxVel: {x: 50, y: 150},
        seenPlayer: false,
        _deadTime: 3,
        _flashTime: 3,
        _fadeTime: 3,
        _respawnTime: 3,
        _invincibleTime: 3,

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,

        level: 1,
        health: 50,
        maxHealth: 50,
        _attack: 10,
        _defence: 5,
        _attackSpeed: 0.5,
        exp: 10,

        init: function(x, y, settings) {
            // basic
            this.parent(x, y, settings);
            this.origin = {x: x, y: y};
            this.zIndex = 40;

            this.initAnimations();
            this.initStateMachine();
            this.initEventChain();

            // set initial state based on just respawned or not
            this.stateMachine.currentState = settings.respawned ?
                                             this.State.INVINCIBLE : this.State.IDLE;

            // register this enemy
            ig.game.enemy = this;
        },

        initAnimations: function() {

        },

        initStateMachine: function() {
            this.addStates();
            this.addTransitions();
        },

        initEventChain: function() {
            this.flashChain = EventChain(this)
                .wait(0.1)
                .then(this.toggleAlpha)
                .wait(0.1)
                .then(this.toggleAlpha).repeat();

            this.idleChain = EventChain(this)
                .wait(3)
                .then(this.toggleFlip).repeat();

            this.hurtChain = EventChain(this)
                .wait(0.5)
                .then(function(){ this.state = this.State.IDLE; }).repeat();

            this.blockChain = EventChain(this)
                .wait(1)
                .then(function(){ this.state = this.State.IDLE; }).repeat();

            this.deadChain = EventChain(this)
                .wait(0.1)
                .then(this.dead)
                .wait(this._deadTime)
                .then(this.fadeKill);
        },

        update: function() {
            this.updateSeenPlayer();

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

        updateSeenPlayer: function() {
            var player = ig.game.player;
            if (((!this.flip && this.isOnLeftOf(player)) || (this.flip && !this.isOnLeftOf(player))) && this.isNear(player, 60, 60))
                this.seenPlayer = true;
            else
                this.seenPlayer = false;
        },

        addStates: function() {
            var self = this;

            this.stateMachine.state(this.State.INVINCIBLE, {
                enter: function() {
                    self.state = self.State.INVINCIBLE;
                    self.invincibleTimer.reset();
                },
                update: function() {
                    self.flashChain();
                },
                exit: function() {
                    self.currentAnim.alpha = 1;
                }
            });

            this.stateMachine.state(this.State.IDLE, {
                enter: function() {
                    self.state = self.State.IDLE;
                    self.idle();
                },
                update: function() {
                    self.idleChain();
                },
                exit: function() {
                }
            });

            this.stateMachine.state(this.State.ALERT, {
                enter: function() {
                    self.state = self.State.ALERT;
                },
                update: function() {
                    self.alert();
                },
                exit: function() {
                }
            });

            this.stateMachine.state(this.State.CHASING, {
                enter: function() {
                    self.state = self.State.CHASING;
                },
                update: function() {
                    self.chasing();
                },
                exit: function() {
                }
            });

            this.stateMachine.state(this.State.RESET, {
                enter: function() {
                    self.state = self.State.RESET
                },
                update: function() {
                    self.resetting();
                },
                exit: function() {
                }
            });

            this.stateMachine.state(this.State.HURT, {
                enter: function() {
                    self.hurt();
                },
                update: function() {
                    self.hurtChain();
                },
                exit: function() {
                }
            });

            this.stateMachine.state(this.State.ATTACKGROUND, {
                enter: function() {
                    self.state = self.State.ATTACKGROUND;
                },
                update: function() {
                },
                exit: function() {
                }
            });

            this.stateMachine.state(this.State.BLOCK, {
                enter: function() {
                    self.state = self.State.BLOCK;
                    self.block();
                },
                update: function() {
                    self.blockChain();
                },
                exit: function() {
                }
            });

            this.stateMachine.state(this.State.DEAD, {
                enter: function() {
                    self.bounciness = 0.4;
                    self.knockBack();
                },
                update: function() {
                    self.deadChain();
                },
                exit: function() {
                }
            })
        },

        addTransitions: function() {
            var self = this;

            this.stateMachine.transition('InvincibleToIdle', this.State.INVINCIBLE, this.State.IDLE, function(){
                return self.invincibleTimer.delta() > self._invincibleTime;
            })

            this.stateMachine.transition('IdleToHurt', this.State.IDLE, this.State.HURT, function(){
                return self.state == self.State.HURT;
            });

            this.stateMachine.transition('HurtToIdle', this.State.HURT, this.State.IDLE, function(){
                return self.state == self.State.IDLE;
            });

            this.stateMachine.transition('IdleToAlert', this.State.IDLE, this.State.ALERT, function(){
                return self.seenPlayer;
            });

            this.stateMachine.transition('AlertToIdle', this.State.ALERT, this.State.IDLE, function(){
                return !self.seenPlayer;
            });

            this.stateMachine.transition('AlertToHurt', this.State.ALERT, this.State.HURT, function(){
                return self.state == self.State.HURT;
            })

            this.stateMachine.transition('IdleToDead', this.State.IDLE, this.State.DEAD, function(){
                return self.state == self.State.DEAD;
            });

            this.stateMachine.transition('AlertToDead', this.State.ALERT, this.State.DEAD, function(){
                return self.state == self.State.DEAD;
            });

            this.stateMachine.transition('ChasingToDead', this.State.CHASING, this.State.DEAD, function(){
                return self.state == self.State.DEAD;
            });

            this.stateMachine.transition('HurtToDead', this.State.HURT, this.State.DEAD, function(){
                return self.state == self.State.DEAD;
            });

            this.stateMachine.transition('AttackGroundToDead', this.State.ATTACKGROUND, this.State.DEAD, function(){
                return self.state == self.State.DEAD;
            });

            this.stateMachine.transition('BlockToDead', this.State.BLOCK, this.State.DEAD, function(){
                return self.state == self.State.DEAD;
            });

        },

        receiveDamage: function(amount, from) {
            this.health -= amount;
            if ( this.health <= 0) {
                this.state = this.State.DEAD;
            }
        },

        kill: function() {
            var self = this;

            setTimeout(function(){
                ig.game.spawnEntity(self.constructor, self.origin.x, self.origin.y, {respawned: true});
                ig.game.sortEntities();
            }, self._respawnTime*1000);

            this.parent();
        },

        idle: function() {
            this.stop();
            this.currentAnim = this.flip ?
                               this.anims.idleLeft : this.anims.idleRight;
        },

        alert: function() {
            this.stop();
            this.flip = !this.isOnLeftOf(ig.game.player);
            this.currentAnim = this.flip ?
                               this.anims.idleLeft : this.anims.idleRight;
        },

        chasing: function() {

        },

        resetting: function() {

        },

        walking: function() {
            this.move();
            this.currentAnim = this.flip ?
                               this.anims.walkLeft : this.anims.walkRight;
        },

        block: function() {
            this.currentAnim = this.flip ?
                               this.anims.blockLeft.rewind() : this.anims.blockRight.rewind();
        },

        hurt: function() {
            this.knockBack();
            this.currentAnim = this.flip ?
                               this.anims.hurtLeft.rewind() : this.anims.hurtRight.rewind();

            // emit blood effect
            this.bloodEmitter.revive(0.1);
            this.bloodEmitter.enabled = true;
        },

        attackGround: function() {
            this.stop();
            this.vel.x = 0;
            this.currentAnim = this.flip ?
                               this.anims.attackGroundLeft.rewind() : this.anims.attackGroundRight.rewind();
        },

        attackAir: function() {
            this.stop();
            this.vel.x = 0;
            this.currentAnim = this.flip ?
                               this.anims.attackAirLeft.rewind() : this.anims.attackAirRight.rewind();
        },

        dead: function() {
            this.type = ig.Entity.TYPE.NONE;
            this.checkAgainst = ig.Entity.TYPE.NONE;
            this.currentAnim = this.anims.dead.rewind();
            this.currentAnim.flip.x = this.flip;

            // player gains exp, emits msg
            ig.game.player.curExp += this.exp;
            ig.game.player.textEmitter.emit({
                text: '+' + this.exp + 'EXP',
                color: '#4F9042',
                gravityFactor: 0,
                fontSize: 12,
                vel: {x: 0, y: -5},
                life: 2.0
            });
        },

        knockBack: function() {
            var knockbackPower = this.health <= this._damageAccum ? 200 : 100;
            var knockupPower = this.health <= this._damageAccum ? 100 : 50;
            this.vel.x = this.flip ? knockbackPower : -knockbackPower;
            this.vel.y = -knockupPower;
        }
    });

});