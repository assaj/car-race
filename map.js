var atualizationFrame, time = 100, ctx, stage, numberOfPlayers = 0, colisorNumber, setOfColors = ["red","blue","black","purple","pink"], colisionStatus = false, visualMode = true;
var playerSet = [];

window.onload = function(){
	stage = document.getElementById('stage');
	ctx = stage.getContext("2d");
	ctx.fillStyle = "grey";
	ctx.fillRect(0,0, stage.width, stage.height);
}

atualizationFrame = setInterval(run, 100);

function run(){

	buttons();

	if(visualMode){
		ctx.fillStyle = "grey";
		ctx.fillRect(0,0, stage.width, stage.height);
		ctx.fillStyle = "yellow";
		ctx.fillRect(100,100,400,400);
		ctx.fillStyle = "green";
		ctx.fillRect(0,480,100,20);
	}
	for(let x = 0; x < numberOfPlayers; x++){
			if(playerSet[x].alive){
				playerSet[x].tryKill();
				if(colisionStatus){
					colision()
				}
			}
	}	
	if(colisionStatus){
		colision();
	}
	executePlayers();
	tryReset();
	printScores();
}

function colision(){
	for(let x = 0; x < numberOfPlayers; x++){
		if(playerSet[x].alive){
			for(let y = 0; y < numberOfPlayers; y++){
				if(x != y && playerSet[y].alive){
					if(playerSet[x].px == playerSet[y].px && playerSet[x].py == playerSet[y].py){
						playerSet[x].alive = false;
						playerSet[y].alive = false;
					}
				}
			}
		}
	}
}

function executePlayers(){
	for(let x = 0; x < numberOfPlayers; x++){
		if(playerSet[x].alive){
			paintPlayer(x);
			GeneticLearningExecution(x);
		}
	}	
}

function printScores(){
	for(let x = 0; x < numberOfPlayers; x++){
		//if(document.getElementById("player"+(x+1)+"BestScore").innerHTML < playerSet[x].score){
		//	document.getElementById("player"+(x+1)+"BestScore").innerHTML = playerSet[x].score
		//}
		document.getElementById("player"+(x+1)+"Score").innerHTML = playerSet[x].score;
	}
	for(let y = 0; y < numberOfPlayers; y++){
		if(document.getElementById("player"+(y+1)+"BestScore").innerHTML < playerSet[y].score){
			document.getElementById("player"+(y+1)+"BestScore").innerHTML = playerSet[y].score
		}
	}
}

function paintPlayer(playerNumber){
	if(visualMode){	
		ctx.fillStyle = playerSet[playerNumber].color;
		ctx.fillRect(playerSet[playerNumber].px,playerSet[playerNumber].py,20,20);//X,Y,WIDTH,HEIGHT
	}
}

function newPlayer(){
	
	if(numberOfPlayers > 4){
		alert("The max number of player is 5.");
	}else{ 
		playerSet[numberOfPlayers] = new Player(setOfColors[numberOfPlayers], (numberOfPlayers) * 20, 460);
        startGeneticLearning(numberOfPlayers);
		numberOfPlayers++;
	}
}
function gameReset(){
	for(let x = 0; x < numberOfPlayers ; x++){
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
function tryReset(){
	let gameOn = false;
	for(let i = 0; i < numberOfPlayers ; i++){
		if(playerSet[i].alive){
		 	gameOn = true;
		}
	}
	if(!gameOn){
		gameReset();
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
				//playerSet[playerNumber].score -= 1;
			}
			playerSet[playerNumber].lastYPosition = playerSet[playerNumber].py;
		break;
		case 2:
			if(playerSet[playerNumber].lastXPosition < playerSet[playerNumber].px){
				playerSet[playerNumber].score += (playerSet[playerNumber].lastXPosition/20) + 15;
			}else if(playerSet[playerNumber].lastXPosition > playerSet[playerNumber].px){
				playerSet[playerNumber].score -= (playerSet[playerNumber].lastXPosition/20) + 15;
			}else{
				//playerSet[playerNumber].score -= 1;
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
    colisionStatus = document.getElementById("colisionCheck").checked;
}

function changeVisualMode(){
	visualMode = document.getElementById("visualCheck").checked;
}

function changemanualMode(){
	manualMode = document.getElementById("manualModeCheck").checked;
}

function playerMovement(command, playerNumber){
	playerSet[playerNumber].movement(command);
}

function changeTime(){
	clearInterval(atualizationFrame);
	let x = document.getElementById("velocity").value;
	atualizationFrame = setInterval(run, 100 - x);
}

function buttons(){
	changeTime();
	changeVisualMode();
	changeColisionStatus();
	changemanualMode();
}