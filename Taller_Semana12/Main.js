//Creacion de la ventana del navegador
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var size = 10;
var arrowSize = 5;
var divisions = 10;
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
camera.position.z = 6;
camera.position.y = 4;
camera.position.x = 4;
const light = new THREE.AmbientLight(0x404040, 5);

//Valores parametrizados
var lado = 2;
var base = 0.1 * lado;

var beta = 25*Math.PI/180;  
var alfa = 225*Math.PI/180; 
var gamma = 180*Math.PI/180;

//Generamos las figuras
const paralepipedo = CrearParalepipedo(lado, base);

//Agrupamos las figuras
var brazo = new THREE.Object3D();

brazo.add(paralepipedo[0]);
brazo.add(paralepipedo[1]);

//Traslaciones objetos
TrasladarObjeto(paralepipedo[0], 0, lado/2, 0);
TrasladarObjeto(paralepipedo[1], 0, 3*lado/2, 0);
TrasladarObjeto(paralepipedo[1], -0.368*lado, 1.389*lado, 0);

//Rotamos las figuras
RotarObjeto(brazo, z, beta);
/*
 *Usamos el metodo "rotation.y" ya que este nos permite rotar el brazo alrederdor del eje universal Y, y no 
 *respecto a los ejes individuales del grupo de figuras, como lo hace la funcion RotarObjeto. 
*/
brazo.rotation.y = gamma 
RotarObjeto(paralepipedo[1], z, alfa);


//Escena
scene.add(arrowX, arrowY, arrowZ, gridHelperXZ, camera, light);
scene.add(brazo);
const controls = new THREE.OrbitControls(camera, renderer.domElement);  
animate();
