ig.module (
    'game.entities.player'
)
.requires (
    'impact.sound',
    'game.entities.character',
    'game.entities.weapons.katana',
    'game.system.comboManager',
    'game.system.eventChain'
)
.defines ( function() {
    
    EntityPlayer = EntityCharacter.extend ({
        
        name: 'Player',
        size: {x: 24, y: 23},

        zIndex: 46,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,

        activeWeapon: null,
        weapons: [],

        activeSpell: null,
        spells: {},
        castTimer: new ig.Timer(),

        level: 1,
        curExp: 0,
        expToNextLvl: 100,
        health: 50,
        maxHealth: 100,
        mana: 20,
        maxMana: 20,
        _attack: 10,
        _defence: 10,
        _attackSpeed: 0.1,
        healthRegenRate: 0.02,
        manaRegenRate: 0.01,
        _critHitChance: 0.1,
        _critHitDamage: 1.5,
        _walkSpeed: 50,
        _runSpeed: 100,

        // flags for internal use
        _disengageDelay: 6,
        _disengageTimer: new ig.Timer(),

        init: function(x, y, settings){

            this.parent(x, y, settings);

            if (!ig.global.wm) {
                this.initWeapon();
                this.initCombos();
            }

            this.initAttributes();
            this.initSpells();
            this.initStateMachine();
            this.initAnimations();

            // TODO:initialize EventChain

            ig.game.player = this;
        },

        initAttributes: function() {
            this.maxVel.x = this._walkSpeed;
            this.attackSpeed = this.activeWeapon ? (this._attackSpeed + this.activeWeapon._attackSpeed)/2 : this._attackSpeed;
        },

        initAnimations: function() {
        },

        initWeapon: function() {
            this.activeWeapon = ig.game.spawnEntity(this.weapons[0], this.pos.x, this.pos.y, {
                flip: this.flip,
                owner: this,
                isShadowClone: false
            });
            this.activeWeapon.zIndex = this.zIndex + 1;
        },

        initSpells: function() {

        },

        initStateMachine: function() {
            this.addStates();
            this.addTransitions();
        },

        update: function() {
            this.comboManager.update();
            this.updateTarget();
            this.updateAttributes();
            this.updateSpells();

            this.parent();
        },

        updateAttributes: function() {
            if (this.curExp >= this.expToNextLvl) {
                this.levelUp();
            }
        },

        updateHealth: function() {
            this.parent();

            if (this._damageAccum > 0) {
                this._disengageTimer.reset();
            }
            if (this._disengageTimer.delta() >= this._disengageDelay && this.health < this.maxHealth) {
                // identify disengage, start to recover health if needed
                this.health += this.healthRegenRate;
            }
        },

        updateMana: function() {
            this.parent();

            if (this.mana < this.maxMana) {
                this.mana += this.manaRegenRate;
            }
        },

        updateFlip: function() {
            if (this.state != this.State.HURT &&
                this.state != this.State.BLOCK &&
                this.state != this.State.ATTACKGROUND &&
                this.state != this.State.ATTACKAIR &&
                this.state != this.State.CASTING &&
                this.state != this.State.DEAD) {

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
                if (this.spells.hasOwnProperty(sp) && this.spells[sp]) {
                    this.spells[sp].update();
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

            this.stateMachine.state(this.State.RUNNING, {
                enter: function() {
                    self.state = self.State.RUNNING;
                },
                update: function() {
                    self.running();
                    weapon.hide();
                },
                exit: function() {
                    self.maxVel.x = self._walkSpeed;
                }
            });

            this.stateMachine.state(this.State.FALLING, {
                enter: function() {
                    self.state = self.State.FALLING;
                    weapon.hide();
                },
                update: function() {
                    self.falling();
                    self.enableMoveX();
                },
                exit: function() {
                }
            });

            this.stateMachine.state(this.State.HURT, {
                enter: function() {
                    self.state = self.State.HURT;
                    weapon.hide();
                    self.hurting();
                },
                update: function() {

                }
            });

            this.stateMachine.state(this.State.BLOCK, {
                enter: function() {
                    self.state = self.State.BLOCK;
                    self.block();
                    weapon.block();
                },
                update: function() {
                    weapon.offsetIdlePos();
                },
                exit: function() {
                    self._justMadeBlock = false;
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
                    self._justMadeDamage = false;
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
                    self._justMadeDamage = false;
                    weapon.stop();
                    weapon.vel.x = 0;
                    weapon.vel.y = 0;
                }
            });

            this.stateMachine.state(this.State.DEAD, {
                enter: function() {
                    self.bounciness = 0.4;
                },
                update: function() {
                    //self.deadChain();
                },
                exit: function() {
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

            this.stateMachine.transition('IdleToHurt', this.State.IDLE, this.State.HURT, function(){
                return self.state == self.State.HURT;
            });

            this.stateMachine.transition('WalkToHurt', this.State.WALKING, this.State.HURT, function(){
                return self.state == self.State.HURT;
            });

            this.stateMachine.transition('JumpGroundToHurt', this.State.JUMPGROUND, this.State.HURT, function(){
                return self.state == self.State.HURT;
            });

            this.stateMachine.transition('AttackGroundToHurt', this.State.ATTACKGROUND, this.State.HURT, function(){
                return self.state == self.State.HURT;
            });

            this.stateMachine.transition('AttackAirToHurt', this.State.ATTACKAIR, this.State.HURT, function(){
                return self.state == self.State.HURT;
            });

            this.stateMachine.transition('FallingToHurt', this.State.FALLING, this.State.HURT, function(){
                return self.state == self.State.HURT;
            });

            this.stateMachine.transition('CastingToHurt', this.State.CASTING, this.State.HURT, function(){
                return self.state == self.State.HURT;
            });

            this.stateMachine.transition('HurtToIdle', this.State.HURT, this.State.IDLE, function(){
                return self.hurtTimer.delta() >= self.hurtDelay;
            });

            this.stateMachine.transition('HurtToDead', this.State.HURT, this.State.DEAD, function(){
                return self.state == self.State.DEAD;
            });

            this.stateMachine.transition('IdleToBlock', this.State.IDLE, this.State.BLOCK, function(){
                return ig.input.pressed('block');
            });

            this.stateMachine.transition('WalkToBlock', this.State.WALKING, this.State.BLOCK, function(){
                return ig.input.pressed('block');
            });

            this.stateMachine.transition('RunToBlock', this.State.RUNNING, this.State.BLOCK, function(){
                return ig.input.pressed('block');
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

            this.stateMachine.transition('BlockToCasting', this.State.BLOCK, this.State.CASTING, function(){
                return self.activeSpell != null;
            });

            this.stateMachine.transition('IdleToRun', this.State.IDLE, this.State.RUNNING, function(){
                return self.maxVel.x == self._runSpeed;
            });

            this.stateMachine.transition('WalkToRun', this.State.WALKING, this.State.RUNNING, function(){
                return self.maxVel.x == self._runSpeed;
            });

            this.stateMachine.transition('RunToIdle', this.State.RUNNING, this.State.IDLE, function(){
                return !ig.input.state('left') && !ig.input.state('right');
            });

            this.stateMachine.transition('RunToJumpGround', this.State.RUNNING, this.State.JUMPGROUND, function(){
                return self.standing && ig.input.pressed('jump');
            });

            this.stateMachine.transition('RunToAttackGround', this.State.RUNNING, this.State.ATTACKGROUND, function(){
                return ig.input.pressed('attack') && (ig.input.state('left') || ig.input.state('right'));
            });

            this.stateMachine.transition('RunToFalling', this.State.RUNNING, this.State.FALLING, function(){
                return !self.standing && self.vel.y > 50;
            });

            this.stateMachine.transition('RunToHurt', this.State.RUNNING, this.State.HURT, function(){
                return self.state == self.State.HURT;
            });
        },
        
        initCombos: function() {
            this.comboManager = new ComboManager();
            var self = this;

            this.comboManager.add(['left', 'left'], 0.5, function(){
                self.maxVel.x = self._runSpeed;
            });

            this.comboManager.add(['right', 'right'], 0.5, function(){
                self.maxVel.x = self._runSpeed;
            });
        },

        running: function() {
            this.move();
            this.currentAnim = this.anims.run;
        },

        cast: function() {
            if (!this.activeSpell.movable)
                this.stop();

            this.currentAnim = this.activeSpell instanceof SpellShuriken ?
                               this.anims.throw.rewind() : this.anims.cast.rewind();
        },

        knockBack: function(fromLeft) {
            var knockbackPower = this.health <= this._damageAccum ? 200 : 100;
            var knockupPower = this.health <= this._damageAccum ? 100 : 50;
            this.vel.x = fromLeft ? knockbackPower : -knockbackPower;
            this.vel.y = -knockupPower;
        },

        slideBack: function(fromLeft) {
            this.vel.x = fromLeft ? 60 : -60;

            this.sparkEmitter.setPos(this.pos.x + (this.flip ? 0 : 14), this.pos.y + 4);
            this.sparkEmitter.revive(0.1);
            this.sparkEmitter.enabled = true;

            ig.game.shakeScreen(0.2, 2);
        },

        tryActivateSpell: function(spell) {
            console.log('trying to activate ' + spell.name);
            if (!spell.cooledDown()) {
                this.textEmitter.emit({
                    text: 'Not cool down',
                    color: '#0099FF',
                    gravityFactor: 0,
                    fontSize: 10,
                    vel: {x: 0, y: -5},
                    life: 2
                });
            }
            else if (this.mana < spell.costActivate) {
                this.textEmitter.emit({
                    text: 'Not enough mana',
                    color: '#0099FF',
                    gravityFactor: 0,
                    fontSize: 10,
                    vel: {x: 0, y: -5},
                    life: 2
                });
            }
            else {
                this.activeSpell = spell;
            }
        },

        activateSpell: function() {
            this.activeSpell.activate();
        },

        makeRandDamage: function() {
            var weapon = this.activeWeapon;
            var specialEffects = {};
            var crit = false;
            var randDamage = Math.floor(this._attack+Math.random()*(weapon._maxDamage-weapon._minDamage)+weapon._minDamage);

            if (Math.random() <= this._critHitChance) {
                crit = true;
                randDamage = Math.floor(randDamage*this._critHitDamage);
            }

            if (weapon.specialEffect.poison.chance > 0 && Math.random() < weapon.specialEffect.poison.chance) {
                specialEffects['poison'] = {
                    value: weapon.specialEffect.poison.value,
                    lastTime: weapon.specialEffect.poison.lastTime
                };
            }
            if (weapon.specialEffect.freeze.chance > 0 && Math.random() < weapon.specialEffect.freeze.chance) {
                specialEffects['freeze'] = {
                    value: weapon.specialEffect.freeze.value,
                    lastTime: weapon.specialEffect.freeze.lastTime
                };
            }
            if (weapon.specialEffect.ignite.chance > 0 && Math.random() < weapon.specialEffect.ignite.chance) {
                specialEffects['ignite'] = {
                    value: weapon.specialEffect.ignite.value,
                    lastTime: weapon.specialEffect.ignite.lastTime
                };
            }
            if (weapon.specialEffect.lifeSteal > 0) {
                specialEffects['lifeStealRate'] = weapon.specialEffect.lifeSteal;
            }

            return {isCritical: crit, value: randDamage, effects: specialEffects, attacker: this};
        },

        levelUp: function() {
            this.level++;
            this.maxHealth += 20;
            this.health = this.maxHealth;
            this.maxMana += 10;
            this.mana = this.maxMana;
            this._attack += 5;
            this._defence += 5;

            this.expToNextLvl = this.expToNextLvl*2;
        },

        enableMoveX: function() {
            if (ig.input.state('left') || ig.input.state('right'))
                this.move();
            else
                this.stop();
        }
    });

    EntityPlayer.animationTimer = new ig.Timer();
    EntityPlayer.SIZE = {x: 14, y: 21};
});