class Claw{
    constructor(clawGap, mapLimit, topLimit = 80, botLimit = 47){
        this.mapLimit = mapLimit;
        this.clawGap = clawGap;
        this.topLimit = topLimit;
        this.botLimit = botLimit;

        this.rightClaw = Bodies.rectangle(mapLimit, topLimit, 10, 50, {isStatic: true});
        this.leftClaw = Bodies.rectangle(mapLimit+clawGap, topLimit, 10, 50, {isStatic: true});
        
        Body.setAngle(this.rightClaw, 2.4); //in radians
        Body.setAngle(this.leftClaw, -2.4);
        
        Composite.add(engine.world, [this.rightClaw, this.leftClaw]); //add to the world
    }
    
    close(){
        Body.setPosition(this.rightClaw, {x: (this.rightClaw.position.x + 10), y: this.rightClaw.position.y});
        Body.setPosition(this.leftClaw, {x: (this.leftClaw.position.x - 10), y: this.leftClaw.position.y});
        
        Body.setAngle(this.rightClaw, 2.4); //in radians
        Body.setAngle(this.leftClaw, -2.4);
    }
    
    open(){
        Body.setPosition(this.rightClaw, {x: (this.rightClaw.position.x - 10), y: this.rightClaw.position.y});
        Body.setPosition(this.leftClaw, {x: (this.leftClaw.position.x + 10), y: this.leftClaw.position.y});

        Body.setAngle(this.rightClaw, 2.6); //in radians
        Body.setAngle(this.leftClaw, -2.6);
    }
    
    moveX(direction, speed = 6, limitLeft = null, limitRight = null){
        if (limitLeft === null) limitLeft = this.mapLimit + this.clawGap;
        if (limitRight === null)  limitRight = w - limitLeft;
        
        Body.translate(this.rightClaw, {x: speed * direction, y: 0});
        Body.translate(this.leftClaw, {x: speed * direction, y: 0});

        if (this.leftClaw.position.x <= limitLeft || this.rightClaw.position.x >= limitRight ){
            direction *= -1;
            Body.translate(this.rightClaw, {x: speed * direction, y: 0});
            Body.translate(this.leftClaw, {x: speed * direction, y: 0});
        }
        console.log(this.rightClaw.position.x);
    }
    
    moveY(speed){
        console.log(this.rightClaw.position.x);
        return new Promise((resolve) => {
            const step = () => {
                if ((this.rightClaw.position.y < h-this.botLimit && speed > 0) ||
                    (this.rightClaw.position.y > this.topLimit && speed < 0)){
                    Body.translate(this.rightClaw, {x: 0, y: speed});
                    Body.translate(this.leftClaw, {x: 0, y: speed});
                    requestAnimationFrame(step);
                }
                else{            
                    resolve();//end of animation
                }
            };
            step();
        });
    }

}

