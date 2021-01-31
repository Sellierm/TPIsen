let finalMove;

function points(grid){
    for(let i = 0; i < 3; i++) {
        if(grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2] && grid[i][0] !== undefined){
            if(grid[i][0] === 1){
                return -1;
            }
            else{
                return 1;
            }
        }
        if(grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i] && grid[0][i] !== undefined){
            if(grid[0][i] === 1){
                return -1;
            }
            else{
                return 1;
            }
        }
    }
    if(grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] && grid[2][2] !== undefined){
        if(grid[1][1] === 1){
            return -1;
        }
        else{
            return 1;

        }

    }
    else if(grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0] && grid[1][1] !== undefined){
        if(grid[1][1] === 1){
            return -1;
        }
        else{
            return 1;
        }
    }
    else{
        let sum = 0;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if (grid[i][j] !== undefined) sum++;
            }
        }
        if(sum == 9) return 0;
        return -2;
    }
}

function getAllPossibilities(grid,player){
    let tmp;
    let list = [];
    for(let i = 0; i< 3;i++){
        for(let j= 0; j< 3;j++){
            if(grid[i][j]=== undefined){
                tmp = this.createGrid(grid);
                tmp[i][j] = player;
                list.push(tmp)
            }
        }
    }
    return list;
}

function createGrid(grid){
    let fakeGrid = [];
    for(let i = 0; i< 3;i++){
        fakeGrid[i] = new Array(3);
        for(let j= 0; j< 3;j++){
            fakeGrid[i][j] = grid[i][j];
        }
    }
    return fakeGrid;
}


function minimax(grid,player,n) {
    //tiré du pseudo code https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning
    if (n === 0 || points(grid) !== -2) {
        return points(grid);
    }
    let possibilities = getAllPossibilities(grid, player);
    let value = [];

    if (player === 0) {
        for (let i in possibilities) {
            value.push(minimax(possibilities[i], ((player +1)%2), n + 1));
        }
        finalMove = possibilities[0];
        let max = -10;
        for (let i in value) {
            if (value[i] > max) {
                max = value[i];
                finalMove = possibilities[i];
            }
        }
        return max;
    } else {
        for (let i in possibilities) {
            value.push(minimax(possibilities[i], ((player +1)%2), n + 1));
        }
        finalMove = possibilities[0];
        let min = 100;
        for (let i in value) {
            if (value[i] < min) {
                min = value[i];
                finalMove = possibilities[i];
            }
        }
        return min;
    }

}

