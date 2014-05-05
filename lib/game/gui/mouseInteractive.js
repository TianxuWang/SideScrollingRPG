/**
 * Created by Tianxu on 14-5-4.
 */
ig.module(
    'game.gui.mouseInteractive'
)
.requires(
    'impact.impact'
)
.defines( function() {

    MouseInteractive = ig.Class.extend({

        width: 0,
        height: 0,
        mouse: null,
        _hoverTimeout: null,

        init: function() {
            this.mouse = {
                x: 0,
                y: 0,
                hover: false,
                leftDown: false,
                rightDown: false
            };
        },

        update: function(x, y) {
            var w = x + this.width;
            var h = y + this.height;
            this.mouse.x = ig.input.mouse.x - x;    // Relative position of mouse
            this.mouse.y = ig.input.mouse.y - y;

            if (ig.input.mouse.x >= x &&            // If cursor is within interactive
                ig.input.mouse.y >= y &&
                ig.input.mouse.x < w &&
                ig.input.mouse.y < h) {
                this.mouse.leftDown = ig.input.state("mouseLeft");
                this.mouse.rightDown = ig.input.state("mouseRight");
                if(!this.mouse.hover) {              // Set hover delay
                    if(this._hoverTimeout != null)
                        clearTimeout(this._hoverTimeout);
                    this.mouse.hover=true;
                    var self = this;
                    this._hoverTimeout = setTimeout(function() {
                        self.onMouseHover();
                    }, 1);
                }
            }
            else if (this.mouse.hover) {              // If cursor not within interactive, clean hover
                if(this._overTimeout!=null)
                    clearTimeout(this._hoverTimeout);
                this.mouse.hover=false;
                this.onMouseOut();
            }

            if (this.mouse.hover) {
                if(ig.input.pressed("mouseLeft"))
                    this.onLeftMousePress();
                if(ig.input.pressed("mouseRight"))
                    this.onRightMousePress();
            }

            if (this.mouse.leftDown && ig.input.released("mouseLeft")) {
                this.mouse.hover ? this.onLeftMouseRelease() : this.onLeftMouseReleaseOutside();
                this.mouse.leftDown = false;
            }
            if(this.mouse.rightDown&&ig.input.released("mouseRight")) {
                this.mouse.hover ? this.onRightMouseRelease() : this.onRightMouseReleaseOutside();
                this.mouse.rightDown = false;
            }
        },

        onMouseHover:function() {},

        onMouseOut:function() {},

        onLeftMousePress:function() {},

        onLeftMouseRelease:function() {},

        onLeftMouseReleaseOutside:function() {},

        onRightMousePress:function() {},

        onRightMouseRelease:function() {},

        onRightMouseReleaseOutside:function() {}
    });
});