/**
 * Created by Tianxu on 14-4-7.
 */
ig.module(
    'plugins.fadeOutKill'
)
.requires(
    'impact.impact',
    'impact.entity'
)
.defines(function(){

    ig.Entity.inject({

        fadeKillTimer: null,

        update: function() {
            this.parent();

            if(this.fadeKillTimer) {
                this.currentAnim.alpha = this.fadeKillTimer.delta().map( -this.fadeKillTimer.target, 0, 1, 0 );

                if (this.fadeKillTimer.delta() > 0) {
                    this.kill();
                }
            }
        },

        fadeKill: function() {
            if (this._fadeTime)
                this.fadeKillTimer = new ig.Timer(this._fadeTime);
        }

    });
});