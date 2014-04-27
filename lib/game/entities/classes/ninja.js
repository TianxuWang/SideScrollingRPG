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
    'game.spells.shuriken',
    'game.system.comboManager',
    'game.system.eventChain'
)
.defines (function() {

    EntityNinja = EntityPlayer.extend({

        name: 'Ninja',
        size: {x: 14, y: 21},
        offset: {x: 5, y: 1},
        _originalSize: {x: 14, y: 22},
        _originalOffset: {x: 5, y: 1},
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
            this.addAnim('idle', 0.3, [3, 4, 5, 4]);
            this.addAnim('walk', 0.2, [0, 1, 2, 1]);
            this.addAnim('run', 0.1, [0, 1, 2, 1]);
            this.addAnim('hurt', 0.5, [18], true);
            this.addAnim('jumpGround', 0.14, [12, 13, 14, 15, 16, 17], true);
            this.addAnim('fall', 1, [17], true);
            this.addAnim('attackGround', this.attackSpeed, [6, 7, 8, 9, 10, 11], true);
            this.addAnim('attackAir', this.attackSpeed, [6, 7, 8, 9, 10, 11], true);
            this.addAnim('cast', 1, [17], true);

            this.parent();
        },

        initSpells: function() {
            this.spells.ShadowClone = new SpellShadowClone(this);
            this.spells.PoisonBlade = new SpellPoisonBlade(this);
            this.spells.Shuriken = new SpellShuriken(this);
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
                console.log('Casting Spell:Shuriken');
                if (self.spells.Shuriken.costActivate <= self.mana)
                    self.activeSpell = self.spells.Shuriken;
                else
                    console.log('nor enough mana for Shuriken');
            });

            this.comboManager.add(['crouch', 'right', 'attack'], 1, function(){
                console.log('Casting Spell:Shuriken');
                if (self.spells.Shuriken.costActivate <= self.mana)
                    self.activeSpell = self.spells.Shuriken;
                else
                    console.log('nor enough mana for Shuriken');
            });

            this.comboManager.add(['block', 'crouch', 'attack'], 1, function(){
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