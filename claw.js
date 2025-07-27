class Claw{
    constructor(clawGap, mapLimit, topLimit = 80, botLimit = 50){
        this.mapLimit = mapLimit;
        this.clawGap = clawGap;
        this.topLimit = topLimit;
        this.botLimit = botLimit;
           
        //arm   
        this.joint = Bodies.circle(mapLimit+40, 0, 20, {isStatic: true});
        
        //claws
        this.topRightClaw = Bodies.rectangle(mapLimit, topLimit-40, 10, 60, {isStatic: true});
        this.topLeftClaw = Bodies.rectangle(mapLimit+clawGap, topLimit-40, 10, 60, {isStatic: true});
        
        Body.setAngle(this.topRightClaw, -2.6); //in radians
        Body.setAngle(this.topLeftClaw, 2.6);
        
        this.botRightClaw = Bodies.rectangle(mapLimit, topLimit, 10, 50, {isStatic: true});
        this.botLeftClaw = Bodies.rectangle(mapLimit+clawGap, topLimit, 10, 50, {isStatic: true});
        
        Body.setAngle(this.botRightClaw, 2.4); //in radians
        Body.setAngle(this.botLeftClaw, -2.4);
        
/*        //roof
        let roofWidth = (this.topLeftClaw.bounds.min.x - this.topRightClaw.bounds.min.x) / 2;
        console.log(roofWidth);
        this.roof = Bodies.rectangle(100, this.topRightClaw.bounds.min.y, 10, roofWidth, {isStatic: true});
        Body.setAngle(this.roof, 1.570796);
*/
        
        this.rightClaw = Body.create({
            parts: [this.topRightClaw, this.botRightClaw]
        });
        
        this.leftClaw = Body.create({
            parts: [this.topLeftClaw, this.botLeftClaw]
        });
        
        this.constraintRight = Constraint.create({
            bodyA: this.rightClaw,
            //pointA: {x: 0, y: -this.rightClaw.bounds.max.y / 2},
            bodyB: this.joint,
            pointB: {x: 0, y: this.joint.bounds.min.y},
            length: 100,
            stiffness: 0.2,
        });
        
        this.constraintLeft = Constraint.create({
            bodyA: this.leftClaw,
            //pointA: {x: 0, y: -this.leftClaw.bounds.max.y / 2},
            bodyB: this.joint,
            pointB: {x: 0, y: this.joint.bounds.min.y},
            length: 100,
            stiffness: 0.2,
        });
        
        this.gap = Constraint.create({
            bodyA: this.rightClaw,
            bodyB: this.leftClaw,
            length: this.clawGap/2+1,
            stiffness: 1,
        });
        
        Composite.add(engine.world, [this.rightClaw, this.leftClaw, 
                                    this.constraintRight, this.constraintLeft, 
                                    this.gap]); //add to the world
    }
    
    async close(speed = 0.03) {
        return new Promise((resolve) => {
            const targetAngle = 0; //close = 0rad
            const step = () => {
                let leftAngle = this.leftClaw.angle;
                let rightAngle = this.rightClaw.angle;
                
                if (rightAngle > targetAngle + speed) {
                    Body.setAngle(this.rightClaw, rightAngle - speed);
                    Body.setAngle(this.leftClaw, - (rightAngle - speed));
                    requestAnimationFrame(step);
                } 
                else {
                    this.gap.length = this.clawGap / 2;
                    resolve(); //end of animation
                }
            };
            step();
        });
    }

    async open(speed = 0.03) {
        return new Promise((resolve) => {
            const targetAngle = Math.PI / 6; //open = 30 degrees 
            const step = () => {
                let rightAngle = this.rightClaw.angle;
                let leftAngle = this.leftClaw.angle;

                if (rightAngle < targetAngle - speed) {
                    Body.setAngle(this.rightClaw, rightAngle + speed);
                    Body.setAngle(this.leftClaw, - (rightAngle + speed));
                    requestAnimationFrame(step);
                } 
                else {
                    resolve(); //end of animation
                }
            };
            step();
        });
    }
    
    async moveX(direction, speed = 6, limitLeft = null, limitRight = null){
        let nextPosition = this.joint.position.x + speed * direction;
        
        if (limitLeft === null) limitLeft = this.mapLimit;
        if (limitRight === null)  limitRight = w - this.mapLimit;
        
        if ( nextPosition < limitLeft ||
            nextPosition > limitRight){
            return;
        }
        
        Body.translate(this.rightClaw, {x: speed * direction, y: 0});
        Body.translate(this.leftClaw, {x: speed * direction, y: 0});
        Body.translate(this.joint, {x: speed * direction, y: 0});
    }
    
    async moveY(speed = 3){
        return new Promise((resolve) => {
            const step = () => { 
                if  ((this.constraintLeft.length < h && speed > 0) ||
                    (this.constraintLeft.length > 100 && speed < 0)){
                    
                    this.constraintLeft.length += speed;
                    this.constraintRight.length += speed;
                    requestAnimationFrame(step);
                }
                else{
                    resolve();//end of animation
                }
            };
            step();
        });
    }
    
    async reset(speed = 3){
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