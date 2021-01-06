window.addEventListener("load", event => main());
window.addEventListener("resize", event => resize());
var clavier = {};
var perso = { height:11.8, pas:0.2 };

const resize = () => {

	console.log("resize", window.innerWidth, window.innerHeight);

};

const createCube = (color, x, y, z) => {

	// create cube geom and material
	var geometry = new THREE.BoxGeometry();
	var material = new THREE.MeshLambertMaterial( { color: color } );
	var cube = new THREE.Mesh( geometry, material );
	return cube;
};

const createSphere = (color) =>{

	var geometry = new THREE.SphereGeometry (3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
	var material = new THREE.MeshLambertMaterial ( {color: color ,wireframe : true});
	var sphere = new THREE.Mesh(geometry,material);

	return sphere;
}

const createDiam = () => {

	
	const front = Math.tan(Math.PI / 6)
	const back = Math.cos(Math.PI / 6)
	const vertices = [
	  0, 1, 0, // 0: top
	  1, 0, front, // 1: right
	  -1, 0, front, // 2: left
	  0, 0, -back, // 3: back middle
	  0, -1, 0, // 4: bottom
	]
	const faces = [
	  2, 1, 0, // left, right, top
	  1, 3, 0, // right, back, top
	  3, 2, 0, // back, left, top
	  2, 4, 1, // left, bottom, right
	  1, 4, 3, // right, bottom, back
	  3, 4, 2, // back, bottom, left
	]
	const geometry = new THREE.PolyhedronGeometry(vertices, faces, 2, 0);
	const material = new THREE.MeshLambertMaterial();
	const diam = new THREE.Mesh(geometry, material);
	return diam;

} 


const CreateTore = () =>{
	
var geometry = new THREE.TorusGeometry( 3, 0.5 , 10, 106, 6.3 );
var material = new THREE.MeshLambertMaterial( { color: 0xC39072 , wireframe : false } );
var torus = new THREE.Mesh( geometry, material );
return torus;

}
/*
const CameraMove = (cam) =>{

	let ctrl = new THREE.TrackballControls(cam);

	return crlt
}*/

const main = () => {

	console.log("hello world");

	// initialisation de la scène
	var scene = new THREE.Scene();

	// init camera
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	// web gl renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor (0xffffff, 0.5);
	document.body.appendChild( renderer.domElement );

	//add floor to scene
	var geometry = new THREE.PlaneGeometry(30 , 20 , 32);
	var material = new THREE.MeshLambertMaterial ({color: 0x13487B, side: THREE.DoubleSide});

	var floor = new THREE.Mesh( geometry, material );
	floor.rotation.x += Math.PI / 2;
	floor.position.setY(-3);
	scene.add( floor ); 
	
	var geom = new THREE.SphereGeometry(2, 3, 8, 2 , 6.3 ,1 ,6.3);
	var mat  = new THREE.MeshLambertMaterial({color : 0xD71010 , wireframe : true});
	var forme = new THREE.Mesh(geom , mat);
	scene.add(forme);
	forme.position.setX(10);
	forme.position.setY(5);

	var cube = createCube("#FF0000");
	// add cube to scene
	scene.add( cube );

	var recube = createCube("#00FF00");
	// add cube to scene
	scene.add( recube );
	
	var sphere = createSphere("#3C6F9F");
	scene.add(sphere);
	sphere.position.setX(-10);
	recube.position.setY(5);
	//sphere.position.setX(0);
	camera.position.z = 15;

	//camera.position.z = 3;

	var diam = createDiam();
	scene.add(diam);
	diam.position.setX(10);


	var cercle = CreateTore();
	scene.add(cercle);
	cercle.position.setY(5);

	

	var light = new THREE.PointLight( 0xffffff, 2.0, Infinity );
	light.position.set( 50, 50, 50 );
	scene.add( light );

	const controls = new THREE.OrbitControls( camera , renderer.domElement);

	//camera.position.set( 0, 20, 100 );
	controls.update();

	
	animate();

	// animate loop
	function animate() {
		requestAnimationFrame( animate ); // request next frame
		
		// move cube
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		// move cube
		recube.rotation.x -= 0.01;
		recube.rotation.y -= 0.01;
		
		//move sphere
		//sphere.rotation.x -= 0.01;
		sphere.rotation.y -= 0.01;

		//move diam
		diam.rotation.y +=0.01;

		//move cercle
		cercle.rotation.x += 0.01;

		forme.rotation.x += 0.01;

		//Mouvement de la camera a l'aide clavier
		if(clavier[90]){ // Z 
			camera.position.x -= Math.sin(camera.rotation.y) * perso.pas;
			camera.position.z -= Math.cos(camera.rotation.y) * perso.pas;
		}
		if(clavier[83]){ // S 
			camera.position.x += Math.sin(camera.rotation.y) * perso.pas;
			camera.position.z += Math.cos(camera.rotation.y) * perso.pas;
		}
		if(clavier[68]){ // D 
			camera.position.x += perso.pas;
			
		}
		if(clavier[81]){ // Q 
			camera.position.x -= perso.pas;
			
		}


		// render !
		renderer.render( scene, camera );
	}


	

	function toucheEnf(event){
	clavier[event.keyCode] = true;
	}

	function toucheNEnf(event){
		clavier[event.keyCode] = false;
	}

	window.addEventListener('keydown', toucheEnf);
	window.addEventListener('keyup', toucheNEnf);

};


