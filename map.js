var time = 10, ctx, stage, sqrtSize = 10, numberOfPlayers = 0, colisorNumber, testNumber = 0, testSize = 9999, setOfColors = ["red","blue","black","white","pink"], realTestNumber;
var playerSet = [];

window.onload = function(){
	stage = document.getElementById('stage');
	ctx = stage.getContext("2d");
	ctx.fillStyle = "grey";
	ctx.fillRect(0,0, stage.width, stage.height);
}

setInterval(run,time);

function run(){

	ctx.fillStyle = "grey";
    ctx.fillRect(0,0, stage.width, stage.height);
	ctx.fillStyle = "yellow";
	ctx.fillRect(100,100,400,400);
	ctx.fillStyle = "green";
	ctx.fillRect(0,480,100,20);

	for(let x = 0; x < numberOfPlayers; x++){
			if(playerSet[x].alive){
                playerSet[x].tryKill();
                //if(colisionStatus)
                  //  colision(x); FIX IT 
				if(playerSet[x].alive){
                    paintPlayer(x);
                    geneticLearningExecution(x);
				}
			}
	}	
	gameReset();
}
function paintPlayer(playerNumber){
	ctx.fillStyle = setOfColors[playerNumber];
	ctx.fillRect(playerSet[playerNumber].px,playerSet[playerNumber].py,20,20);//X,Y,WIDTH,HEIGHT
}

function newPlayer(){
	if(numberOfPlayers > 4){
		alert("The max number of player is 5.");
	}else{
        playerSet[numberOfPlayers] = player;
        playerSet[numberOfPlayers].color = setOfColors[numberOfPlayers];
        playerSet[numberOfPlayers].px = (numberOfPlayers) * 20;
        playerSet[numberOfPlayers].py = 460;
        startGeneticLearning(numberOfPlayers);
		numberOfPlayers++;
	}
}
function gameReset(){
	let gameOn = false;
	for(let i = 0; i < numberOfPlayers ; i++){
		if(playerSet[i].alive){
		 	gameOn = true;
		}
	}
	if(!gameOn){
		for(let x = 0; x < numberOfPlayers ; x++){
			//console.log(testMoves[x]+" Score: "+score[x]);
			constructor(testMoves[x],playerSet[x].score,x);
			playerSet[x].px = x * 20;
			playerSet[x].py = 460;
			playerSet[x].alive = true;
			playerSet[x].score = 0;
			resetGeneticLearning(x);
			paintPlayer(x);		
		}
		testTime = 0;
		testNumber++;
	}
}

function colision(playerNumber){
	for(let x = 0; x < numberOfPlayers; x++){
		if(x != playerNumber){
			if(playerSet[playerNumber].px == playerSet[x].px && playerSet[playerNumber].py == playerSet[x].py){
                colisorNumber = x;
                playerSet[playerNumber].alive = false;
				playerSet[x].alive = false;
			}
		}
	}
}

function setScore(playerNumber){

	switch(section(playerNumber)){
		case 1:
			if(playerSet[playerNumber].lastYPosition > playerSet[playerNumber].py){
				playerSet[playerNumber].score += ((playerSet[playerNumber].py - 460) / 20) * -1; 
			}else if(playerSet[playerNumber].lastYPosition < playerSet[playerNumber].py){
				playerSet[playerNumber].score -=((playerSet[playerNumber].lastYPosition - 460) / 20) * -1;
			}else{
				//score[playerNumber] -= 1;
			}
			playerSet[playerNumber].lastYPosition = playerSet[playerNumber].py;
		break;
		case 2:
			if(playerSet[playerNumber].lastXPosition < playerSet[playerNumber].px){
				playerSet[playerNumber].score += (playerSet[playerNumber].lastXPosition/20) + 15;
			}else if(playerSet[playerNumber].lastXPosition > playerSet[playerNumber].px){
				playerSet[playerNumber].score -= (playerSet[playerNumber].lastXPosition/20) + 15;
			}else{
				//score[playerNumber] -= 1;
			}
			playerSet[playerNumber].lastXPosition = playerSet[playerNumber].px;
		break;
		case 3:
			if(playerSet[playerNumber].lastYPosition < playerSet[playerNumber].py){
				playerSet[playerNumber].score += (((playerSet[playerNumber].py - 460) / 20) * -1) +30; 
			}else if(playerSet[playerNumber].lastYPosition > playerSet[playerNumber].py){
				playerSet[playerNumber].score -=(((playerSet[playerNumber].lastYPosition - 460) / 20) * -1) +30;
			}else{
				//playerSet[playerNumber].score -= 1;
			}
			playerSet[playerNumber].lastYPosition = playerSet[playerNumber].py;			
		break;
		case 4:
        if(playerSet[playerNumber].lastXPosition < playerSet[playerNumber].px){
            playerSet[playerNumber].score += (playerSet[playerNumber].lastXPosition/20) + 45;
			}else if(playerSet[playerNumber].lastXPosition < playerSet[playerNumber].px){
				playerSet[playerNumber].score -= (playerSet[playerNumber].lastXPosition/20) + 45;
			}else{
				//playerSet[playerNumber].score -= 1;
			}
			playerSet[playerNumber].lastXPosition = playerSet[playerNumber].px;			
		break;
	}
}
function section(playerNumber){

	if(playerSet[playerNumber].py <= 480 && playerSet[playerNumber].py >=100){
		//1 or 3
		if(playerSet[playerNumber].px < 100){
			return 1;
		}else{
			return 3;
		}
	}else{
		// 2 or 4
		if(playerSet[playerNumber].py < 100){
			return 2;
		}else{
			return 4;
		}
	}
}

function changeColisionStatus(){
    colisionStatus ? colisionStatus = false : colisionStatus = true;
}