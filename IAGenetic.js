var time = 100, sqrtSize = 10, ctx, stage,numberOfPlayers = 1, testMoves = [], testSave = [], setOfTests = [], setOfScores = [];

function startGeneticLearningExecution(playerNumber){
    setScore(playerNumber);
	rightMove(playerNumber);
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
        for(let y = 0; y < 200; y++){
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

function clearTestAndScore(playerNumber, idx){ // Maybe Fix
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
