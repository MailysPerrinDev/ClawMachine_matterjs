let prize = new Prize(500, 450, 30);
let claw = new Claw(150, prize.height);
let clawIsBusy = false;

async function wait(){
    return new Promise(resolve => setTimeout(resolve, 1000));
}

async function clawFetch(){
    if (!clawIsBusy){
        clawIsBusy = true;
        claw.open();
        await(claw.moveY(2));
        claw.close();
        await(wait());
        await(claw.moveY(-2));
        await(claw.reset());
        claw.open();
        await(wait());
        claw.close();
        clawIsBusy = false;
    }
}

function generatePrizes(mapWidth){
    let n = mapWidth/prize.width;
    
    for (let i=0; i<n; i++){
        new Prize(w/2, 450, 30);
    }
}

generatePrizes(w);

document.onkeydown = function(e){
    switch(e.keyCode){
        case 37:
            claw.moveX(-1);
            break;
        case 39:
            claw.moveX(1);
            break;
        case 40:
            clawFetch();
            break;
    }
};