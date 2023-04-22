var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var size = 1000;
var arrowSize = 5;
var divisions = 1000;
var origin = new THREE.Vector3( 0, 0, 0 );
var x = new THREE.Vector3( 1, 0, 0 );
var y = new THREE.Vector3( 0, 1, 0 );
var z = new THREE.Vector3( 0, 0, 1 );
var color2 = new THREE.Color( 0x333333 );
var colorR = new THREE.Color( 0xAA0000 );
var colorG = new THREE.Color( 0x00AA00 );
var colorB = new THREE.Color( 0x0000AA );

//Creacion de la guia (guilla)
var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

//Creacion de los  ejes
var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );

//Creacion de la camara
var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
camera.position.z = 12;
camera.position.y = 12;
camera.position.x = 12;
const light = new THREE.AmbientLight(0x404040, 5);

var lado = 5;
var base = 0.2 * lado;

var beta = 25*Math.PI/180;
var alfa = 225*Math.PI/180;
var gamma = 270*Math.PI/180;

//Generamos las figuras
const paralepipedo = CrearParalepipedo(lado, base);

//Trasladar objetos
TrasladarObjeto(paralepipedo[0], 0, lado/2, 0);
TrasladarObjeto(paralepipedo[1], 0, 3*lado/2, 0);

//Agrupamos las figuras
var brazo = new THREE.Object3D();

brazo.add(paralepipedo[0]);
brazo.add(paralepipedo[1]);

//Rotamos las figuras
RotarObjeto(brazo, z, beta);
brazo.rotation.y = 180*Math.PI/180
RotarObjeto(paralepipedo[1], z, alfa);
TrasladarObjeto(paralepipedo[1], -1.9, 7.1, 0);

//Escena
scene.add(arrowX, arrowY, arrowZ, gridHelperXZ, camera, light);
scene.add(brazo);
const controls = new THREE.OrbitControls(camera, renderer.domElement);  
animate();
