class Prize{
    constructor(prizeX, prizeY, prizeRad){
        this.rad = prizeRad;
        this.prize = Bodies.circle(prizeX, prizeY, prizeRad);
        Body.setAngularVelocity(this.prize, 0.005);
        // Body.applyForce(this.prize, {x: this.prize.position.x, y: h-10}, {x:0 , y:0.1});
       // Body.setMass(this.prize, 40);
        
        Composite.add(engine.world, this.prize);
    }
    get height(){
        return this.rad*2;
    }
    
    get width(){
        return this.rad*2;
    }
}