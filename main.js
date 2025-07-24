let prize = new Prize(300, 450, 30);
let claw = new Claw(80, prize.height);

async function wait(){
    return new Promise(resolve => setTimeout(resolve, 1000));
}

async function clawFetch(){    
    claw.open();
    await(claw.moveY(2));
    claw.close();
    await(wait());
    await(claw.moveY(-2));
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
            clawIsBusy = false;
            break;
        case 39:
            claw.moveX(1);
            clawIsBusy = false;
            break;
        case 40:
            clawFetch();
            clawIsBusy = false;
            break;
    }
};