var testMoves = [], testSave = [], population = [], setOfScores = [], populationSize = 50, testNumber = 0, currentTime = 0;

function geneticLearningExecution(playerNumber){console.log(testTime);
	if(!manualMode){
		rightMove(playerNumber);
	}
}
function resetGeneticLearning(score,playerNumber){
	constructor(score, playerNumber);
	clearMoves(playerNumber); 
	testNumber++;
}
function startGeneticLearning(playerNumber){
    testMoves[playerNumber] = []; 
    population[playerNumber] = [];
    setOfScores[playerNumber] = [];

    for(let x = 0; x < populationSize; x++){// FIX IT
        population[numberOfPlayers][x] = [];
        for(let y = 0; y < 200; y++){ // FIX IT
            population[numberOfPlayers][x][y] = 0;
        }
    }
    clearMoves(numberOfPlayers);
}

function rightMove(playerNumber){
	if(population[playerNumber][testNumber][currentTime] == 0){
        let random = Math.floor((Math.random() * 4) + 1);
        playerSet[playerNumber].movement(random);
        saveMovement(playerNumber,random);
	}else{
        playerSet[playerNumber].movement(population[playerNumber][testNumber][currentTime]);
        saveMovement(playerNumber,population[playerNumber][testNumber][currentTime]);
	}
}

function saveMovement(playerNumber, movement){
	testMoves[playerNumber][currentTime]= movement;
}

function clearMoves(playerNumber){
	for(let i = 0; i < 200; i++){
		testMoves[playerNumber][i] = 0;
	}
}

function clearTestAndScore(playerNumber, idx){
	for(var x = 0; x < idx; x++){
		setOfScores[playerNumber][10 - x] = 0;
		for (var i = 0; i < 2000; i++) {
			population[playerNumber][10 - x][i] = 0;
		}
		for (var i = 0; i < population[playerNumber][x].length; i++) {
			if(population[playerNumber][x][i] == 0){
			//	population[playerNumber][x][i-1] = 0;
				break;
			}else{
				population[playerNumber][10 - x][i] = population[playerNumber][x][i];
			}
		}
	}
}

function constructor(score, playerNumber){

	for (var i = 0; i < testMoves[playerNumber].length; i++) {
		population[playerNumber][testNumber%11][i] = testMoves[playerNumber][i];
	}

	setOfScores[playerNumber][testNumber%11] = score;
	
	if(testNumber%populationSize == 0){
		compiler(playerNumber);
		generation++;
	}else{
		realTestNumber = 1;
	}
	realTestNumber = 1;
}

function compiler(playerNumber){
	let aux;
	let setAux = [];

	for(let x = 0; x < populationSize+1; x++){
		for(let y = 0; y < populationSize+1; y++){
			if(setOfScores[playerNumber][x] > setOfScores[playerNumber][y]){

				aux = setOfScores[playerNumber][x];
				setOfScores[playerNumber][x] = setOfScores[playerNumber][y];
				setOfScores[playerNumber][y] = aux;

				for (var i = 0; i < population[playerNumber][x].length; i++) {
					setAux[i] = population[playerNumber][x][i];
				}
				for (var i = 0; i < population[playerNumber][y].length; i++) {
					population[playerNumber][x][i] = population[playerNumber][y][i];
				}
				for (var i = 0; i < setAux.length; i++) {
					population[playerNumber][y][i] = setAux[i];
				}
			}
		}
	}
	
	clearTestAndScore(playerNumber,5);
	//mutation(playerNumber);
}

function mutation(playerNumber){

	let aux = 0;
	let auxb = 0;
	while(population[playerNumber][aux][auxb+1] != 0){
		population[playerNumber][a] = population[playerNumber][0];
	}
	
}