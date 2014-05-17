/**
 * Created by Tianxu on 14-5-17.
 */
ig.module(
    'plugins.musicCrossFader'
)
.requires(
    'impact.impact',
    'impact.sound'
)
.defines( function(){

    ig.Music.inject({

        _loop: true,

        crossFade: function( time, name ) {
            if( !this.currentTrack ) { return; }
            clearInterval( this._fadeInterval );
            this.fadeTimer = new ig.Timer( time );
            this.duration = time;
            this.nextTrack = name;
            this._fadeInterval = setInterval( this._crossfadeStep.bind(this), 50 );
        },

        _crossfadeStep: function() {
            var v = this.fadeTimer.delta()
                .map(-this.fadeTimer.target, 0, 1, 0)
                .limit( 0, 1 )
                * this._volume;
            if( v <= 0.01 ) {

                this.play(this.nextTrack);
                this.currentTrack.volume = this._volume;
                clearInterval( this._fadeInterval );
                //this.fadeIn(this.duration);   we can include this line if we want music fading in.
            }
            else {
                this.currentTrack.volume = v;
            }
        },

        fadeIn: function ( time ) {
            if( !this.currentTrack ) { return; }
            this.currentTrack.volume = 0;
            clearInterval( this._fadeInterval );
            this.fadeTimer = new ig.Timer( time );
            this._fadeInterval = setInterval( this._fadeInStep.bind(this), 50 );
        },

        _fadeInStep: function() {
            var v = this.fadeTimer.delta()
                .map(this.fadeTimer.target, 0, 1, 0)
                .limit( 0, 1 )
                * this._volume;

            if( v == 1 ) {
                this.currentTrack.volume = this._volume;
                clearInterval( this._fadeInterval );
            }
            else {
                this.currentTrack.volume = v;
            }
        }
    });
});