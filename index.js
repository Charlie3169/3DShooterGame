import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';

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