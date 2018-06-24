//============ SETUP ===============//

const two = new Two
({
    fullscreen: true,
    type: Two.Types.canvas
});

const main = document.getElementById('main');
two.appendTo(main);
const canvas = main.getElementsByTagName('canvas')[0];

function rand(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createEdge(fromX, fromY, currentVertices)
{
    let numEdges = rand(1, currentVertices.length - 1);
    
    for(let i = 0; i < numEdges; i++)
    {
        let randIndex = rand(0, currentVertices.length - 1);
        let randVertex = currentVertices[randIndex];
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

function insideVertex(x, y, centerX, centerY, radius)
{
    return x > centerX - radius && x < centerX + radius && 
           y > centerY - radius && y < centerY + radius;
}

//============ RUN ===============//

const vertexSize = 12;
const vertexOutlineSize = vertexSize / 4;


// Thickness of edge line
const edgeWidth = vertexOutlineSize;

// 2 logical groups for edge lines
// 1 for currently animating the other for finished animating
const edgeRenderingGroup = two.makeGroup();
const edgeGroup = two.makeGroup();

// The logical grouping of shape objects
// Like layers in photoshop/illustrator
const vertexGroup = two.makeGroup();

// Array that holds the actual shape objects 
const vertices = vertexGroup.children;

// Create Vertex on click
canvas.onclick = function(event)
{
    // x, y position of the click event
    let x = event.offsetX;
    let y = event.offsetY;

    let vertex = two.makeCircle(x, y, vertexSize);

    // Set fill color and outline thickness
    vertex.fill = "#9911ff";
    vertex.linewidth = vertexOutlineSize;

    if(vertices.length > 1)
    {
        createEdge(x, y, vertices);
    } 

    vertexGroup.add(vertex);
};

// Render Loop
two.bind('update', function(frameCount)
{
    let newEdges = edgeRenderingGroup.children;

    // If edges exist to render
    if(newEdges.length > 0)
    {
        // For each edge in Render Group
        newEdges.map(function(edge)
        {
            let linePos  = linePosition(edge, false);  
            let finalX   = edge.finalX;
            let finalY   = edge.finalY;

            // If close enough to center stop
            if(insideVertex(linePos.x, linePos.y, finalX, finalY, vertexSize/2))
            {
                edgeRenderingGroup.remove(edge);
                edgeGroup.add(edge);
                delete edge.finalX;
                delete edge.finalY;
            }

            // Move line
            let velX = (finalX - linePos.x) / 10;
            let velY = (finalY - linePos.y) / 10;
            
            edge.vertices[1].x += velX;
            edge.vertices[1].y += velY;   
        });
    }
});

two.play();



