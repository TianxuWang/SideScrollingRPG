/**
 * Created by Tianxu on 14-5-17.
 */
ig.module(
    'game.system.levelDirector'
)
.requires(
    'impact.sound',
    'game.levels.town',
    'game.levels.forest',
    'game.effects.screenFader'
    )
.defines( function() {

    LevelDirector = ig.Class.extend({

        openedChestCollection: [],
        respawnTimerCollection: [],

        _defaultPos: {x: 33, y: 123},
        _defaultPlayerClass: 'Ninja',

        init: function() {
            this.initBgMusics();
            this.initCamera();
        },

        initBgMusics: function() {
            ig.music.add(ig.game.assets.bgMusic_town, 'town');
            ig.music.add(ig.game.assets.bgMusic_forest, 'forest');
            ig.music.currentTrack = null;
            ig.music.loop = true;
            ig.music.volume = 0.5;
        },

        initCamera: function() {
            var camera = ig.game.camera;
            camera.offset.x = ig.system.width/2;
            camera.offset.y = ig.system.height/3;
            camera.trap.size.x = EntityPlayer.SIZE.x*2;
            camera.trap.size.y = EntityPlayer.SIZE.y*2.5;
            camera.lookAhead.x = 50;
            camera.damping = 2;
        },

        loadLevel: function(level, spawn) {
            if (!level || !spawn)
                return;

            if (ig.music.currentTrack)
                ig.music.crossFade(1, level);
            else
                ig.music.play(level);

            var levelName = level.replace(/^(Level)?(\w)(\w*)/, function( m, l, a, b ) {
                return a.toUpperCase() + b;
            });

            var self = this;
            self.fadeOut(4, function() {
                ig.game.loadLevel( ig.global['Level'+levelName] );

                // Clear enemy respawn timer
                if (self.respawnTimerCollection.length > 0) {
                    for (var i = 0; i < self.respawnTimerCollection.length; i++) {
                        clearTimeout(self.respawnTimerCollection[i]);
                    }
                    self.respawnTimerCollection.length = 0;
                }

                // Set player
                var spawnpoint = ig.game.getEntityByName(spawn);
                var player;

                if (ig.game.player) {
                    player = ig.game.player;
                    ig.game.entities.push(player);
                    player.updateEquipment();
                    player.stateMachine.currentState = 'idle';
                }
                else {
                    player = ig.game.spawnEntity('Entity'+self._defaultPlayerClass, 0, 0);
                }

                player.pos = spawnpoint ? spawnpoint.pos : self._defaultPos;
                ig.game.camera.set(ig.game.player);

                // Set chest states
                var chest;
                for (i = 0; i < self.openedChestCollection.length; i++) {
                    chest = ig.game.getEntityByName(self.openedChestCollection[i]);
                    if (chest) {
                        chest.setToOpened();
                    }
                }

                self.fadeIn(4);
            });
        },

        fadeIn: function(_speed, _callback) {
            ig.game.screenFader = new ig.ScreenFader({ fade: 'out', speed: _speed?_speed:2, callback: _callback });
        },

        fadeOut: function(_speed, _callback) {
            ig.game.screenFader = new ig.ScreenFader({ fade: 'in', speed: _speed?_speed:2, callback: _callback });
        }
    })
});