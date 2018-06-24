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

//============ RUN ===============//

                    // (centerX, centerY, radius)
// let circle = two.makeCircle(110, 110, 100);
// circle.fill = "#881111";

                    // (centerX, centerY, width, height)
// let rect = two.makeRectangle(400, 90, 150, 100);
// rect.fill = "orange";
// rect.opacity = 0.25;
// rect.noStroke();

                    // (centerX, centerY, width, height) 
// let ellipse = two.makeEllipse(150, 300, 90, 30);
// ellipse.stroke = "#112233"; 
// ellipse.linewidth = 5;
// ellipse.noFill();

                // (startX, startY, endX, endY)
// let line = two.makeLine(600, 200, 310, 410);
// line.linewidth = 10;
// line.stroke = "rgba(255, 0, 0, 0.5)";

                           // (x, y pairs, true for open shape)
// let curve = two.makeCurve(500, 500, 600, 550, 600, 600, true);
// curve.linewidth = 2;
// curve.scale = 1.75;

// Math.PI Radians = 180 Degrees / 2 = 90 Degrees
// curve.rotation = Math.PI / 2;
// curve.noFill();

// let polygon = two.makePolygon(110, 100, 120, 50, 140, 150, 160, 50, 180, 150, 190, 100);
// polygon.linewidth = 4;
// polygon.translation = new Two.Vector(600, 600);
// polygon.stroke = "#cccccc";
// polygon.fill = "#ececec";

let group = two.makeGroup();
let groupRect = two.makeRectangle(0, 0, 100, 100);
let groupCirc = two.makeCircle(50, 50, 50);

groupRect.fill = "red";
groupCirc.fill = "blue";

groupCirc.translation.x = 0;
groupCirc.translation.y = 0;

group.add(groupRect); // Shape can only be in one group at a time
group.add(groupCirc);

group.translation.x = 500;
group.translation.y = 500;

let groupTwo = two.makeGroup();

groupTwo.translation.x = 450;
groupTwo.translation.y = 450;

groupTwo.add(groupRect);

two.update();