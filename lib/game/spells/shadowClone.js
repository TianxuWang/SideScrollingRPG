/**
 * Created by Tianxu on 14-4-16.
 */
ig.module (
    'game.spells.shadowClone'
)
.requires (
    'game.spells.spell',
    'game.entities.spells.shadowClone'
)
.defines(function(){

    SpellShadowClone = Spell.extend({

        name: 'Spell:ShadowClone',
        castDelay: 0.5,
        cooldownDelay: 10,
        lastDelay: 10,

        init: function(entity, settings) {
            this.parent(entity, settings);

            this.type = this.TYPE.SPECIAL;
        },

        updateEntityGroup: function() {
            this.parent();

            if (this.activated) {
                var hasShadowClone = false;
                for (var i = 0; i < this.entityGroup.length; i++) {
                    if (this.entityGroup[i] != null && this.entityGroup[i].state != this.entityGroup[i].State.DEAD)
                        hasShadowClone = true;
                }
                if (!hasShadowClone)
                    this.deactivate();
            }
        },

        activate: function() {
            var owner = this.owner;

            if (this.cooledDown() && owner.mana >= this.costActivate) {

                owner.mana -= this.costActivate;                        // extract cost
                console.log(this.name + ' extract ' + this.costActivate + ' mana from ' + owner.name);
                this.cooldownTimer.set(this.cooldownDelay);             // reset cd

                // spawn shadow clone!
                this.entityGroup.push(
                    ig.game.spawnEntity('EntityShadowClone', owner.pos.x, owner.pos.y, {
                        owner: owner,
                        flip: owner.flip,
                        size: owner.size,
                        offset: owner.offset,
                        maxVel: owner.maxVel,
                        maxHealth: owner.maxHealth,
                        _attack: owner._attack,
                        defence: owner.defence,
                        _attackSpeed: owner._attackSpeed,
                        activeWeapon: owner.weapons[0],
                        age: this.lastDelay
                    })
                );
                ig.game.sortEntities();
            }
            else if (!this.cooledDown()) { this.announceNotCooledDown() }
            else if (owner.mana < this.costActivate) { this.announceNotEnoughMana() }

            this.parent();
        }

    });
});