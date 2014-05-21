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
        bgImg: new ig.Image("media/gui/dialogue_bg_black.png"),
        pos: null,
        wordWrapper: null,
        speaker: null,
        pages: [],
        _lineWidth: 40,

        init: function(title) {
            this.parent(title);
            this.pos = {
                x:Math.floor((ig.system.width-this.bgImg.width)/2),
                y:Math.floor(ig.system.height/2-this.bgImg.height+10)
            }
        },

        update: function() {
            if (this.pages.length == 0) {
                this.display = false;
            }
            if (ig.input.pressed('interact')) {
                this.pages.shift();
            }
        },

        draw: function() {
            if (this.pages.length > 0) {
                this.parent();

                if (this.pages[0].indexOf('*') == 0) {
                    this.speaker = ig.game.player.name;
                    //this.pages[0] = this.pages[0].substring(1);
                }
                else {
                    this.speaker = this.title;
                }
                ig.game.assets.font_lightGrey.draw(this.speaker+':', this.pos.x+8, this.pos.y+8, ig.Font.ALIGN.LEFT);
                if (this.pages[0].length > 120) {
                    var longSentence = this.pages[0];
                    this.pages[0] = longSentence.substring(0, 119);
                    this.pages.splice(1, 0, this.speaker == ig.game.player.name?'*'+longSentence.substring(119):longSentence.substring(119));
                }
                this.wordWrapper = new WordWrap(this.speaker == ig.game.player.name?this.pages[0].substring(1):this.pages[0], this._lineWidth);
                ig.game.assets.font_default.draw(this.wordWrapper.wrap(), this.pos.x+11, this.pos.y+20, ig.Font.ALIGN.LEFT);
            }
        }
    });
});