/**
 * Created by Tianxu on 14-3-30.
 */
ig.module(
    'game.gui.bar'
)
.requires(
    'impact.impact'
)
.defines( function() {
    Bar = ig.Class.extend ({

        owner: null,
        target: null,
        maxValue: 100,
        value: 100,
        barImage: null,
        trackImage: null,
        pos: {x: 0, y: 0},

        init: function(owner, target, barImage, trackImage) {
            this.owner = owner;
            this.target = target;
            this.barImage = barImage;
            this.trackImage = trackImage;
        },

        update: function() {
            // update value
            this.value = this.owner[this.target];
            this.maxValue = this.owner[this.target+'Max'];
        },

        draw: function() {
            // draw track img if any
            if (this.trackImage)
                this.trackImage.draw(this.pos.x, this.pos.y);

            // draw bar img
            if(this.barImage) {
                var fillWidth = this.barImage.width * (this.value/this.maxValue);
                if (fillWidth >= 1)
                    this.barImage.draw(this.pos.x, this.pos.y, 0, 0, fillWidth);
            }
        }
    })
});