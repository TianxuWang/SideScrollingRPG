/**
 * Created by Tianxu on 14-5-10.
 */
ig.module(
    'game.entities.utils.bar'
)
.requires(
    'impact.entity',
    'impact.font'
)
.defines(function(){

    EntityBar = ig.Entity.extend({

        name: 'Bar',
        owner: null,
        target: null,
        maxValue: 100,
        value: 100,
        barImage: null,
        trackImage: null,
        pos: {x: 0, y: 0},
        _offsetToOwner: {x: 0, y: 3},

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.owner = settings.owner;
            this.target = settings.target;
            this.barImage = settings.barImage;
            this.trackImage = settings.trackImage;
        },

        update: function() {
            // update value
            this.value = this.owner[this.target];
            this.maxValue = this.owner[this.target+'Max'];

            // update position
            this.pos.x = this.owner.pos.x-ig.game.screen.x-(this.barImage.width-this.owner.size.x)/2+this._offsetToOwner.x;
            this.pos.y = this.owner.pos.y-ig.game.screen.y+this.owner.size.y+this._offsetToOwner.y;

            if (this.owner.state == this.owner.State.DEAD)
                this.kill();
        },

        draw: function() {
            // draw track img if any
            if (this.trackImage)
                this.trackImage.draw(this.pos.x, this.pos.y);

            // draw bar img
            if(this.barImage) {
                var fillWidth = this.barImage.width * (this.value/this.maxValue);
                if (fillWidth >= 1)
                    this.barImage.draw(this.pos.x, this.pos.y, 0, 0, fillWidth);
            }
        }
    });
});