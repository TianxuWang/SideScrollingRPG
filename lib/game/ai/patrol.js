/**
 * Created by Tianxu on 14-4-16.
 */
ig.module(
    'game.ai.patrol'
)
.requires(
    'impact.entity',
    'game.ai.chase'
)
.defines( function() {

    PatrolState = ig.Class.extend({

        _agent: null,
        _flip: false,
        _thinkTime: 0,
        _idleTime: 0,

        init: function(agent) {
            this._agent = agent;
            this._flip = Math.random() < 0.5;
        },

        update:function() {
            var agent = this._agent;

            if(agent.state == agent.State.HURT)
                return;

            this._thinkTime -= ig.system.tick;

            if(this._thinkTime <= 0) {
                if(Math.random() < 0.25) {
                    this._idleTime = 2 + Math.random()*15;
                }
                else {
                    this._flip = Math.random() < 0.5;
                }
                this._thinkTime = 5 + Math.random()*10;
            }

            if(this._idleTime >= 0) {
                this._idleTime -= ig.system.tick;
                if(agent.state == agent.State.WALKING)
                    agent.state = agent.State.IDLE;
            }
            else {
                agent.flip = this._flip;
                agent.state = agent.State.WALKING;
            }

            if(agent.target != null) {
                agent.ai = new ChaseState(agent);
            }
        },

        handleCollision:function(res) {
            if(res.collision.x) {
                this._agent.toggleFlip();
                this._thinkTime = 5 + Math.random()*10;
                this._idleTime = 0;
                this._agent.state = this._agent.State.WALKING;
            }
        }
    });
});
