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
        target: null,
        stateMachine: null,
        state: null,
        ai: null,
        bloodEmitter: null,
        textEmitter: null,
        emotionParticle: null,
        invincibleTimer: null,
        visible: true,
        flip: false,
        hurtDelay: 0.5,
        hurtTimer: null,

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
            // attributes

            if (!ig.global.wm) {
                // add blood effect
                this.bloodEmitter = new BloodEmitter(this);
                this.bloodEmitter.enabled = false;

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

            this.parent();
        },

        updateHealth: function() {
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
            if (this.type == ig.Entity.TYPE.NONE
                && this.checkAgainst == ig.Entity.TYPE.NONE
                && this.currentAnim != null)
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

        kill: function() {
            this.bloodEmitter = null;
            this.textEmitter = null;
            this.invincibleTimer = null;
            this.hurtTimer = null;

            if (this.activeWeapon)
                this.activeWeapon.kill();

            if (this.emotionParticle)
                this.emotionParticle.kill();

            this.parent();
        },

        move: function() {
            this.accel.x = this.flip ? -this.accelGround : this.accelGround;
        },

        walkTo: function(direction) {
            if (direction == 'left')
                this.accel.x = -this.accelGround;
            else if (direction == 'right')
                this.accel.x = this.accelGround;
        },

        jump: function() {
            this.vel.y = -this.jumpSpeed;
        },
        
        attackGround: function() {
            
        },

        attackAir: function() {

        },
        
        stop: function() {
            this.accel.x = 0;
        },
        
        setName: function(name) {
            this.name = name;
        },
        
        setPosition: function(x, y) {
            this.pos.x = x;
            this.pos.y = y;
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

        toggleVisibility: function() {
            if (this.visible)
                this.setVisible(false);
            else
                this.setVisible(true);
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