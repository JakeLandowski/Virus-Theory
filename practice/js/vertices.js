//============ SETUP ===============//

const two = new Two
({
    fullscreen: true,
    type: Two.Types.canvas
});

const main = document.getElementById('main');
two.appendTo(main);
const canvas = main.getElementsByTagName('canvas')[0];

/**
 *  Inclusive random integer between min and max; 
 * 
 *  @param min  
 *  @param max 
 */
function rand(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *  Create an edge from given x, y point to a random vertex
 *  from the given array of existing vertices
 * 
 *  @param fromX 
 *  @param fromY 
 *  @param currentVertices Existing vertices
 */
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

/**
 *  Get {x, y} position of a given line, 
 *  true for starting point
 *  false for ending point.
 * 
 *  @param line 
 *  @param start true if wanting position for starting point
 */
function linePosition(line, start=true)
{
    return {
        x: line.vertices[start ? 0 : 1].x + line.translation.x,
        y: line.vertices[start ? 0 : 1].y + line.translation.y
    };
}

//============ RUN ===============//

const vertexSize = 12;
const vertexOutlineSize = vertexSize / 4;
const edgeWidth = vertexOutlineSize;

const edgeRenderingGroup = two.makeGroup();
const edgeGroup = two.makeGroup();
const edges = edgeGroup.children;

const vertexGroup = two.makeGroup();
const vertices = vertexGroup.children;


// Create Vertex on click
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
            if(linePos.x > finalX - vertexSize/2 && linePos.x < finalX + vertexSize/2 && 
               linePos.y > finalY - vertexSize/2 && linePos.y < finalY + vertexSize/2)
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