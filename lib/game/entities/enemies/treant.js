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
        size: {x: 32, y: 32},
        maxVel: {x: 50, y: 150},
        _respawnTime: 3,
        hurtDelay: 0.5,

        level: 1,
        health: 50,
        maxHealth: 50,
        _attack: 10,
        _defence: 0,
        _attackSpeed: 0.5,

        init: function(x, y, settings) {
            this.animSheet = ig.game.assets.animSheet_treant;
            this.parent(x, y, settings);
        },

        initAnimations: function() {
            this.addAnim('idleRight', 0.4, [0, 1]);
            this.addAnim('idleLeft', 0.4, [2, 3]);
            this.addAnim('walkRight', 0.2, [12, 13, 14, 13]);
            this.addAnim('walkLeft', 0.2, [15, 16, 17, 16]);
            this.addAnim('hurtRight', 0.5, [8], true);
            this.addAnim('hurtLeft', 0.5, [9], true);
            this.addAnim('blockRight', 1, [6], true);
            this.addAnim('blockLeft', 1, [7], true);
            this.addAnim('attackGroundRight', this._attackSpeed, [18, 19], true);
            this.addAnim('attackGroundLeft', this._attackSpeed, [20, 21], true);
            this.addAnim('attackAirRight', this._attackSpeed, [24, 25], true);
            this.addAnim('attackAirLeft', this._attackSpeed, [26, 27], true);
            this.addAnim('dead', 0.18, [30, 31], true);
        },

        knockBack: function(fromLeft) {
            var knockbackPower = this.health <= this._damageAccum ? 200 : 100;
            var knockupPower = this.health <= this._damageAccum ? 100 : 50;
            this.vel.x = fromLeft ? knockbackPower : -knockbackPower;
            this.vel.y = -knockupPower;
        }
    });
});