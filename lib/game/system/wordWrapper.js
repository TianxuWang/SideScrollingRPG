/**
 * Created by Tianxu on 14-5-19.
 */
ig.module(
    'game.system.wordWrapper'
)
    .requires(
        'impact.impact'
    )
.defines ( function() {

    WordWrap = ig.Class.extend({

        text: '',
        maxWidth: 100,
        cut: false,

        init: function (text, maxWidth, cut) {
            this.text = text;
            this.maxWidth = maxWidth;
            this.cut = cut;
        },

        wrap: function() {
            var regex = '.{1,' +this.maxWidth+ '}(\\s|$)' + (this.cut ? '|.{' +this.maxWidth+ '}|.+$' : '|\\S+?(\\s|$)');
            return this.text.match( RegExp(regex, 'g') ).join( '\n' );
        }

    });
});