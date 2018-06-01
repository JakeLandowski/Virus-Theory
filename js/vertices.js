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

const canvas = main.getElementsByTagName('canvas')[0];

function rand(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//============ RUN ===============//

const edgeRenderingGroup = two.makeGroup();
const edgeGroup   = two.makeGroup();
const vertexGroup = two.makeGroup();

canvas.onclick = function(event)
{
    let x = event.offsetX;
    let y = event.offsetY;

    let vertex = two.makeCircle(x, y, 20);
    vertex.fill = "#9911ff";
    vertex.linewidth = 4;
    
    let vertices = vertexGroup.children;

    if(vertices.length > 1)
    {
        createEdge(x, y, vertices);
    } 

    vertexGroup.add(vertex);
};

function createEdge(fromX, fromY, currentVertices)
{
    for(let i = 0; i < rand(1, currentVertices.length - 1); i++)
    {
        let randVertex = currentVertices[rand(0, currentVertices.length - 1)];
        let edge = two.makeLine(fromX, fromY, fromX, fromY);
    
        edge.stroke = "black";
        edge.linewidth = 4;
        edge.finalX = randVertex.translation.x;
        edge.finalY = randVertex.translation.y;
    
        edgeRenderingGroup.add(edge);
    }
}


// Run
two.bind('update', function(frameCount)
{
    let newEdges = edgeRenderingGroup.children;
    
    if(newEdges.length > 0)
    {
        newEdges.map(function(edge)
        {
            let secondX = edge.vertices[1].x + edge.translation.x;
            let secondY = edge.vertices[1].y + edge.translation.y; 

            if(secondX > edge.finalX - 10 && secondX < edge.finalX + 10 && 
               secondY > edge.finalY - 10 && secondY < edge.finalY + 10)
            // if(secondX == edge.finalX && secondY == edge.finalY)
            {
                edgeRenderingGroup.remove(edge);
                edgeGroup.add(edge);
            }

            // edge.vertices[1].x = edge.finalX;
            // edge.vertices[1].y = edge.finalY;

            // console.log("vert x : " + edge.vertices[1].x + " final x : " + edge.finalX);

            // two.makeCircle(edge.finalX, edge.finalY, 20);

            if(secondX < edge.finalX - 10)
            {
                edge.vertices[1].x += 3;
            }
            else if(secondX > edge.finalX + 10)
            {
                edge.vertices[1].x -= 3;
            }

            if(secondY < edge.finalY - 10)
            {
                edge.vertices[1].y += 3;
            }
            else if(secondY > edge.finalY + 10)
            {
                edge.vertices[1].y -= 3;
            }   
        });
    }
});

two.play();