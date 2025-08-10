let prize = new Prize(500, 450, 30);
let claw = new Claw(75, prize.height);
let clawIsBusy = false;

async function wait(){
    return new Promise(resolve => setTimeout(resolve, 500));
}

async function clawFetch(){
    await(claw.open());
    await(wait());
    await(claw.moveY(3));
    await(claw.close());
    await(claw.moveY(-3));
    await(claw.reset());
    await(claw.open());
    claw.close();
}

function generatePrizes(mapWidth){
    let n = mapWidth/prize.width;
    
    for (let i=0; i<n; i++){
        new Prize(w/2, 450, 30);
    }
}

generatePrizes(w);

Events.on(engine, 'collisionStart', function(event) {
    let pairs = event.pairs;
    for (let i = 0; i != pairs.length; ++i) {
        let pair = pairs[i];
        let bodyA = pair.bodyA;
        let bodyB = pair.bodyB;
        if ((bodyA.label === 'prizeBox' && bodyB.label === 'prize') ||
            (bodyA.label === 'prize' && bodyB.label === 'prizeBox')) {
            console.log("PRIZE WON!");
        } 
    }
});
          
document.onkeydown = async function(e){
if (!clawIsBusy){
        clawIsBusy = true;
        switch(e.keyCode){
            case 37:
                await(claw.moveX(-1));
                clawIsBusy = false;
                break;
            case 39:
                await(claw.moveX(1));
                clawIsBusy = false;
                break;
            case 40:
                await(clawFetch());
                clawIsBusy = false;
                break;
        }
    }
};