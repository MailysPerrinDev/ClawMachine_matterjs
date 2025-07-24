const {Engine, Render, Runner, Bodies, Composite, Body, Bounds} = Matter;

let engine, render, runner;
let ground;
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

ground = Bodies.rectangle(w/2, h, w, 10, {isStatic: true});

Composite.add(engine.world, [ground]); //add to the world
Render.run(render);
Runner.run(runner, engine);