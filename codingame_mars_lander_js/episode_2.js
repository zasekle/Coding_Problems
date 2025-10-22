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

const squareSize = 1000;
let firstPass = true;

function gridToStandardX(coord) {
    let conversion = coord * squareSize;
    if(conversion > 6999) {
        conversion = 6999;
    }
    return coord * squareSize;
}

function gridToStandardY(coord) {
    let conversion = coord * squareSize;
    if(conversion > 2999) {
        conversion = 2999;
    }
    return coord * squareSize;
}

function standardToGrid(coord) {
    return coord/squareSize;
}

function standardToGridCeil(coord, type) {
    return Math.ceil(coord/squareSize);
}

function standardToGridFloor(coord) {
    return Math.ceil(coord/squareSize);
}

function segmentsIntersect(A, B, C, D, eps = 1e-10) {
    const cross = (p, q, r) => 
        (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);

    const orient = (p, q, r) => {
        const val = cross(p, q, r);
        if (Math.abs(val) < eps) return 0; // collinear
        return val > 0 ? 1 : -1;
    }

    const o1 = orient(A, B, C);
    const o2 = orient(A, B, D);
    const o3 = orient(C, D, A);
    const o4 = orient(C, D, B);

    // General case: proper intersection
    if (o1 !== o2 && o3 !== o4) return true;

    // Collinear special cases
    const onSeg = (p, q, r) =>
        Math.min(p.x, r.x) - eps <= q.x && q.x <= Math.max(p.x, r.x) + eps &&
        Math.min(p.y, r.y) - eps <= q.y && q.y <= Math.max(p.y, r.y) + eps;

    if (o1 === 0 && onSeg(A, C, B)) return true;
    if (o2 === 0 && onSeg(A, D, B)) return true;
    if (o3 === 0 && onSeg(C, A, D)) return true;
    if (o4 === 0 && onSeg(C, B, D)) return true;

    return false;
}

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

    // TODO: Probably need to move all land except the landing pad "up". Probably do this above by modifying the coords.

    if (firstPass) {
        const numRows = 3000/squareSize + 1;
        const numCols = 7000/squareSize + 1; 

        const isInGridBounds = (y, x) => y >= 0 && y < numRows && x >= 0 && x < numCols;

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
                row.push(-1);
            }
            grid.push(row);
        }

        // Conversions between grid coords and X Y input are /squareSize and *squareSize.

        const gridStartingPoints = [];
        const gridLandingPoints = [];

        const gridLanderLeftX = standardToGridCeil(x);
        const gridLanderRightX = standardToGridFloor(x);
        const gridLanderBottomY = standardToGridCeil(y);
        const gridLanderTopY = standardToGridFloor(y);

        // Convert grid coords back to actual coords.
        const landerLeftX = gridToStandardX(gridLanderLeftX);
        const landerRightX = gridToStandardX(gridLanderRightX);
        const landerBottomY = gridToStandardY(gridLanderBottomY);
        const landerTopY = gridToStandardY(gridLanderTopY);

        gridStartingPoints.push([gridLanderBottomY, gridLanderLeftX]);
        gridStartingPoints.push([gridLanderBottomY, gridLanderRightX]);
        gridStartingPoints.push([gridLanderTopY, gridLanderLeftX]);
        gridStartingPoints.push([gridLanderTopY, gridLanderRightX]);

        grid[gridLanderBottomY][gridLanderLeftX] += distance(x, y, landerLeftX, landerBottomY);
        grid[gridLanderBottomY][gridLanderRightX] += distance(x, y, landerRightX, landerBottomY);
        grid[gridLanderTopY][gridLanderLeftX] += distance(x, y, landerLeftX, landerTopY);
        grid[gridLanderTopY][gridLanderRightX] += distance(x, y, landerRightX, landerTopY);

        // Mark coords directly above the ground coords.
        const flatY = landY[firstFlatIdx];
        const gridFlatY = standardToGridCeil(flatY);
        const convertFlatY = gridFlatY * squareSize;
        for(let i = firstFlatIdx; i <= secondFlatIdx; i++) {
            const flatX = landX[i];
            const gridFlatX = standardToGridCeil(flatX);
            const convertFlatX = gridFlatX * squareSize;

            // The last coord could go past the actual landing pad, this will prevent it from being used.
            if (convertFlatX <= landX[secondFlatIdx]) {
                grid[gridFlatY][gridFlatX] += distance(flatX, flatY, convertFlatX, convertFlatY)
                gridLandingPoints.push([gridFlatY, gridFlatX]);
            }
        }

        const orthogDistance = distance(0, 0, squareSize, 0);
        const diagonalDistance = distance(0, 0, squareSize, squareSize);
        const DIRS = [
            [-1, -1, diagonalDistance],
            [-1, 0, orthogDistance],
            [-1, 1, diagonalDistance],
            [0, -1, orthogDistance],
            [0, 1, orthogDistance],
            [1, -1, diagonalDistance],
            [1, 0, orthogDistance],
            [1, -1, diagonalDistance]
        ];

        // Calculate and save the shortest distance from each grid point to the end point. It will
        // not calculate any point that fall outside the grid and will not move through any land.
        let headIdx = 0;
        const nextPoints = [...gridLandingPoints];
        while (headIdx < nextPoints.length) {
            const [gridY, gridX] = nextPoints[headIdx];
            const gridDist = grid[gridY][gridX];
            const workingY = gridToStandardY(gridY);
            const workingX = gridToStandardX(gridX);
            for (const [dy, dx, dist] in DIRS) {
                const newGridY = gridY + dy;
                const newGridX = gridX + dx;
    
                if (isInGridBounds(newGridY, newGridX)) {
                    const newY = gridToStandardY(newGridY);
                    const newX = gridToStandardX(newGridX);

                    let outOfBounds = false;
                    for (let i = 1; i < surfaceN; i++) {
                        if (segmentsIntersect(
                                {x: workingX, y: workingY},
                                {x: newX, y: newY},
                                {x: landX[i-1], y: landY[i-1]},
                                {x: landX[i], y: landY[i]}
                        )) {
                            outOfBounds = true;
                            break;
                        }
                    }

                    const calculatedNextDist = gridDist + dist;
                    const actualNextDist = grid[newGridY][newGridX]; 
                    if (!outOfBounds && (actualNextDist === -1 || calculatedNextDist < actualNextDist)) {
                        grid[newGridY][newGridX] = calculatedNextDist;
                        nextPoints.push([newGridY, newGridX]);
                    }
                }
            }
            headIdx++;
        }

        console.error(grid);

        //TODO: Is there a better way to do this than finding shortest distance?
    	//TODO: Maybe I just use the shortest path on the first time I go through it. Then every second after that
        // I recalculate it somehow and clean up the path based on new information. This is also a lot more practical
        // for a real world situation than trying to theoretically figure it out to start.
        //TODO: Last time I think I got stuck on the part of following the line with the shuttle well enough. Can I go
        // backwards and do it better somehow? How do I follow the line though? Or Do I need to remake the line based
        // on following it? I don't know if forwards or backwards matters. Maybe I just need to remake the line on
        // every pass or something like that.

        firstPass = false;
    }


    // rotate power. rotate is the desired rotation angle. power is the desired thrust power.
    console.log('-90 3');
}
