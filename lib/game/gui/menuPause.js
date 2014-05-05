/**
 * Created by Tianxu on 14-5-4.
 */
ig.module(
    'game.gui.menuPause'
)
.requires(
    'game.gui.menu'
)
.defines( function() {

    MenuPause = Menu.extend({

        title: 'Pause',

        init: function(title) {
            this.parent(title);
        },

        draw: function() {
            this.parent();

            ig.system.context.fillStyle = 'rgba(0,0,0,0.6)';
            ig.system.context.fillRect(0, 0, ig.system.width * ig.system.scale, ig.system.height * ig.system.scale);
            var x = ig.system.width * .5;
            var y = ig.system.height * .5;
            this.menuFont.draw(this.title, x, y, ig.Font.ALIGN.CENTER);
        }
    });
});