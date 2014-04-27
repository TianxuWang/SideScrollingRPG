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
        costActivate: 10,
        castDelay: 0.5,
        cooldownDelay: 1,
        lastDelay: 20,
        _activeShadowCloneFront: null,
        _activeShadowCloneBack: null,

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
                owner._manaCostAccum += this.costActivate;              // extract cost
                this.cooldownTimer.set(this.cooldownDelay);             // reset cd
                this.spawnShadowClone();                                // spawn shadow clone!
            }
            else if (!this.cooledDown()) { this.announceNotCooledDown() }
            else if (owner.mana < this.costActivate) { this.announceNotEnoughMana() }

            this.parent();
        },

        deactivate: function() {
            this.parent();
        },

        endCasting: function() {
            this._activeShadowCloneFront = null;
            this._activeShadowCloneBack = null;

            this.parent();
        },

        spawnShadowClone: function() {
            var owner = this.owner;

            this._activeShadowCloneBack = ig.game.spawnEntity('EntityShadowClone', owner.pos.x, owner.pos.y, {
                owner: owner,
                age: this.lastDelay,
                zIndex: owner.zIndex - 3
            });
            this._activeShadowCloneFront = ig.game.spawnEntity('EntityShadowClone', owner.pos.x, owner.pos.y, {
                owner: owner,
                age: this.lastDelay,
                zIndex: owner.zIndex + 3
            });

            this.entityGroup.push(this._activeShadowCloneBack);
            this.entityGroup.push(this._activeShadowCloneFront);

            ig.game.sortEntitiesDeferred();
        },

        killShadowClone: function() {
            this.entityGroup.shift();
        }
    });
});