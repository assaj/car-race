var time = 100, testMoves = [], testSave = [], setOfTests = [], setOfScores = [];

function geneticLearningExecution(playerNumber){
	setScore(playerNumber);
	if(!manualMode){
		rightMove(playerNumber);
	}
}
function resetGeneticLearning(playerNumber){
    clearMoves(playerNumber); 
}
function startGeneticLearning(playerNumber){
    testMoves[playerNumber] = []; 
    setOfTests[playerNumber] = [];
    setOfScores[playerNumber] = [];

    for(let x = 0; x < 20; x++){
        setOfTests[numberOfPlayers][x] = [];
        for(let y = 0; y < 200; y++){ // FIX IT
            setOfTests[numberOfPlayers][x][y] = 0;
        }
    }
    clearMoves(numberOfPlayers);
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

function constructor(score, playerNumber){

	for (var i = 0; i < testMoves[playerNumber].length; i++) {
		setOfTests[playerNumber][testNumber%11][i] = testMoves[playerNumber][i];
	}
	setOfScores[playerNumber][testNumber%11] = score;
	if(testNumber%10 == 0){
		compiler(playerNumber);
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
	//mutation(playerNumber);
}

function mutation(playerNumber){

	let aux = 0;
	let auxb = 0;
	while(setOfTests[playerNumber][aux][auxb+1] != 0){
		setOfTests[playerNumber][a] = setOfTests[playerNumber][0];
	}
	
}