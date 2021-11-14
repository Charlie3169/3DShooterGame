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


const FOV = 75;
const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x27ccbb} );
const box = new THREE.Mesh( geometry, material );
scene.add(box);

camera.position.z = 5;

function animate() {
	requestAnimationFrame(animate);
  box.rotateX(0.01);
  box.rotateY(0.01);  
	renderer.render(scene, camera);    
}
animate();




const arenaXSize = 100;
const arenaYSize = 100;
const arenaZSize = 100;

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


document.addEventListener('keydown', function(event) {

    if(event.code == 'ShiftLeft'){}	
        //Player z down
    
    if(event.code == 'Space'){}	  
        //Player z up
    

    if(event.code == 'KeyW'){}	       
        //Player x forward
    

    if(event.code == 'KeyS'){}	
		//Player x backward
    
	if(event.code == 'KeyA'){}	         
        //Player y left

	if(event.code == 'KeyD'){}	          
        //Player y right
        
})


function Player(x, y, z, dx, dy, dz, health, mana) {


}



