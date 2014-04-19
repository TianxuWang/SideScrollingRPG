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
        maxValue: 100,
        value: 100,
        barImage: null,
        trackImage: null,
        _trackOffset: 0,
        pos: {x: 0, y: 0},

        init: function(barImage, trackImage) {
            this.barImage = barImage;
            this.trackImage = trackImage;
        },

        draw: function(x, y) {
            this.pos.x = x;
            this.pos.y = y;

            // draw track img if any
            if (this.trackImage)
                this.trackImage.draw(x, y);

            // draw bar img
            if(this.barImage) {
                var fillWidth = this.barImage.width * (this.value/this.maxValue);
                if (fillWidth >= 1)
                    this.barImage.draw(x + this._trackOffset, y + this._trackOffset, 0, 0, fillWidth)
            }
        }
    })
});