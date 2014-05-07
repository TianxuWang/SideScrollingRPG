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

        init: function (title) {
            this.menuFont = ig.game.assets.font_default;
            this.title = title ? title : this.title;
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
        }
    });
});