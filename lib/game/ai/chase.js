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

    ChaseState = ig.Class.extend({

        _agent: null,
        _attackWaitTime: 0,

        init: function(agent) {
            this._agent = agent;
        },

        update: function() {
            var agent = this._agent;
            var target = agent.target;

            agent.state = agent.State.IDLE;
            if(target == null || target.state == target.State.DEAD)
                return;

//            if((target.state == target.State.ATTACKGROUND || target.state == target.State.ATTACKAIR) &&
//                Math.random() < 0.025) {     // 2.5% block rate
//                agent.state = agent.State.BLOCK;
//                return;
//            }

            if(agent.state == agent.State.HURT)
                return;

            agent.flip = !agent.isOnLeftOf(target);

            this._attackWaitTime -= ig.system.tick;
            var distToTarget = agent.distanceTo(target);
            var range = agent.activeWeapon.range;

            if(distToTarget <= range) {

                if(this._attackWaitTime <= 0) {
                    this._attackWaitTime = agent.activeWeapon.attackSpeed*15;
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

            if(agent.state != agent.State.ATTACKGROUND && agent.state != agent.State.ATTACKAIR){
//                if (agent.isOnLeftOf(target))
//                    agent.walkTo('right');
//                else
//                    agent.walkTo('left');
                agent.state = agent.State.WALKING;
            }
        }
    });
});