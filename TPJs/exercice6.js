function graph(myArray){                            // On cherche a créer une fonction qui affiche le contenu d'un tableau sous la forme d'un graphe

    let tab = new Array(myArray.length)             // on créée un nouveau tableau appelé tab, de la taille de myArray
    let max = 0;

    for (let i in myArray) {                        // cette boucle nous permet de trouver la valeur maximale (appelée max)
        if (myArray[i] > max) {                     // du tableau myArray
            max = myArray[i];
        }
    }

    for(let i = 0; i < max ;i++){                   // on construit des tableaux qui sont autant de valeurs
        tab[i] = new Array(myArray.length);         // pour chaque indice du tableau tab (on a ainsi un tableau en deux
    }                                               // dimensions de hauteur égale à max et de largeur égale à la longueur du tableau
                                                    // myArray)
    for(let i = 0; i < myArray.length; i++){
        for(let j = 0;j < max;j++){

            if(j < max - myArray[i]){               // on parcourt le tableau tab (avec i = largeur, et j = hauteur)
                tab[j][i] = '.';                    // lorsque j < max - la valeur de myArray à l'indice i
            }                                       // (çàd les cellules en haut de l'histogramme qui doivent être vides),
            else {                                  // on met un . sinon on met un # (cellule pleine)
                tab[j][i] = '#';
            }
        }
    }

    console.table(tab)
}

let monTableau = [4,1,8,3,10,6,7,2,9,10,15];
graph(monTableau)