//============ SETUP ===============//

const two = new Two
({
    fullscreen: true,
    type: Two.Types.canvas
});

const main = document.getElementById('main');
two.appendTo(main);


//============ RUN ===============//

let circle = two.makeCircle(110, 110, 100);
circle.fill = "#881111";

two.update();