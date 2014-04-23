/**
 * Created by Tianxu on 14-4-18.
 */
ig.module (
    'game.entities.classes.ninja'
)
.requires (
    'impact.sound',
    'game.entities.player',
    'game.entities.weapons.katana',
    'game.spells.shadowClone',
    'game.spells.poisonBlade',
    'game.system.comboManager',
    'game.system.eventChain'
)
.defines (function() {

    EntityNinja = EntityPlayer.extend({

        name: 'Ninja',
        weapons: [
            'EntityKatana',
            'EntityNinjato'
        ],
        spells: {
            Shuriken: null,
            PoisonBlade: null,
            ShadowClone: null
        },

        level: 1,
        curExp: 90,
        expToNextLvl: 100,
        health: 50,
        maxHealth: 80,
        mana: 30,
        maxMana: 30,
        _attack: 2,
        _defence: 5,
        _attackSpeed: 0.1,
        _critHitChance: 0.25,
        _critHitDamage: 1.8,

        init: function(x, y, settings) {
            this.animSheet = ig.game.assets.animSheet_ninja;
            this.parent(x, y, settings);
        },

        initAnimations: function() {
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

            this.parent();
        },

        initSpells: function() {
            this.spells.ShadowClone = new SpellShadowClone(this);
            this.spells.PoisonBlade = new SpellPoisonBlade(this);
        },

        initCombos: function() {
            this.parent();
            var self = this;

            this.comboManager.add(['crouch', 'crouch', 'attack'], 1, function(){
                console.log('Casting Spell:ShadowClone!');
                if (self.spells.ShadowClone.costActivate <= self.mana)
                    self.activeSpell = self.spells.ShadowClone;
                else
                    console.log('not enough mana for Shadow Clone');
            });

            this.comboManager.add(['crouch', 'left', 'attack'], 1, function(){
                console.log('Casting Spell:PoisonBlade');
                if (self.spells.PoisonBlade.costActivate <= self.mana)
                    self.activeSpell = self.spells.PoisonBlade;
                else
                    console.log('not enough mana for Poison Blade');
            })
        },

        addStates: function() {
            this.parent();

            var self = this;
            var weapon = self.activeWeapon;

            this.stateMachine.state(this.State.CASTING, {
                enter: function() {
                    self.state = self.State.CASTING;
                    weapon.hide();
                    self.castTimer.set(self.activeSpell.castDelay);
                },
                update: function() {
                    self.casting();
                    if (self.castTimer.delta() >= 0 && !self.activeSpell._justActivated)
                        self.activateSpell();
                },
                exit: function() {
                    self.activeSpell.endCasting();
                    self.activeSpell = null;
                }
            });
        },

        addTransitions: function() {
            this.parent();
            var self = this;

            this.stateMachine.transition('CastingToIdle', 'casting', 'idle', function(){
                return self.activeSpell instanceof SpellShadowClone
                       ? (self.activeSpell._activeShadowCloneFront != null
                       && self.activeSpell._activeShadowCloneFront.state == self.State.IDLE)
                       : self.castTimer.delta() >= 0;
            });

            this.stateMachine.transition('CastingToHurt', 'casting', 'hurt', function(){
                return self.state == self.State.HURT;
            });
        }
    });
});