/**
 * Created by Tianxu on 14-5-4.
 */
ig.module(
    'game.gui.menu'
)
.requires(
    'impact.game',
    'impact.font'
)
.defines( function() {
    Menu = ig.Class.extend({

        title: 'Menu',
        pos: {x: 0, y: 0},
        bgImg: null,
        display: false,
        width: 0,
        height: 0,

        init: function (title) {
            this.menuFont = ig.game.assets.font_default;
            this.title = title ? title : this.title;
            this.width = this.bgImg ? this.bgImg.width : ig.system.width;
            this.height = this.bgImg ? this.bgImg.height : ig.system.height;
        },

        update: function() {

        },

        draw: function () {
            if (this.bgImg) {
                this.bgImg.draw(this.pos.x, this.pos.y);
            }
        },

        toggleMenu: function(override) {
            this.display = override != null ? override : !this.display;
        },

        aroundCursor: function() {
            return ig.input.mouse.x > this.pos.x &&
                   ig.input.mouse.x < this.pos.x + this.width &&
                   ig.input.mouse.y > this.pos.y &&
                   ig.input.mouse.y < this.pos.y + this.height;
        }
    });
});