/**
 * Created by Tianxu on 14-4-11.
 */
/**
 * Created by Tianxu on 14-4-11.
 */
ig.module (
        'game.entities.spells.shadowClone'
    )
    .requires (
        'impact.sound',
        'game.entities.character',
        'eventChain'
    )
    .defines ( function() {

    EntityShadowClone = EntityCharacter.extend ({

        name: 'shadowClone',
        size: {x: 20, y: 21},
        offset: {x: 2, y: 1},
        maxVel: {x: 50, y: 150},

        zIndex: 44,
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,

        activeWeapon: null,

        activeSkill: null,

        health: 50,
        maxHealth: 50,
        _attack: 10,
        defence: 10,
        _attackSpeed: 0.1,

        animSheet: new ig.AnimationSheet('media/ninja.png', 24, 23),

        init: function(x, y, settings) {
            this.parent(x, y, settings);

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


        }

    });

})