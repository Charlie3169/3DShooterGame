import * as THREE from 'three';

import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import Projectile from './Projectile';

//===================================================//
//                 Initializations                   //
//===================================================//

let camera;
let scene;
let renderer;
let controls;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

const FOV  = 75;
const arenaSize  = 700;
const moveSpeed = 400.0;

const color = 0xeeeeff;
const intensity = 0.75;

let prevTime  = performance.now();

const ballSpeed = 5;
const ballSize = 17;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();


let projectiles = [];


//===================================================//
//                      Setup                        //
//===================================================//

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 1, 1500);    


    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 0, 2000);    

    controls = new PointerLockControls(camera, document.body);

    
    const light = new THREE.HemisphereLight(color, 0x777788, intensity);    
    scene.add(light);    


    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);    
    document.body.appendChild(renderer.domElement);
        

    blocker();
    onWindowResize();
    moveControls();    
    clickControls();        
    
    populateSceneWithJunk();
    //startingCircle();
    arenaBox();
    

}

function blocker() {

  const blocker = document.getElementById('blocker');
  const instructions = document.getElementById('instructions');

  instructions.addEventListener('click', function () {        

      controls.lock();
  });

  controls.addEventListener('lock', function () {

      instructions.style.display = 'none';
      blocker.style.display = 'none';

  });

  controls.addEventListener('unlock', function () {

      blocker.style.display = 'block';
      instructions.style.display = '';

  });

  scene.add(controls.getObject());

}

function onWindowResize() {

  window.addEventListener('resize', function() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

  });   

}

//===================================================//
//                   Environment                     //
//===================================================// 

function populateSceneWithJunk() {

  for (let i = 0; i < 100; i ++) {

    const boxGeometry = new THREE.BoxGeometry(10, 10, 10).toNonIndexed();
    const boxMaterial = new THREE.MeshBasicMaterial({color: 0x343aeb});        
    let box = new THREE.Mesh(boxGeometry, boxMaterial);
            
    box.position.x = Math.floor(Math.random() * arenaSize);
    box.position.y = Math.floor(Math.random() * arenaSize);
    box.position.z = Math.floor(Math.random() * arenaSize);

    scene.add(box);        
  }

}

function arenaBox(){

  for (let i = 0; i < 7; i++) {      

    const arenaBoxGeometry = new THREE.BoxGeometry(arenaSize, arenaSize, arenaSize).toNonIndexed();
    const wireframe = new THREE.EdgesGeometry(arenaBoxGeometry);
    const arenaBoxMaterial = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 4});    
    const arenaBox = new THREE.LineSegments(wireframe, arenaBoxMaterial);  

    arenaBox.position.x = (arenaSize / 2);
    arenaBox.position.y = (arenaSize / 2);
    arenaBox.position.z = (arenaSize / 2);

    switch(i) {
      case 0:

        break;

      case 1:
        arenaBox.position.x = (arenaSize / 2) + arenaSize;
        break;

      case 2:
        arenaBox.position.x = (arenaSize / 2) - arenaSize;
        break;

      case 3:
        arenaBox.position.y = (arenaSize / 2) + arenaSize;
        break;

      case 4:
        arenaBox.position.y = (arenaSize / 2) - arenaSize;
        break;
      case 5:
        arenaBox.position.z = (arenaSize / 2) + arenaSize;
        break;
      case 6:
        arenaBox.position.z = (arenaSize / 2) - arenaSize;
        break;  
      
    }

    scene.add(arenaBox); 
    
  }  

  
}

function arenaWrapping() {

  if (controls.getObject().position.x < 0) controls.getObject().position.x = arenaSize;  
  if (controls.getObject().position.y < 0) controls.getObject().position.y = arenaSize;  
  if (controls.getObject().position.z < 0) controls.getObject().position.z = arenaSize;    

  if (controls.getObject().position.x > arenaSize) controls.getObject().position.x = 0;  
  if (controls.getObject().position.y > arenaSize) controls.getObject().position.y = 0;  
  if (controls.getObject().position.z > arenaSize) controls.getObject().position.z = 0; 
  
}


//===================================================//
//                     Controls                      //
//===================================================// 

function shootEvent()
{
  let projectile = new Projectile(
    camera.position.x,
    camera.position.y,
    camera.position.z,
    camera.getWorldDirection(new THREE.Vector3()),
    ballSpeed,
    ballSize, 
    0x27ccbb,
    arenaSize
  );  

  projectiles.push(projectile);  
  scene.add(projectile);  

}

function clickControls()
{
  document.addEventListener('click', function(event) {

    if (controls.isLocked === true) {        

      /*
      
      const sphereGeometry = new THREE.SphereGeometry(7, 32, 16).toNonIndexed();
      const sphereMaterial = new THREE.MeshBasicMaterial({color: 0x27ccbb});        
      let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);              
      
      sphere.position.x = camera.position.x;
      sphere.position.y = camera.position.y;
      sphere.position.z = camera.position.z;
      
      projectiles.push(sphere); 
      scene.add(sphere);  
      */
      
      shootEvent();      
    }
    
  });  
}

function moveControls() {
  
  document.addEventListener('keydown', function(event) {

    switch (event.code) {
            
      case 'KeyW':
          moveForward = true;
          break;
      
      case 'KeyA':
          moveLeft = true;
          break;
      
      case 'KeyS':
          moveBackward = true;
          break;
      
      case 'KeyD':
          moveRight = true;
          break;

      case 'Space':                
          moveUp = true;
          break;

      case 'ShiftLeft':                
          moveDown = true;
          break;

    }

  });


  document.addEventListener('keyup', function(event) {
    
    switch (event.code) {
            
      case 'KeyW':
          moveForward = false;
          break;
      
      case 'KeyA':
          moveLeft = false;
          break;
      
      case 'KeyS':
          moveBackward = false;
          break;
      
      case 'KeyD':
          moveRight = false;
          break;

      case 'Space':                
          moveUp = false;
          break;

      case 'ShiftLeft':                
          moveDown = false;
          break;

    }

  });

  
}

//===================================================//
//                    Animation                      //
//===================================================// 

function update() {

  const time = performance.now();
  if (controls.isLocked === true) {      

      const delta = (time - prevTime) / 200;

      velocity.x -= velocity.x * 3.5 * delta;
      velocity.z -= velocity.z * 3.5 * delta;
      velocity.y -= velocity.y * 3.5 * delta;

      direction.z = Number(moveForward) - Number(moveBackward);
      direction.x = Number(moveRight) - Number(moveLeft);
      direction.y = Number(moveDown) - Number(moveUp);
      direction.normalize(); // this ensures consistent movements in all directions

      if (moveForward || moveBackward) velocity.z -= direction.z * moveSpeed * delta;
      if (moveLeft || moveRight) velocity.x -= direction.x * moveSpeed * delta;
      if (moveUp || moveDown) velocity.y -= direction.y * moveSpeed * delta;
      
      
      controls.moveRight(- velocity.x * delta);
      controls.moveForward(- velocity.z * delta);
      controls.getObject().position.y += (velocity.y * delta); // new behavior    
      
      arenaWrapping();     
      projectiles.forEach(e => e.updatePosition());     
      

  }
  


  prevTime = time;

}



function render() {
  renderer.render(scene, camera);
}

function animate() {

  requestAnimationFrame(animate);    
  render();
  update();

}

