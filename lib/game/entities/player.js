ig.module (
    'game.entities.player'
)
.requires (
    'impact.sound',
    'game.entities.character',
    'game.system.comboManager'
)
.defines ( function() {
    
    EntityPlayer = EntityCharacter.extend ({
        
        name: 'player',
        size: {x: 20, y: 21},
        offset: {x: 2, y: 1},
        maxVel: {x: 50, y: 150},

        zIndex: 45,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,

        activeWeapon: null,
        weapons: ['EntityKatana', 'EntityNinjato'],

        target: null,

        level: 1,
        curExp: 0,
        expToNextLvl: 100,
        health: 50,
        maxHealth: 100,
        _attack: 10,
        defence: 10,
        _attackSpeed: 0.1,

        animSheet: new ig.AnimationSheet('media/ninja.png', 24, 23),

        init: function(x, y, settings){
            // defaults
            this.parent(x, y, settings);

            // weapon
            if (!ig.global.wm) {
                this.activeWeapon = ig.game.spawnEntity(this.weapons[0], x, y, {flip: this.flip, owner: this});
                this.activeWeapon.zIndex = 50;

                // add combos
                this.comboManager = new ComboManager();
                this.addCombos(this);
            }

            this.attack = this.activeWeapon == null ? this._attack : this._attack + this.activeWeapon._attack;
            this.attackSpeed = this.activeWeapon == null ? this._attackSpeed : (this._attackSpeed + this.activeWeapon._attackSpeed)/2;

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

            // add states to stateMachine
            this.addStates(this);
            // add transactions to stateMachine
            this.addTransitions(this);

            // register this player to a global variable
            ig.game.player = this;
        },

        update: function() {
            this.comboManager.update();
            this.updateTarget();

            this.parent();
        },

        updateFlip: function() {
            if (this.state != this.State.HURT &&
                this.state != this.State.ATTACKGROUND &&
                this.state != this.State.ATTACKAIR) {

                if (ig.input.state('right'))
                    this.flip = false;
                else if (ig.input.state('left'))
                    this.flip = true;
            }

            this.parent();
        },

        updateTarget: function() {
            if (this.target != null && !this.isNear(this.target, 200, 200))
                this.target = null;
        },

        addStates: function(_self) {
            var self = _self;
            var weapon = self.activeWeapon;
            
            this.stateMachine.state(this.State.IDLE, {
                enter: function() {
                    console.log('player begin idle');
                    self.state = self.State.IDLE;
                },
                update: function() {
                    console.log('player idle');
                    self.idle();                    
                    weapon.idle();
                },
                exit: function() {
                    console.log('player end idle');
                }
            });

            this.stateMachine.state(this.State.WALKING, {
                enter: function() {
                    console.log('player begin walking');
                    self.state = self.State.WALKING;
                },
                update: function() {
                    console.log('player walking')
                    self.walking();
                    weapon.hide();
                },
                exit: function() {
                    console.log('player end walking')
                }
            });
            
            this.stateMachine.state(this.State.ATTACKGROUND, {
                enter: function() {
                    console.log('player begin attackGround');
                    self.state = self.State.ATTACKGROUND;
                    self.attackGround();
                    weapon.attackGround();
                },
                update: function() {
                    console.log('player attackGround');
                    weapon.offsetAttackPos();
                },
                exit: function() {
                    console.log('player end attackGround');
                }
            });

            this.stateMachine.state(this.State.FALLING, {
                enter: function() {
                    console.log('player begin falling');
                    self.state = self.State.FALLING;
                    weapon.hide();
                },
                update: function() {
                    console.log('player falling');
                    self.falling();
                },
                exit: function() {
                    console.log('player end falling');
                }
            })

            this.stateMachine.state(this.State.JUMPGROUND, {
                enter: function() {
                    console.log('player begin jumpGround');
                    self.state = self.State.JUMPGROUND;
                    self.jumpGround();
                    weapon.hide();
                },
                update: function() {
                    console.log('player jumpGround');
                    self.enableMoveX();
                },
                exit: function() {
                    console.log('player end jumpGround');
                }
            });
            
            this.stateMachine.state(this.State.ATTACKAIR, {
                enter: function() {
                    console.log('player begin attackAir');
                    self.state = self.State.ATTACKAIR;
                    self.attackAir();
                    //weapon.gravityFactor = 1;
                    weapon.attackAir();
                },
                update: function() {
                    console.log('player attackAir');
//                    weapon.pos.x = self.pos.x - (self.flip ? 12 : 8);
//                    weapon.pos.y = self.pos.y - 19;
                    weapon.offsetAttackPos();
                    weapon.vel.x = self.vel.x;
                    weapon.vel.y = self.vel.y;
                },
                exit: function() {
                    console.log('player end attackAir');
                    weapon.vel.x = 0;
                    weapon.vel.y = 0;
                    //weapon.gravityFactor = 0;
                }
            });
        },
        
        addTransitions: function(_self) {
            var self = _self;
            var weapon = self.activeWeapon;
            
            this.stateMachine.transition('WalkToIdle', 'walking', 'idle', function(){
                return !ig.input.state('left') && !ig.input.state('right');
            });
            
            this.stateMachine.transition('IdleToWalk', 'idle', 'walking', function(){
                return ig.input.state('left') || ig.input.state('right');
            });
            
            this.stateMachine.transition('IdleToAttackGround', 'idle', 'attackGround', function(){
                return ig.input.pressed('attack') && (!ig.input.state('left') && !ig.input.state('right'));
            });

            this.stateMachine.transition('IdleToFalling', 'idle', 'falling', function(){
                return !self.standing && self.vel.y > 50;
            });

            this.stateMachine.transition('WalkToAttackGround', 'walking', 'attackGround', function(){
                return ig.input.pressed('attack') && (ig.input.state('left') || ig.input.state('right')); 
            });

            this.stateMachine.transition('WalkToFalling', 'walking', 'falling', function(){
                return !self.standing && self.vel.y > 50;
            });
            
            this.stateMachine.transition('AttackGroundToIdle', 'attackGround', 'idle', function(){
                return self.currentAnim.loopCount && !ig.input.state('left') && !ig.input.state('right'); 
            });

            this.stateMachine.transition('AttackGroundToWalk', 'attackGround', 'walking', function(){
                return self.currentAnim.loopCount && (ig.input.state('left') || ig.input.state('right')); 
            });

            this.stateMachine.transition('IdleToJumpGround', 'idle', 'jumpGround', function(){
                return self.standing && ig.input.pressed('jump'); 
            });
            
            this.stateMachine.transition('WalkToJumpGround', 'walking', 'jumpGround', function(){
                return self.standing && ig.input.pressed('jump'); 
            });
            
            this.stateMachine.transition('JumpGroundToIdle', 'jumpGround', 'idle', function(){
                return self.currentAnim.loopCount && !ig.input.state('left') && !ig.input.state('right'); 
            });
            
            this.stateMachine.transition('JumpGroundToWalk', 'jumpGround', 'walking', function(){
                return self.currentAnim.loopCount && (ig.input.state('left') || ig.input.state('right'));
            });
            
            this.stateMachine.transition('JumpGroundToAttackAir', 'jumpGround', 'attackAir', function(){
                return ig.input.state('attack');
            });

            this.stateMachine.transition('JumpGroundToFalling', 'jumpGround', 'falling', function(){
                return self.currentAnim.loopCount && !self.standing;
            });

            this.stateMachine.transition('FallingToIdle', 'falling', 'idle', function(){
                return self.standing && !ig.input.state('left') && !ig.input.state('right');
            });

            this.stateMachine.transition('FallingToWalk', 'falling', 'walking', function(){
                return self.standing && (ig.input.state('left') || ig.input.state('right'));
            })

            this.stateMachine.transition('AttackAirToFalling', 'attackAir', 'falling', function(){
                return self.currentAnim.loopCount && !self.standing; 
            });
            
            this.stateMachine.transition('AttackAirToIdle', 'attackAir', 'idle', function(){
                return self.standing && !ig.input.state('left') && !ig.input.state('right'); 
            });
            
            this.stateMachine.transition('AttackAirToWalk', 'attackAir', 'walking', function(){
                return self.standing && (ig.input.state('left') || ig.input.state('right'));
            });
        },
        
        addCombos: function(_self) {
            var self = _self;
            this.comboManager.add(['left', 'left'], 1, function(){
                console.log('You should run!'); 
            });
        },

        enableMoveX: function() {
            if (ig.input.state('left') || ig.input.state('right'))
                this.move();
            else
                this.stop();
        },

        idle: function() {
            this.stop();
            this.currentAnim = this.flip ?
                               this.anims.idleLeft : this.anims.idleRight;
        },
        
        walking: function() {
            this.move();
            this.currentAnim = this.flip ?
                               this.anims.walkLeft : this.anims.walkRight;
        },
        
        attackGround: function() {
            this.stop();
            this.vel.x = 0;
            this.currentAnim = this.flip ?
                               this.anims.attackGroundLeft.rewind() : this.anims.attackGroundRight.rewind();
        },
        
        attackAir: function() {
            this.currentAnim = this.flip ?
                               this.anims.attackAirLeft.rewind() : this.anims.attackAirRight.rewind();
        },
        
        jumpGround: function() {
            this.jump();
            this.currentAnim = this.flip ?
                               this.anims.jumpGroundLeft.rewind() : this.anims.jumpGroundRight.rewind();
        },

        falling: function() {
            this.enableMoveX();
            this.currentAnim = this.flip ?
                               this.anims.fallLeft.rewind() : this.anims.fallRight.rewind();
        }
    });
    
    EntityKatana = ig.Entity.extend({
        size: {x: 40, y: 40},
        owner: null,
        visible: true,
        gravityFactor: 0,
        
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NEVER,

        _attack: 10,
        _attackSpeed: 0.1,
        
        animSheet: new ig.AnimationSheet('media/katana.png', 40, 40),
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.owner = settings.owner;
            this.flip = settings.flip;
            this.attackSpeed = (this._attackSpeed + this.owner._attackSpeed)/2;
            
            // animations
            this.addAnim('idle', 0.3, [0, 1, 2, 1]);
            this.addAnim('attackGroundRight', this.attackSpeed, [6, 7, 8, 9, 10, 11], true);
            this.addAnim('attackGroundLeft', this.attackSpeed, [12, 13, 14, 15, 16, 17], true);
            this.addAnim('attackAirRight', this.attackSpeed, [6, 7, 8, 9, 10, 11], true);
            this.addAnim('attackAirLeft', this.attackSpeed, [12, 13, 14, 15, 16, 17], true);
        },
        
        update: function() {
            this.updateFlip();
            //this.updateGravity();

            this.parent();
        },

        check: function(other) {
            if (other.state != other.State.BLOCK &&
                other.state != other.State.INVINCIBLE &&
                (this.currentAnim.frame == 3 || this.currentAnim.frame == 4)) {
                other.state = other.State.HURT;
                other.receiveDamage((this.owner.attack - other.defence)/10);
                other.flip = this.owner.isOnLeftOf(other);
                other.bloodEmitter.setPos(this.pos.x + (this.flip ? -12 : 36), this.pos.y + 12);
            }
        },

        handleMovementTrace: function(res) {
            // totally ignore collision with tiles
            this.pos.x += this.vel.x * ig.system.tick;
            this.pos.y += this.vel.y * ig.system.tick;
        },

        updateFlip: function() {
            this.flip = this.owner.flip;
            if (this.currentAnim == this.anims.idle)
                this.currentAnim.flip.x = this.flip;
        },

        updateGravity: function() {
            if (this.owner.state == this.owner.State.ATTACKAIR) {
                this.gravityFactor = 1;
                this.vel.x = this.owner.vel.x;
                this.vel.y = this.owner.vel.y;
            }
            else
                this.gravityFactor = 0;
        },

        idle: function() {
            // offset position
            this.offsetIdlePos();
            
            this.removeCollision();
            this.setVisible();
            this.currentAnim = this.anims.idle;
        },
        
        attackGround: function() {
            // offset position
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
            this.pos.x = this.owner.pos.x - (this.owner.flip ? 2 : 18);
            this.pos.y = this.owner.pos.y - 9;
        },

        offsetAttackPos: function() {
            this.pos.x = this.owner.pos.x - (this.owner.flip ? 12 : 8);
            this.pos.y = this.owner.pos.y - 18;
        },

        hide: function() {
            this.removeCollision();
            this.setInvisible();
        },
        
        getCollision: function() {
            this.checkAgainst = ig.Entity.TYPE.B;
            //this.collides = ig.Entity.COLLIDES.NEVER;
        },
        
        removeCollision: function() {
            this.checkAgainst = ig.Entity.TYPE.NONE;
            //this.collides = ig.Entity.COLLIDES.NEVER;
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
        }
        
    });
});