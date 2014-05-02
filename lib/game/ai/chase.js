/**
 * Created by Tianxu on 14-4-15.
 */
ig.module(
    'game.ai.chase'
)
.requires(
    'impact.entity'
)
.defines( function() {

    ChaseAI = ig.Class.extend({

        _agent: null,
        _attackWaitTime: 0,
        _attackWaitTimeFactor: 15,

        init: function(agent) {
            this._agent = agent;
            this._attackWaitTimeFactor = agent._attackWaitTimeFactor;
        },

        update: function() {
            var agent = this._agent;
            var target = agent.target;

            if (target == null || target.state == target.State.DEAD)
                return;

//            if((target.state == target.State.ATTACKGROUND || target.state == target.State.ATTACKAIR) &&
//                Math.random() < 0.025) {     // 2.5% block rate
//                agent.state = agent.State.BLOCK;
//                return;
//            }

            if (agent.state == agent.State.DEAD ||
                agent.state == agent.State.BORN ||
                agent.state == agent.State.HURT ||
                agent.state == agent.State.INVINCIBLE)
                return;

            agent.state = agent.State.IDLE;
            agent.flip = !agent.isOnLeftOf(target);

            this._attackWaitTime -= ig.system.tick;
            var distToTarget = agent.distanceTo(target);
            var range = agent.activeWeapon ? agent.activeWeapon.range : agent.attackRange;

            if (distToTarget <= range) {

                if (this._attackWaitTime <= 0) {
                    this._attackWaitTime = agent.attackSpeed*this._attackWaitTimeFactor;
                    //if(Math.random() < 0.05)      // 5% critical rate?
                        //agent.state = agent.State.ATTACKAIR;
                    //else
                    if (agent.state == agent.State.jumpGround)
                        agent.state = agent.State.ATTACKAIR;
                    else
                        agent.state = agent.State.ATTACKGROUND;
                }
//                if(!this._agent.attacking&&this._agent.moving)
//                    this._agent.idle();
                return;
            }

            if (agent.state != agent.State.ATTACKGROUND && agent.state != agent.State.ATTACKAIR){
                agent.state = agent.State.WALKING;
            }
        }
    });
});