ig.module (
    'game.entities.character'
)
.requires (
    'impact.entity',
    'impact.font',
    'impact.sound',
    'game.system.stateMachine',
    'game.effects.bloodEmitter',
    'game.effects.textEmitter',
    'game.effects.sparkEmitter',
    'game.effects.emotionParticle'
)
.defines ( function() {
    
    EntityCharacter = ig.Entity.extend ({

        State: {
            // common
            'INVINCIBLE': 'invincible',
            'IDLE': 'idle',
            'ATTACKGROUND': 'attackGround',
            'ATTACKAIR': 'attackAir',
            'BLOCK': 'block',
            'CHANNEL': 'channel',
            'CASTING': 'casting',
            'HURT': 'hurt',
            'DEAD': 'dead',
            'BORN': 'born',

            // player
            'WALKING': 'walking',
            'RUNNING': 'running',
            'JUMPGROUND': 'jumpGround',
            'CROUCH': 'crouch',
            'FALLING': 'falling',

            // enemy or other(E.g. shadow clone)
            'ALERT': 'alert',
            'SEARCHING': 'searching',
            'CHASING': 'chasing',
            'ATTACKING': 'attacking',
            'RESET': 'reset'
        },

        name: null,
        size: {x: 16, y: 16},
        _originalSize: {x: 16, y: 16},
        _originalOffset: {x: 0, y: 0},
        target: null,
        stateMachine: null,
        state: null,
        ai: null,
        bloodEmitter: null,
        textEmitter: null,
        sparkEmitter: null,
        emotionParticle: null,
        invincibleTimer: null,
        visible: true,
        flip: false,
        hurtDelay: 0.5,
        hurtTimer: null,
        blockDelay: 0.8,
        blockTimer: null,

        walkSpeed: 50,
        runSpeed: 80,
        health: 10,
        maxHealth: 10,
        _attack: 0,
        _attackSpeed: 0,
        _defence: 0,
        attackRange: 20,
        
        maxVel: {x: 50, y: 150},
        friction: {x: 600, y: 0},
        accelGround: 400,
        accelAir: 200,
        jumpSpeed: 400,

        // internal uses
        _justMadeDamage: false,
        _justMadeBlock: false,
        _damageAccum: 0,
        _healAccum: 0,
        _manaCostAccum: 0,
        _manaGainAccum: 0,
        _poisonDamageAccum: 0,
        _poisonDamageTaken: 0,
        _poisonLastTime: 0,
        _igniteDamageAccum: 0,
        _igniteDamageTaken: 0,
        _igniteLastTime: 0,
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.center = {x: x+this.size.x/2, y: y+this.size.y/2};
            this.stateMachine = new StateMachine();
            this.invincibleTimer = new ig.Timer();
            this.hurtTimer = new ig.Timer();
            this.blockTimer = new ig.Timer();
            // attributes

            if (!ig.global.wm) {
                // add blood effect
                this.bloodEmitter = new BloodEmitter(this);
                this.bloodEmitter.enabled = false;
                // add spark effect
                this.sparkEmitter = new SparkEmitter(this);
                this.sparkEmitter.enabled = false;

                // add battle msg
                this.textEmitter = new TextEmitter(this);
            }

        },
        
        update: function() {
            this.updateCenter();
            this.updateHealth();
            this.updateMana();
            this.updateTarget();
            this.updateAI();
            this.updateFlip();
            this.stateMachine.update();

            if (this.bloodEmitter != null)
                this.bloodEmitter.emit();
            if (this.sparkEmitter != null)
                this.sparkEmitter.emit();

            this.parent();
        },

        updateHealth: function() {
            if (this._damageAccum < 1)
                this._damageAccum = 0;

            if (this._damageAccum > 0) {
                this.receiveDamage(this._damageAccum/10);
                this._damageAccum -= this._damageAccum/10;
            }

            if (this._healAccum > 0) {
                this.receiveDamage(-this._healAccum/10);
                this._healAccum -= this._healAccum/10;
            }

            if (this._poisonDamageAccum > 0) {
                var damagePerFrame = this._poisonDamageAccum/(this._poisonLastTime*60);
                if(this._poisonDamageTaken < this._poisonDamageAccum) {
                    this.receiveDamage(damagePerFrame);
                    this._poisonDamageTaken += damagePerFrame;
                }
                else {
                    this._poisonDamageAccum = this._poisonDamageTaken = this._poisonLastTime = 0;
                }
            }
        },

        updateMana: function() {
            if (this._manaCostAccum > 0) {
                this.mana -= this._manaCostAccum/10;
                this._manaCostAccum -= this._manaCostAccum/10;
            }
            if (this._manaGainAccum > 0) {
                this.mana += this._manaGainAccum/10;
                this._manaGainAccum -= this._manaGainAccum/10;
            }
        },

        updateTarget: function() {

        },

        updateFlip: function() {
            if (this.currentAnim)
                this.currentAnim.flip.x = this.flip;
        },

        updateCenter: function() {
            this.center.x = this.pos.x + this.size.x/2;
            this.center.y = this.pos.y + this.size.y/2;
        },

        updateAI: function() {
            if (this.ai != null &&
                (this.state != this.State.ATTACKGROUND || this.state != this.State.ATTACKAIR))
                this.ai.update();
        },

        receiveDamage: function(amount, from) {
            this.health -= amount;
            if ( this.health <= 0) {
                this.state = this.State.DEAD;
            }
        },

        kill: function() {
            this.bloodEmitter = null;
            this.textEmitter = null;
            this.sparkEmitter = null;
            this.invincibleTimer = null;
            this.hurtTimer = null;

            if (this.activeWeapon)
                this.activeWeapon.kill();

            if (this.emotionParticle)
                this.emotionParticle.kill();

            this.parent();
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
//            this.stop();
//            this.vel.x = 0;
            this.currentAnim = this.anims.attackAir.rewind();
        },

        block: function() {
            this.stop();
            this.currentAnim = this.anims.block.rewind();
            this.blockTimer.reset();
        },

        hurt: function(fromLeft, damageObj) {
            this.state = this.State.HURT;
            this.hurtTimer.reset();

            var damageTaken = damageObj.value - this._defence;
            var specialEffects = damageObj.effects;
            var attacker = damageObj.attacker;

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

            this.flip = fromLeft;

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
            this.stop();
            this.currentAnim = this.anims.hurt.rewind();
        },

        jumpGround: function() {
            this.jump();
            this.currentAnim = this.anims.jumpGround.rewind();
        },

        falling: function() {
            this.currentAnim = this.anims.fall.rewind();
        },

        knockBack: function(fromLeft) {

        },

        slideBack: function(fromLeft) {

        },

        move: function() {
            this.accel.x = this.flip ? -this.accelGround : this.accelGround;
        },

        jump: function() {
            this.vel.y = -this.jumpSpeed;
        },

        stop: function() {
            this.accel.x = 0;
        },

        isAbleToBlock: function(other) {
            return this.state == this.State.BLOCK &&
                   ((this.flip && !this.isOnLeftOf(other)) || (!this.flip && this.isOnLeftOf(other)))
        },

        setPosition: function(x, y) {
            this.pos.x = x;
            this.pos.y = y;
        },

        resizeToAttackBox: function() {

        },

        resizeToNormalBox: function() {
            this.size.x = this._originalSize.x;
            this.size.y = this._originalSize.y;
            this.offset.x = this._originalOffset.x;
            this.offset.y = this._originalOffset.y;
        },

        setVisible: function(value) {
            this.visible = value;    
        },
        
        toggleFlip: function() {
            this.flip = !this.flip;
        },

        toggleAlpha: function() {
            if (this.currentAnim != null) {
                if (this.currentAnim.alpha == 1)
                    this.currentAnim.alpha = 0.5;
                else
                    this.currentAnim.alpha = 1;
            }
        },

        isOnLeftOf: function(other) {
            if (this.center != null && other.center != null)
                return this.center.x - other.center.x < 0;
            else
                return false;
        },

        isNear: function(other, distanceX, distanceY) {
            var dx, dy, near = false;
            if (this.center != null && other.center != null) {
                dx = Math.abs(this.center.x - other.center.x);
                dy = Math.abs(this.center.y - other.center.y);

                if(dx <= distanceX && dy <= distanceY) {
                    near = true;
                }
            }
            return near;
        }
    });
});