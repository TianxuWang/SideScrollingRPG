/**
 * Created by Tianxu on 14-4-20.
 */
ig.module(
    'game.spells.poisonBlade'
)
.requires(
    'game.spells.spell'
)
.defines( function() {

    SpellPoisonBlade = Spell.extend({

        name: 'Spell:PoisonBlade',
        //type: this.TYPE.BUFF,
        costActivate: 10,
        castDelay: 0.7,
        cooldownDelay: 15,
        lastDelay: 15,

        poisonChance: 0.5,
        poisonDamage: 20,
        poisonLastTime: 10,

        init: function(entity, settings) {
            this.parent(entity, settings);

            this.type = this.TYPE.BUFF;
        },

        initProperties: function() {
            this.parent();
            this.lastTimer = new ig.Timer();
        },

        activate: function() {
            this.parent();

            this.lastTimer.reset();
            this.owner.activeWeapon.setSpecialEffect('poison', this.poisonChance, this.poisonDamage, this.poisonLastTime);
            this.owner.activeWeapon.setAnimPoison();
        },

        deactivate: function() {
            this.owner.activeWeapon.setSpecialEffect('poison', -this.poisonChance, -this.poisonDamage, -this.poisonLastTime);
            this.owner.activeWeapon.setAnimNormal();

            this.parent();
        }
    });
});