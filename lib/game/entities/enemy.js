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
            this.initAnimations();
            this.initStateMachine();
            this.initEventChain();

            // set initial state based on just respawned or not
            this.stateMachine.currentState = settings.respawned ?
                                             this.State.INVINCIBLE : this.State.IDLE;

            // register this enemy
            //ig.game.enemy = this;
        },

        initAttributes: function() {
            this.attackSpeed = this.activeWeapon ? (this._attackSpeed+this.activeWeapon._attackSpeed)/2:this._attackSpeed;
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
            this.updateDistanceToOrigin();
            this.updateSeenPlayer();
            this.parent();
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
                    console.log('enter idle');
                    self.state = self.State.IDLE;
                    self.idle();
                },
                update: function() {
                    self.idleChain();
                },
                exit: function() {
                    console.log('end idle');
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
                    console.log('enter hurt');
                },
                update: function() {
                    self.hurting();
                },
                exit: function() {
                }
            });

            this.stateMachine.state(this.State.ATTACKGROUND, {
                enter: function() {
                    console.log('start punch');
                    self.state = self.State.ATTACKGROUND;
                    self.attackGround();
                },
                update: function() {
                    console.log('punching');
                },
                exit: function() {
                    console.log('end punch');
                    self.zIndex = 40;
                    ig.game.sortEntitiesDeferred();
                    self._justMadeDamage = false;
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
            });

            this.stateMachine.transition('IdleToHurt', this.State.IDLE, this.State.HURT, function(){
                return self.state == self.State.HURT;
            });

            this.stateMachine.transition('IdleToWalk', 'idle', 'walking', function(){
                return self.state == self.State.WALKING;
            });

            this.stateMachine.transition('WalkToIdle', 'walking', 'idle', function(){
                return self.state == self.State.IDLE;
            });

            this.stateMachine.transition('WalkToHurt', 'walking', 'idle', function(){
                return self.state == self.State.HURT;
            });

            this.stateMachine.transition('HurtToIdle', this.State.HURT, this.State.IDLE, function(){
                return self.hurtTimer.delta() >= self.hurtDelay;
            });

            this.stateMachine.transition('IdleToDead', this.State.IDLE, this.State.DEAD, function(){
                return self.state == self.State.DEAD;
            });

            this.stateMachine.transition('HurtToDead', this.State.HURT, this.State.DEAD, function(){
                return self.state == self.State.DEAD;
            });

            this.stateMachine.transition('IdleToAttackGround', 'idle', 'attackGround', function(){
                return self.state == self.State.ATTACKGROUND;
            });

            this.stateMachine.transition('WalkToAttackGround', 'walking', 'attackGround', function(){
                return self.state == self.State.ATTACKGROUND;
            });

            this.stateMachine.transition('AttackGroundToIdle', 'attackGround', 'idle', function(){
                return self.currentAnim.loopCount > 0 && self.vel.x == 0;
            });

            this.stateMachine.transition('AttackGroundToWalk', 'attackGround', 'walking', function(){
                return self.currentAnim.loopCount && self.vel.x != 0;
            });

            this.stateMachine.transition('AttackGroundToHurt', 'attackGround', 'hurt', function(){
                return self.state == self.State.HURT;
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

        hurt: function(fromLeft, damageObj) {

            this.state = this.State.HURT;
            this.hurtTimer.reset();

            var damageTaken = damageObj.value - this._defence;
            var specialEffects = damageObj.effects;
            var attacker = damageObj.attacker;

            if (this.health == this.maxHealth) {    // if this is the first hurt in battle
                this.target = attacker;
            }

            this._damageAccum += damageTaken;

            // shadow clone won't inherit weapon special effects for now
            if (specialEffects && Object.keys(specialEffects).length > 0) {
                if (specialEffects.poison) {
                    this._poisonDamageAccum = specialEffects.poison.value;
                    this._poisonDamageTaken = 0;
                    this._poisonLastTime = specialEffects.poison.lastTime;
                    this.emotionParticle = ig.game.spawnEntity('EntityEmotionParticle', this.pos.x, this.pos.y, {
                        life: this._poisonLastTime,
                        owner: this,
                        type: 'poison'
                    })
                }
                if (specialEffects.freeze) {}
                if (specialEffects.ignite) {}
                if (specialEffects.lifeStealRate) {
                    var lifeStealAmount = Math.floor(damageTaken * specialEffects.lifeStealRate);
                    attacker._healAccum += lifeStealAmount;
                    attacker.textEmitter.emit({
                        text: lifeStealAmount,
                        color: '#00FF00',
                        fontSize: 12,
                        gravityFactor: 0.25
                    });
                }
            }

            this.flip = attacker.isOnLeftOf(this);

            this.bloodEmitter.setPos(attacker.activeWeapon.pos.x + (attacker.flip ? -12 : 36), attacker.activeWeapon.pos.y + 12);
            this.bloodEmitter.revive(0.1);
            this.bloodEmitter.enabled = true;

            this.textEmitter.emit({
                text: damageTaken,
                color: damageObj.isCritical ? '#FFEE00' : '#FFFFFF',
                fontSize: damageObj.isCritical ? 14 : 12,
                gravityFactor: damageObj.isCritical ? 0.4 : 0.25
            });

            this.knockBack(fromLeft);
        },

        hurting: function() {
            this.currentAnim = this.flip ?
                               this.anims.hurtLeft : this.anims.hurtRight;
        },

        attackGround: function() {
            this.stop();
            this.vel.x = 0;
            this.zIndex = ig.game.player.zIndex + 1;
            ig.game.sortEntitiesDeferred();
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