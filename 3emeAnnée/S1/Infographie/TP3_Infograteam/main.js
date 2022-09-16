

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / (window.innerHeight-$( "div" ).height()), 1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight-$( "div" ).height() );
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

//Slider valeur degré m :
let sliderDeg = document.getElementById("sliderDegre");
let output = document.getElementById("output");
 let m = 2;
output.innerHTML = 2;



let points = []; // tableau de points
let vector = [];
camera.position.z = 5;
let modif=-1;   //-1 signifie que aucun point doit etre modifié pour l'instant 


//génération des axes
let tab= [];


let t=0;

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
    event.preventDefault();
    if(addY.value && addX.value){
    scene.remove(scene.getObjectByName("graph"));
    scene.remove(scene.getObjectByName("graph2"));
    event.preventDefault();
    points.push(new THREE.Vector2(addY.value,addX.value));  //On ajoute le nouveau point
    value = Math.trunc(vector[vector.length-1])+1;
    console.log(vector)
    vector.push(value)

    let newCell = document.createElement("td")
    let newTextInput = document.createElement("input");
    newTextInput.type ="text";
    newTextInput.style.width = "30px"
    newTextInput.value = value;
    newTextInput.id = vector.length-1;

    newTextInput.addEventListener("keyup", (event)=> {
        if (event.keyCode === 13) {
            event.preventDefault();
            
            let id = parseInt(newTextInput.id);
            console.log(id)
            if(id == 0 && points.length !=0){
                if(vector[id+1] > parseFloat(newTextInput.value)){
                    vector[id]= parseFloat(newTextInput.value);
                }
                else{
                    newTextInput.value = vector[id];
                }
            }
            else if(id > 0 && id < vector.length-1){
                console.log(parseFloat(newTextInput.value))
                if(vector[id+1] > parseFloat(newTextInput.value) && vector[id-1] < parseFloat(newTextInput.value)){
                    vector[id]= parseFloat(newTextInput.value);
                }
                else{
                    newTextInput.value = vector[id];
                }
            }
            else if(id == vector.length-1){
                if(vector[id] < parseFloat(newTextInput.value)){
                    vector[id]= parseFloat(newTextInput.value);
                }
                else{
                    newTextInput.value = vector[id];
                }
            }
            if(points.length > m+1){
                for(i = 0; i< 100;i++)
                    scene.remove(scene.getObjectByName("Bspline"));
                Bspline()
                renderer.render(scene, camera);
            }
        }
    });
    newCell.appendChild(newTextInput);
    myRow.appendChild(newCell)


    let newCell2 = document.createElement("td")
    newCell2.innerHTML =`t${vector.length -1}`;
    newCell2.style.width = "30px"
    myHeadRow.appendChild(newCell2)
           
    if(points.length > m+1){
        Bspline()
    }      

    if( points.length >4){
        sliderDeg.max = points.length -2 ;
    }

   
    const geometry = new THREE.BufferGeometry().setFromPoints(points);  //on remplit le tableau des points calculés de la courbe
    const graph = new THREE.Points(geometry,materialPoints)             //On crée les points de controles
    const graph2 = new THREE.Line(geometry, materialControl);           //Ainsi que la courbe
    graph.name = "graph";
    graph2.name = "graph2";
    scene.add(graph);                                                   //On les ajoute au graph
    scene.add(graph2);
    renderer.render(scene, camera);   
}
});


//Nettoyer le canvas de toutes courbes tracés auparavant
document.getElementById("clear").addEventListener("click",(event)=>{
    event.preventDefault();

    //On enleve de la scène les différents objets
    scene.remove(scene.getObjectByName("graph"));
    scene.remove(scene.getObjectByName("graph2"));
    scene.remove(scene.getObjectByName("Bspline"));
    for(let i in points){
        scene.remove(scene.getObjectByName("Bernstein"));
    }
    while(vector.length >3){
        vector.pop();
        myHeadRow.removeChild(myHeadRow.lastElementChild);
        myRow.removeChild(myRow.lastElementChild);
    }
    vector[0] = 0;
    vector[1] = 1;
    vector[2] = 2;
    
    document.getElementById("0").value = 0;
    document.getElementById("1").value = 1;
    document.getElementById("2").value = 2;
    
    renderer.render(scene, camera);         // On affiche de nouveau la scene
    points = []; //on remet à 0 la liste des points
});



//Evenement pour ajouter un point lors d'un click
document.getElementsByTagName("canvas")[0].addEventListener("click",(event)=>{
    event.preventDefault();

    //On enleve de la scène les différents objets pour pouvoir les remplacer par les nouveaux
    scene.remove(scene.getObjectByName("graph"));
    scene.remove(scene.getObjectByName("graph2"));
    scene.remove(scene.getObjectByName("point"));
    for(let i in points){
        scene.remove(scene.getObjectByName("Bspline"));
    }



    //calcul de la position du point selon la taille de l'ecran
    mouse.x = (event.clientX / document.getElementsByTagName("canvas")[0].width * 2 - 1)*(document.getElementsByTagName("canvas")[0].width/(document.getElementsByTagName("canvas")[0].height/3.83));
    mouse.y = (-((event.clientY - $( "div" ).height()) / document.getElementsByTagName("canvas")[0].height)* 2 + 1)*3.83;

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

            value = Math.trunc(vector[vector.length-1])+1;
            console.log(vector)
            vector.push(value)

            let newCell = document.createElement("td")
            let newTextInput = document.createElement("input");
            newTextInput.type ="text";
            newTextInput.style.width = "30px"
            newTextInput.value = value;
            newTextInput.id = vector.length-1;

            newTextInput.addEventListener("keyup", (event)=> {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    
                    let id = parseInt(newTextInput.id);
                    console.log(id)
                    if(id == 0 && points.length !=0){
                        if(vector[id+1] > parseFloat(newTextInput.value)){
                            vector[id]= parseFloat(newTextInput.value);
                        }
                        else{
                            newTextInput.value = vector[id];
                        }
                    }
                    else if(id > 0 && id < vector.length-1){
                        console.log(parseFloat(newTextInput.value))
                        if(vector[id+1] > parseFloat(newTextInput.value) && vector[id-1] < parseFloat(newTextInput.value)){
                            vector[id]= parseFloat(newTextInput.value);
                        }
                        else{
                            newTextInput.value = vector[id];
                        }
                    }
                    else if(id == vector.length-1){
                        if(vector[id] < parseFloat(newTextInput.value)){
                            vector[id]= parseFloat(newTextInput.value);
                        }
                        else{
                            newTextInput.value = vector[id];
                        }
                    }
                    if(points.length > m+1){
                        for(i = 0; i< 100;i++)
                            scene.remove(scene.getObjectByName("Bspline"));
                        Bspline()
                        renderer.render(scene, camera);
                    }
                }
            });
            newCell.appendChild(newTextInput);
            myRow.appendChild(newCell)


            let newCell2 = document.createElement("td")
            newCell2.innerHTML =`t${vector.length -1}`;
            newCell2.style.width = "30px"
            myHeadRow.appendChild(newCell2)
            
            
            points.push(new THREE.Vector2(mouse.x,mouse.y));
        }
        
    }
    //S'il y a plus qu'un seul point, on trace la courbe de b-spline et les fonctions de Bspline
    
    if(points.length > m+1){
        Bspline()
    }
    if( points.length >4){
        sliderDeg.max = points.length -2 ;
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


//fonction qui affiche la courbe Bspline
function Bspline(){
    let final=[];
    let final2=[];
    let x = 0;
    let  y = 0;
    console.log(vector)
    //for(let k =0 ; k< points.length + m +1;k++) vector[k]=k;
    for(t=vector[m]; t<vector[points.length]; t+=0.1){
        x = 0;
        y = 0;

        for(let i=0; i <= points.length - m ;i++){
            let spline = BsplineRec(vector,m,i,t)
            final.push(new THREE.Vector2(t, spline));
            const geometry = new THREE.BufferGeometry().setFromPoints(final); //on remplit le tableau des points calculés de la courbe

            const graph = new THREE.Line(geometry, materialLigne);
            graph.name = "Bspline";
            //scene.add(graph); // on ajoute à la scène tous les points

        }
        for(let i=0; i < points.length ;i++){
            let spline = BsplineRec(vector,m,i,t);

            x += points[i].x * spline;
            y += points[i].y * spline;
        }
        final2.push(new THREE.Vector2(x,y))
        
        
    }
        const geometry = new THREE.BufferGeometry().setFromPoints(final2); //on remplit le tableau des points calculés de la courbe
        const graph = new THREE.Line(geometry, materialLigne);
        graph.name = "Bspline";
        scene.add(graph); 
}


//function qui traduit les fonctions Bsplines`
function BsplineRec (tab,m,i,t){

    if(m==0){
        if((tab[i] <= t) && (t < tab[i+1])){
            return 1;
        }else{
            return 0;
        }
    }else{
        return ((t-tab[i])/(tab[i+m]-tab[i]))*BsplineRec(tab,m-1,i,t) + ((tab[i+m+1] - t)/ (tab[i+m+1] - tab[i+1]))*BsplineRec(tab,m-1,i+1,t);
    }
}





// Affiche le degré en temps réel + attribut la valeur à la variable degré
sliderDeg.oninput = function() {
    output.innerHTML = this.value;
    m = parseInt(this.value);
    console.log(this.value)
    for(i = 0; i< 100;i++)
        scene.remove(scene.getObjectByName("Bspline"));
    while(vector.length != points.length + m +1){
        console.log(vector)
        if(vector.length > points.length + m +1){
            vector.pop();
            myHeadRow.removeChild(myHeadRow.lastElementChild);
            myRow.removeChild(myRow.lastElementChild);
        }
        else{

            
            vector.push(vector[vector.length-1]+1)
            let newCell = document.createElement("td")
    let newTextInput = document.createElement("input");
    newTextInput.type ="text";
    newTextInput.style.width = "30px"
    newTextInput.value = vector[vector.length-1];
    newTextInput.id = vector.length;

    newTextInput.addEventListener("keyup", (event)=> {
        if (event.keyCode === 13) {
            event.preventDefault();
            console.log(vector) 
            let id = vector.length-1;
            if(id == 0 && vector.length !=0){
                if(vector[id+1] > parseFloat(newTextInput.value)){
                    vector[id]= parseFloat(newTextInput.value);
                }
                else{
                    newTextInput.value = vector[id];
                }
            }
            else if(id > 0 && id < vector.length -1){
                console.log(parseFloat(newTextInput.value))
                if(vector[id+1] > parseFloat(newTextInput.value) && vector[id-1] < parseFloat(newTextInput.value)){
                    vector[id]= parseFloat(newTextInput.value);
                }
                else{
                    newTextInput.value = vector[id];
                }
            }
            else if(id == vector.length-1){
                if(vector[id] < parseFloat(newTextInput.value)){
                    vector[id]= parseFloat(newTextInput.value);
                }
                else{
                    newTextInput.value = vector[id];
                }
            }
            if(points.length > m+1){
                for(i = 0; i< 100;i++)
                    scene.remove(scene.getObjectByName("Bspline"));
                Bspline()
                renderer.render(scene, camera);
            }
    
        }

    });

    newCell.appendChild(newTextInput);
    myRow.appendChild(newCell)

    let newCell2 = document.createElement("td")
            newCell2.innerHTML =`t${vector.length -1}`;
            newCell2.style.width = "30px"
            myHeadRow.appendChild(newCell2)
            
        }
    }
    
    if(points.length > m+1){
        Bspline()
    }
    renderer.render(scene, camera);
    
}

let myHeadRow = document.getElementsByTagName("tr")[0];
let myRow = document.getElementsByTagName("tr")[1];




for(let i = 0;i<3;i++){
    let newCell = document.createElement("td")
    let newTextInput = document.createElement("input");
    newTextInput.type ="text";
    newTextInput.style.width = "30px"
    newTextInput.value = i;
    newTextInput.id = i;
    vector.push(i)

    newTextInput.addEventListener("keyup", (event)=> {
        if (event.keyCode === 13) {
            event.preventDefault();
            let id = i;
            if(id == 0 && vector.length !=0){
                if(vector[id+1] > parseFloat(newTextInput.value)){
                    vector[id]= parseFloat(newTextInput.value);
                }
                else{
                    newTextInput.value = vector[id];
                }
            }
            else if(id > 0 && id < vector.length -1){
                console.log(parseFloat(newTextInput.value))
                if(vector[id+1] > parseFloat(newTextInput.value) && vector[id-1] < parseFloat(newTextInput.value)){
                    vector[id]= parseFloat(newTextInput.value);
                }
                else{
                    newTextInput.value = vector[id];
                }
            }
            else if(id == vector.length-1){
                if(vector[id] < parseFloat(newTextInput.value)){
                    vector[id]= parseFloat(newTextInput.value);
                }
                else{
                    newTextInput.value = vector[id];
                }
            }
            if(points.length > m+1){
                for(let j = 0; j< 100;j++)
                    scene.remove(scene.getObjectByName("Bspline"));
                Bspline()
                renderer.render(scene, camera);
            }
        }
    });
    newCell.appendChild(newTextInput);
    myRow.appendChild(newCell)
}







