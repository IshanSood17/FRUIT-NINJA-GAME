//variables  
  var sword, sword_image;
  
  var alien, alien_image;

  var fruit;

  var Background, Background_image;

  var fruit1, fruit1_image;
  var fruit2, fruit2_image;
  var fruit3, fruit3_image;
  var fruit4, fruit4_image;

  var fruitGroup, alienGroup;

  var gameover, gameover_image;

  var swoosh, gameOver,checkpoint; 

  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;

  var score = 0;


function preload() {
  
//loading all the images   
  sword_image = loadImage("sword.png");

  alien_image = loadAnimation("alien1.png", "alien2.png");

  Background_image = loadImage("background.png")
  
  fruit1_image = loadImage("fruit1.png");
  fruit2_image = loadImage("fruit2.png");
  fruit3_image = loadImage("fruit3.png");
  fruit4_image = loadImage("fruit4.png");  

  gameover_image = loadImage("gameover.png");  
  
  swoosh = loadSound("swoosh.mp3");
  gameOver = loadSound("gameover.mp3");
  checkpoint = loadSound("checkPoint.mp3");
}

function setup() {
  
//creating the canvas  
createCanvas(400, 400);
  
//sword 
  sword = createSprite(40, 200, 20, 20);
  sword.addImage("Sword", sword_image);
  sword.scale = 0.7;  

//collider of the sword  
  sword.setCollider("circle", 0, 0, 30);  
  sword.debug=false; 

//groups  
  fruitsGroup = new Group();
  aliensGroup = new Group();  
}

function draw() {
  
//background of the screen  
background(Background_image);
  
  
//displaying the score on the screen  
    fill("black");  
    textSize(30); 
    stroke("90");
    text("SCORE : "+ score, 110, 30);

//gamestate that is PLAY  
    if (gameState===PLAY) {
      
//making the sword move according to the mouse      
    sword.x=mouseX; 
    sword.y=mouseY;  
      
//calling the functions      
    fruits();  
    Enemy();
    
    
      
//making the score update when sword touches the fruits      
    if (fruitsGroup.isTouching(sword)) {
    fruitsGroup.destroyEach();
    score=score+2;
    swoosh.play();  
  }

//making the gamestate to END      
    if (aliensGroup.isTouching(sword)) {
    gameState = END;
    gameOver.play();  
  }
}

//gamestate the is END  
else if (gameState===END) {
  
//making the sword disappear when gamestate is END  
    sword.visible=false;
  
//making a gameover sprite  
    gameover = createSprite(200, 200, 10, 10);  
    gameover.addImage("over", gameover_image);
    gameover.scale=1.5; 
  
//score  
    score=score;
  
//making the fruits and aliens destroy  
    fruitsGroup.destroyEach();
    aliensGroup.destroyEach();  
}
  
//displaying all the things on the screen  
drawSprites();  
}

//functions
function fruits() {
    if (frameCount % 80 === 0) {  
    
  fruit = createSprite(400, 200, 10, 10);  
  fruit.scale=0.2;        
  var select_fruit = Math.round(random(1, 4));  
    if (select_fruit===1) {
    fruit.addImage("Fruit1", fruit1_image);  
  }
    else if (select_fruit===2) {
    fruit.addImage("Fruit2", fruit2_image);         
  }       
    else if (select_fruit===3) {
    fruit.addImage("Fruit3", fruit3_image);         
  }
    else if (select_fruit===4) {
    fruit.addImage("Fruit4", fruit4_image);         
  }

    fruit.y=Math.round(random(50, 340));  
    fruit.lifetime=100;
    fruit.velocityX=-4;  
    fruit.velocityY = Math.round(random(1,5)); 
    fruitsGroup.add(fruit)  
  }  
}

function Enemy() {
    if (frameCount % 200 === 0) {  
    alien = createSprite(400, 200, 20, 20);
    alien.addAnimation("Alien", alien_image);  
    alien.y=Math.round(random(100, 300)); 
    alien.velocityX=-(8+(score / 10));
    alien.velocityY = Math.round(random(1,5)); 
    alien.lifetime=50; 

    aliensGroup.add(alien);  
  }  
}


