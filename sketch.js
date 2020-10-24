//Declaring the variables.
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground, zombieLeft, zombieRight;
var leftBoxBody,rightBoxBody,bottomBoxBody;
var leftBoxSprite,rightBoxSprite,bottomBoxSprite;
var zombieLeftImg,zombieRightImg, headText, headText2;
var zombie_sound, success_sound, Heading, Heading2;

//Declaring the constants.
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//preload function.
function preload() {
	//Loading images to four variables.
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
	zombieLeftImg = loadImage("zombie left.jpg");
	zombieRightImg = loadImage("zombie right.jpg");
	Heading = loadImage("Text.png");
	Heading2 = loadImage("Text2.png");
}

//setup function.
function setup() {
	//Creating the canvas area.
	createCanvas(800, 700);
	//Setting rectMode as CENTER.
	rectMode(CENTER);

	//Creating a sprites for heading.
	//Adding image to them.
	//Adjusting their size.
	headText = createSprite(400,60,10,10);
	headText.addImage(Heading);
	headText.scale = 0.55;
	headText2 = createSprite(410,100,10,10);
	headText2.addImage(Heading2);
	headText2.scale = 0.2;

	//Loading sounds to two variables.
	zombie_sound = loadSound("zombie_sound.mp3");
	success_sound = loadSound("win.mp3");

	//Creating a sprite named zombieLeft.
	zombieLeft = createSprite(-50,610,10,10);
	//Adding image to it.
	zombieLeft.addImage(zombieLeftImg);
	//Adjusting its size.
	zombieLeft.scale = 0.2;

	//Creating a sprite named zombieRight.
	zombieRight = createSprite(850,610,10,10);
	//Adding image to it.
	zombieRight.addImage(zombieRightImg);
	//Adjusting its size.
	zombieRight.scale = 0.2;

	//Creating a sprite named packageSprite.
	packageSprite=createSprite(50, 50, 10,10);
	//Adding image to it.
	packageSprite.addImage(packageIMG);
	//Adjusting its size.
	packageSprite.scale = 0.2;

	//Creating a sprite named helicopterSprite.
	helicopterSprite=createSprite(50, 70, 10,10);
	//Adding image to it.
	helicopterSprite.addImage(helicopterIMG);
	//Adjusting its size.
	helicopterSprite.scale = 0.6;

	//Creating a sprite named groundSprite.
	groundSprite=createSprite(width/2, height-35, width,10);
	//Giving white color to it.
	groundSprite.shapeColor=color(255);

	//Creating an Engine and storing it in the variable engine.
	engine = Engine.create();
	//Storing 'engine.world' in the variable world.
	world = engine.world;

	//Creating a circle body named packageBody.
	packageBody = Bodies.circle(50 , 70 , 5 , {restitution:0, isStatic:true});
	//Adding it to Matter.World.
	World.add(world, packageBody);

	//Creating a rectangle body named ground.
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
	//Adding it to Matter.World.
	World.add(world, ground);

	//Creating three sprites for the red box.
	//Giving red color to them.
	leftBoxSprite=createSprite(370, 635, 10,50);
	leftBoxSprite.shapeColor=color(255,0,0);
	bottomBoxSprite=createSprite(400, 655, 50,10);
	bottomBoxSprite.shapeColor=color(255,0,0);
	rightBoxSprite=createSprite(430, 635, 10,50);
 	rightBoxSprite.shapeColor=color(255,0,0);

	//Creating three rectangle bodies for the red box.
	//Adding them to Matter.world.
 	leftBoxBody = Bodies.rectangle(370, 635, 10,70 , {isStatic:true} );
 	World.add(world, leftBoxBody);
 	bottomBoxBody = Bodies.rectangle(400, 655, 50,10 , {isStatic:true} );
 	World.add(world, bottomBoxBody);
 	rightBoxBody = Bodies.rectangle(430, 635, 10,70 , {isStatic:true} );
	World.add(world, rightBoxBody);

	//Running the previously created engine.
	Engine.run(engine);
}

//draw function.
function draw() {
	//Setting rectMode as CENTER.
	rectMode(CENTER);
	//Setting background color as black.
	background(rgb(46,48,47));
	
	//Setting packageSprite's x and y position same as packageBody's x and y position.
	packageSprite.x = packageBody.position.x;
	packageSprite.y = packageBody.position.y;

	//Setting leftBoxSprite's x and y position same as leftBoxBody's x and y position.
	leftBoxSprite.x = leftBoxBody.position.x;
	leftBoxSprite.y = leftBoxBody.position.y;

	//Setting rightBoxSprite's x and y position same as rightBoxBody's x and y position.
	rightBoxSprite.x = rightBoxBody.position.x;
	rightBoxSprite.y = rightBoxBody.position.y;

	//Setting bottomBoxSprite's x and y position same as bottomBoxBody's x and y position.
	bottomBoxSprite.x = bottomBoxBody.position.x;
	bottomBoxSprite.y = bottomBoxBody.position.y;

	//Displaying 'Well Done!' text under certain conditions.
	if(packageSprite.isTouching(bottomBoxSprite) && packageSprite.x > 375 && packageSprite.x < 425) {
		if(zombieLeft.velocityX === 0 || zombieRight.velocityX === 0) {
			fill("red");
			textFont("segoe script");
			textStyle(BOLD);
			textSize(30);
			text("Well Done!", 290,500);
		}
	}

	//Colliding packageSprite with bottomBoxSprite.
	packageSprite.collide(bottomBoxSprite);
	packageSprite.collide(leftBoxSprite);
	packageSprite.collide(rightBoxSprite);

	//Changing zombieLeft and zombieRight's velocity when packageSprite touches groundSprite.
	if(packageSprite.isTouching(groundSprite)) {
		if(packageSprite.x < 400 && packageSprite.y < 800) {
			zombieLeft.velocityX = 3;
		}
		else if(packageSprite.x > 400 && packageSprite.y < 800) {
			zombieRight.velocityX = -3;
		}
	} 

	//Assigning functions when packageSprite touches zombieLeft, zombieRight or packageSprite's y position is greater than 800.
	if(packageSprite.isTouching(zombieLeft) || packageSprite.isTouching(zombieRight) || packageSprite.y > 800) {
		//Setting zombieLeft and zombieRight's velocityX to 0.
		zombieLeft.velocityX = 0;
		zombieRight.velocityX = 0;
		//Making packageSprite invisible.
		packageSprite.visible = false;

		//Displaying text.
		fill("red");
		textFont("segoe script");
		textStyle(BOLD);
		textSize(30);
		text("Refresh the page to retry.", 210,500);
	}

	//Setting a condition when Right Arrow key is pressed.
	//If the condition is true, zombie_sound is played; else success_sound is played.
	if(keyDown(RIGHT_ARROW)) {
		if(packageSprite.x < 375 || packageSprite.x > 425) {
			if(packageSprite.y < 200) {
				zombie_sound.play();
			}
		}
		else {
			if(packageSprite.y < 200) {
				success_sound.play();
			}
		}
	}

	//Displaying info text.
	fill("white");
	textFont("segoe script");
	textSize(20);
	text("You are a sergeant on an Indian Airforce mission. Your task is to drop",20,160);
	text("a package in a designated red drop zone. The package contains essential",20,190);
	text("items for daily-needs for the people stuck in a city infested with",20,220);
	text("zombies. It is very important to deliver the package at the exact",20,250)
	text("location for the success of the mission. You can control the helicopter",20,280);
	text("by down arrow key (for left) and Ctrl key (for right). Press Right arrow",20,310);
	text("key to drop the package. If you drop it outside the drop zone, the",20,340);
	text("zombies would come and destroy it. Good luck !!",20,370);

	//Displaying all sprites on the screen.
  	drawSprites();
}

//keyPressed function.
function keyPressed() {
	//Moving helicopterSprite towards left when down arrow key is pressed and packageSprite's y position is less than 200.
	if (keyCode === DOWN_ARROW && packageSprite.y < 200) {
		helicopterSprite.x=helicopterSprite.x-30;    
		if(packageSprite.y < 200) {
			translation={x:-30,y:0}
			Matter.Body.translate(packageBody, translation)	
		}
	} 
	
	//Moving helicopterSprite towards right when control key is pressed and packageSprite's y position is less than 200.
	else if (keyCode === CONTROL && packageSprite.y < 200) {
		helicopterSprite.x=helicopterSprite.x+30;
		if(packageSprite.y < 200) {
			translation={x:30,y:0}
			Matter.Body.translate(packageBody, translation)	
		}
	}

	//Making the packageBody fall on ground when Right arrow key is pressed and packageSprite's y is less than 200.
 	else if (keyCode === RIGHT_ARROW && packageSprite.y < 200) {
    	Matter.Body.setStatic(packageBody, false);
  	}
}



