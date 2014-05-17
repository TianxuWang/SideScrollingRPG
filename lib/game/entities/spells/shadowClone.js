/**
 * Created by Tianxu on 14-4-11.
 */
ig.module (
    'game.entities.spells.shadowClone'
)
.requires (
    'impact.sound',
    'impact.timer',
    'game.entities.abstracts.character',
    'game.entities.weapons.katana',
    'game.system.eventChain',
    'game.ai.patrol',
    'game.ai.chase'
)
.defines ( function() {

    EntityShadowClone = EntityCharacter.extend ({

        name: 'Player_shadowClone',

        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,

        activeWeapon: null,
        age: 0,
        ageTimer: null,
        bornDelay: 0.5,
        bornTimer: null,

        // internal use for ai
        _attackWaitTimeFactor: 15,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.animSheet = ig.game.assets.animSheet_ninja_shadowClone;
            this.zIndex = settings.zIndex;
            this.owner = settings.owner;
            this.flip = this.owner.flip;
            this.size = this.owner.size;
            this.offset = this.owner.offset;
            this.maxVel = this.owner.maxVel;
            this.health = this.healthMax = this.owner.healthMax/2;
            this._attack = this.owner._attack;
            this._defence = this.owner._defence;
            this._attackSpeed = this.owner._attackSpeed;
            this._critHitChance = this.owner._critHitChance;
            this._critHitDamage = this.owner._critHitDamage;
            this.activeWeapon = ig.game.spawnEntity(this.owner.activeWeapon.name, x, y, {
                flip: this.flip,
                owner: this,
                isShadowClone: true
            });
            this.activeWeapon.zIndex = this.zIndex + 1;
            this.age = settings.age;
            this.ageTimer = new ig.Timer();
            this.bornTimer = new ig.Timer();

            this.attackSpeed = this.activeWeapon == null ?
                               this._attackSpeed : (this._attackSpeed + this.activeWeapon._attackSpeed)/2;

            this.addAnim('idle', 0.3, [3, 4, 5, 4]);
            this.addAnim('walk', 0.2, [0, 1, 2, 1]);
            this.addAnim('run', 0.1, [36, 37, 38, 39]);
            this.addAnim('hurt', 0.5, [18], true);
            this.addAnim('jumpGround', 0.14, [12, 13, 14, 15, 16, 17], true);
            this.addAnim('fall', 1, [17], true);
            this.addAnim('attackGround', this.attackSpeed, [6, 7, 8, 9, 10, 11], true);
            this.addAnim('attackAir', this.attackSpeed, [6, 7, 8, 9, 10, 11], true);
            this.addAnim('block', 1, [23], true);
            this.addAnim('cast', 1, [30], true);

            this.anims.idle.timer = EntityPlayer.animationTimer;

            this.addStates();
            this.addTransitions();

        },

        update: function() {
            this.parent();

            if (this.state != this.State.BORN && this.ageTimer.delta() >= 0) {
                this.kill();
                this.owner.spells.ShadowClone.killShadowClone();
                console.log('got killed');
            }
        },

        updateFlip: function() {
            if (this.state != this.State.BORN && this.state != this.State.HURT && this.state != this.State.DEAD) {
                if (this.vel.x > 0)
                    this.flip = false;
                else if (this.vel.x < 0)
                    this.flip = true;
            }

            this.currentAnim.flip.x = this.flip;
        },

        updateAI: function() {
//            if(!(this.state instanceof FleeState)){
//                if(this._targetHits>=this._fleeHitCount){
//                    this.state=new FleeState(this,0.5+Math.random()*1.5);
//                    this._targetHits=0;
//                }
//                else if(this.target!=null&&!this.target.isDead()){
//                    if(!(this.state instanceof PursueState)){
//                        this.state=new ChaseState(this);
//                    }
//                }
//                else if(!(this.state instanceof PatrolState)){
//                    this.state=new PatrolState(this);
//                }
//            }
            // update target
            this.target = this.owner.target;

            if (this.target != null && this.target.state != this.target.State.DEAD){
                if (!(this.ai instanceof ChaseAI))
                    this.ai = new ChaseAI(this);
            }
            else if (!(this.ai instanceof PatrolAI))
                this.ai = new PatrolAI(this);

            if (this.state != this.State.ATTACKGROUND && this.state != this.State.ATTACKAIR &&
                this.state != this.State.JUMPGROUND && this.state != this.State.FALLING && this.standing &&
                this.state != this.State.HURT && Math.random() < 0.005)
                this.jump();

            this.parent();
        },

        addStates: function() {
            var self = this;
            var weapon = self.activeWeapon;

            this.stateMachine.state(this.State.BORN, {
                enter: function() {
                    self.state = self.State.BORN;
                    self.bornTimer.set(self.bornDelay);
                    self.born();
                    weapon.hide();
                },
                update: function() {
                },
                exit: function() {
                    self.ageTimer.set(self.age);
                }
            });

            this.stateMachine.state(this.State.IDLE, {
                enter: function() {
                    self.state = self.State.IDLE;
                },
                update: function() {
                    self.idle();
                    weapon.idle();
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
                    weapon.hide();
                },
                exit: function() {
                }
            });

            this.stateMachine.state(this.State.ATTACKGROUND, {
                enter: function() {
                    self.state = self.State.ATTACKGROUND;
                    self.attackGround();
                    weapon.attackGround();
                },
                update: function() {
                    weapon.resizeToAttackBox();
                    weapon.offsetAttackPos();
                },
                exit: function() {
                    self._targetGroup.length = 0;
                }
            });

            this.stateMachine.state(this.State.FALLING, {
                enter: function() {
                    self.state = self.State.FALLING;
                    weapon.hide();
                },
                update: function() {
                    self.falling();
                },
                exit: function() {
                }
            });

            this.stateMachine.state(this.State.HURT, {
                enter: function() {
                    self.state = self.State.HURT;
                }
            });

            this.stateMachine.state(this.State.JUMPGROUND, {
                enter: function() {
                    self.state = self.State.JUMPGROUND;
                    self.jumpGround();
                    weapon.hide();
                },
                update: function() {
                },
                exit: function() {
                }
            });

            this.stateMachine.state(this.State.ATTACKAIR, {
                enter: function() {
                    self.state = self.State.ATTACKAIR;
                    self.attackAir();
                    weapon.attackAir();
                },
                update: function() {
                    weapon.offsetAttackPos();
                    weapon.vel.x = self.vel.x;
                    weapon.vel.y = self.vel.y;
                },
                exit: function() {
                    self._targetGroup.length = 0;
                    weapon.stop();
                    weapon.vel.x = 0;
                    weapon.vel.y = 0;
                }
            });
        },

        addTransitions: function() {
            var self = this;

            this.stateMachine.transition('BornToIdle', 'born', 'idle', function(){
                return self.vel.x == 0 || self.bornTimer.delta() >= 0;
            });

            this.stateMachine.transition('WalkToIdle', 'walking', 'idle', function(){
                return self.state == self.State.IDLE;
            });

            this.stateMachine.transition('IdleToWalk', 'idle', 'walking', function(){
                return self.state == self.State.WALKING;
            });

            this.stateMachine.transition('IdleToAttackGround', 'idle', 'attackGround', function(){
                return self.state == self.State.ATTACKGROUND;
            });

            this.stateMachine.transition('IdleToFalling', 'idle', 'falling', function(){
                return !self.standing && self.vel.y > 50;
            });

            this.stateMachine.transition('WalkToAttackGround', 'walking', 'attackGround', function(){
                return self.state == self.State.ATTACKGROUND;
            });

            this.stateMachine.transition('WalkToFalling', 'walking', 'falling', function(){
                return !self.standing && self.vel.y > 50;
            });

            this.stateMachine.transition('AttackGroundToIdle', 'attackGround', 'idle', function(){
                return self.currentAnim.loopCount && self.vel.x == 0;
            });

            this.stateMachine.transition('AttackGroundToWalk', 'attackGround', 'walking', function(){
                return self.currentAnim.loopCount && self.vel.x != 0;
            });

            this.stateMachine.transition('IdleToJumpGround', 'idle', 'jumpGround', function(){
                return self.standing && self.vel.y < 0;
            });

            this.stateMachine.transition('WalkToJumpGround', 'walking', 'jumpGround', function(){
                return self.standing && self.vel.y < 0;
            });

            this.stateMachine.transition('JumpGroundToIdle', 'jumpGround', 'idle', function(){
                return self.currentAnim.loopCount && self.standing && self.vel.x == 0;
            });

            this.stateMachine.transition('JumpGroundToWalk', 'jumpGround', 'walking', function(){
                return self.currentAnim.loopCount && self.standing && self.vel.x != 0;
            });

            this.stateMachine.transition('JumpGroundToAttackAir', 'jumpGround', 'attackAir', function(){
                return self.state == self.State.ATTACKAIR;
            });

            this.stateMachine.transition('JumpGroundToFalling', 'jumpGround', 'falling', function(){
                return self.currentAnim.loopCount && !self.standing;
            });

            this.stateMachine.transition('FallingToIdle', 'falling', 'idle', function(){
                return self.standing && self.vel.x == 0;
            });

            this.stateMachine.transition('FallingToWalk', 'falling', 'walking', function(){
                return self.standing && self.vel.x != 0;
            });

            this.stateMachine.transition('AttackAirToFalling', 'attackAir', 'falling', function(){
                return self.currentAnim.loopCount && !self.standing;
            });

            this.stateMachine.transition('AttackAirToIdle', 'attackAir', 'idle', function(){
                return self.standing && self.vel.x == 0;
            });

            this.stateMachine.transition('AttackAirToWalk', 'attackAir', 'walking', function(){
                return self.standing && self.vel.x != 0;
            });
        },

        kill: function() {
            this.parent();

        },

        born: function() {
            this.vel.x = (this.flip && this.zIndex < this.owner.zIndex) || (!this.flip && this.zIndex > this.owner.zIndex) ?
                         -100 : 100;

            this.currentAnim = this.anims.cast.rewind();
        },

        idle: function() {
            this.stop();
            this.currentAnim = this.anims.idle;
        },

        walking: function() {
            this.move();
            this.currentAnim = this.anims.walk;
        },

        jumpGround: function() {
            this.jump();
            this.currentAnim = this.anims.jumpGround.rewind();
        },

        falling: function() {
            this.currentAnim = this.anims.fall.rewind();
        },

        attackGround: function() {
            this.stop();
            this.vel.x = 0;     // need this?
            this.currentAnim = this.anims.attackGround.rewind();
        },

        attackAir: function() {
            this.currentAnim = this.anims.attackAir.rewind();
        },

        makeRandDamage: function() {
            var weapon = this.activeWeapon;
            var crit = false;
            var randDamage = Math.floor((this._attack+Math.random()*(weapon._maxDamage-weapon._minDamage)+weapon._minDamage)/2);

            if (Math.random() <= this._critHitChance) {
                crit = true;
                randDamage = Math.floor(randDamage*this._critHitDamage);
            }

            return {isCritical: crit, value: randDamage, attacker: this};
        },

        isAbleToAttack: function() {
            return (this.currentAnim == this.anims.attackGround && (this.currentAnim.frame == 3 || this.currentAnim.frame == 4)) ||
                (this.currentAnim == this.anims.attackGround2 && (this.currentAnim.frame == 3 || this.currentAnim.frame == 4)) ||
                (this.currentAnim == this.anims.attackGround3 && (this.currentAnim.frame >= 2 && this.currentAnim.frame <= 4)) ||
                (this.currentAnim == this.anims.attackAir && (this.currentAnim.frame == 3 || this.currentAnim.frame == 4));
        }
    });
});