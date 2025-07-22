let claw = new Claw(50, 40);
let clawIsBusy = false;

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

document.onkeydown = function(e){
    if(!clawIsBusy){ //claw's unavailable
        clawIsBusy = true;
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
        clawIsBusy = false;
    }
    else{
        console.log("Claw unavailable");
    }
};