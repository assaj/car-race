const map = [];
const mapSide = 30;
const colors = ["red","blue","black","purple","pink"];
const playerSet = []
const moves = []
var numberOfPlayers = 0, maxMoves = 100, visualMode = true;

//setInterval(run , 100);
function run(){
    tableInit();
    makeMap();
}
function tableInit(){
    for(let row = 0; row < mapSide; row++){
        map[row] = [];
        for(let column = 0; column < mapSide; column++){
            map[row][column] = 0;
        }
    }
}

function makeMap(){
    let html = '<table>'; //cellpadding=0 cellspacing=0

    for(let row = 0; row < mapSide; row++){
       // html += '<tr style = "background-color : '
        //html += colors[row % 4]
        //html += '">'
        html += "<tr>";
        for(let column = 0; column < mapSide; column++){
            html += '<td';
            html += ' id="'+'x'+column+'y'+row+'"';
            html += '>';
            html += " ";
            html += '</td>';
        }
        html += '</tr>';
    }
    
    document.getElementById("map").innerHTML = html;
}

function newPlayer(name){
	
	if(numberOfPlayers > 4){
		alert("The max number of player is 5.");
	}else{ 
		let found = true;
		let x = document.getElementById("algortihm").value;
		let y = document.getElementById("maker").value;

			switch(x){

				case "IAGenetic":
				playerSet[numberOfPlayers] = new NewPlayer(
					new Player(colors[numberOfPlayers], numberOfPlayers, 0),
					new GeneticAlgorithm(maxMoves,y)
				);
				break;

				case "IAGenetic2":
				playerSet[numberOfPlayers] = new NewPlayer(
					new Player(colors[numberOfPlayers], (numberOfPlayers) * 20, 460),
					new GeneticAlgorithm2(maxMoves,y)
				);
				break;

				default:
					alert("Algorithm not found");
					found = false;
				break;
			}
		
		if(found){
			document.getElementById("playerAlgorithm"+(numberOfPlayers+1)).innerHTML = x + ",  " + y;
			moves[numberOfPlayers] = playerSet[numberOfPlayers].algorithm.start();
			paintPlayer(numberOfPlayers);
			numberOfPlayers++;	
		}
	
    }
}

function paintPlayer(playerNumber){
	if(visualMode){	
        //document.getElementById("x0y0").style.backgroundColor = "red"
        document.getElementById('x'+playerSet[playerNumber].player.px+'y'+playerSet[playerNumber].player.py)
        .style.backgroundColor = playerSet[playerNumber].player.color;
	}
}
  run();