

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement ); //création de la scène

const material = new THREE.PointsMaterial({ //définition taille et couleurs des points
    size: 0.05,
    color: 0x7CFC00
});

let points = []; // tableau de points


//Cercle
/*for(let i = 0;i<720;i++){
    let j = i *Math.PI / 360
    points.push( new THREE.Vector3( 2*Math.cos(j), 2*Math.sin(j), 0 ) );
}*/

//coeur
/*
for(let i = 0;i<720;i++){
    let j = i *Math.PI / 360
    points.push( new THREE.Vector3( Math.pow(Math.sin(j),3), Math.cos(j)- Math.pow(Math.cos(j),4), 0 ) );
}*/


//Récupération des équations paramétriques rentrées par l'utilisateur
let xt = document.getElementById("x");
let yt = document.getElementById("y");

//Ajout d'un evenement permettant de supprimer la courbe paramétrique précédente
document.getElementById("clear").addEventListener("click",(event)=>{
    event.preventDefault();
    renderer.clear();
    while (scene.children.length>0){
        scene.remove(scene.getObjectByName("graph")); //permet d'enlever toutes les courbes paramétriques déssinées avant
    }

    points = []; //on remet à 0 la liste des points
});


//Evenement qui traite les équations rentrés par l'utilisateur
document.getElementsByTagName("form")[0].addEventListener("submit",event=>{
    event.preventDefault();
    let error =false;

    try { //on regarde si l'utilisateur n'a pas rentré de lettre autre que t ou même rentrer un mot

        math.evaluate(xt.value.replace("t",'1'));
        math.evaluate(yt.value.replace("t",'1'));
    }
    catch (err){
        error = true;

        alert("erreur lors de la saisie d'equation");
    }

    if(xt.value!=null && yt.value!= null && !error) { //si on a bien deux équations paramétriques et pas d'erreur alors on affiche la courbe
        for (let i = -360; i < 360; i+=1) {
            let j = i *Math.PI /360;
            points.push(new THREE.Vector3(math.evaluate(xt.value.replace("t",j.toString())), math.evaluate(yt.value.replace("t",j.toString())) , 0)); //comme nous sommes en 2D z=0
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points); //on remplit le tableau des points calculés de la courbe

        const graph = new THREE.Points(geometry, material);
        graph.name = "graph";
        scene.add(graph); // on ajoute à la scène tous les points
        console.log(scene);
        camera.position.z = 5;
        renderer.render(scene, camera);
    }

    //on remet à 0 les deux équations paramétriques saisies
    xt.value = null;
    yt.value = null;
})
