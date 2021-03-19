var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var cx,ox;

var score;

var PLAY=1;
var END=0;
var gameState =PLAY;

var gameOverImage,restartImage,gameOver,restart;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,800,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  //ground.velocityX = -(6+3*score/100);
  
 // invisibleGround = createSprite(200,190,400,10);
 // invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

ground.setCollider("rectangle",0,0,ground.width,3)
  
  gameOver=createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;
  gameOver.visible = false;
  
  restart=createSprite(300,140);
  restart.addImage(restartImage);
  restart.scale=0.5;
  restart.visible = false;

ox=0
cx=0

}

function draw() {
  background(255);
  
  text("Score: "+ score, camera.position.x+230,50);
  console.log(trex.y);
  
trex.x=camera.position.x-250;


  
  if(gameState===PLAY){
    if(frameCount%4===0){
       score++;
  }

camera.position.x+=6;

if(camera.position.x>ground.width/2+300){

   camera.position.x=300;
   obstaclesGroup.destroyEach();
   cloudsGroup.destroyEach();

}

     //score = score + Math.round(getFrameRate()/60);
    // ground.velocityX = -(6+3*score/100);
    
    if(keyDown("space")&& trex.y>=150) {
    trex.velocityY = -14     ;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
   
  trex.collide(ground);
 // spawnClouds();
  spawnObstacles();
    
   if(obstaclesGroup.isTouching(trex)){
      gameState = END;
     
    }
    
 }
 
 else if(gameState===END){

          gameOver.x=camera.position.x;
          restart.x=camera.position.x
          gameOver.visible=true;
          restart.visible=true;
    
          //ground.velocityX=0;
          trex.velocityY=0;
    
         // obstaclesGroup.setVelocityXEach(0);
          //cloudsGroup.setVelocityXEach(0);
    
          trex.changeAnimation("collided",trex_collided);
    
          obstaclesGroup.setLifetimeEach(-1);
          cloudsGroup.setLifetimeEach(-1);
    
          if(mousePressedOver(restart)){
             reset();          
          }
    
    
 }
  
 drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var cloud = createSprite(camera.position.x+300,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);

    cx+=1
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(camera.position.x+300,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 350;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);

ox+=1;


  }
}
function reset(){
gameState=PLAY;
  
gameOver.visible=false;
restart.visible=false;
  
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
  
trex.changeAnimation("running",trex_running);
camera.position.x=300; 
score=0;
  
}