/**
 * Created by Tianxu on 14-4-30.
 */
ig.module (
    'game.entities.pickable'
)
.requires (
    'game.entities.droppable'
)
.defines( function() {

    EntityPickable = EntityDroppable.extend({

        init: function(x, y, settings) {
            this.parent(x, y, settings);
        }
    });
});