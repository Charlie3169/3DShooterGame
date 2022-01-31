import { Vector3 } from "three";
import { Mesh } from "three";
export default class Projectile extends Mesh {

    super( geometry, material );

    constructor(positionX, positionY, positionZ, direction, speed, size, ballColor, arenaSize) {   

     this.positionX = positionX;
     this.positionY = positionY;
     this.positionZ = positionZ;
     this.direction = direction;
     this.speed = speed;
     this.size = size; 
     this.ballColor = ballColor;  
     this.arenaSize = arenaSize;

     this.draw = function () {
        
        const sphereGeometry = new THREE.SphereGeometry(size, 32, 16).toNonIndexed();
        const sphereMaterial = new THREE.MeshBasicMaterial({color: ballColor});        
        const sphere  = new THREE.Mesh(sphereGeometry, sphereMaterial);    

        return sphere;
    }    
   

    this.update = function () {      
        
        
        
        if (positionX < 0) positionX = arenaSize;  
        if (positionY < 0) positionY = arenaSize;  
        if (positionZ < 0) positionZ = arenaSize;    

        if (positionX > arenaSize) positionX = 0;  
        if (positionY > arenaSize) positionY = 0;  
        if (positionZ > arenaSize) positionZ = 0; 
                       
                              
        
        this.draw()                           
    }

      
    }
  }