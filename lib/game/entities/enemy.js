/**
 * Created by Tianxu on 14-3-27.
 */
ig.module (
    'game.entities.enemy'
)
.requires (
    'impact.sound',
    'game.entities.character',
    'game.system.eventChain',
    'plugins.perpixel'
)
.defines ( function() {

    EntityEnemy = EntityCharacter.extend ({

        name: 'enemy',
        size: {x: 32, y: 32},
        health: 50,
        maxVel: {x: 50, y: 150},

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,

        animSheet: new ig.AnimationSheet('media/enemy/treeman.png', 32, 32),

        init: function(x, y, settings) {
            // basic
            this.parent(x, y, settings);
            this.origin = {x: x, y: y};

            // animations
            this.addAnim('idle', 0.4, [0, 1]);
            this.addAnim('walk', 0.2, [4, 5, 6, 5]);
            this.addAnim('hurt', 0.5, [3], true);
            this.addAnim('defend', 1, [2], true);
            this.addAnim('attackGround', 0.5, [8, 9], true);
            this.addAnim('attackAir', 0.5, [10, 11], true);
            this.addAnim('dead', 0.3, [12, 13], true);

            // initialize StateMachine
            this.addStates(this);
            this.addTransitions(this);

            // initialize EventChain
            this.idleChain = EventChain(this).wait(3).then(this.toggleFlip).repeat();
            this.hurtChain = EventChain(this).wait(0.5).then(function(){ this.state = this.State.IDLE; }).repeat();

            // register this enemy
            ig.game.enemy = this;
        },

        updateFlip: function() {
            if (this.vel.x > 0)
                this.flip = false;
            else if (this.vel.x < 0)
                this.flip = true;

            this.parent();
        },

        addStates: function(_self) {
            var self = _self;

            this.stateMachine.state(this.State.IDLE, {
                enter: function() {
                    console.log('enemy begin idle');
                    self.idle();
                    //self.idleChain.reset();
                },
                update: function() {
                    console.log('enemy idle');
                    self.idleChain();
                },
                exit: function() {
                    console.log('enemy end idle');
                }
            });

            this.stateMachine.state(this.State.CHASING, {
                enter: function() {
                    console.log('enemy begin chasing');
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
                    //self.hurtChain.reset();
                },
                update: function() {
                    console.log('enemy hurt');
                    self.hurtChain();
                },
                exit: function() {
                    console.log('enemy end hurt');
                }
            });
        },

        addTransitions: function(_self) {
            var self = _self;

            this.stateMachine.transition('IdleToHurt', this.State.IDLE, this.State.HURT, function(){
                return self.state == self.State.HURT;
            });

            this.stateMachine.transition('HurtToIdle', this.State.HURT, this.State.IDLE, function(){
                return self.state == self.State.IDLE;
            });

        },

        idle: function() {
            this.stop();
            this.currentAnim = this.anims.idle;
            //var rand = Math.floor(Math.random()*100);
        },

        chasing: function() {

        },

        resetting: function() {

        },

        walking: function() {
            this.move();
            this.currentAnim = this.anims.walk;
        },

        defend: function() {
            this.currentAnim = this.anims.defend;
        },

        hurt: function() {
            this.currentAnim = this.anims.hurt;
        },

        attackGround: function() {
            this.stop();
            this.vel.x = 0;
            this.currentAnim = this.anims.attackGround.rewind();
        },

        attackAir: function() {
            this.stop();
            this.vel.x = 0;
            this.currentAnim = this.anims.attackAir.rewind();
        }
    })
})