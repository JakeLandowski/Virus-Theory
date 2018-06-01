//============ SETUP ===============//

const two = new Two
({
    fullscreen: true,
    type: Two.Types.canvas
});

const main = document.getElementById('main');
two.appendTo(main);

window.onresize = function()
{
    two.update();
};

let earthAngle  = 0;
let moonAngle   = 0;
let distance    = 30; 
let earthRadius = 50;
let padding     = 100;
let orbit       = 200;
let offset      = orbit + padding;
let orbits      = two.makeGroup();

function orbitPosition(angle, orbit)
{
    return {
        x: Math.cos(angle * Math.PI / 180) * orbit,
        y: Math.sin(angle * Math.PI / 180) * orbit
    };
}

//============ RUN ===============//

// Earth Setup
let earthOrbit = two.makeCircle(offset, offset, orbit);
earthOrbit.noFill();
earthOrbit.linewidth = 4;
earthOrbit.stroke = "#ccc";
orbits.add(earthOrbit);

let earthPosition = orbitPosition(earthAngle++, orbit);
let earth = two.makeCircle(earthPosition.x + offset, earthPosition.y + offset, earthRadius);
earth.stroke = "#123456";
earth.linewidth = 4;
earth.fill = "#194878";

// Moon Setup
let moonOrbit = two.makeCircle(earth.translation.x, earth.translation.y, earthRadius + distance);
moonOrbit.noFill();
moonOrbit.linewidth = 4;
moonOrbit.stroke = "#ccc";
orbits.add(moonOrbit);

let moonPosition = orbitPosition(moonAngle, earthRadius + distance);
let moon = two.makeCircle(earth.translation.x + moonPosition.x,
                          earth.translation.y + moonPosition.y, earthRadius / 4);

moonAngle += 5;
moon.fill = "#474747";



// Run
two.bind('update', function(frameCount)
{
    let earthPos = orbitPosition(earthAngle++, orbit);
    earth.translation.x = earthPos.x + offset;
    earth.translation.y = earthPos.y + offset;

    let moonPos = orbitPosition(moonAngle, earthRadius + distance);
    moon.translation.x = earth.translation.x + moonPos.x;
    moon.translation.y = earth.translation.y + moonPos.y;
    moonAngle += 5;

    moonOrbit.translation.x = earth.translation.x;
    moonOrbit.translation.y = earth.translation.y;
});

// orbits.visible = false;

two.play();