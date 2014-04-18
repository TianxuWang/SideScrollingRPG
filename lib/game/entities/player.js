ig.module (
    'game.entities.player'
)
.requires (
    'impact.sound',
    'game.entities.character',
    'game.entities.weapons.katana',
    'game.spells.shadowClone',
    'game.system.comboManager',
    'game.system.eventChain'
)
.defines ( function() {
    
    EntityPlayer = EntityCharacter.extend ({
        
        name: 'player',
        size: {x: 20, y: 21},
        offset: {x: 2, y: 1},
        maxVel: {x: 50, y: 150},

        zIndex: 46,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,

        activeWeapon: null,
        weapons: ['EntityKatana', 'EntityNinjato'],

        activeSpell: null,
        castTimer: new ig.Timer(),
        //skills: ['Shuriken', 'PoisonBlade', 'ShadowClone'],
        spells: {
            Shuriken: null,
            PoisonBlade: null,
            ShadowClone: null
        },

        level: 1,
        curExp: 0,
        expToNextLvl: 100,
        health: 50,
        maxHealth: 100,
        mana: 20,
        maxMana: 20,
        _attack: 10,
        defence: 10,
        _attackSpeed: 0.1,

        animSheet: new ig.AnimationSheet('media/ninja.png', 24, 23),

        init: function(x, y, settings){
            // defaults
            this.parent(x, y, settings);

            if (!ig.global.wm) {
                // weapon
                this.activeWeapon = ig.game.spawnEntity(this.weapons[0], x, y, {
                    flip: this.flip,
                    owner: this,
                    isShadowClone: false
                });
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

            // skill
            this.addAnim('castRight', 1, [29], true);
            this.addAnim('castLeft', 1, [35], true);

            // add states to stateMachine
            this.addStates();
            // add transactions to stateMachine
            this.addTransitions();

            // initialize spells
            this.initSpells();

            // initialize EventChain
//            this.castChain = EventChain(this)
//                .wait(this.activeSpell == null ? 0 : this.activeSpell.castDelay)
//                .then(function(){ this.state = this.State.IDLE; }).repeat();

            // register this player to a global variable
            ig.game.player = this;
        },

        initSpells: function() {
            this.spells.ShadowClone = new SpellShadowClone(this);
        },

        update: function() {
            this.comboManager.update();
            this.updateTarget();
            this.updateSpells();

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

        updateSpells: function() {
            for(var sp in this.spells) {
                if (this.spells.hasOwnProperty(sp) && sp instanceof Spell) {
                    sp.update();
                }
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
                    weapon.offsetAttackPos();
                },
                exit: function() {
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
                    self.enableMoveX();
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
                    weapon.stop();
                    weapon.vel.x = 0;
                    weapon.vel.y = 0;
                }
            });

            this.stateMachine.state(this.State.CASTING, {
                enter: function() {
                    self.state = self.State.CASTING;
                    self.casting();
                    weapon.hide();
                    self.castTimer.set(self.activeSpell.castDelay);
                },
                update: function() {
                    //self.castChain();
                },
                exit: function() {
                    if (self.castTimer.delta() >= 0) //ready to spell
                        self.activateSpell();
                    self.activeSpell = null;
                }
            });
        },
        
        addTransitions: function() {
            var self = this;
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

            this.stateMachine.transition('IdleToCasting', 'idle', 'casting', function(){
                return self.activeSpell != null;
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

            this.stateMachine.transition('AttackGroundToCasting', 'attackGround', 'casting', function(){
                return self.activeSpell != null;
            })

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
            });

            this.stateMachine.transition('AttackAirToFalling', 'attackAir', 'falling', function(){
                return self.currentAnim.loopCount && !self.standing; 
            });
            
            this.stateMachine.transition('AttackAirToIdle', 'attackAir', 'idle', function(){
                return self.standing && !ig.input.state('left') && !ig.input.state('right'); 
            });
            
            this.stateMachine.transition('AttackAirToWalk', 'attackAir', 'walking', function(){
                return self.standing && (ig.input.state('left') || ig.input.state('right'));
            });

            this.stateMachine.transition('CastingToIdle', 'casting', 'idle', function(){
                return self.castTimer.delta() >= 0;
            });

            this.stateMachine.transition('CastingToHurt', 'casting', 'hurt', function(){
                return self.state == self.State.HURT;
            });
        },
        
        addCombos: function(_self) {
            var self = _self;

            this.comboManager.add(['left', 'left'], 1, function(){
                console.log('RunLeft triggered');
            });

            this.comboManager.add(['right', 'right'], 1, function(){
                console.log('RunRight triggered');
            });

            this.comboManager.add(['crouch', 'crouch', 'attack'], 1, function(){
                console.log('Casting Skill:ShadowClone!');
                self.activeSpell = self.spells.ShadowClone;
            })
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
            this.vel.x = 0;     // need this?
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
        },

        casting: function() {
            if (!this.activeSpell.movable)
                this.stop();

            this.currentAnim = this.flip ?
                               this.anims.castLeft.rewind() : this.anims.castRight.rewind();
        },

        activateSpell: function() {
            this.activeSpell.activate();
        }
    });
});