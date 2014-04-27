/**
 * Created by Tianxu on 14-4-18.
 */
ig.module (
    'game.entities.enemies.treant'
)
.requires (
    'impact.sound',
    'game.entities.enemy',
    'game.system.eventChain',
    'game.ai.patrol',
    'game.ai.chase'
)
.defines ( function() {

    EntityTreant = EntityEnemy.extend ({

        name: 'Treant',
        bounciness: 0.6,
        size: {x: 20, y: 27},
        offset: {x: 6, y: 5},
        _originalSize: {x: 20, y: 27},
        _originalOffset: {x: 6, y: 5},
        maxVel: {x: 20, y: 150},
        _respawnTime: 3,
        hurtDelay: 0.5,

        level: 1,
        health: 50,
        maxHealth: 50,
        _attack: 10,
        _defence: 0,
        _attackSpeed: 0.2,
        attackRange: 20,

        _attackWaitTimeFactor: 15,  // slightly slow than default

        init: function(x, y, settings) {
            this.animSheet = ig.game.assets.animSheet_treant;
            this.parent(x, y, settings);
        },

        initAnimations: function() {
            this.addAnim('idle', 0.4, [0, 1]);
            this.addAnim('walk', 0.2, [12, 13, 14, 13]);
            this.addAnim('hurt', 0.5, [3], true);
            this.addAnim('block', 1, [2], true);
            this.addAnim('attackGround', this._attackSpeed, [6, 7, 7], true);
            this.addAnim('attackAir', this._attackSpeed, [8, 9, 9], true);
            this.addAnim('dead', 0.18, [4, 5], true);
        },

        updateAI: function() {
            if (this.target) {
                if (!(this.ai instanceof ChaseAI))
                    this.ai = new ChaseAI(this);
            }

            this.parent();
        },

        check: function(other) {
            if (other.state != other.State.BLOCK &&
                (this.stateMachine.currentState == this.State.ATTACKGROUND ||
                this.stateMachine.currentState == this.State.ATTACKAIR) &&
                !this._justMadeDamage &&
                (this.currentAnim.frame == 1 || this.currentAnim.frame == 2)) {

                other.hurt(this.isOnLeftOf(other), this._attack);

                this._justMadeDamage = true;
                //this.target = other;
            }
        },

        knockBack: function(fromLeft) {
            var knockbackPower = this.health <= this._damageAccum ? 200 : 100;
            var knockupPower = this.health <= this._damageAccum ? 100 : 50;
            this.vel.x = fromLeft ? knockbackPower : -knockbackPower;
            this.vel.y = -knockupPower;
        },

        resizeToAttackBox: function() {
            this.size.x = 22;
            this.offset.x = this.flip ? 0 : 10;
            this.pos.x += this.flip ? -8 : 4;
        }
    });
});