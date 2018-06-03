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

function createEdge(fromX, fromY, currentVertices)
{
    for(let i = 0; i < rand(1, currentVertices.length - 1); i++)
    {
        let randVertex = currentVertices[rand(0, currentVertices.length - 1)];
        let edge = two.makeLine(fromX, fromY, fromX, fromY);
    
        edge.stroke = "black";
        edge.linewidth = edgeWidth;
        
        edge.finalX = randVertex.translation.x;
        edge.finalY = randVertex.translation.y;

        edgeRenderingGroup.add(edge);
    }
}

function linePosition(line, start=true)
{
    return {
        x: line.vertices[start ? 0 : 1].x + line.translation.x,
        y: line.vertices[start ? 0 : 1].y + line.translation.y
    };
}

//============ RUN ===============//

const edgeSpeed = 4;
const vertexSize = 12;
const vertexOutlineSize = vertexSize / 4;
const edgeWidth = vertexOutlineSize;

const edgeRenderingGroup = two.makeGroup();
const edgeGroup = two.makeGroup();
const edges = edgeGroup.children;

const vertexGroup = two.makeGroup();
const vertices = vertexGroup.children;


canvas.onclick = function(event)
{
    let x = event.offsetX;
    let y = event.offsetY;

    let vertex = two.makeCircle(x, y, vertexSize);
    vertex.fill = "#9911ff";
    vertex.linewidth = vertexOutlineSize;

    if(vertices.length > 1)
    {
        createEdge(x, y, vertices);
    } 

    vertexGroup.add(vertex);
};


// Run
two.bind('update', function(frameCount)
{
    let newEdges = edgeRenderingGroup.children;

    if(newEdges.length > 0)
    {
        newEdges.map(function(edge)
        {
            let linePos  = linePosition(edge, false);  
            let finalX   = edge.finalX;
            let finalY   = edge.finalY;

            if(linePos.x > finalX - vertexSize/2 && linePos.x < finalX + vertexSize/2 && 
               linePos.y > finalY - vertexSize/2 && linePos.y < finalY + vertexSize/2)
            {
                edgeRenderingGroup.remove(edge);
                edgeGroup.add(edge);
                delete edge.finalX;
                delete edge.finalY;
            }

            
            let velX = (finalX - linePos.x) / 10;
            let velY = (finalY - linePos.y) / 10;
            
            edge.vertices[1].x += velX;
            edge.vertices[1].y += velY;

            // if(linePos.x < finalX - edgeSpeed)
            // {
            //     edge.vertices[1].x += edgeSpeed;
            // }
            // else if(linePos.x > finalX + edgeSpeed)
            // {
            //     edge.vertices[1].x -= edgeSpeed;
            // }

            // if(linePos.y < finalY - edgeSpeed)
            // {
            //     edge.vertices[1].y += edgeSpeed;
            // }
            // else if(linePos.y > finalY + edgeSpeed)
            // {
            //     edge.vertices[1].y -= edgeSpeed;
            // }   
        });
    }
});

two.play();