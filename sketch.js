let bg,thorns,luci,ship;
let ob=[],obBottom=[];
let edges;
let hits=0;
let ground;
let gameState="start";
let tg=0,treasure=[];
let powerSavers=[];
let flag=0;

let treasureI;
let hitSound,gameOverSound,jumpSound;

let key, door, keyImg,doorImg;
var collected=0;

let potion,potionImg;
let ingredients=[],ig=0;
let diamond,wand;

function preload()
{
  bg=loadImage("bg.jpg");
  town=loadImage("town.jpg")
  luciRunning=loadAnimation("ninjaImage/nin-run1.png","ninjaImage/nin-run2.png","ninjaImage/nin-run3.png","ninjaImage/nin-run4.png","ninjaImage/nin-run5.png","ninjaImage/nin-run6.png")
  luciJumping=loadAnimation("ninjaImage/nin-jump1.png","ninjaImage/nin-jump2.png","ninjaImage/nin-jump3.png","ninjaImage/nin-jump4.png","ninjaImage/nin-jump5.png","ninjaImage/nin-jump6.png","ninjaImage/nin-jump8.png","ninjaImage/nin-jump9.png","ninjaImage/nin-jump10.png");
  thorns=loadImage("images/thorns.png");
  ship=loadImage("images/ship.png")
  treasureI=loadImage("images/treasure.png");
  keyImg=loadImage("images/key.png");
  potionImg=loadImage("images/magic_potion.png");
  extract1=loadImage("images/extract1.png");
  diamond=loadImage("images/diamond.png");
  wand=loadImage("images/wand.png");
  doorImg=loadImage("images/door.png")

  hitSound=loadSound("sounds/hit.wav");
  jumpSound=loadSound("sounds/jump.wav");
  gameOverSound=loadSound("sounds/game over.wav");

}

function setup() {
  createCanvas(windowWidth-40,windowHeight-40);

  //our player Lucifer a.k.a LUCI
  luci=createSprite(50,height-40);
  luci.addAnimation("running",luciRunning);
  luci.addAnimation("jumping",luciJumping);
 
  edges=createEdgeSprites();

  ground=createSprite(width/2,height,width,10);
  ground.shapeColor="brown";  
}

function draw() {
  background(bg);
  if(gameState==="start")
  {
      stroke("red");
      textSize(20)
      strokeWeight(2);
      fill("black");
      textAlign(CENTER);
      text("Whistletown is in danger of an evil witch, Laurenda. She has destroyed the town and looted the treasure. \n There is only one way to save it.\n\n Go through the magical land of thorn valley of the evil witch and collect the special ingredients to remove the dark magic. \n Lucifer, a Ninja(also the protector) is given the task. Collect all the ingredients and also the treasure of Whistletown.\n Find the key hidden somehere to get out of the thorn valley \n Press 'S' to start the game \n Beware of the electric shock hits",width/2,200)
      if(keyDown("s"))
      {
        gameState="play";
      }
  }
  else if(gameState==="play")
  {
    createPlayers();
   /* for(let x=200;x<width;x+=100)
    {
      groundThorns=createSprite(x,height-40);
      groundThorns.addImage(thorns);
      groundThorns.scale=random(0.1,0.2);
      thornsGroup.add(groundThorns);
    }*/
    key.visible=true;
    
    angleMode(DEGREES);
    key.rotation=frameCount%360;
    for(let i=0;i<8;i++)
    {
      ingredients[i].visible=true;
      if(luci.isTouching(ingredients[i]))
      {
        ig+=1;
        ingredients[i].destroy();
      }
    }
    
      for(let i in ob)
      {
        
        //ob[i].visible=true;
        //obBottom[i].visible=true;
        //treasure[i].visible=true;
        ob[i].bounceOff(edges);
        obBottom[i].x=ob[i].x;
        treasure[i].x=ob[i].x;
        treasure[i].collide(ob[i]);
        
        if(luci.isTouching(treasure[i]))
        {
          treasure[i].destroy();
          tg+=1;
        }
        if(luci.collide(obBottom[i]))
        {
          hits+=1;
          hitSound.play();
        }
        else if(luci.collide(ob[i]))
        {
          luci.x=ob[i].x;
          luci.velocityY=0;
          //gameState="onBoard";
        }
        else
        {
          luci.velocityX=0;
        }
      }
      if(luci.collide(key))
      {
        key.destroy();
        collected=1;
      }
      if(hits>10 || luci.x<0 || luci.y<0 || luci.x>width)
      {
        gameState="end";
        gameOverSound.play();
      }
      stroke("red");
      textSize(20)
      strokeWeight(2);
      fill("black");
      textAlign(CENTER);
      
      text("Collect the ingredients\n Unlock the door with the key to become the hero of whistletown",width/2,50)
      textAlign(LEFT)
      text("HITS: "+hits,50,50);
      text("TREASURE COLLECTED: "+tg,50,100);
      text("INGREDIENTS COLLECTED: "+ig,50,150);
      
      if(luci.isTouching(door) && ig>=7 && collected===1 && tg>=6)
      {
        gameState="win";
      }

      if(keyWentDown("space"))
      {
        luci.velocityY=-10;
        jumpSound.play();
        luci.changeAnimation("jumping",luciJumping);
      // gameState="start";
      }
      if(keyWentUp("space"))
      {
        luci.changeAnimation("running",luciRunning);
      }
      if(keyDown("right"))
      {
        luci.x+=10;
      }
      if(keyDown("left"))
      {
        luci.x-=10;
      }
      
      luci.velocityY=luci.velocityY+0.8;

}
  else if(gameState==="end")
  {
        textAlign(CENTER);
        stroke("red");
        textSize(60)
        strokeWeight(2);
        fill("black");
        text("GAME OVER\n Better luck next time \n Press R to restart",width/2,height/2);
        luci.velocityY=0;
        if(keyDown("r"))
        {
          gameState="start";
          hits=0;
          tg=0;
          ig=0;
          collected=0;
          luci.x=100;
          luci.y=height-30;
          flag=0;
        }
        for(let i in ob)
          {
            ob[i].destroy();
            obBottom[i].destroy();
            treasure[i].destroy();
          }
          for(let i in ingredients)
          {
            ingredients[i].destroy();
          }
          key.destroy();
          //console.log("hit"+hits)
  }
  else if(gameState==="win")
  {
    background(town);
    luci.velocityY=0;
    luci.x=width/2;
    luci.y=height-150;
    textAlign(CENTER);
    stroke("red");
    textSize(40)
    strokeWeight(2);
    fill("black");
    text("YOU SAVED WHISTLE TOWN. YOU ARE A HERO",width/2,height/2);
    for(let i in ob)
    {
      ob[i].velocityX=0;
      obBottom[i].visile=false;
    }
    for(let i in ob)
          {
            ob[i].destroy();
            obBottom[i].destroy();
            treasure[i].destroy();
          }
          for(let i in ingredients)
          {
            ingredients[i].destroy();
          }
  }
  luci.collide(ground);
  drawSprites();
}

function createPlayers()
{
   //loops for creating the ingredients and the treasure
  //obBottom refers to electric shock wave 
  if(flag===0)
  {
    for(let i=0;i<8;i++)
    {
      ingredients[i]=createSprite(random(10,width-10),random(100,height-100));
      //ingredients[i].visible=false;
      var rand=Math.round(random(1,4));
      switch(rand)
      {
        case 1: ingredients[i].addImage(potionImg);
        ingredients[i].scale=0.4;
        break;
        case 2: ingredients[i].addImage(extract1);
        ingredients[i].scale=0.15;
        break;
        case 3: ingredients[i].addImage(wand);
        ingredients[i].scale=0.2;
        break;
        case 4: ingredients[i].addImage(diamond);
        ingredients[i].scale=0.15;
        break;
      }
      door=createSprite(width-50,80);
      door.addImage(doorImg);  
    }
    //thornsGroup=createGroup();
    for(let i=height-120; i>100; i-=60)
    {
      ob[i]=createSprite(width/2,i,100,20);
      ob[i].addImage(ship);
      ob[i].scale=0.3
      //ob[i].debug=true;
      ob[i].setCollider("rectangle",0,0,230,80);
      ob[i].velocityX=Math.pow(-1,Math.round(i/60))*((i/60)*2)%5;
      obBottom[i]=createSprite(width/2,i+10,100,3);
      obBottom[i].addImage(thorns);
      obBottom[i].scale=0.15;
      obBottom[i].setCollider("rectangle",0,0,500,50);
      //thornsGroup.add(obBottom[i])
      //obBottom[i].debug=true;
      treasure[i]=createSprite(width/2,i,10,10);
      treasure[i].addImage(treasureI);
      treasure[i].scale=0.2;
      treasure[i].setCollider("rectangle",0,0,100,100);
    

      //ob[i].visible=false;
      //obBottom[i].visible=false;
      //treasure[i].visible=false;  
    }

  
    key=createSprite(random(10,width-10),random(100,height-100));
    key.addImage(keyImg);
    //key.visible=false;
    key.scale=0.5;
    flag=1;
  }
}