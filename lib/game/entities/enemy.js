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
        size: {x: 32, y: 32},
        maxVel: {x: 50, y: 150},
        seenPlayer: false,
        _deadTime: 3,
        _flashTime: 3,
        _fadeTime: 3,

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,

        level: 1,
        health: 50,
        maxHealth: 50,
        attack: 10,
        defence: 5,
        attackSpeed: 0.5,

        animSheet: new ig.AnimationSheet('media/enemies/treeman.png', 32, 32),

        init: function(x, y, settings) {
            // basic
            this.parent(x, y, settings);
            this.origin = {x: x, y: y};
            this.zIndex = settings.zIndex;

            // animations
            this.addAnim('idleRight', 0.4, [0, 1]);
            this.addAnim('idleLeft', 0.4, [2, 3]);
            this.addAnim('walkRight', 0.2, [12, 13, 14, 13]);
            this.addAnim('walkLeft', 0.2, [15, 16, 17, 16]);
            this.addAnim('hurtRight', 0.5, [8], true);
            this.addAnim('hurtLeft', 0.5, [9], true);
            this.addAnim('blockRight', 1, [6], true);
            this.addAnim('blockLeft', 1, [7], true);
            this.addAnim('attackGroundRight', this.attackSpeed, [18, 19], true);
            this.addAnim('attackGroundLeft', this.attackSpeed, [20, 21], true);
            this.addAnim('attackAirRight', this.attackSpeed, [24, 25], true);
            this.addAnim('attackAirLeft', this.attackSpeed, [26, 27], true);
            this.addAnim('dead', 0.18, [30, 31], true);

            // initialize StateMachine
            this.addStates(this);
            this.addTransitions(this);

            // initialize EventChain
            this.flashChain = EventChain(this)
                .wait(0.2)
                .then(function(){this.currentAnim.alpha == 0;})
                .wait(0.2)
                .then(function(){this.currentAnim.alpha == 1;}).repeat();

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

            // register this enemy
            ig.game.enemy = this;
        },

//        reset: function(x, y, settings) {
//            this.parent(x, y, settings);
//            this.init(x, y, settings);
//        },

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

        addStates: function(_self) {
            var self = _self;

            this.stateMachine.state(this.State.IDLE, {
                enter: function() {
                    console.log('enemy begin idle');
                    self.state = self.State.IDLE;
                    self.idle();
                },
                update: function() {
                    console.log('enemy idle');
                    self.idleChain();
                },
                exit: function() {
                    console.log('enemy end idle');
                }
            });

            this.stateMachine.state(this.State.ALERT, {
                enter: function() {
                    console.log('enemy begin alert');
                    self.state = self.State.ALERT;
                },
                update: function() {
                    console.log('enemy alert');
                    self.alert();
                },
                exit: function() {
                    console.log('enemy end alert');
                }
            });

            this.stateMachine.state(this.State.CHASING, {
                enter: function() {
                    console.log('enemy begin chasing');
                    self.state = self.State.CHASING;
                },
                update: function() {
                    console.log('enemy chasing');
                    self.chasing();
                },
                exit: function() {
                    console.log('enemy end chasing');
                }
            });

            this.stateMachine.state(this.State.RESET, {
                enter: function() {
                    console.log('enemy begin reset');
                    self.state = self.State.RESET
                },
                update: function() {
                    console.log('enemy reset');
                    self.resetting();
                },
                exit: function() {
                    console.log('enemy end reset');
                }
            });

            this.stateMachine.state(this.State.HURT, {
                enter: function() {
                    console.log('enemy begin hurt');
                    self.hurt();
                },
                update: function() {
                    console.log('enemy hurt');
                    self.hurtChain();
                    //self.flashChain();
                },
                exit: function() {
                    console.log('enemy end hurt');
                }
            });

            this.stateMachine.state(this.State.ATTACKGROUND, {
                enter: function() {
                    console.log('enemy begin attackGround');
                    self.state = self.State.ATTACKGROUND;
                },
                update: function() {
                    console.log('enemy attackGround');
                },
                exit: function() {
                    console.log('enemy end attackGround');
                }
            });

            this.stateMachine.state(this.State.BLOCK, {
                enter: function() {
                    console.log('enemy begin block');
                    self.state = self.State.BLOCK;
                    self.block();
                },
                update: function() {
                    console.log('enemy block');
                    self.blockChain();
                },
                exit: function() {
                    console.log('enemy end block');
                }
            });

            this.stateMachine.state(this.State.DEAD, {
                enter: function() {
                    console.log('enemy begin dead');
                },
                update: function() {
                    console.log('enemy dead')
                    self.deadChain();
                },
                exit: function() {
                    console.log('enemy exit dead');
                }
            })
        },

        addTransitions: function(_self) {
            var self = _self;

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
                ig.game.spawnEntity(EntityEnemy, self.origin.x, self.origin.y, {zIndex: 40});
                ig.game.sortEntities();
            }, 3000);

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
            // knock back
            this.vel.x = this.flip ? 100 : -100;
            this.vel.y = -50;

            this.currentAnim = this.flip ?
                               this.anims.hurtLeft.rewind() : this.anims.hurtRight.rewind();

            // emit blood effect
            this.bloodEmitter.revive(0.1);
            this.bloodEmitter.enabled = true;

            // set target
            ig.game.player.target = this;
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
        }
    });

    //ig.EntityPool.enableFor(EntityEnemy);
})