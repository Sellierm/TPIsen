

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / (window.innerHeight-$( "form" ).height()), 1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight-$( "form" ).height() );
document.body.appendChild( renderer.domElement ); //création de la scène
renderer.setClearColor( 0xffffff, 1); //couleur de fond du canvas
renderer.render(scene,camera);

var mouse = new THREE.Vector2();


//Création des différents styles(materials) pour les différents objets de la scène
const materialPoints = new THREE.PointsMaterial({ 
    size: 0.1,
    color: 0xFF0000
});
const materialPointsAxes = new THREE.PointsMaterial({ 
    size: 0.05,
    color: 0x000000
});
const materialPointsMoving = new THREE.PointsMaterial({ 
    size: 0.1,
    color: 0x00FFFF
});
const materialControl = new THREE.LineBasicMaterial( { color : 0x0000FF } );
const materialLigne = new THREE.LineBasicMaterial( { color : 0x00FF00 } );
const materielAxes = new THREE.LineBasicMaterial( { color : 0x000000 } );



let points = []; // tableau de points
camera.position.z = 5;
let modif=-1;   //-1 signifie que aucun point doit etre modifié pour l'instant 


//génération des axes
let tab= [];
for(let i = -30;i< 31;i++)  //on ajoute juste des points a la scèene, que l'on relie
    tab.push( new THREE.Vector2(i,0 ));
let geometryAxe = new THREE.BufferGeometry().setFromPoints(tab); 

const axeXPoints = new THREE.Points(geometryAxe,materialPointsAxes) 
const axeX = new THREE.Line(geometryAxe, materielAxes);
scene.add(axeXPoints);
scene.add(axeX);
tab = [];
for(let i = -30;i< 31;i++)              //Pareil en y
    tab.push( new THREE.Vector2(0,i ));
geometryAxe = new THREE.BufferGeometry().setFromPoints(tab); 
const axeYPoints = new THREE.Points(geometryAxe,materialPointsAxes) 
const axeY = new THREE.Line(geometryAxe, materielAxes);
scene.add(axeYPoints);
scene.add(axeY);

renderer.render(scene,camera);
    
let addX = document.getElementById("addPointX");
let addY = document.getElementById("addPointY");

//Evenement qui permet de gerer la saisie de nouveaux points
document.getElementsByTagName("form")[0].addEventListener("submit",event=>{
    scene.remove(scene.getObjectByName("graph"));
    scene.remove(scene.getObjectByName("graph2"));
    event.preventDefault();
    points.push(new THREE.Vector2(addY.value,addX.value));  //On ajoute le nouveau point
    

    const geometry = new THREE.BufferGeometry().setFromPoints(points);  //on remplit le tableau des points calculés de la courbe
    const graph = new THREE.Points(geometry,materialPoints)             //On crée les points de controles
    const graph2 = new THREE.Line(geometry, materialControl);           //Ainsi que la courbe
    
    //S'il y a plus qu'un seul points, on trace la courbe de bezier et les polynomes de Beirnstein 
    if(points.length > 1){
        Bezier(points);
        Bernstein(points);
    }
   
    graph.name = "graph";
    graph2.name = "graph2";
    scene.add(graph);
    scene.add(graph2);
    renderer.render(scene, camera);

});


//Nettoyer le canvas de toutes courbes tracés auparavant
document.getElementById("clear").addEventListener("click",(event)=>{
    event.preventDefault();
    //On enleve de la scène les différents objets
    scene.remove(scene.getObjectByName("graph"));
    scene.remove(scene.getObjectByName("graph2"));
    scene.remove(scene.getObjectByName("Bezier"));
    for(let i in points){
        scene.remove(scene.getObjectByName("Bernstein"));
    }
    
    renderer.render(scene, camera);         // On raffiche la scene
    points = []; //on remet à 0 la liste des points
});



//Evenement pour ajouter un point lors d'un click
document.getElementsByTagName("canvas")[0].addEventListener("click",(event)=>{
    event.preventDefault();

    //On enleve de la scène les différents objets pour pouvoir les remplacer par les nouveaux
    scene.remove(scene.getObjectByName("graph"));
    scene.remove(scene.getObjectByName("graph2"));
    scene.remove(scene.getObjectByName("point"));
    console.log()



    //calcul de la position du point selon la taille de l'ecran
    mouse.x = (event.clientX / document.getElementsByTagName("canvas")[0].width * 2 - 1)*(document.getElementsByTagName("canvas")[0].width/(document.getElementsByTagName("canvas")[0].height/3.83));
    mouse.y = (-((event.clientY - $( "form" ).height()) / document.getElementsByTagName("canvas")[0].height)* 2 + 1)*3.83;

    let isExisting = false;

    //Si on avait cliqué précédemment sur un point, on le déplace aux nouvelles coordonnées
    
    if(modif >=0){
        points[modif].x = mouse.x;
        points[modif].y = mouse.y;
        modif = -1;                 //reinitialisation pour dire s'il y a modification a faire ou non

    }
    else{   //sinon, on crée un nouveau point
    
    for(let i in points){
        //On verifie que l'utilisateur veut créer un point, ou changer un point
        if(mouse.x <points[i].x +window.innerWidth *0.0003  && mouse.x  >points[i].x -window.innerWidth *0.0003 && mouse.y <points[i].y +window.innerHeight *0.0003 && mouse.y  >points[i].y -window.innerHeight *0.0003){
            isExisting = true;  //si l'utilisateur a cliqué près d'un point, on l'indique dans le code, et on le stock pour le prochain click
            modif = i;   
        }
    }
        if (!isExisting){
            //sinon on ajoute le nouveau point selon les coordonées trouvées
            points.push(new THREE.Vector2(mouse.x,mouse.y));
        }
        
    }
    //S'il y a plus qu'un seul point, on trace la courbe de bezier et les polynomes de Beirnstein
    if(points.length > 1){
        Bezier(points);
        Bernstein(points);
    }
   
    const geometry = new THREE.BufferGeometry().setFromPoints(points);  //on remplit le tableau des points calculés de la courbe
    const graph = new THREE.Points(geometry,materialPoints)             //On crée les points de controles
    const graph2 = new THREE.Line(geometry, materialControl);           //Ainsi que la courbe
    graph.name = "graph";
    graph2.name = "graph2";
    scene.add(graph);                                                   //On les ajoute au graph
    scene.add(graph2);
    renderer.render(scene, camera);                                     //Et on regénère la scène
});


function Bezier (tab){
    scene.remove(scene.getObjectByName("Bezier")); //on enleve à la scène la courbe de bézier précédente
    let points2=[];
    let x=0;
    let y=0;

    for(let t=0; t<101; t++){
       let j= t/100; // pour que j soit compris entre 0 et 1 avec un pas de 0,01
       x = 0;
       y = 0;
        for(let i=0; i<tab.length;i++) { //on fait la sommes des pints de controles*les bases de bernstein

            x += tab[i].x * combinations(tab.length - 1, i) * Math.pow(j, i) * Math.pow(1 - j, (tab.length - 1 - i));
            y += tab[i].y * combinations(tab.length - 1, i) * Math.pow(j, i) * Math.pow(1 - j, (tab.length - 1 - i))
        }
        points2.push(new THREE.Vector2(x,y)); //on rajoute les points dans notre tableau

    }


    const geometry = new THREE.BufferGeometry().setFromPoints(points2); //on remplit le tableau des points calculés de la courbe

    const graph = new THREE.Line(geometry, materialLigne);
    graph.name = "Bezier";
    scene.add(graph); // on ajoute à la scène tous les points
    camera.position.z = 5;
    renderer.render(scene, camera);

}



function Bernstein(tab){
    for( let i=0; i<tab.length;i++) {  //on enleve à la scène les bases de bernstein précédentes
        scene.remove(scene.getObjectByName("Bernstein"));
    }
    let points2=[];

    for( let i=0; i<tab.length;i++) { //on calcule les bases de bernstein selon le nombre de points

        points2=[];

        for(let t=0; t<101; t++){
            let j= t/100; // pour que j soit compris entre 0 et 1 avec un pas de 0,01

            points2.push(new THREE.Vector2(j,combinations(tab.length-1,i)*Math.pow(j,i)* Math.pow(1-j, (tab.length-1-i)))); //on rajoute les points dans notre tableau
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points2); //on remplit le tableau des points calculés de la courbe

        
        const graph = new THREE.Line(geometry, materialLigne);

        graph.name = "Bernstein";

        scene.add(graph); // on ajoute à la scène tous les points
        renderer.render(scene, camera);

    }
}



//simple fonctions pour calculer k parmis n
function combinations(n,k){ 
    let nFact;
    let kFact = 1;
    let nkFact = 1;
    let tmp= 1;

    for(let i = 1;i<=n;i++){
        tmp*= i;
        if(i == k)kFact=tmp;
        if(i == n-k)nkFact=tmp;
        if(i == n)nFact=tmp;
    }
    return nFact /(kFact*nkFact);
}



