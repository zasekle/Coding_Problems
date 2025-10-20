/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const surfaceN = parseInt(readline()); // the number of points used to draw the surface of Mars.
const landX = [];
const landY = [];
for (let i = 0; i < surfaceN; i++) {
    var inputs = readline().split(' ');
    landX.push(parseInt(inputs[0])); // X coordinate of a surface point. (0 to 6999)
    landY.push(parseInt(inputs[1])); // Y coordinate of a surface point. By linking all the points together in a sequential fashion, you form the surface of Mars.
}

// at least 1000m wide
let firstFlatIdx = 0;
let secondFlatIdx = 0;
for (let i = 1; i < surfaceN; i++) {
    if (landY[i] === landY[i - 1]) {
        firstFlatIdx = i - 1;
        secondFlatIdx = i;
        break;
    }
};

let firstPass = true;

// game loop
while (true) {
    var inputs = readline().split(' ');
    const x = parseInt(inputs[0]);
    const y = parseInt(inputs[1]);
    const hSpeed = parseInt(inputs[2]); // the horizontal speed (in m/s), can be negative.
    const vSpeed = parseInt(inputs[3]); // the vertical speed (in m/s), can be negative.
    const fuel = parseInt(inputs[4]); // the quantity of remaining fuel in liters.
    const rotate = parseInt(inputs[5]); // the rotation angle in degrees (-90 to 90).
    const power = parseInt(inputs[6]); // the thrust power (0 to 4).

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    // Probably get above the landing area as fast as possible? This could be false later and I would
    // like to make it extendable. So maybe I need to actually find the shortest path to the surface, then
    // try to follow it closely. Although I would need to simulate that while the moves are all predictable
    // it can't follow tight paths. Maybe instead of thinking of it like a programming problem, think of it
    // like a real problem. That means I want it to work first and foremost, then I want to prio fuel, then
    // I want to prio computational efficieny.

    // Maybe break it up into a grid and do flow control over it? Then go over the path and see if it is valid & adjust
    // accordingly. OR I could figure out how tight the lander can corner and use flow control to somehow make the 
    // correct path the first time by being farther away from the edges.

    const distance = (x1, y1, x2, y2) => Math.hypot((x1 - x2), (y1 - y2));

    if (firstPass) {
        const squareSize = 100;
        const numRows = 3000/squareSize;
        const numCols = 7000/squareSize; 

        // How does this work?
        // Start at the current coords. Every direction works, but I want the shortest path. So 
        // some kind of backtracking algo I suppose? Maybe start at the points on the grid that 
        // are "solutions" and then use backwards induction to find the shortest path.

        // Multiple possible end points. Pick one and start there.

        // Check each direction and keep track of length. Find shortest direction once I find
        // the lander.

        // Need coords of the current lander and the coords of the end points. Maybe I will need
        // to do some extra at the start and end to go to a corner. So from startX and startY to
        // the nearest coord and such. Oh, I can just add the distance to the nearest coordinates.

        let grid = [];
        for(let i = 0; i < numRows; i++) {
            let row = [];
            for (let j = 0; j < numCols; j++) {
                row.push({
                    dist: 0,
                    start: false,
                    end: false,
                });
            }
            grid.push(row);
        }

        // Conversions between grid coords and X Y input are /squareSize and *squareSize.

        // Add distance from actual X and Y coords to the nearest grid coords.
        const landerLeftX = Math.ceil(x/squareSize);
        const landerRightX = Math.floor(x/squareSize);
        const landerBottomY = Math.ceil(y/squareSize);
        const landerTopY = Math.floor(y/squareSize);

        //TODO: These coords need to be converted back from grid coords to get proper distance
        grid[landerBottomY][landerLeftX].dist += distance(x, y, landerLeftX, landerBottomY);
        grid[landerBottomY][landerRightX].dist += distance(x, y, landerRightX, landerBottomY);
        grid[landerTopY][landerLeftX].dist += distance(x, y, landerLeftX, landerTopY);
        grid[landerTopY][landerRightX].dist += distance(x, y, landerRightX, landerTopY);

        // Mark coords directly above the ground coords.
        const flatY = landY[firstFlatIdx];
        const closestFlatY = Math.ceil(flatY/squareSize);
        const firstFlatX = Math.ceil(landX[firstFlatIdx]/squareSize);
        const lastFlatX = Math.ceil(landX[secondFlatIdx]/squareSize);
        for(let i = firstFlatX; i < lastFlatX; i++) {
            //TODO: Need x and y for the grid, flat x and y for the grid X and Y converted to the grid
            //grid takes in coords from squareSize
            //also need the actual coords
            const closestFlatX = landX[firstFlatIdx];
            grid[closestFlatY][].dist += distance();
        }

        //TODO: Is there a better way to do this than finding shortest distance?

        firstPass = false;
    }


    // rotate power. rotate is the desired rotation angle. power is the desired thrust power.
    console.log('-90 3');
}
