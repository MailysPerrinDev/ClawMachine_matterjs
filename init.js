//module aliases
const {Engine, Render, Runner, Bodies, Composite, Body, Bounds, Constraint, Events} = Matter;

let engine, render, runner;
let ground, wallRight, wallLeft;
let prizeBox, prizeBoxWall;
let h=500, w=1000;

engine = Engine.create();
render = Render.create({
    element: document.body, //where the canvas has to be inserted
    engine: engine,
    options: {
        width: w,
        height: h
    }
});
runner = Runner.create();

//borders
ground = Bodies.rectangle((w/2)+100, h, w-200, 10, {isStatic: true});

wallRight = Bodies.rectangle(0, h/2, h, 10, {isStatic: true});
wallLeft = Bodies.rectangle(w, h/2, h, 10, {isStatic: true});

Body.setAngle(wallRight, 1.570796); //in radians (90°)
Body.setAngle(wallLeft, 1.570796);

//Prize Box
prizeBoxWall = Bodies.rectangle(200, h, 300, 10, {isStatic: true});
prizeBox = Bodies.rectangle(100/2, h, 300, 10, {isStatic: true, isSensor: true, label: 'prizeBox'});
Body.setAngle(prizeBoxWall, 1.570796);

Composite.add(engine.world, [ground, wallRight, wallLeft, prizeBox, prizeBoxWall]); //add to the world
Render.run(render);
Runner.run(runner, engine);