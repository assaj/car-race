var time = 10, sqrtSize = 10, ctx, stage,numberOfPlayers = 1, colisorNumber, setOfTests,  testNumber = 0, testSize = 9999999, testMoves = [], testSave = [], testTime = 0, setOfTests = [], setOfScores = [], realTestNumber, setOfColors = ["","red","blue","black","white","pink"];

//var time = 10, ctx, stage, sqrtSize = 10, numberOfPlayers = 1, colisorNumber, testNumber = 0, testSize = 9999, setOfColors = ["","red","blue","black","white","pink"], realTestNumber;
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

	for(let x = 1; x < numberOfPlayers; x++){
			if(playerSet[x].alive){
                playerSet[x].tryKill();
               // colision(x); FIX IT 
				if(playerSet[x].alive){
					paintPlayer(x);
					setScore(x);
					rightMove(x);
				}
			}
	}	
	gameReset();
}
function paintPlayer(playerNumber){
	ctx.fillStyle = setOfColors[playerNumber];
	ctx.fillRect(playerSet[playerNumber].px,playerSet[playerNumber].py,20,20);//X,Y,WIDTH,HEIGHT
}
function rightMove(playerNumber){
	if(Math.floor((Math.random() * 10) + 1) == 1 || setOfTests[playerNumber][testNumber%11][testTime] == 0){
            let random = Math.floor((Math.random() * 4) + 1);
            playerSet[playerNumber].movement(random);
            saveMovement(playerNumber,random);
	}else{
        playerSet[playerNumber].movement(setOfTests[playerNumber][testNumber%11][testTime]);
        saveMovement(playerNumber,setOfTests[playerNumber][testNumber%11][testTime]);
    }
}

function saveMovement(playerNumber, movement){
	testMoves[playerNumber][testTime]= movement;
	testTime++;
}
function newPlayer(){
	if(numberOfPlayers > 5){
		alert("The max number of player is 5.");
	}else{
        playerSet[numberOfPlayers] = player;
        playerSet[numberOfPlayers].color = setOfColors[numberOfPlayers];
        playerSet[numberOfPlayers].px = (numberOfPlayers-1) * 20;
        playerSet[numberOfPlayers].py = 460;
		testMoves[numberOfPlayers] = []; // FIX IT
		setOfTests[numberOfPlayers] = [];
		setOfScores[numberOfPlayers] = [];
		for(let x = 0; x < 20; x++){
			setOfTests[numberOfPlayers][x] = [];
			for(let y = 0; y < 200; y++){
				setOfTests[numberOfPlayers][x][y] = 0;
			}
		}
        clearMoves(numberOfPlayers);
        
		numberOfPlayers++;
	}
}
function gameReset(){
	let gameOn = false;
	for(let i = 1; i < numberOfPlayers ; i++){
		if(playerSet[i].alive){
		 	gameOn = true;
		}
	}
	if(!gameOn || testTime > testSize){
		for(let x = 1; x < numberOfPlayers ; x++){
			//console.log(testMoves[x]+" Score: "+score[x]);
			constructor(testMoves[x],playerSet[x].score,x);
			playerSet[x].px = (x-1) * 20;
			playerSet[x].py = 460;
			playerSet[x].alive = true;
			playerSet[x].score = 0;
			clearMoves(x);
			paintPlayer(x);		
		}
		testTime = 0;
		testNumber++;
	}
}
function clearMoves(playerNumber){
	for(let i = 0; i < 2000; i++){
		testMoves[playerNumber][i] = 0;
	}
}
function clearTestAndScore(playerNumber, idx){
	for(var x = 0; x < idx; x++){
		setOfScores[playerNumber][10 - x] = 0;
		for (var i = 0; i < 2000; i++) {
			setOfTests[playerNumber][10 - x][i] = 0;
		}
		for (var i = 0; i < setOfTests[playerNumber][x].length; i++) {
			if(setOfTests[playerNumber][x][i] == 0){
			//	setOfTests[playerNumber][x][i-1] = 0;
				break;
			}else{
				setOfTests[playerNumber][10 - x][i] = setOfTests[playerNumber][x][i];
			}
		}
	}
}
function colision(playerNumber){
	for(let x = 1; x <= numberOfPlayers; x++){
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

function constructor(testMoves, score, playerNumber){

	//TestMoves OK and score OK
	for (var i = 0; i < testMoves.length; i++) {
		setOfTests[playerNumber][testNumber%11][i] = testMoves[i];
	}
	setOfScores[playerNumber][testNumber%11] = score;
	
	//console.log(setOfTests[playerNumber][testNumber%11]+"  Associado a : "+setOfScores[playerNumber][testNumber%11]+" de numero: "+testNumber%11);  
	

	if(testNumber%10 == 0){
		//compileSetOfMoves(playerNumber);
		//console.log("COMPILANDO========================================");
		compiler(playerNumber);
		//	console.log("  Associado a : "+setOfScores[playerNumber][i]);
		
		//console.log("END========================================");
		//testNumber = 0;	
	}else{
		realTestNumber = 1;
	}
	realTestNumber = 1;
}
function compiler(playerNumber){
	let aux;
	let setAux = [];

	for(let x = 0; x < 11; x++){
		for(let y = 0; y < 11; y++){
			if(setOfScores[playerNumber][x] > setOfScores[playerNumber][y]){

				aux = setOfScores[playerNumber][x];
				setOfScores[playerNumber][x] = setOfScores[playerNumber][y];
				setOfScores[playerNumber][y] = aux;

				for (var i = 0; i < setOfTests[playerNumber][x].length; i++) {
					setAux[i] = setOfTests[playerNumber][x][i];
				}
				for (var i = 0; i < setOfTests[playerNumber][y].length; i++) {
					setOfTests[playerNumber][x][i] = setOfTests[playerNumber][y][i];
				}
				for (var i = 0; i < setAux.length; i++) {
					setOfTests[playerNumber][y][i] = setAux[i];
				}
			}
		}
	}

	clearTestAndScore(playerNumber,5);
}