//create empty deck array
let deck = [];

// create hands and won decks
let pHand = [];
let oHand = [];
let pWon = [];
let oWon = [];




//create variables
let gameState = 0;
let drawClicked = false;
let resetClicked = false;
let counter = 0;
let button = 0;
let clickCounter = 0;
let tempClicked = false;

//war variables
let warOver = false;
let war = false;
let warCounter = 4;
let warClicked = false;
let warClicked2 = false;
let tempWarCounter = 4;
let pWarCard = 0;
let oWarCard = 0;
let pWarCard2 = 0;
let oWarCard2 = 0;
let warTrulyOver = false;

//ending and bug fixing variables
let pScore = 0;
let oScore = 0;
let ending = "Nothing";
let randoint = 50;
let newClicked = false;
let totalScore = 0;

//arrays for card creation
let suits = ["♥", "♦", "♣", "♠"];
let names = ["2", "3", "4", "5", "6", "7", 
             "8", "9", "10", "J", "Q", "K", "A"];
let longSuits = ["Hearts", "Diamonds", "Clubs", "Spades"];
let longNames = ["Two", "Three", "Four", "Five", "Six", "Seven", 
                 "Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace"];
function setup() { 
  setUpCanvas();
  newGame();
}

//canvas creation
function setUpCanvas() {
  createCanvas(1000, 1000);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  noStroke();
  angleMode(DEGREES);
}

//new game function to have multiple iterations
function newGame() {
  resetDeck();
  dealCards(); 
}

//deal cards into hands at the start of a game
function dealCards() {
  for (let i = 0; i < 26; i++) {
    deal(pHand);
    deal(oHand);
  }
}

//drawing face down cards
function drawBack(x, y, rot = 0, oke = 0, scale = 1) {
  rotate(rot);
  stroke(oke);
  fill("blue");
  rect(x, y, 100 * scale, 140 * scale, 15);
  fill("white");
  rotate(-rot);
  noStroke();
}

//starting animation
function starter(y, side) {
  if (side === true) {
    if (counter < 60) {
      for (let i = 0; i < counter; i++) {
        drawBack(250 + 5*i, y);
      }
      counter += 1
    }
    else {
      for (let i = 0; i < 60; i++) {
        drawBack(250 + 5*i, y);
      }
      fill("black");
      text("Welcome to War! Click to Begin!", 400, 200);
      fill("white");
    }
  }
  else {
    if (counter < 60) {
      for (let i = 0; i < counter; i++) {
        drawBack(550 - 5*i, y);
      }
      counter += 1
    }
    else {
      for (let i = 0; i < 60; i++) {
        drawBack(550 - 5*i, y)
      }
    }
  }
}

//drawing the draw and reset buttons
function drawButtons() {
  for (let i = 0; i < 5; i++) {
    drawBack(100 + (5*i), 300);
  }
  fill("gray");
  rect(110, 450, 100, 50);
  fill("white");
  text("Draw", 120, 300);
  text("Reset", 110, 450);
  fill("white");
  
}

//resets deck for new games
function resetDeck() {
  //loops
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < names.length; j++) {
      let tempColor = "black";
      if (i < 2) {
        tempColor = "red";
      }


      let tempCard = new Card();
      tempCard.suit = suits[i];
      tempCard.name = names[j];
      tempCard.longSuit = longSuits[i];
      tempCard.longName = longNames[j];
      tempCard.val = j + 2;
      tempCard.color = tempColor;
      tempCard.faceUp = true;
      tempCard.rot = 0;
      tempCard.x = 0;
      tempCard.y = 0;




      //add card to deck
      deck.push(tempCard);
    }
  }
}

//card constructor
class Card {
  constructor(suit, name, longSuit, longName, val, color, faceUp, rot, x, y) {
    this.suit = suit;
    this.name = name;
    this.longSuit = longSuit;
    this.longName = longName;
    this.val = val;
    this.color = color;
    this.faceUp = faceUp;
    this.rot = rot;
    this.x = x;
    this.y = y;
  }
}

//card dealing function
function deal(who) {
    if (deck.length < 1) {
      console.log("out of cards");
      return;
    }
    
    who.push(deck.splice(floor(random(deck.length)), 1)[0]);
  
}

//draw card function
function drawCard(card, x, y, scale = 1, rot = 0) {
    color(0);
    push();
      translate(x, y);
      rotate(rot);
      stroke(0);
  if (card.faceUp) {
    drawUpCard(card);
  }
  else {
    drawDownCard(card);
  } 
    pop();
}

//functions within drawCard
function drawUpCard(card, x, y, scale = 1) {
      rect(0, 0, 100 * scale, 140 * scale, 10);
  
      //coloring
      fill(0, 0, 0);
      if (card.suit === "♥" || card.suit === "♦") {
        fill(255, 0, 0);
      }
  
      //names
      noStroke();
      textSize(30 * scale);
      text(card.name, -30 * scale, -45 * scale);
      rotate(180);
      text(card.name, -30 * scale, -45 * scale);
      rotate(-180);
  
      textSize(22 * scale);
      
      if (card.val < 11) {
        if (card.val > 3) {
          text(card.suit, -15, -25);
          text(card.suit, 15, -25);
          rotate(180);
          text(card.suit, -15, -25);
          text(card.suit, 15, -25);
          rotate(-180);
          if (card.val < 6) {
            if (card.val === 5) {
              text(card.suit, 0, 0);
            }
          }
          else {
            if (card.val < 9) {
              text(card.suit, -15, 0);
              text(card.suit, 15, 0);
            }
            else {
              text(card.suit, -15, -7);
              text(card.suit, 15, -7);
              rotate(180);
              text(card.suit, -15, -7);
              text(card.suit, 15, -7);
              rotate(-180);
            }
            if (card.val === 7 || card.val === 8 || card.val === 10) {
              text(card.suit, 0, -12.5);
              if (card.val != 7) {
                rotate(180);
                text(card.suit, 0, -12.5);
                rotate(-180);
              }
            }
            if (card.val === 9) {
              text(card.suit, 0, 0);
            }
          }
        }
        else {
          text(card.suit, 0, -25);
          rotate(180);
          text(card.suit, 0, -25);
          rotate(-180);
          if (card.val === 3) {
            text(card.suit, 0, 0);
          }
        }
        
      }
      else {
        textSize(90 * scale);
        text(card.suit, 0, 0);
        textSize(30 * scale)
        rotate(180);
        text(card.name, -30 * scale, -45 * scale);
      }
  
}
function drawDownCard(card, x, y, scale = 1) {
  fill("blue");
  rect(0, 0, 100 * scale, 140 * scale, 15);
}

//hiding all the drawing things throughout the game
function coolStuff() {
  //lengths of hands for debugging
    fill("green");
    rect(500, 50, 400, 200);
    fill("brown");
    rect(50, 50, 400, 300);
    fill("white");
    textSize(25);
    text("Player Score: " + (pHand.length + pWon.length), 110, 30);
    text("Opponent Score: " + (oHand.length + oWon.length), 110, 70);
    text("Total Won: " + (oHand.length + oWon.length + pHand.length + pWon.length), 110, 110);
    textSize(45);
    text("!!!!WAR!!!!", 500, 75);
    text("Opponent", 500, 200);
    text("Player", 500, 700);
    textSize(16);
}

//function that handles splitting cards to winner
function run(gameState, war) {
  //once you run out of cards, it puts all of the cards in the won arrays and puts them
  //back in the hand and then shuffles it
  if (pHand.length < 2) {
    if (pWon.length < 1) {
      gameState = 3;
      ending = "Opponent Won!";
    }
    else {
      console.log("pHand shuffling");
      for (let i = 0; i < pWon.length; i++) {
        pHand.push(pWon[i]); 
      }
      pWon = [];
      shuffle(pHand);
    }
    
  }
  if (oHand.length < 2) {
    if (oWon.length < 1) {
      gameState = 3;
      ending = "Player Won!";
    }
    else {
      console.log("pHand shuffling");
      for (let i = 0; i < oWon.length; i++) {
        oHand.push(oWon[i]); 
      }
      oWon = [];
      shuffle(oHand);
    }
    
  }
  //as long as there are no errors, evaluate values
  if (pHand.length > 1 && oHand.length > 1 && gameState === 1) {
    //player card higher
    if (pHand[0].val > oHand[0].val) {
      //take cards from hands and add to pWon pile
      pWon.push(pHand.splice(0, 1)[0]);
      pWon.push(oHand.splice(0, 1)[0]);
    }
    //opponent card higher
    else if (pHand[0].val < oHand[0].val) {
      oWon.push(oHand.splice(0, 1)[0]);
      oWon.push(pHand.splice(0, 1)[0]);
    }
  } 
}

//war event handler
function warTime(warCounter) {
  //button logic
  if (mouseX > 100 && mouseX < 300) {
    if (mouseY > 350 && mouseY < 550) {
      if (mouseIsPressed) {
        warClicked = true;
      }
    }
  }
  pWarCard = pHand[warCounter];
  oWarCard = oHand[warCounter];
  
  //once player has clicked the war button
  if (warClicked) {
    drawCard(pWarCard, 740, 600);
    drawCard(oWarCard, 740, 300);
    
    
    //logic for double war (have not made it for more yet)
    if (pWarCard.val === oWarCard.val) {
      tempWarCounter -= 1;
      //double war
      warClicked2 = false;
      fill("blue");
      ellipse(200, 450, 100, 100);
      fill("white")
      text("Draw Again", 100, 350);
      pWarCard2 = pHand[warCounter - 1];
      oWarCard2 = oHand[warCounter - 1];
      if (mouseX > 200 && mouseX < 300) {
        if (mouseY > 450 && mouseY < 550) {
          if (mouseIsPressed) {
            warClicked2 = true;
          }
        }
      }
      if (warClicked2) {
        drawCard(pWarCard2, 710, 600);
        drawCard(oWarCard2, 710, 300);
        
        
      }
      
    }
    else {
      warOver = true;
    }
  }
  
  //war card distribution logic
  if (warOver) {
    console.log("War over");
    rect(100, 300, 200, 50);
    fill("black");
    text("Click to Advance", 100, 300);
    fill("white");
    
    if (mouseX > 100 && mouseX < 300) {
      if (mouseY > 300 && mouseY < 350) {
        if (mouseIsPressed) {
          warTrulyOver = true;
          if (pHand[tempWarCounter].val > oHand[tempWarCounter].val) {
            text("Player Wins!", 740, 450);
            for (let i = 0; i < 5; i++) {
              pWon.push(oHand.splice(i, 1)[0]);
              pWon.push(pHand.splice(i, 1)[0]);

            }
          }
          else if (pHand[tempWarCounter].val < oHand[tempWarCounter].val) {
            text("Opponent Wins!", 740, 450);
            for (let i = 0; i < 5; i++) {
              oWon.push(oHand.splice(i, 1)[0]);
              oWon.push(pHand.splice(i, 1)[0]);

            }
          }
          gameState = 1;
        }
      }
    }
  
    
  }
  
  
  
}

/*
helps alleviate a bug
In case you are curious, sometimes when I try to
make the cards filter into hands extra "ghost" cards
are added somehow, and there being more than 52 cards
throws the game off. The function below essentially
erases cards until it is back to 52 and seems to do
the job but I would love feedback if anyone finds
a source to the bug

*/
function bugFix() {
  rect(300, 300, 300, 300);
  text("There Was a Bug, Please Click to Restart", 450, 450);
  if (mouseX > 300 && mouseX < 600) {
    if (mouseY > 300 && mouseY < 600) {
      if (mouseIsPressed) {
        gameState = 0;
        console.log("ehllo");
        newClicked = false;
        deck = [];

        pwoncounter = 0;

        // create hands and won decks
        pHand = [];
        oHand = [];
        pWon = [];
        oWon = [];


        //create variables
        gameState = 1;
        war = false;
        drawClicked = false;
        resetClicked = false;
        counter = 0;
        button = 0;
        clickCounter = 0;
        warCounter = 4;
        warClicked = false;
        warClicked2 = false;
        warOver = false;
        tempClicked = false;
        tempWarCounter = 4;
        pWarCard = 0;
        oWarCard = 0;
        pWarCard2 = 0;
        oWarCard2 = 0;
        warTrulyOver = false;
        pScore = 0;
        oScore = 0;
        ending = "Nothing";
        newGame();
      }
    }
  }
  
}
  

//essentially the while(running) loop in js
function draw() {
  
  //fixes for a bug I did not have time or know how to fix in which sometimes cards would be added weirdly
  totalScore = (pHand.length + pWon.length + oHand.length + oWon.length);
  while (totalScore > 52) {
    randoint = floor(random(2));
    if (randoint === 1) {
      pHand.splice(0, 1);
    }
    else {
      oHand.splice(0, 1);
    }
    totalScore = (pHand.length + pWon.length + oHand.length + oWon.length);
  }
  
  
  //draw canvas
  background(220);
  
  //opening
  if (gameState === 0) {
    fill("lightblue");
    rect(400, 200, 500, 500);
    starter(100, true);
    starter(300, false);
    if (mouseIsPressed) {
      gameState = 1;
    }
    
    
  }
  //stuff for viewing purposes (decor)
  else if (gameState === 1 || gameState === 2) {
    fill("lightgreen");
    rect(0, 0, 10000, 10000);
    fill("white");
    coolStuff();
    
    //determines game state based on whether a war is present
    if (pHand[0].val === oHand[0].val && drawClicked) {
      gameState = 2;
    }
    
    //no war, have buttons and run through normal game
    if (gameState === 1) {
      drawButtons();
      //function that controls mouse clicks on buttons
      if (mouseX > 100 && mouseX < 220) { 
        if (mouseY < 380 && mouseY > 210 && drawClicked === false) {
          //if draw button is pressed
          if (mouseIsPressed) {
            drawClicked = true;
            clickCounter = 0;
          }
        }
        if (mouseY < 490 && mouseY > 440  && war != true) {        
          if (mouseIsPressed) {
            //if reset button is pressed
            resetClicked = true;
          }
        }
      }
      //temporary cards for drawing purposes
      tempPCard = pHand[0];
      tempOCard = oHand[0];
      //when the draw button has been clicked
      if (drawClicked && clickCounter === 0) {
        run(gameState, war);
        clickCounter = 1;
      }
      if (clickCounter === 1) {
        //display cards
        drawCard(tempPCard, 500, 600);
        drawCard(tempOCard, 500, 300);
        textSize(40);
        if (pHand[0].val > oHand[0].val) {
          text("Player Wins!", 500, 450);
        }
        else if (pHand[0].val < oHand[0].val) {
          text("Opponent Wins!", 500, 450);
        }
        textSize(16);
      
      }
      if (drawClicked === false) {
        drawBack(500, 600);
        drawBack(500, 300);
      }  
      //reset once the reset button has been clicked
      if (resetClicked) {
        drawClicked = false;
        resetClicked = false;
      }
    }
    
  }
  
  
  
    
    if (gameState === 2) {
      drawCard(pHand[0], 500, 600);
      drawCard(oHand[0], 500, 300);
      text("War!", 500, 450);
      if (pHand.length < 5 && oHand.length > 5) {
        for (let i = 0; i < pHand.length; i++) {
          oWon.push(oHand.splice(i, 1)[0]);
          oWon.push(pHand.splice(i, 1)[0]);
        }
      }
      if (oHand.length < 5 && pHand.length > 5) {
        for (let i = 0; i < oHand.length; i++) {
          pWon.push(oHand.splice(i, 1)[0]);
          pWon.push(pHand.splice(i, 1)[0]);
        }
      }
      if (pHand.length < 5 && oHand.length < 5) {
        for (let i = 0; i < pHand.length; i++) {
          pScore = pScore + pHand[i].val;
        }
        for (let i = 0; i < oHand.length; i++) {
          oScore = oScore + oHand[i].val;
        }
        if (pScore > oScore) {
          for (let i = 0; i < oHand.length; i++) {
            pWon.push(oHand.splice(i, 1)[0]);
            pWon.push(pHand.splice(i, 1)[0]);
          }
        }
        else if (pScore < oScore) {
          for (let i = 0; i < pHand.length; i++) {
            oWon.push(oHand.splice(i, 1)[0]);
            oWon.push(pHand.splice(i, 1)[0]);
          }
        }
        else {
          gameState = 3;
          ending = "Player Won!";
        }
      }
      
      //now everything has been accounted for
      if (pHand.length >= 5 && oHand.length >= 5) {
        stroke(10);
        for (let i = 0; i < 3; i++) {
          drawBack(650 + (30*i), 300);
        }
        for (let i = 0; i < 3; i++) {
          drawBack(650 + (30*i), 600);
        }
        noStroke();
        fill("red");
        ellipse(200, 450, 200, 200);
        fill("white");
        text("Draw", 200, 450);
        warTime(warCounter);
        if (warTrulyOver) {
          clickCounter = 1;
          war = false;
          warOver = false;
          warTrulyOver = false;
          warCounter = 4;
          tempWarCounter = 4;
          warClicked = false;
          warClicked2 = false;
          console.log(warOver);
          drawClicked = false;
          resetClicked = true;
        }
        
        }
      
      //end of war loop
      }
    //end of 1 and 2 loops 
  if (gameState === 3) {
    fill("purple");
    rect(0, 0, 10000, 10000);
    fill("white");
    textSize(50);
    text(ending, 350, 350);
    fill("black");
    rect(350, 125, 500, 200);
    fill("white");
    text("Click To Restart", 350, 100);
    fill("white");
    if (mouseX > 350 && mouseX < 850) {
      if (mouseY > 125 && mouseY < 325) {
        
        if (mouseIsPressed) {
          newClicked = true;
        }
      }
    }
    
    //create empty deck array
    if (newClicked) {
      console.log("ehllo");
      newClicked = false;
      totalScore = 0;
      randoint = 50;
      deck = [];

      pwoncounter = 0;

      // create hands and won decks
      pHand = [];
      oHand = [];
      pWon = [];
      oWon = [];


      //create variables
      gameState = 1;
      war = false;
      drawClicked = false;
      resetClicked = false;
      counter = 0;
      button = 0;
      clickCounter = 0;
      warCounter = 4;
      warClicked = false;
      warClicked2 = false;
      warOver = false;
      tempClicked = false;
      tempWarCounter = 4;
      pWarCard = 0;
      oWarCard = 0;
      pWarCard2 = 0;
      oWarCard2 = 0;
      warTrulyOver = false;
      pScore = 0;
      oScore = 0;
      ending = "Nothing";
      newGame();
    }
  }
}
