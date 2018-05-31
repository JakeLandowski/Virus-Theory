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
let circle = two.makeCircle(110, 110, 100);
circle.fill = "#881111";

                    // (centerX, centerY, width, height)
let rect = two.makeRectangle(400, 90, 150, 100);
rect.fill = "orange";
rect.opacity = 0.25;
rect.noStroke();

                    // (centerX, centerY, width, height) 
let ellipse = two.makeEllipse(150, 300, 90, 30);
ellipse.stroke = "#112233"; 
ellipse.linewidth = 5;
ellipse.noFill();

                // (startX, startY, endX, endY)
let line = two.makeLine(600, 200, 310, 410);
line.linewidth = 10;
line.stroke = "rgba(255, 0, 0, 0.5)";

                                                    // (x, y pairs, true for open shape)
let curve = two.makeCurve(110, 100, 120, 50, 140, 150, 160, 50, 180, 150, 190, 100, true);
curve.linewidth = 2;
curve.scale = 1.75;
curve.rotation = Math.PI / 2;
curve.noFill();



two.update();