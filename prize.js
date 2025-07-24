class Prize{
    constructor(prizeX, prizeY, prizeRad){
        this.rad = prizeRad;
        this.prize = Bodies.circle(prizeX, prizeY, prizeRad);
        Body.setAngularVelocity(this.prize, 0.005);
        
        Composite.add(engine.world, this.prize);
    }
    get height(){
        return this.rad*2;
    }
}