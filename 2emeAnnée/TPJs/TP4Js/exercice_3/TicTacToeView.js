class TicTacToeView extends Observable{
    constructor(game,name) {
        super();
        this.game = game;
        this.name = name;
        this.turn = 0;
        this.playAgainstIA = true;
        if (Math.random() < 0.5) {
            this.game.currentPlayer = 0
        } else {
            this.game.currentPlayer = 1;
            if(this.playAgainstIA)
                this.IAMove();
        }


        let playerTurn = document.getElementById("player_number");
        playerTurn.textContent = "player " +(1 + this.game.getCurrentPlayer());

        let td = document.getElementsByTagName("td");
        for(let i = 0;i< 9;i++){
            super.on(i.toString(), x => {
                this.MakeMove(i)
            });
            td[i].addEventListener("click",event => {
                super.trigger(i.toString())
            });

        }
        document.getElementById("reset").addEventListener("click",event => {
            this.resetGame();
        });

        document.getElementById("2player").addEventListener("click",event => {
            this.twoPlayer();
        });

        document.getElementById("ia").addEventListener("click",event => {
            this.playerVsIa();
        });

    }



    resetGame(){
        this.game.reset();
        if (Math.random() < 0.5) {
            this.game.currentPlayer = 0
        } else {
            this.game.currentPlayer = 1;
            if(this.playAgainstIA)
                this.IAMove();
        }
        let td= document.getElementsByTagName("td");
        for(let i=0;i<9; i++){
            if(td[i].firstElementChild){
                td[i].removeChild(td[i].firstElementChild)
            }
        }
        document.getElementById("resultat").textContent = "";
        document.getElementById("player_number").textContent = (this.game.getCurrentPlayer() + 1);
    }

    MakeMove(i){
        if(this.game.getCaseState(Math.trunc((i)/3),(i)%3) === undefined && !this.game.isFinished()) {
            this.game.play(Math.trunc((i) / 3), (i) % 3);
            let playerTurn = document.getElementById("player_number");

            if(this.game.getWinner() === 1 && this.playAgainstIA){
                playerTurn.textContent = "Computer's";
            }
            else{
                playerTurn.textContent = "player " +(1 + this.game.getCurrentPlayer());
            }

            let div = document.getElementsByTagName("td");

            if (this.game.getCurrentPlayer() === 0) {
                let img = document.createElement("img")
                img.src ="images/circle.png";
                div[i].appendChild(img);
            } else {
                let img = document.createElement("img")
                img.src ="images/cross.png";
                div[i].appendChild(img);
            }

            this.turn++;
            if(this.playAgainstIA && this.game.getCurrentPlayer() === 1){
                this.IAMove();
            }


            if (this.game.isFinished()) {
                let title = document.getElementById("resultat");
                if (this.game.hasWinner()) {
                    let title = document.getElementById("resultat");

                    if(this.game.getWinner() === 1 && this.playAgainstIA){
                        title.textContent = "Computer won !";
                    }
                    else{
                        title.textContent = "Player " + (this.game.getWinner() + 1)  + " won the game!";
                    }
                }
                else {
                    title.textContent = "No winner this game!";
                }
            }
        }
    }

    IAMove(){
        minimax(this.game.grid,this.game.getCurrentPlayer(),(9-this.turn));
        for(let i = 0; i< 3;i++){
            for(let j= 0; j< 3;j++){
                if(finalMove[i][j] !== this.game.getCaseState(i,j)){
                    this.MakeMove(i*3 + j );
                }
            }
        }
    }

    twoPlayer(){
        this.playAgainstIA = false;
        this.resetGame();
    }
    playerVsIa(){
        this.playAgainstIA = true;
        this.resetGame();
    }



}
