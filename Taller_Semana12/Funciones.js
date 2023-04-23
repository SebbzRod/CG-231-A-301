/**
 * CrearParalepipedo: Construye 2 paralepides y los retorna
 * ENTRADAS: lado = Variable num, tamaño del lado del paralepipedo que se crearán en la escena.
 *           base = Variable num, tamaño de la base y ancho del paralepipedo que se crearán en la escena.
 * SALIDAS: paralepipedo = Array con los objetos Mesh de Three.js correspondientes a cada figura.
*/
function CrearParalepipedo(lado, base) {

    const dimensiones = [ [base, lado, base], [base, lado, base] ];
    const color = [0xff0000, 0x00ff00];
    const material = [ new THREE.MeshMatcapMaterial({ color: color[0] }), new THREE.MeshMatcapMaterial({ color: color[1] })];
  
    //Dimensiones para cada figura
    const geometry = [];
    for (let i = 0; i < 2; i++) {
        geometry.push(new THREE.BoxGeometry(...dimensiones[i]));
    }

    const paralepipedo = [];
    for (let i = 0; i < 2; i++) {
        paralepipedo.push(new THREE.Mesh(geometry[i], material[i]));
    }

    //Grafricar y retornar las figuras
    for (let i = 0; i < 2; i++) {        
        scene.add (paralepipedo[i]);
    }
  
    return paralepipedo;

}
/**
 * RotarObjeto: Aplica rotacion a un objeto THREE.js en un eje y angulo determinado.  
 * ENTRADAS: objeto = Objeto THREE.js que se desea rotar.
 *           eje = Eje en el cual se realizara la rotacion.
 *           angulo = El ángulo de rotación en radianes.
*/
function RotarObjeto( objeto, eje, angulo) {
    
    const quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(eje, angulo);
  
    objeto.quaternion.multiply(quaternion);
    
}
/**
 * TrasladarObjeto: Aplica traslacion a un objeto THREE.js.  
 * ENTRADAS: Objeto = Objeto THREE.js que se va a trasladar.
 *           X = Coordenada en X a la sque se va a trasladar el objeto.
 *           Y = Coordenada en Y a la sque se va a trasladar el objeto.
 *           Z = Coordenada en Z a la sque se va a trasladar el objeto.
*/
function TrasladarObjeto( objeto, X, Y, Z) {

    objeto.position.set(X, Y, Z)

}
/**
* Animate: Funcion creada para trabajar con una escena, una cámara y un objeto de control de cámara.
*/
function animate() {

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);   
  
}
