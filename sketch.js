var tower,towerImg
var invisibleBlock
var Play=1
var End=0
var gameState=Play
var gameOver


function preload() {
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png")
  gameOverImg=loadImage("gameOver.png")
  sound=loadSound("spooky.wav")
}


function setup(){
  createCanvas(600,600);
 
  tower=createSprite(300,300)
  tower.addImage("tower1",towerImg)
  tower.velocityY=1

  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost1",ghostImg)
  ghost.scale=0.3

  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  gameOver.scale = 0.08;

  gameOver.visible = false;

  invisibleBlockGroup=new Group()

  doorGroup=new Group()
  climberGroup=new Group()
}
function draw(){

  if (gameState===Play){
  if (tower.y>400){
    tower.y=300
  }

  sound.play()

  if (keyDown("left_arrow")){
    ghost.x=ghost.x-3
  }
  if (keyDown("right_arrow")){
    ghost.x=ghost.x+3
  }
  if (keyDown("space")){
    ghost.velocityY=-5
  }
  ghost.velocityY=ghost.velocityY+0.8

  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0
  }

  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
   ghost.destroy();
   
  gameState=End
  }
}
  else if(gameState===End){
    gameOver.visible = true
    
    doorGroup.setVelocityYEach(0);
    climberGroup.setVelocityYEach(0);

    tower.velocityY=0

  }

  spwanDoors()
  drawSprites()
}

function spwanDoors(){

  if (frameCount%240===0){
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
   
    doorGroup.add(door);
    invisibleBlock.debug = true;
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

