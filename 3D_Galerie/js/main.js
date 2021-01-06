window.addEventListener("load", event => main());
window.addEventListener("resize", event => resize());
var clavier = {};

const addTabP =(imgUrl) =>{


    const texture = new THREE.TextureLoader().load(imgUrl);

    const geometry = new THREE.BoxGeometry(8, 4, 0.1);
    const material = new THREE.MeshBasicMaterial( { map : texture} );
    const tab = new THREE.Mesh( geometry, material );
    
    
    tab.position.x =  0 ;
    tab.position.y =  0 ;
    tab.position.z =  0 ;
    tab.rotation.y = Math.PI/2 ;

    return tab;

} 

const addTabToWall =(imgUrl,wall,pos,wallTab) =>{

    let posW = [12,6,0,-6,-12,15,-15,12,6,0,-6,-12];
    const texture = new THREE.TextureLoader().load(imgUrl);
    if(wall == wallTab[0] || wall == wallTab [3]){ geometry = new THREE.BoxGeometry(5, 3, 0.1);}else {geometry = new THREE.BoxGeometry(14, 7.5, 0.1);} //console.log(geometry);}
 
    const material = new THREE.MeshBasicMaterial( { map : texture} );
  
    const tab = new THREE.Mesh( geometry, material );
    
    switch (wall){

        case wallTab [0] :
            tab.position.x = posW[pos]; 
            tab.position.z = wall.position.z +0.1;
            tab.position.y = -5;
            break;
        case wallTab [3] :
            tab.position.x = posW[pos]; 
            tab.position.z = wall.position.z -0.1;
            tab.position.y = -5;
            break;
        case wallTab [1] :
            tab.rotation.y = Math.PI/2;
            tab.position.x = posW[5];
            tab.position.z = wall.position.z+0.1;
            tab.position.y = -2;
            break;
        case wallTab [2] :
            tab.rotation.y = Math.PI/2;
            tab.position.x = posW[6];
            tab.position.z = wall.position.z+0.1;
            tab.position.y = -2;
    
    }
    return tab;
} 
const main = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );


    document.body.appendChild( VRButton.createButton( renderer ) );
    renderer.xr.enabled = true;



    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    var geometryF = new THREE.PlaneGeometry(30 , 20 , 30);
    const texture = new THREE.TextureLoader().load('img/floor.jpg');
	var materialF = new THREE.MeshLambertMaterial ({map:texture ,side: THREE.DoubleSide});

	var floor = new THREE.Mesh( geometryF, materialF );
	floor.rotation.x += Math.PI / 2;
    floor.position.setY(-7.5);
    

    var geometryR = new THREE.PlaneGeometry(30 , 20 , 30);
    const textureR = new THREE.TextureLoader().load('img/roofv2.jpg');
	var materialR = new THREE.MeshLambertMaterial ({map:textureR ,side: THREE.DoubleSide});

	var roof = new THREE.Mesh( geometryR, materialR );
	roof.rotation.x += Math.PI / 2;
    roof.position.setY(7.5);
    
    scene.add( floor );
    scene.add(roof);
    
    wallGroup = new THREE.Group();
	scene.add(wallGroup);

    wall1 = new THREE.Mesh(new THREE.BoxGeometry(30,15, 0.001), new THREE.MeshLambertMaterial({color: 0xB1B2B3}));
	wall2 = new THREE.Mesh(new THREE.BoxGeometry(20,15, 0.001), new THREE.MeshLambertMaterial({color: 0xB1B2B3}));
	wall3 = new THREE.Mesh(new THREE.BoxGeometry(20,15, 0.001), new THREE.MeshLambertMaterial({color: 0xB1B2B3}));
	wall4 = new THREE.Mesh(new THREE.BoxGeometry(30,15, 0.001), new THREE.MeshLambertMaterial({color: 0xB1B2B3}));

    wallGroup.add(wall1, wall2, wall3, wall4);
    let wallTab = [wall1, wall2, wall3, wall4];

    
    wall1.position.z = -10;
    wall2.position.x = -15;
    wall2.rotation.y = Math.PI/2;
    wall3.rotation.y = - Math.PI/2; 
    wall3.position.x = 15; 
    wall4.position.z = 10;
    
    tabs = ['img/caravage1.jpg','img/caravage2.jpg' , 'img/caravage3.jpg', 'img/caravage4.jpg', 'img/caravage5.jpg' ,'img/banksy1.jpg', 'img/crtH.jpg','img/magritte.jpg', 'img/gericault.jpg', 'img/courbet.jpg','img/cabanel.jpg','img/jsDinner.jpg'];

  ;
    for (let j = 0 ; j < tabs.length ;j++) {
        switch (true){
            case j<5 :  
                tab = addTabToWall(tabs[j],wall1,j,wallTab);
                scene.add(tab);
                break;  
            case j == 5 :            
                tab = addTabToWall(tabs[j],wall3,j,wallTab);
                scene.add(tab);
                break;  
            case j == 6 :            
                tab = addTabToWall(tabs[j],wall2,j,wallTab);
                scene.add(tab);
                break;    
            case j >6 :
                tab = addTabToWall(tabs[j],wall4,j,wallTab);
                scene.add(tab);
                break;        
        }
    }
    
    //const axesHelper = new THREE.AxesHelper( 5 );
    //scene.add( axesHelper );
    camera.position.z = 5;
    //lights
    var light = new THREE.PointLight( 0xffffff, 2.0, Infinity );
    var light2 = new THREE.PointLight( 0xffffff, 2.0, Infinity );
    light.position.set( 50, 50, 50 );
    light2.position.set( -50, -50, -50 );
    scene.add( light );
    scene.add(light2);

    camera.position.set( 8, 0, 0 );
    const loadBtnN = document.querySelector('#next');
    const loadBtnP = document.querySelector('#prev');
   
    let i = 0;
    let p = 0; 
    loadBtnN.addEventListener('click', () => { 
        i+=1;
        if(i<0){p=-i}else{p=i};
        tab = addTabP(tabs[p%tabs.length]);
        scene.add(tab);  
      });

      loadBtnP.addEventListener('click', () => {
        i -=1;
        if(i<0){p=-i}else{p=i};
        tab = addTabP(tabs[p%tabs.length]);
        scene.add(tab);
        });
  
    function animate() {

        if(clavier[90]){ // Z 
			camera.position.x -= Math.sin(camera.rotation.y) * 0.2;
			camera.position.z -= Math.cos(camera.rotation.y) * 0.2;
		}
		if(clavier[83]){ // S 
			camera.position.x += Math.sin(camera.rotation.y) * 0.2;
			camera.position.z += Math.cos(camera.rotation.y) * 0.2;
		}if(clavier[68]){ // D 
			camera.position.x += 0.2;		
		}
		if(clavier[81]){ // Q 
			camera.position.x -= 0.2;			
		}
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
       
        controls.update();
    }

    function toucheEnf(event){
        clavier[event.keyCode] = true;
        }
    
        function toucheNEnf(event){
            clavier[event.keyCode] = false;
        }
    
        window.addEventListener('keydown', toucheEnf);
        window.addEventListener('keyup', toucheNEnf);

    animate();
}
