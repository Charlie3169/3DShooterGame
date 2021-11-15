/*
import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from 'three';
import SeedScene from './objects/Scene.js';

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({antialias: true});
const seedScene = new SeedScene();

// scene
scene.add(seedScene);

// camera
camera.position.set(6,3,-10);
camera.lookAt(new Vector3(0,0,0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1);

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => { 
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);

// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );
*/

import * as THREE from 'three';
import { PointerLockControls } from './jsm/controls/PointerLockControls.js.js.js';


const arenaXSize = 100;
const arenaYSize = 100;
const arenaZSize = 100;

const FOV = 75;
const aspect = window.innerWidth / window.innerHeight;
//====================================//

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

const camera = new THREE.PerspectiveCamera(FOV, aspect, 0.1, 1000 );
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);




//====================================//
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x27ccbb} );
const box = new THREE.Mesh( geometry, material );

//=================================================================//
const controls = new PointerLockControls( camera, document.body );
const blocker = document.getElementById( 'blocker' );
const instructions = document.getElementById( 'instructions' );

instructions.addEventListener( 'click', function () {

  controls.lock();

} );

controls.addEventListener( 'lock', function () {

  instructions.style.display = 'none';
  blocker.style.display = 'none';

} );

controls.addEventListener( 'unlock', function () {

  blocker.style.display = 'block';
  instructions.style.display = '';

} );
//=================================================================//        

function init() {

  window.addEventListener( 'resize', onWindowResize );
}



function axisBoxes() {

  let zeroBox = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshBasicMaterial( { color: 0x5a32a8} ));
  zeroBox.position.set(0, 0, 0);


  let xBox = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshBasicMaterial( { color: 0xcc2727} ));
  xBox.position.set(arenaXSize, 0, 0);

  let yBox = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshBasicMaterial( { color: 0x273acc} ));
  yBox.position.set(0, arenaYSize, 0);

  let zBox = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshBasicMaterial( { color: 0x31d613} ));
  zBox.position.set(0, 0, arenaZSize);

  scene.add(zeroBox);
  scene.add(xBox);
  scene.add(yBox);
  scene.add(zBox);
}

function initObjects() {
  for (let i = 0; i < 200; i++) {
    let randomBox = new THREE.Mesh( new THREE.BoxGeometry(), new THREE.MeshBasicMaterial( { color: 0x27ccbb} ));
    randomBox.position.set(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100))
    scene.add(randomBox);
  } 
}

function animate() {
	requestAnimationFrame(animate);

  box.rotateX(0.01);
  box.rotateY(0.01);      

	renderer.render(scene, camera);    
}

init();
axisBoxes(); 
initObjects();
animate();


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}


function Circle(x, y, z, dx, dy, dz, radius) {
    
    this.x = x
    this.y = y
    this.z = z
    this.dx = dx
    this.dy = dy
	  this.dz = dz   
    
    this.radius = radius
    

    this.draw = function () {
        
    }         
    
    this.collisionDetection = function (circle) {
                           
    }   
    

    this.update = function () 
    {      
        
        this.x = (this.x + this.dx) % arenaXSize
        this.y = (this.y + this.dy) % arenaYSize
		    this.z = (this.z + this.dz) % arenaZSize

        if(this.x < 0)        
            this.x = arenaXSize;        

        if(this.y < 0)        
            this.y = arenaYSize;      

		    if(this.z < 0)        
            this.z = arenaZSize;      
                                                           
        
        this.draw()                           
    }

}

const cameraRotationSpeed = 0.1
const cameraTranslationSpeed = 0.5;

document.addEventListener('keydown', function(event) {

  if(event.code == 'ShiftLeft') {
    //Player z down
    camera.translateZ(cameraTranslationSpeed)
  }	
      
  
  if(event.code == 'Space') {
    //Player z up
    camera.translateZ(-cameraTranslationSpeed)
  }	  
      
  

  if(event.code == 'KeyW') {
    //Player x forward
    camera.translateX(cameraTranslationSpeed)
  }	       
      
  

  if(event.code == 'KeyS') {
    //Player x backward
    camera.translateX(-cameraTranslationSpeed)
  }	
  
    
	if(event.code == 'KeyA') {
    //Player y left
    camera.translateY(cameraTranslationSpeed)
  }	         
        

	if(event.code == 'KeyD') {
    //Player y right
    camera.translateY(-cameraTranslationSpeed)
  }	          
        

  if(event.code == 'ArrowUp') {
    camera.rotateX(cameraRotationSpeed)
  }    

  if(event.code == 'ArrowDown') {
    camera.rotateX(-cameraRotationSpeed)
  }

  if(event.code == 'ArrowLeft') {
    camera.rotateY(cameraRotationSpeed)
  }    

  if(event.code == 'ArrowRight') {
    camera.rotateY(-cameraRotationSpeed)
  }
        
})


function Player(x, y, z, dx, dy, dz, health, mana) {


}



