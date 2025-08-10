let prize = new Prize(w/2, 450, 30);
let prizes = [];
let claw = new Claw(75, prize.height);
let clawIsBusy = false;
let gameIsPaused = false;

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
    let newPrize;
    
    for (let i=0; i<n; i++){
        newPrize = new Prize(w/2, 450, 30);
        prizes.push(newPrize);
    }
}

function pause(){
    Runner.stop(runner);
    gameIsPaused = true;
}

function unpause(){
    Runner.start(runner);
    gameIsPaused = false;
}

generatePrizes(w);

Events.on(engine, 'collisionEnd', function(event) {
    let pairs = event.pairs;
    let pair;
    let bodyA, bodyB;
    
    for (let i = 0; i != pairs.length; ++i) {
        pair = pairs[i];
        bodyA = pair.bodyA;
        bodyB = pair.bodyB;
        if ((bodyA.label === 'prizeBox' && bodyB.label === 'prize') ||
            (bodyA.label === 'prize' && bodyB.label === 'prizeBox')) {
            console.log("PRIZE WON!");
        } 
    }
});
          
document.onkeydown = async function(e){
if (!clawIsBusy && !gameIsPaused){
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
            default:
                clawIsBusy = false;
                break;
        }
    }
};