//Create variables here
var dog,happyDog,database,foodS,foodStock;
var feedPet,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
	//load images here
  dogImg=loadImage("images/Dog.png");
  happyDogImg=loadImage("images/happydog.png");
}

function setup() {
  database=firebase.database();
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  console.log("foodS ",foodStock);
	createCanvas(500, 500);
  dog=createSprite(250,250,10,10);
  dog.addImage("dogImg",dogImg);
  dog.scale=0.1;
  happyDog=createSprite(250,250,10,10);
 //happyDog.addImage("happyDogImg",happyDogImg);
  happyDog.scale=0.1;

  foodObj=new Food();

  // creating button
  feedPet=createButton("Feed the Dog");
  feedPet.position(600,95);
  feedPet.mousePressed(feedDog);

  addFood=createButton("add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFoods);
}

function draw() {  
  background(rgb(46, 139, 87));
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function (data) {
    lastFed=data.val();
  })

  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM",350,30);
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }
  else{
    text("Last Feed : "+ lastFed + " AM",350,30);
  }
  textSize(20);
  fill("white");
  text("Food remaining : ",150,180);
  if(foodS){
      fill("yellow");
      text(foodS,310,180);
  }
  if(foodS===0){
    textSize(20);
    fill("red");
    text(foodS,310,180);
    textSize(50);
    fill("blue");
    text("Game Over!!!",100,350);
     happyDog.visible=false;
      dog.addImage(dogImg);
      dog.visible=true;
  }

  
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

// function writeStock(x){
//   if(x<=0){
//     x=0;
//   }
//   else{
//     x=x-1;
//   }
//   database.ref('/').update({
//     Food:x
//   })
// }

function feedDog() {
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
