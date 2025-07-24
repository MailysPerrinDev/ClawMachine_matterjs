class Claw{
    constructor(clawGap, mapLimit, topLimit = 80, botLimit = 47){
        this.mapLimit = mapLimit;
        this.clawGap = clawGap;
        this.topLimit = topLimit;
        this.botLimit = botLimit;
           
        //claws    
        this.joint = Bodies.circle(mapLimit+40, 0, 20, {isStatic: true});
        
        this.topRightClaw = Bodies.rectangle(mapLimit, topLimit-40, 10, 60, {isStatic: true});
        this.topLeftClaw = Bodies.rectangle(mapLimit+clawGap, topLimit-40, 10, 60, {isStatic: true});
        
        this.botRightClaw = Bodies.rectangle(mapLimit, topLimit, 10, 50, {isStatic: true});
        this.botLeftClaw = Bodies.rectangle(mapLimit+clawGap, topLimit, 10, 50, {isStatic: true});
        
        Body.setAngle(this.topRightClaw,-2.6); //in radians
        Body.setAngle(this.topLeftClaw, 2.6);
        
        Body.setAngle(this.botRightClaw, 2.4); //in radians
        Body.setAngle(this.botLeftClaw, -2.4);
        
        this.rightClaw = Body.create({
            parts: [this.topRightClaw, this.botRightClaw]
        });
        
        this.leftClaw = Body.create({
            parts: [this.topLeftClaw, this.botLeftClaw]
        });

        
        this.constraintRight = Constraint.create({
            bodyA: this.rightClaw,
            bodyB: this.joint,
            length: 100,
            stiffness: 0.5
        });
        
        this.constraintLeft = Constraint.create({
            bodyA: this.leftClaw,
            bodyB: this.joint,
            length: 100,
            stiffness: 0.7
        });
        
        this.gap = Constraint.create({
            bodyA: this.rightClaw,
            bodyB: this.leftClaw,
            length: this.clawGap/2,
            stiffness: 1
        });
        
        Composite.add(engine.world, [this.rightClaw, this.leftClaw, this.constraintRight, this.constraintLeft, this.gap]); //add to the world
    }
    
    close(speed = 1){
        return new Promise((resolve) => {
            let i = this.clawGap;
            const step = () => {
                if (i > this.clawGap/2){
                    i -= speed;
                    this.gap.length = i;
                    requestAnimationFrame(step);
                }
                else{
                    this.gap.length = this.clawGap/2;
                    resolve();//end of animation
                }
            };
            step();
        });   
    }
    
    open(speed = 1){
        return new Promise((resolve) => {
            let i = this.clawGap/2;
            const step = () => {
                if (i < this.clawGap){
                    i += speed;
                    this.gap.length = i;
                    requestAnimationFrame(step);
                }
                else{
                    resolve();//end of animation
                }
            };
            step();
        });
    }
    
    moveX(direction, speed = 6, limitLeft = null, limitRight = null){
        if (limitLeft === null) limitLeft = this.mapLimit;
        if (limitRight === null)  limitRight = w - limitLeft;

        if (this.joint.position.x <= limitLeft || this.joint.position.x >= limitRight){
            direction *= -2;
        }
        
        Body.translate(this.rightClaw, {x: speed * direction, y: 0});
        Body.translate(this.leftClaw, {x: speed * direction, y: 0});
        Body.translate(this.joint, {x: speed * direction, y: 0});
    }
    
    moveY(speed=1){
        return new Promise((resolve) => {
            const step = () => {
                if ((this.rightClaw.position.y < h-this.botLimit && speed > 0) ||
                    (this.rightClaw.position.y > this.topLimit && speed < 0) || 
                   (this.leftClaw.position.y < h-this.botLimit && speed > 0) ||
                    (this.leftClaw.position.y > this.topLimit && speed < 0)){
                    Body.translate(this.joint, {x: 0, y: speed});
                    requestAnimationFrame(step);
                }
                else{
                    resolve();//end of animation
                }
            };
            step();
        });
    }
    
    reset(speed=1){
        speed *= -1;
        return new Promise((resolve) => {
            let i = this.rightClaw.position.x;
           const step = () => {
               if (i > this.mapLimit){
                   i += speed;
                    Body.translate(this.joint, {x: speed, y: 0});
                    requestAnimationFrame(step);
               }
               else{
                   resolve();
               }
           };
            step();
        });
    }

}

