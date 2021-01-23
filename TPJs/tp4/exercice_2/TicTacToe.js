class TicTacToe extends Observable{
    constructor() {
        super();
        this.winner = undefined;
        this.grid = new Array(3);
        for(let i = 0; i < 3; i++) {
            this.grid[i] = new Array(3);
        }
        this.currentPlayer = 0;
    }

    play(i,j){
        if(this.currentPlayer === 0){
            this.grid[i][j] = 0
            this.currentPlayer = 1
        }
        else{
            this.grid[i][j] = 1
            this.currentPlayer = 0
        }

    }

    reset(){
        this.grid.forEach(element => element.length = 0)
        this.grid.forEach(element => element.length = 3)
        this.currentPlayer = 0;
    }

    getCurrentPlayer(){
        return this.currentPlayer
    }

    getCaseState(i,j){
        return this.grid[i][j]
    }

    isFinished(){
        let sum = 0;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if (this.grid[i][j] !== undefined) sum++;
            }
        }
        if(sum == 9) return 1;
        return this.hasWinner();
    }

    hasWinner(){
        for(let i = 0; i < 3; i++) {
            if(this.grid[i][0] === this.grid[i][1] && this.grid[i][1] === this.grid[i][2] && this.grid[i][0] !== undefined){
                if(this.grid[i][0] === 1){
                    this.winner = 1;
                }
                else{
                    this.winner = 0;
                }
                return 1;


            }
            if(this.grid[0][i] === this.grid[1][i] && this.grid[1][i] === this.grid[2][i] && this.grid[0][i] !== undefined){
                if(this.grid[0][i] === 1){
                    this.winner = 1;
                }
                else{
                    this.winner = 0;
                }
                return 1;
            }
        }
        if(this.grid[0][0] === this.grid[1][1] && this.grid[1][1] === this.grid[2][2] && this.grid[2][2] !== undefined){
            if(this.grid[1][1] === 1){
                this.winner = 1;
            }
            else{
                this.winner = 0;
            }
            return 1;
        }
        else if(this.grid[0][2] === this.grid[1][1] && this.grid[1][1] === this.grid[2][0] && this.grid[1][1] !== undefined){
            if(this.grid[1][1] === 1){
                this.winner = 1;
            }
            else{
                this.winner = 0;
            }
            return 1;
        }
        else{
            return 0;
        }
    }

    getWinner(){
        return this.winner;
    }
}