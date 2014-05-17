/**
 * Created by Tianxu on 14-4-30.
 */
ig.module (
    'game.entities.interactables.pickable'
)
.requires (
    'game.entities.abstracts.interactable'
)
.defines( function() {

    EntityPickable = EntityInteractable.extend({

        interactType: EntityInteractable.TYPE.PRESS,

        size: {x: 14, y: 14},
        offset: {x: 1, y: 1},
        gravityFactor: 1,
        friction: {x: 80, y: 0},
        item: null,

        _nameTagOffset: {x: 0, y: -8},

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.item = settings.item;
            this.currentAnim = this.item.icon;
        },

        update: function() {
            this.friction.x = this.standing ? 600 : 80;
            this.parent();
        },

        draw: function() {
            this.parent();

            if (this.touches(ig.game.player)) {
                ig.game.assets['font_'+this.item.rarity].draw(
                    this.item.displayName,
                    this.pos.x+this._nameTagOffset.x-ig.game.screen.x,
                    this.pos.y+this._nameTagOffset.y-ig.game.screen.y
                );
            }
        },

        interact: function(other) {
            if(other.inventory.addItem(this.item))
                this.kill();
        },

        kill: function() {
            this.item = null;
            this.parent();
        }
    });
});