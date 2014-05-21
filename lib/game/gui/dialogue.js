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
        arrowImg: new ig.Image("media/gui/dialogue_nextarrow.png"),
        pos: null,
        wordWrapper: null,
        speaker: null,
        pages: [],

        _lineWidth: 40,
        _arrowStartY: null,
        _arrowEndY: null,
        _curArrowPos: null,
        _arrowVel: 0,

        init: function(title) {
            this.parent(title);
            this.pos = {
                x:Math.floor((ig.system.width-this.bgImg.width)/2),
                y:Math.floor(ig.system.height/2-this.bgImg.height+10)
            };
            this._arrowStartY = this.pos.y+this.height-7;
            this._arrowEndY = this.pos.y+this.height-5;
            this._curArrowPos = {x: this.pos.x+this.width-10, y: this._arrowStartY};
        },

        update: function() {
            if (this.pages.length == 0) {
                this.display = false;
            }
            if (ig.input.pressed('interact')) {
                this.pages.shift();
            }
            this.updateNextArrow();
        },

        updateNextArrow: function() {
            if (this._curArrowPos.y <= this._arrowStartY) {
                this._arrowVel = 7;
            }
            else if (this._curArrowPos.y >= this._arrowEndY) {
                this._arrowVel = -7;
            }
            this._curArrowPos.y += this._arrowVel*ig.system.tick;
        },

        draw: function() {
            if (this.pages.length > 0) {
                this.parent();

                this.speaker = this.pages[0].indexOf('*')==0?ig.game.player.name:this.title;
                ig.game.assets.font_lightGrey.draw(this.speaker+':', this.pos.x+8, this.pos.y+8, ig.Font.ALIGN.LEFT);
                if (this.pages[0].length > 120) {
                    var longSentence = this.pages[0];
                    this.pages[0] = longSentence.substring(0, 119);
                    this.pages.splice(1, 0, this.speaker == ig.game.player.name?'*'+longSentence.substring(119):longSentence.substring(119));
                }
                this.wordWrapper = new WordWrap(this.speaker == ig.game.player.name?this.pages[0].substring(1):this.pages[0], this._lineWidth);
                ig.game.assets.font_default.draw(this.wordWrapper.wrap(), this.pos.x+11, this.pos.y+20, ig.Font.ALIGN.LEFT);

                // draw small arrow
                this.arrowImg.draw(this._curArrowPos.x, this._curArrowPos.y);
            }
        }
    });
});