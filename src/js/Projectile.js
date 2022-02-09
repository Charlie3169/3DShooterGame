import { Mesh } from "three";
import * as THREE from 'three';
export default class Projectile extends Mesh {
        

    constructor(positionX, positionY, positionZ, direction, speed, size, ballColor, arenaSize) {   

        const geometry = new THREE.SphereGeometry(size, 32, 16).toNonIndexed();
        const material = new THREE.MeshBasicMaterial({color: ballColor});     

        super(geometry, material);    
    
        this.position.x = positionX;
        this.position.y = positionY;
        this.position.z = positionZ;
        this.direction = direction;
        this.speed = speed;
        this.size = size;          
        this.arenaSize = arenaSize;        
   

        this.updatePosition = function () {    

            this.position.x += direction.x * speed;
            this.position.y += direction.y * speed;               
            this.position.z += direction.z * speed;       
                        

            if (this.position.x < 0) this.position.x = arenaSize;  
            if (this.position.y < 0) this.position.y = arenaSize;  
            if (this.position.z < 0) this.position.z = arenaSize;    
            
            if (this.position.x > arenaSize) this.position.x = 0;  
            if (this.position.y > arenaSize) this.position.y = 0;  
            if (this.position.z > arenaSize) this.position.z = 0; 
                
            
                                               
        }

      
    }
  }