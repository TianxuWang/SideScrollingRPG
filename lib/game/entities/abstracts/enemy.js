/**
 * Created by Tianxu on 14-3-27.
 */
ig.module (
    'game.entities.abstracts.enemy'
)
.requires (
    'impact.sound',
    'game.entities.abstracts.character',
    'game.entities.utils.bar',
    'game.system.eventChain'
)
.defines ( function() {

    EntityEnemy = EntityCharacter.extend ({

        name: 'enemy',
        bounciness: 0.6,
        size: {x: 32, y: 32},
        maxVel: {x: 50, y: 150},
        seenPlayer: false,
        _deadTime: 1,
        _flashTime: 3,
        _fadeTime: 3,
        _respawnTime: 3,
        _invincibleTime: 3,

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,

        level: 1,
        health: 50,
        healthMax: 50,
        _attack: 10,
        _defence: 5,
        _attackSpeed: 0.5,
        exp: 10,

        healthBar: null,
        eatableTable: null,
        eatableDropRate: 0,
        pickableTable: null,
        coinTable: null,

        // internal use for ai
        _distanceToOrigin: 0,
        _distanceToChase: 0,    // (By default) not chase until 100% overlap with player
        _attackWaitTimeFactor: 15,

        init: function(x, y, settings) {
            // basic
            this.parent(x, y, settings);
            this.origin = {x: x, y: y};
            this.zIndex = 40;

            this.initAttributes();
            if (!ig.global.wm){
                this.initBars();
            }
            this.initAnimations();
            this.initStateMachine();
            this.initEventChain();

            // set initial state based on just respawned or not
            this.stateMachine.currentState = settings.respawned ?
                                             this.State.INVINCIBLE : this.State.IDLE;

            // register this enemy
            if (!ig.global.wm)
                ig.game.enemyGroup.push(this);
        },

        initAttributes: function() {
            this.attackSpeed = this.activeWeapon ? (this._attackSpeed+this.activeWeapon._attackSpeed)/2:this._attackSpeed;
        },

        initBars: function() {
            this.healthBar = ig.game.spawnEntity('EntityBar', 0, 0,
                {
                    owner: this,
                    target: 'health',
                    barImage: new ig.Image('media/gui/bar_yellow.png'),
                    trackImage: new ig.Image('media/gui/bar_track.png')
                }
            );
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

            this.deadChain = EventChain(this)
                .wait(0.1)
                .then(this.dead)
                .wait(this._deadTime)
                .then(this.fadeKill);
        },

        update: function() {
            this.parent();

            this.updateDistanceToOrigin();
            this.updateSeenPlayer();
            this.updateBars();
        },

        updateBars: function() {
            this.healthBar.update();
        },

        updateTarget: function() {
            if (this.target && (this.target.state == this.State.DEAD || this._distanceToOrigin > 200)) {
                this.target = null;
            }
            if (!this.target && this.seenPlayer) {
                this.target = ig.game.player;
            }
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

            if ((this.level-player.level)<-5) { this._distanceToChase = 0; }
            else if ((this.level-player.level)>5) { this._distanceToChase = 100; }
            else { this._distanceToChase = 60; }

            this.seenPlayer = ((!this.flip && this.isOnLeftOf(player)) || (this.flip && !this.isOnLeftOf(player)))
                              && this.isNear(player, this._distanceToChase, this._distanceToChase);
        },

        updateDistanceToOrigin: function() {
            var xd = this.pos.x - this.origin.x;
            var yd = this.pos.y - this.origin.y;
            this._distanceToOrigin = Math.sqrt(xd*xd + yd*yd);
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

            this.stateMachine.state(this.State.WALKING, {
                enter: function() {
                    self.state = self.State.WALKING;
                },
                update: function() {
                    self.walking();
                },
                exit: function() {

                }
            });

            this.stateMachine.state(this.State.HURT, {
                enter: function() {
                    self.hurting();
                },
                update: function() {

                },
                exit: function() {
                }
            });

            this.stateMachine.state(this.State.ATTACKGROUND, {
                enter: function() {
                    self.state = self.State.ATTACKGROUND;
                    self.attackGround();
                    self.resizeToAttackBox();
                },
                update: function() {
                },
                exit: function() {
                    self._targetGroup.length = 0;
                    self.resizeToNormalBox();
                }
            });

            this.stateMachine.state(this.State.BLOCK, {
                enter: function() {
                    self.state = self.State.BLOCK;
                    self.block();
                },
                update: function() {
                },
                exit: function() {
                    self._justMadeBlock = false;
                }
            });

            this.stateMachine.state(this.State.DEAD, {
                enter: function() {
                    self.bounciness = 0.4;
                },
                update: function() {
                    self.deadChain();
                },
                exit: function() {
                }
            });
        },

        addTransitions: function() {
            var self = this;

            this.stateMachine.transition('InvincibleToIdle', this.State.INVINCIBLE, this.State.IDLE, function(){
                return self.invincibleTimer.delta() > self._invincibleTime;
            });

            this.stateMachine.transition('IdleToHurt', this.State.IDLE, this.State.HURT, function(){
                return self.state == self.State.HURT;
            });

            this.stateMachine.transition('IdleToWalk', this.State.IDLE, this.State.WALKING, function(){
                return self.state == self.State.WALKING;
            });

            this.stateMachine.transition('WalkToIdle', this.State.WALKING, this.State.IDLE, function(){
                return self.state == self.State.IDLE;
            });

            this.stateMachine.transition('WalkToHurt', this.State.WALKING, this.State.HURT, function(){
                return self.state == self.State.HURT;
            });

            this.stateMachine.transition('HurtToIdle', this.State.HURT, this.State.IDLE, function(){
                return self.hurtTimer.delta() >= self.hurtDelay;
            });

            this.stateMachine.transition('IdleToDead', this.State.IDLE, this.State.DEAD, function(){
                return self.state == self.State.DEAD;
            });

            this.stateMachine.transition('WalkToDead', this.State.WALKING, this.State.DEAD, function(){
                return self.state == self.State.DEAD;
            });

            this.stateMachine.transition('HurtToDead', this.State.HURT, this.State.DEAD, function(){
                return self.state == self.State.DEAD;
            });

            this.stateMachine.transition('IdleToAttackGround', this.State.IDLE, this.State.ATTACKGROUND, function(){
                return self.state == self.State.ATTACKGROUND;
            });

            this.stateMachine.transition('WalkToAttackGround', this.State.WALKING, this.State.ATTACKGROUND, function(){
                return self.state == self.State.ATTACKGROUND;
            });

            this.stateMachine.transition('AttackGroundToIdle', this.State.ATTACKGROUND, this.State.IDLE, function(){
                return self.currentAnim.loopCount && self.vel.x == 0;
            });

            this.stateMachine.transition('AttackGroundToWalk', this.State.ATTACKGROUND, this.State.WALKING, function(){
                return self.currentAnim.loopCount && self.vel.x != 0;
            });

            this.stateMachine.transition('AttackGroundToHurt', this.State.ATTACKGROUND, this.State.HURT, function(){
                return self.state == self.State.HURT;
            });

            this.stateMachine.transition('AttackGroundToDead', this.State.ATTACKGROUND, this.State.DEAD, function(){
                return self.state == self.State.DEAD;
            });

            this.stateMachine.transition('IdleToBlock', this.State.IDLE, this.State.BLOCK, function(){
                return self.state == self.State.BLOCK;
            });

            this.stateMachine.transition('BlockToIdle', this.State.BLOCK, this.State.IDLE, function(){
                return self.blockTimer.delta() >= self.blockDelay;
            });

            this.stateMachine.transition('BlockToHurt', this.State.BLOCK, this.State.HURT, function(){
                return self.state == self.State.HURT;
            });

            this.stateMachine.transition('BlockToDead', this.State.BLOCK, this.State.DEAD, function(){
                return self.state == self.State.DEAD;
            });
        },

        kill: function() {
            var self = this;

            var respawnTimer = setTimeout(function(){
                ig.game.spawnEntity(self.constructor, self.origin.x, self.origin.y, {respawned: true});
                ig.game.sortEntitiesDeferred();
            }, self._respawnTime*1000);
            ig.game.levelDirector.respawnTimerCollection.push(respawnTimer);

            this.parent();
        },

        hurt: function(fromLeft, damageObj) {
            // if this is the first hurt in battle
            if (this.health == this.healthMax && damageObj.attacker) {
                this.target = damageObj.attacker;
            }
            this.parent(fromLeft, damageObj);
        },

        dead: function() {
            this.type = ig.Entity.TYPE.NONE;
            this.checkAgainst = ig.Entity.TYPE.NONE;
            this.currentAnim = this.anims.dead.rewind();
            this.currentAnim.flip.x = this.flip;
            this.stop();

            // generate loots
            ig.game.lootFactory.generateLoot(this);

            // player gains exp, emits msg
            ig.game.player.curExp += this.exp;
            ig.game.player.textEmitter.emit({
                text: '+' + this.exp + ' Exp',
                color: '#4F9042',
                gravityFactor: 0,
                fontSize: 12,
                vel: {x: 0, y: -5},
                life: 2
            });
        }
    });

});