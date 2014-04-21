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
        castDelay: 0.5,
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
            var owner = this.owner;

            if (this.cooledDown() && owner.mana >= this.costActivate) {
                owner._manaCostAccum += this.costActivate;
                this.lastTimer.reset();
                this.cooldownTimer.set(this.cooldownDelay);
                // poison owner's weapon!
                owner.activeWeapon.setSpecialEffect('poison', this.poisonChance, this.poisonDamage, this.poisonLastTime);
                owner.activeWeapon.setAnimPoison();
            }
            else if (!this.cooledDown()) { this.announceNotCooledDown() }
            else if (owner.mana < this.costActivate) { this.announceNotEnoughMana() }

            this.parent();
        },

        deactivate: function() {
            console.log('deactivating..');
            this.owner.activeWeapon.setSpecialEffect('poison', -this.poisonChance, -this.poisonDamage, -this.poisonLastTime);
            this.owner.activeWeapon.setAnimNormal();

            this.parent();
        }
    });
});