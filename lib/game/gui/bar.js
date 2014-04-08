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

        init: function() {
            this.trackImage = new ig.Image("media/gui/emptybar.png");
        },

        draw: function(x, y) {
            this.trackImage.draw(x, y);
            if(this.barImage != null) {
                //var offset = 1;
                var fillWidth = this.barImage.width * (this.value/this.maxValue);
                if (fillWidth >= 1)
                    this.barImage.draw(x + this._trackOffset, y + this._trackOffset, 0, 0, fillWidth)
            }
        }
    })
});