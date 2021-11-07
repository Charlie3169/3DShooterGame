import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';
//import * as THREE from 'three';

//Starter Three.js code
//Have been unable to get running due to problems with importing 
//Will keeping messing around with it

const FOV = 75;
const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const box = new THREE.Mesh( geometry, material );
scene.add(box);

camera.position.z = 5;

function animate() {
	requestAnimationFrame(animate);
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
    

    this.update = function () {      
        
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


function Player(x, y, z, dx, dy, dz, ) {


}



