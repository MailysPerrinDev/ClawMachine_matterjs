class Claw {
    constructor(clawGap, mapLimit){
        this.mapLimit = mapLimit;
        this.clawGap = clawGap;

        this.rightClaw = Bodies.rectangle(mapLimit, 80, 10, 50, {isStatic: true});
        this.leftClaw = Bodies.rectangle(mapLimit+clawGap, 80, 10, 50, {isStatic: true});
        Body.setAngle(this.rightClaw, 2.3); //in radians
        Body.setAngle(this.leftClaw, -2.3);
        Composite.add(engine.world, [this.rightClaw, this.leftClaw]); //add to the world
    }
    
    close(){
        Body.setPosition(this.rightClaw, {x: this.mapLimit, y: this.rightClaw.position.y});
        Body.setPosition(this.leftClaw, {x: this.mapLimit+this.clawGap, y: this.leftClaw.position.y});
        
        Body.setAngle(this.rightClaw, 2.3); //in radians
        Body.setAngle(this.leftClaw, -2.3);
    }
    
    open(){
        Body.setPosition(this.rightClaw, {x: this.mapLimit-20, y: this.rightClaw.position.y});
        Body.setPosition(this.leftClaw, {x: (this.mapLimit+20)+this.clawGap, y: this.leftClaw.position.y});

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
    }
    
    moveY(speed){
        console.log(this.rightClaw.position.x);
        return new Promise((resolve) => {
            const step = () => {
                if ((this.rightClaw.position.y < h-40 && speed > 0) ||
                    (this.rightClaw.position.y > 40 && speed < 0)){
                    Body.translate(this.rightClaw, {x: 0, y: speed});
                    Body.translate(this.leftClaw, {x: 0, y: speed});
                    requestAnimationFrame(step);
                }
                else{            
                    resolve(); //end of animation
                }
            };
            step();
        });
    }

}

