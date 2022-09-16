const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
const renderer = new THREE.WebGLRenderer({antialias: true});
const controls = new THREE.OrbitControls( camera, renderer.domElement );

renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement ); //création de la scène
renderer.setClearColor( 0x000000, 0); //couleur de fond du canvas
renderer.render(scene,camera);

const texture = new THREE.TextureLoader().load( '../357.jpg' );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 0.3, 0.3 );

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

//Ajout d'un point pour une lumiere
const light = new THREE.PointLight( 0xFFFFFF, 1, 10 );
light.position.set( 0, 1, 4 );
light.castShadow = true;
scene.add( light );
const ambient = new THREE.AmbientLight( 0xFFFFFF,2 ); // lumiere ambiante histoire de voir quelque chose
scene.add( ambient );

light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;


//Permet de tourner dans la scene
function animate() {

    requestAnimationFrame( animate );

    controls.update();

    renderer.render( scene, camera );

}


let m = 4; // Degré égale 4 pour plus de précisions


animate();

let points = []; // tableau de points
let vector = [];
camera.position.z = 5;


let final2;
//fonction qui calcule les points de la courbe Bspline
function Bspline(){
    console.log(points)
    let final=[];
    final2=[];
    let x = 0;
    let y = 0;
    let z = 0;
    for(let i=0;i< points.length + m +1;i++) {
        vector.push(parseInt(i));
        console.log(i)
    }
    console.log(vector)
    //for(let k =0 ; k< points.length + m +1;k++) vector[k]=k;
    for(t=vector[m]; t<vector[points.length]; t+=0.1){
        x = 0;
        y = 0;
        z = 0;


        for(let i=0; i < points.length ;i++){
            let spline = BsplineRec(vector,m,i,t);

            x += points[i].x * spline;
            y += points[i].y * spline;
            z += points[i].z *spline;

        }
        final2.push(new THREE.Vector3(x,y,z))
        console.log(final2)

    }

}


//function qui fait les calculs recursif des fonctions Bsplines`
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

//Ajout des points de controles
points.push(new THREE.Vector3(-2.20,0.4,0));
points.push(new THREE.Vector3(-2.20,0.4,0));
points.push(new THREE.Vector3(-2.20,0.4,0));
points.push(new THREE.Vector3(-2.20,0.4,0));
points.push(new THREE.Vector3(2.2071186440677963,0.4,0));
points.push(new THREE.Vector3(2.762504708097929,0.5337476459510359,0));
points.push(new THREE.Vector3(2.9933145009416195,0.9160263653483994,0));
points.push(new THREE.Vector3(3.462146892655367,1.1179849340866292,0));
points.push(new THREE.Vector3(3.9742561205273064,1.0747080979284371,0));
points.push(new THREE.Vector3(4.306162162162162,0.8249729729729731,0));
points.push(new THREE.Vector3(4.306162162162162,0.8249729729729731,0));
points.push(new THREE.Vector3(3.3900188323917138,0.6275141242937855,0));
points.push(new THREE.Vector3(3.2241242937853096,-0.1081920903954805,0));
points.push(new THREE.Vector3(3.8372128060263644,-0.5265348399246709,0));
points.push(new THREE.Vector3(4.63783427495292,0.06491525423728796,0));
points.push(new THREE.Vector3(4.63783427495292,-0.014425612052730848,0));
points.push(new THREE.Vector3(4.565706214689266,-0.4832580037664783,0));
points.push(new THREE.Vector3(4.104086629001883,-0.8655367231638414,0));
points.push(new THREE.Vector3(3.216911487758945,-0.9520903954802258,0));
points.push(new THREE.Vector3(2.784143126177024,-0.5842372881355934,0));
points.push(new THREE.Vector3(2.639594594594595,-0.4275405405405404,0));
points.push(new THREE.Vector3(2.20,-0.4,0));
points.push(new THREE.Vector3(-2.2071186440677963,-0.4,0));
points.push(new THREE.Vector3(-2.762504708097929,-0.5337476459510359,0));
points.push(new THREE.Vector3(-2.9933145009416195,-0.9160263653483994,0));
points.push(new THREE.Vector3(-3.462146892655367,-1.1179849340866292,0));
points.push(new THREE.Vector3(-3.9742561205273064,-1.0747080979284371,0));
points.push(new THREE.Vector3(-4.306162162162162,-0.8249729729729731,0));
points.push(new THREE.Vector3(-4.306162162162162,-0.8249729729729731,0));
points.push(new THREE.Vector3(-3.3900188323917138,-0.6275141242937855,0));
points.push(new THREE.Vector3(-3.2241242937853096,0.1081920903954805,0));
points.push(new THREE.Vector3(-3.8372128060263644,0.5265348399246709,0));
points.push(new THREE.Vector3(-4.63783427495292,-0.06491525423728796,0));
points.push(new THREE.Vector3(-4.63783427495292,0.014425612052730848,0));
points.push(new THREE.Vector3(-4.565706214689266,0.4832580037664783,0));
points.push(new THREE.Vector3(-4.104086629001883,0.8655367231638414,0));
points.push(new THREE.Vector3(-3.216911487758945,0.9520903954802258,0));
points.push(new THREE.Vector3(-2.784143126177024,0.5842372881355934,0));
points.push(new THREE.Vector3(-2.639594594594595,0.4675405405405404,0));
points.push(new THREE.Vector3(-2.20,0.4,0));
points.push(new THREE.Vector3(-2.20,0.4,0));
points.push(new THREE.Vector3(-2.20,0.4,0));
points.push(new THREE.Vector3(-2.20,0.4,0));



console.log(points)
Bspline();
renderer.render(scene, camera);


//Permet de pouvoir fermé la fourche de gauche
let leftside = []
leftside.push(new THREE.Vector3(-2.8747711271441068,0.6519366298468073, 0))
leftside.push(new THREE.Vector3(-2.813791808842754,0.6024437506286051, 0))
leftside.push(new THREE.Vector3(-2.7606179570248326,0.5593105808825863, 0))
leftside.push(new THREE.Vector3(-2.711584434010293,0.5242352712882445, 0))
leftside.push(new THREE.Vector3(-2.6595574387947387,0.3804755178907922, 0))
leftside.push(new THREE.Vector3(-2.623958559949791,0.29153921531703386, 0))
leftside.push(new THREE.Vector3(-2.5955503678593934,0.1950583176396978, 0))
leftside.push(new THREE.Vector3(-2.5655619246704395,0.09065775894541252, 0))
leftside.push(new THREE.Vector3(-2.54627247708726,-0.02082577526676387, 0))
leftside.push(new THREE.Vector3(-2.5410114563716255,-0.1373438480853439, 0))
leftside.push(new THREE.Vector3(-2.5540416308851164,-0.25573532705583935, 0))
leftside.push(new THREE.Vector3(-2.5892737840552296,-0.3728159987444774, 0))
leftside.push(new THREE.Vector3(-2.648981392341475,-0.4864681833019169, 0))
leftside.push(new THREE.Vector3(-2.733683777777752,-0.5957397903326772, 0))
leftside.push(new THREE.Vector3(-2.8421461079723467,-0.7008443188951387, 0))


//on fait une section du vecteur de points de la courbe Bspline
//On veut recuperer que les points de la fourche gauche
// Et on va ensuite fermer la forme avec l'array leftside
let left = final2.filter((e)=>{
    return e.x <-2.7
}).concat(leftside);


//on crée ensuite la forme de cette fourche gauche
let shape = new THREE.Shape(left);
//on lui donne un relief, une texure, et on l'ajoute a la scene
let extrudedGeometry = new THREE.ExtrudeGeometry(shape, {depth: 0.30, bevelEnabled: false});
let extrudedMesh = new THREE.Mesh(extrudedGeometry, new THREE.MeshStandardMaterial({roughness: 0.5, metalness: 0.75,map: texture,side: THREE.DoubleSide}));
extrudedMesh.renderOrder = 1;
scene.add(extrudedMesh);
//le faire des 2 cotés permet de placer la barre du milieu plus facilement
extrudedGeometry = new THREE.ExtrudeGeometry(shape, {depth: -0.20, bevelEnabled: false});
extrudedMesh = new THREE.Mesh(extrudedGeometry, new THREE.MeshStandardMaterial({roughness: 0.5, metalness: 0.75,map: texture,side: THREE.DoubleSide}));
scene.add(extrudedMesh);
extrudedMesh.renderOrder = 1;
console.log(final2)

//Permet de pouvoir fermé la fourche de droite
let rightside = [];
rightside.push(new THREE.Vector3(2.8747711271441068,-0.6519366298468073, 0))
rightside.push(new THREE.Vector3(2.813791808842754,-0.6024437506286051, 0))
rightside.push(new THREE.Vector3(2.7606179570248326,-0.5593105808825863, 0))
rightside.push(new THREE.Vector3(2.711584434010293,-0.5242352712882445, 0))
rightside.push(new THREE.Vector3(2.6595574387947387,-0.3804755178907922, 0))
rightside.push(new THREE.Vector3(2.623958559949791,-0.29153921531703386, 0))
rightside.push(new THREE.Vector3(2.5955503678593934,-0.1950583176396978, 0))
rightside.push(new THREE.Vector3(2.5655619246704395,-0.09065775894541252, 0))
rightside.push(new THREE.Vector3(2.54627247708726,0.02082577526676387, 0))
rightside.push(new THREE.Vector3(2.5410114563716255,0.1373438480853439, 0))
rightside.push(new THREE.Vector3(2.5540416308851164,0.25573532705583935, 0))
rightside.push(new THREE.Vector3(2.5892737840552296,0.3728159987444774, 0))
rightside.push(new THREE.Vector3(2.648981392341475,0.4864681833019169, 0))
rightside.push(new THREE.Vector3(2.733683777777752,0.5957397903326772, 0))
rightside.push(new THREE.Vector3(2.8421461079723467,0.7008443188951387, 0))

//on fait pareil que la fourche gauche
let right = final2.filter((e)=>{
    return e.x >2.7
}).concat(rightside);

shape =new THREE.Shape(right);


extrudedGeometry = new THREE.ExtrudeGeometry(shape, {depth: 0.30, bevelEnabled: false});
extrudedMesh = new THREE.Mesh(extrudedGeometry, new THREE.MeshStandardMaterial({roughness: 0.5, metalness: 0.75,map: texture,side: THREE.DoubleSide}));
extrudedMesh.renderOrder = 1;
scene.add(extrudedMesh);

extrudedGeometry = new THREE.ExtrudeGeometry(shape, {depth: -0.20, bevelEnabled: false});
extrudedMesh = new THREE.Mesh(extrudedGeometry, new THREE.MeshStandardMaterial({roughness: 0.5, metalness: 0.75,map: texture,side: THREE.DoubleSide}));
extrudedMesh.renderOrder = 1;
scene.add(extrudedMesh);


//Pour la barre
final2 = final2.filter(e=>(e.x <= 2.8 && e.x>=-2.8));
//on prend juste la barre entre les deux fourches
shape =new THREE.Shape(final2)
//et on lui ajoute une epaisseur
extrudedGeometry = new THREE.ExtrudeGeometry(shape, {depth: 0.1, bevelEnabled: true,bevelThickness: 0.1,bevelSize: 0.1, bevelOffset: -0.1, bevelSegments: 20});extrudedMesh = new THREE.Mesh(extrudedGeometry, new THREE.MeshStandardMaterial({roughness: 0.5, metalness: 0.75,map: texture,side: THREE.DoubleSide}));
extrudedMesh.renderOrder = 0;
scene.add(extrudedMesh);
console.log(scene)
renderer.render(scene,camera)



