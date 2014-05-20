/**
 * Created by Tianxu on 14-5-19.
 */
ig.module(
    'game.gui.dialogue'
)
.requires(
    'game.gui.menu',
    'game.system.wordWrapper'
)
.defines( function() {

    Dialogue = Menu.extend({

        title: '',
        bgImg: new ig.Image("media/gui/dialogue_bg.png"),
        pos: null,
        wordWrapper: null,
        pages: [],
        _inDisplay: false,

        init: function(title) {
            this.parent(title);
            this.pos = {
                x:Math.floor((ig.system.width-this.bgImg.width)/2),
                y:Math.floor(ig.system.height/2-this.bgImg.height)
            }
        },

        update: function() {
            if (this.pages.length == 0) {
                this.display = false;
            }
//            if (ig.input.released('interact')) {
//                this._inDisplay = true;
//            }
            if (ig.input.pressed('interact')) {
                this.pages.shift();
            }
        },

        draw: function() {
            if (this.pages.length > 0) {
                this.parent();

                ig.game.assets.font_darkMagenta.draw(this.title, this.pos.x+8, this.pos.y+8, ig.Font.ALIGN.LEFT);
                this.wordWrapper = new WordWrap(this.pages[0], this.width-16);
                ig.game.assets.font_darkMagenta.draw(this.wordWrapper.wrap(), this.pos.x+8, this.pos.y+16, ig.Font.ALIGN.LEFT);
            }
        }
    });
});