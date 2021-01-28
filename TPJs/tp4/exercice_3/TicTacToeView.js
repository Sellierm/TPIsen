class TicTacToeView extends Observable{
    constructor(game,name) {
        super();
        this.game = game;
        this.name = name;
        let playerTurn = document.getElementById("player_number");
        playerTurn.textContent = "1";

        let td = document.getElementsByTagName("td");
        for(let i = 1;i< 10;i++){
            this.on(i.toString(), x => {
                if(this.game.getCaseState(Math.trunc((i-1)/3),(i-1)%3) === undefined && !this.game.isFinished()) {
                    this.game.play(Math.trunc((i - 1) / 3), (i - 1) % 3);
                    let playerTurn = document.getElementById("player_number");
                    playerTurn.textContent = 1 + this.game.getCurrentPlayer()
                    let div = document.getElementsByTagName("td");
                    if (this.game.getCurrentPlayer() == 0) {
                        let img = document.createElement("img")
                        img.src ="images/circle.png";
                        div[i - 1].appendChild(img);
                    } else {
                        let img = document.createElement("img")
                        img.src ="images/cross.png";
                        div[i - 1].appendChild(img);
                    }
                    if (this.game.isFinished()) {
                        let title = document.getElementById("resultat");
                        if (this.game.hasWinner()) {
                            let title = document.getElementById("resultat");
                            title.textContent = "Le joueur " + this.game.getWinner() + " gagne la partie!";
                        }
                        else {
                            title.textContent = "Pas de gagnant pour cette fois!";
                        }
                    }
                }
            });
            td[i-1].addEventListener("click",event => {
               this.trigger(i.toString())
            });
            document.getElementById("reset").addEventListener("click",event =>{
                this.game.reset();
                let td= document.getElementsByTagName("td");
                for(let i=0;i<9; i++){
                    if(td[i].firstElementChild){
                        td[i].removeChild(td[i].firstElementChild)
                    }
                }
                }
            )
        }
    }
}
