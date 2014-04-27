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
        castDelay: 0.3,
        cooldownDelay: 1,

        init: function(entity, settings) {
            this.parent(entity, settings);
            this.type = this.TYPE.DAMAGE;
            this.damage = this.owner._attack*2;
        },

        activate: function() {
            this.parent();

            ig.game.spawnEntity(
                'EntityShuriken',
                this.owner.pos.x,
                this.owner.pos.y,
                {owner: this.owner}
            );
        }
    });
});