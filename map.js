var testTime = 0, turnTime = 0, moves = [], atualizationFrame, time = 0, ctx, stage, numberOfPlayers = 0, colisorNumber, setOfColors = ["red","blue","black","purple","pink"], colisionStatus = false, visualMode = true, maxMoves = 100, manualMode = false;
var playerSet = [];

window.onload = function(){

	stage = document.getElementById('stage');
	ctx = stage.getContext("2d");

	ctx.fillStyle = "grey";
	ctx.fillRect(0,0, stage.width, stage.height);
	ctx.fillStyle = "grey";
	ctx.fillRect(0,0, stage.width, stage.height);
	ctx.fillStyle = "yellow";
	ctx.fillRect(100,100,400,400);
	ctx.fillStyle = "green";
	ctx.fillRect(0,480,100,20);
}

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
			if(playerSet[x].player.alive){
				playerSet[x].player.tryKill(turnTime);
			}
	}	
	if(colisionStatus){
		colision();
	}
	executePlayers();
	tryReset();
	printScores();
	turnTime++;
}

function colision(){
	for(let x = 0; x < numberOfPlayers; x++){
		if(playerSet[x].player.alive){
			for(let y = 0; y < numberOfPlayers; y++){
				if(x != y && playerSet[y].player.alive){
					if(playerSet[x].player.px == playerSet[y].player.px && playerSet[x].player.py == playerSet[y].player.py){
						playerSet[x].player.alive = false;
						playerSet[y].player.alive = false;
					}
				}
			}
		}
	}
}

function executePlayers(){
	for(let x = 0; x < numberOfPlayers; x++){
		if(playerSet[x].player.alive){
			paintPlayer(x);
			if(!manualMode){
				setScore(x);
				if(moves[x][turnTime % playerSet[x].algorithm.generationSize] == 0){
					playerSet[x].player.movement(Math.floor((Math.random() * 4) + 1));
				}else{
					playerSet[x].player.movement(moves[x][turnTime % playerSet[x].algorithm.generationSize]);
				}
			}
		}
	}
}

function printScores(){
	for(let x = 0; x < numberOfPlayers; x++){
		document.getElementById("player"+(x+1)+"Score").innerHTML = playerSet[x].player.score;
	}
	for(let y = 0; y < numberOfPlayers; y++){
		if(document.getElementById("player"+(y+1)+"BestScore").innerHTML < playerSet[y].player.score){
			document.getElementById("player"+(y+1)+"BestScore").innerHTML = playerSet[y].player.score;
		}
	}
	document.getElementById("genetarion").innerHTML = testTime;
}

function paintPlayer(playerNumber){
	if(visualMode){	
		ctx.fillStyle = playerSet[playerNumber].player.color;
		ctx.fillRect(playerSet[playerNumber].player.px,playerSet[playerNumber].player.py,20,20);//X,Y,WIDTH,HEIGHT
	}
}

function newPlayer(){
	
	if(numberOfPlayers > 4){
		alert("The max number of player is 5.");
	}else{ 
		playerSet[numberOfPlayers] = new NewPlayer(
			new Player(setOfColors[numberOfPlayers], (numberOfPlayers) * 20, 460),
			new GeneticAlgorithm(maxMoves)
		);
		moves[numberOfPlayers] = playerSet[numberOfPlayers].algorithm.start();
		paintPlayer(numberOfPlayers);
		numberOfPlayers++;
	}
}
function gameReset(){
	for(let x = 0; x < numberOfPlayers ; x++){
		moves[x] = playerSet[x].algorithm.save(playerSet[x].player.score, testTime, playerSet[x].player.turnDie);
		
		playerSet[x].player.reset(x * 20, 460);
		playerSet[x].player.score = 0;
		paintPlayer(x);	
		
	}
		testTime++;	// It's can explode.
		turnTime = -1;
}
function tryReset(){
	let gameOn = false;
	for(let i = 0; i < numberOfPlayers ; i++){
		if(playerSet[i].player.alive){
		 	gameOn = true;
		}
	}
	if(!gameOn){
		gameReset();
	}
}

function setScore(playerNumber){
	let aux = section(playerNumber);

	switch(aux){//VALORES ENTRE AS SECTIONS ERRADOS
		case 1:
			if(playerSet[playerNumber].player.lastSection == 4){
				playerSet[playerNumber].player.score += 200;
			}else if(playerSet[playerNumber].player.lastSection == 2){
				playerSet[playerNumber].player.score -= 100;
			}else{
				if(playerSet[playerNumber].player.lastYPosition > playerSet[playerNumber].player.py){
					playerSet[playerNumber].player.score += ((playerSet[playerNumber].player.py - 460) / 20) * -1; 
				}else if(playerSet[playerNumber].player.lastYPosition < playerSet[playerNumber].player.py){
					playerSet[playerNumber].player.score -=((playerSet[playerNumber].player.lastYPosition - 460) / 20) * -1;
				}else if(playerSet[playerNumber].player.lastXPosition < playerSet[playerNumber].player.px){
					playerSet[playerNumber].player.score += (playerSet[playerNumber].player.px/20);
				}else if(playerSet[playerNumber].player.lastXPosition > playerSet[playerNumber].player.px){
					playerSet[playerNumber].player.score -= (playerSet[playerNumber].player.lastXPosition/20);
				}
			}
		break;
		case 2:
			if(playerSet[playerNumber].player.lastSection == 1){
				playerSet[playerNumber].player.score += 200;
			}else if(playerSet[playerNumber].player.lastSection == 3){
				playerSet[playerNumber].player.score -= 200;
			}else{
				if(playerSet[playerNumber].player.lastXPosition < playerSet[playerNumber].player.px){
					playerSet[playerNumber].player.score += (playerSet[playerNumber].player.px/20) * 15;
				}else if(playerSet[playerNumber].player.lastXPosition > playerSet[playerNumber].player.px){
					playerSet[playerNumber].player.score -= (playerSet[playerNumber].player.lastXPosition/20) * 15;
				}else if(playerSet[playerNumber].player.lastYPosition < playerSet[playerNumber].player.py){
					playerSet[playerNumber].player.score += (((playerSet[playerNumber].player.py - 460) / 20) * -1) * 15; 
				}else if(playerSet[playerNumber].player.lastYPosition > playerSet[playerNumber].player.py){
					playerSet[playerNumber].player.score -=(((playerSet[playerNumber].player.lastYPosition - 460) / 20) * -1) +18;
				}
			}
		break;
		case 3:
			if(playerSet[playerNumber].player.lastSection == 2){
				playerSet[playerNumber].player.score += 200;
			}else if(playerSet[playerNumber].player.lastSection == 4){
				playerSet[playerNumber].player.score -= 200;
			}else{
				if(playerSet[playerNumber].player.lastYPosition < playerSet[playerNumber].player.py){
					playerSet[playerNumber].player.score += (((playerSet[playerNumber].player.py - 460) / 20) * -1) + 30; 
				}else if(playerSet[playerNumber].player.lastYPosition > playerSet[playerNumber].player.py){
					playerSet[playerNumber].player.score -=(((playerSet[playerNumber].player.lastYPosition - 460) / 20) * -1) + 30;
				}else if(playerSet[playerNumber].player.lastXPosition > playerSet[playerNumber].player.px){
					playerSet[playerNumber].player.score += (playerSet[playerNumber].player.px/20) + 30;
				}else if(playerSet[playerNumber].player.lastXPosition < playerSet[playerNumber].player.px){
					playerSet[playerNumber].player.score -= (playerSet[playerNumber].player.lastXPosition/20) + 30;
				}
			}	
		break;
		case 4: 
			if(playerSet[playerNumber].player.lastSection == 3){
				playerSet[playerNumber].player.score += 200;
			}else if(playerSet[playerNumber].player.lastSection == 1){
				playerSet[playerNumber].player.score -= 200;
			}else{
				if(playerSet[playerNumber].player.lastXPosition > playerSet[playerNumber].player.px){
					playerSet[playerNumber].player.score += (playerSet[playerNumber].player.px/20) + 45;
				}else if(playerSet[playerNumber].player.lastXPosition < playerSet[playerNumber].player.px){
					playerSet[playerNumber].player.score -= (playerSet[playerNumber].player.lastXPosition/20) + 45;
				}else if(playerSet[playerNumber].player.lastYPosition > playerSet[playerNumber].player.py){
					playerSet[playerNumber].player.score += ((playerSet[playerNumber].player.py - 460) / 20) * -45; 
				}else if(playerSet[playerNumber].player.lastYPosition < playerSet[playerNumber].player.py){
					playerSet[playerNumber].player.score -=((playerSet[playerNumber].player.lastYPosition - 460) / 20) * -45;
				}	
			}	
		break;	
	}
		playerSet[playerNumber].player.lastXPosition = playerSet[playerNumber].player.px;	
		playerSet[playerNumber].player.lastYPosition = playerSet[playerNumber].player.py;		
		playerSet[playerNumber].player.lastSection = aux;
		//playerSet[playerNumber].player.score -= 1;
}
function section(playerNumber){

	if(playerSet[playerNumber].player.py <= 480 && playerSet[playerNumber].player.py >=100){
		//1 or 3
		if(playerSet[playerNumber].player.px < 100){
			return 1;
		}else{
			return 3;
		}
	}else{
		// 2 or 4
		if(playerSet[playerNumber].player.py < 100){
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
	playerSet[playerNumber].player.movement(command);
	setScore(playerNumber);
}

function changeTime(){
	clearInterval(atualizationFrame);
	let x = document.getElementById("velocity").value;
	atualizationFrame = setInterval(run, 100 - x);
}
function startGame(){
	setInterval(run, 100);
}
function buttons(){
	changeTime();
	changeVisualMode();
	changeColisionStatus();
	changemanualMode();
}