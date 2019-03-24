
function Player (color, px, py){

        this.color = color;
        this.px = px;
        this.py = py;
        this.lastXPosition = px;
        this.lastYPosition = py;
        this.score = 0;
        this.alive = true;

    this.tryKill = function(){ // Without colision kill
        if(this.px >= 100 && this.py >= 100 && this.py < 500 && this.px < 500){
            this.alive = false;
        }
        if(this.foul()){
            this.alive = false;
        }
        if(this.px < 0 || this.px > 600 || this.py < 0 || this.py > 600){
            this.alive = false;
        }
    };

    this.foul = function(){
        if(this.lastYPosition == 460 && this.py == 480 && this.px < 200){
            return true;
        }else{
            return false;
        }
    };

    this.movement = function(movement) {
		this.lastYPosition = this.py;
		this.lastXPosition = this.px;
        switch(movement){
            case 1://right
                this.px+=20;
            break;
            case 2://left
                this.px-=20;
            break;
            case 3://up
                this.py-=20;
            break;
            case 4://down
                this.py+=20;
            break;
        }
    }
};

function NewPlayer (player, algorithm){
    this.player = player;
    this.algorithm = algorithm;
}