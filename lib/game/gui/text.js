/**
 * Created by Tianxu on 14-8-11.
 */
ig.module(
    'game.gui.text'
)
.requires(
    'impact.game',
    'impact.font'
)
.defines( function() {

    Text = ig.Class.extend({

        pos: {x: 0, y: 0},
        content: null,
        alignMethod: ig.Font.ALIGN.LEFT,
        font: null,
        lastDelay: 0,
        lastTimer: null,
        display: false,

        init: function(cont, posX, posY, align) {
            this.font = ig.game.assets.font_default;
            this.content = cont;
            this.pos = {x: posX, y: posY};
            this.alignMethod = align;
            this.lastTimer = new ig.Timer();
        },

        update: function() {
            if (this.display &&
                this.lastDelay > 0 &&
                this.lastTimer.delta() >= this.lastDelay) {
                this.hide();
            }
        },

        draw: function() {
            if (this.display) {
                this.font.draw(this.content, this.pos.x, this.pos.y, this.alignMethod);
            }
        },

        show: function(life) {
            this.display = true;
            this.lastDelay = life ? life : this.lastDelay;
            if (this.lastDelay > 0){
                this.lastTimer.reset();
            }
        },

        hide: function() {
            this.display = false;
        }

    });
});
