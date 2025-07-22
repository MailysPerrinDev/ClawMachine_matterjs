const {Engine, Render, Runner, Bodies, Composite, Body} = Matter;

let engine, render, runner;
let prize, ground;
let h=500, w=1000;
let prizeRadius=30;

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

prize = Bodies.circle(72, 450, prizeRadius);
Body.setAngularVelocity(prize, 0.005);

ground = Bodies.rectangle(w/2, h, w, 10, {isStatic: true});

Composite.add(engine.world, [prize, ground]); //add to the world
Render.run(render);
Runner.run(runner, engine);