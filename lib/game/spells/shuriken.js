/**
 * Created by Tianxu on 14-4-26.
 */
ig.module(
    'game.spells.shuriken'
)
.requires(
    'game.spells.spell',
    'game.entities.spells.shuriken'
)
.defines( function() {

    SpellShuriken = Spell.extend({

        name: 'Spell:Shuriken',
        costActivate: 2,
        castDelay: 0.2,
        cooldownDelay: 1,

        init: function(entity, settings) {
            this.parent(entity, settings);
            this.type = this.TYPE.DAMAGE;
            this.posOff = {
                x: this.owner.flip ? -this.size.x : this.owner.size.x,
                y: 6
            };
            this.damage = this.owner._attack*2;
        },

        activate: function() {
            var owner = this.owner;

            if (this.cooledDown() && owner.mana >= this.costActivate) {
                owner._manaCostAccum += this.costActivate;
                this.cooldownTimer.set(this.cooldownDelay);
                ig.game.spawnEntity(
                    'EntityShuriken',
                    this.owner.pos.x + this.posOff.x,
                    this.owner.pos.y + this.posOff.y,
                    {damage: this.damage, flip: this.owner.flip}
                );
            }
            else if (!this.cooledDown()) { this.announceNotCooledDown() }
            else if (owner.mana < this.costActivate) { this.announceNotEnoughMana() }

            this.parent();
        }
    });
});