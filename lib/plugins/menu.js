/**
 * Created by Tianxu on 14-5-3.
 */

ig.module(
    'plugins.menu'
)
.requires(
    'impact.game',
    'impact.font'
)
.defines(function () {

    ig.Game.inject({

        activeMenu:null,

        draw:function ()
        {
            this.parent();
            if (this.activeMenu)
                this.activeMenu.draw();
        },

        showMenu:function (view)
        {
            if (view.draw)
                this.activeMenu = view;
        },

        hideMenu:function ()
        {
            this.activeMenu = null;
            //TODO need to make sure we don't have to destroy any menu
        },

        loadLevel:function (data)
        {
            //TODO this really should be tied into game over but it's safer to remove any menus when a level loads
            this.hideMenu();
            this.parent(data);
        }
    });

    Menu = ig.Class.extend({

        title:null,

        init:function (title)
        {
            this.menuFont = ig.game.assets.font_default;
            this.title = title ? title : " Menu Title";
        },

        draw:function ()
        {
            this.drawModal();
            var x = ig.system.width * .5;
            var y = ig.system.height * .5;
            this.menuFont.draw(this.title, x, y, ig.Font.ALIGN.CENTER);
        },

        drawModal: function(color)
        {
            //TODO need to make this cleaner
            if(!color) color = 'rgba(0,0,0,0.6)';
            ig.system.context.fillStyle = color;
            ig.system.context.fillRect(0, 0, ig.system.width * ig.system.scale, ig.system.height * ig.system.scale);
        }
    });
});