const n = parseInt(readline());
const g = parseInt(readline());
let final_index = 0;
let final_num_infected = 0;
let final_grid = [];
for (let i = 0; i < g; i++) {
    // Will make this a 2d array of chars.
    let my_grid = [];
    let number_infected = 0;
    for (let j = 0; j < n; j++) {
        // javascript stores things as strings. These strings are immutable.
        // This means that in a problem like this where I need to modify them,
        // problems can occur. I can use the split() function to instead turn
        // the string into an array of chars.
        my_grid[j] = readline().split("");

        for (let k = 0; k < n; k++) {
            if (my_grid[j][k] === 'C') {
                number_infected++;
            }
        }
    }

    let grid_change = true;
    while (grid_change) {
        grid_change = false;
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                if(my_grid[j][k] == 'C') {
                    //top-left
                    if (my_grid[j-1]?.[k-1] === '.') {
                        my_grid[j-1][k-1] = 'C';
                        grid_change = true;
                        number_infected++;
                    }
                    //top-right
                    if (my_grid[j-1]?.[k+1] === '.') {
                        my_grid[j-1][k+1] = 'C';
                        grid_change = true;
                        number_infected++;
                    }
                    //bottom-left
                    if (my_grid[j+1]?.[k-1] === '.') {
                        my_grid[j+1][k-1] = 'C';
                        grid_change = true;
                        number_infected++;
                    }
                    //bottom-right
                    if (my_grid[j+1]?.[k+1] === '.') {
                        my_grid[j+1][k+1] = 'C';
                        grid_change = true;
                        number_infected++;
                    }
                }
            }
        }
    }

    if (i === 0 || final_num_infected < number_infected) {
        final_num_infected = number_infected;
        final_index = i;
        
        for (let j = 0; j < n; j++) {
            final_grid[j] = my_grid[j];
        }
    }
}

// Write an answer using console.log() 
// To debug: console.error('Debug messages...');

console.log(final_index);
for (let i = 0; i < n; i++) {
    console.log(final_grid[i].join(""));
}
