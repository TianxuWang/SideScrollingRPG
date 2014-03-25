ig.module (
    'game.entities.player'
)
.requires (
    'impact.entity',
    'impact.font',
    'impact.sound',
    'game.entities.character'
)
.defines ( function() {
    
    EntityPlayer = EntityCharacter.extend ({
        
        name: 'player',
        size: {x: 20, y: 21},
        offset: {x: 2, y: 1},
        health: 100,
        maxVel: {x: 50, y: 150},
        activeWeapon: null,
        weapons: ['EntityKatana', 'EntityNinjato'],

        animSheet: new ig.AnimationSheet("media/ninja.png", 24, 23),
        
        init: function(x, y, settings){
            this.parent(x, y, settings);	// defaults
            // weapon
            if (!ig.global.wm) {
                this.activeWeapon = ig.game.spawnEntity(this.weapons[0], x, y, {flip: this.flip, owner: this});
                this.activeWeapon.zIndex = 50;    
            }
            
            // idle
            this.addAnim('idle', 0.3, [3, 4, 5, 4]);
            
            // move
            this.addAnim('walk', 0.2, [0, 1, 2, 1]);
            this.addAnim('jumpGround', 0.14, [12, 13, 14, 15, 16, 17], true);
            
            // attack
            this.addAnim('attackGround', 0.1, [6, 7, 8, 9, 10, 11], true);
            this.addAnim('attackAir', 0.1, [6, 7, 8, 9, 10, 11], true);
            
            // add states to stateMachine
            this.addStates(this);
            // add transactions to stateMachine
            this.addTransitions(this);
            // add combos
            this.addCombos(this);
            
            // register this player to a global variable
            ig.game.player = this;
        },
        
        addStates: function(_self) {
            var self = _self;
            var weapon = self.activeWeapon;
            
            this.stateMachine.state('idle', {
                enter: function() {
                    console.log('begin idle');
                },
                update: function() {
                    console.log('idle');
                    self.idle();                    
                    weapon.idle();
                },
                exit: function() {
                    console.log('end idle');
                }
            });

            this.stateMachine.state('walking', {
                enter: function() {
                    console.log('begin walking');
                },
                update: function() {
                    console.log('walking')
                    self.walking();
                    weapon.hide();
                },
                exit: function() {
                    console.log('end walking')
                }
            });
            
            this.stateMachine.state('attackGround', {
                enter: function() {
                    console.log('begin attackGround');
                    self.attackGround();
                    weapon.attackGround();
                },
                update: function() {
                    console.log('attackGround');
                },
                exit: function() {
                    console.log('end attackGround');
                }
            });
            
            this.stateMachine.state('jumpGround', {
                enter: function() {
                    console.log('begin jumpGround');
                    self.jumpGround();
                    weapon.hide();
                },
                update: function() {
                    console.log('jumpGround');
                    if (ig.input.state('left') || ig.input.state('right'))
                        self.move();    
                    else
                        self.stop();
                },
                exit: function() {
                    console.log('end jumpGround');
                }
            });
            
            this.stateMachine.state('attackAir', {
                enter: function() {
                    console.log('begin attackAir');
                    self.attackAir();
                    weapon.attackAir();
                },
                update: function() {
                    console.log('attackAir');
                    weapon.pos.x = self.pos.x - (self.flip ? 12 : 8);
                    weapon.pos.y = self.pos.y - 19;
                },
                exit: function() {
                    console.log('end attackAir');
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
            
            this.stateMachine.transition('WalkToAttackGround', 'walking', 'attackGround', function(){
                return ig.input.pressed('attack') && (ig.input.state('left') || ig.input.state('right')); 
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
            
            this.stateMachine.transition('AttackAirToJumpGround', 'attackAir', 'jumpGround', function(){
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
            ig.game.comboManager.add(['left', 'left'], 1, function(){
                console.log('You should run!'); 
            });
        },
        
        idle: function() {
            this.stop();
            this.currentAnim = this.anims.idle;
        },
        
        walking: function() {
            this.move();
            this.currentAnim = this.anims.walk;
        },
        
        attackGround: function() {
            this.stop();
            this.vel.x = 0;
            this.currentAnim = this.anims.attackGround.rewind();
        },
        
        attackAir: function() {
            this.currentAnim = this.anims.attackAir.rewind();
        },
        
        jumpGround: function() {
            this.jump();
            this.currentAnim = this.anims.jumpGround.rewind();
        }
    });
    
    EntityKatana = ig.Entity.extend({
        size: {x: 40, y: 40},
        owner: null,
        visible: true,
        
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        
        animSheet: new ig.AnimationSheet('media/katana.png', 40, 40),
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.owner = settings.owner;
            this.flip = settings.flip;
            
            // animations
            this.addAnim('idle', 0.3, [0, 1, 2, 1]);
            this.addAnim('attackGround', 0.1, [6, 7, 8, 9, 10, 11], true);
            this.addAnim('attackAir', 0.1, [6, 7, 8, 9, 10, 11], true);
        },
        
        update: function() {
            this.updateFlip();
            
            this.parent();
        },
        
        updateFlip: function() {
            if (this.currentAnim != null)
                this.currentAnim.flip.x = this.owner.flip;
        },
        
        idle: function() {
            // offset position
            this.pos.x = this.owner.pos.x - (this.owner.flip ? 2 : 18);
            this.pos.y = this.owner.pos.y - 9;
            
            this.getCollision();
            this.setVisible();
            this.currentAnim = this.anims.idle;
        },
        
        attackGround: function() {
            // offset position
            this.pos.x = this.owner.pos.x - (this.owner.flip ? 12 : 8);
            this.pos.y = this.owner.pos.y - 18;

            this.getCollision();
            this.setVisible();
            this.currentAnim = this.anims.attackGround.rewind();
        },
        
        attackAir: function() {
            this.pos.x = this.owner.pos.x - (this.owner.flip ? 12 : 8);
            this.pos.y = this.owner.pos.y - 18;

            this.getCollision();
            this.setVisible();
            this.currentAnim = this.anims.attackAir.rewind();
        },
        
        hide: function() {
            this.removeCollision();
            this.setInvisible();
        },
        
        getCollision: function() {
            this.checkAgainst = ig.Entity.TYPE.B;
            this.collides = ig.Entity.COLLIDES.PASSIVE;
        },
        
        removeCollision: function() {
            this.checkAgainst = ig.Entity.TYPE.NONE;
            this.collides = ig.Entity.COLLIDES.NEVER;
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