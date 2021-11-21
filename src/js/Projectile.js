import { Vector3 } from "three";
export default class Projectile {
    constructor(positionX, positionY, positionZ, direction, speed, size, ballColor) {   

     this.positionX = positionX;
     this.positionY = positionY;
     this.positionZ = positionZ;
     this.direction = direction;
     this.speed = speed;
     this.size = size; 
     this.ballColor = ballColor;  

     this.draw = function () {
        
        const sphereGeometry = new THREE.SphereGeometry(size, 32, 16).toNonIndexed();
        const sphereMaterial = new THREE.MeshBasicMaterial({color: ballColor});        
        const sphere  = new THREE.Mesh(sphereGeometry, sphereMaterial);    

        return sphere;
    }    
   

    this.update = function () {      
        
        this.x = (this.x + this.dx) % window.innerWidth
        this.y = (this.y + this.dy) % window.innerHeight
        if(this.x < 0)        
            this.x = window.innerWidth;        

        if(this.y < 0)        
            this.y = window.innerHeight;      
                       
        let sp = 0.01

        for (var i = 0; i < circles.length; i++) 
        { 
            if(this != circles[i])
            {                             
                ctx.beginPath();
                ctx.strokeStyle = Math.random() > .5 ? this.color : circles[i].color
                ctx.lineWidth = 10
                ctx.moveTo(this.x, this.y)
                ctx.lineTo(circles[i].x, circles[i].y)
                ctx.stroke()                  
                      
            }                                   
            
                     
        }                        
        
        this.draw()                           
    }

      
    }
  }