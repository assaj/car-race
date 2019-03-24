function GeneticAlgorithm (maxMoves){

    this.population = [];
    this.generationSize = 100;
    this.maxMoves = maxMoves;
    this.scoreSet = [];

    this.save = function(score, time){

        this.scoreSet[time % this.generationSize] = score;

        if(time % this.generationSize == this.generationSize - 1){
            this.selection();
        }
        return this.population[time % this.generationSize];
    }
    this.selection = function(){

        //Selection:
        this.sort();
        this.crossOver();
        this.mutation();

    }

    this.start = function(){
        for(let x = 0; x < this.generationSize; x++){
            this.population[x] = [];
            this.scoreSet[x] = 0;
            for(let y = 0; y < this.maxMoves; y++){
                this.population[x][y] = Math.floor((Math.random() * 4) + 1);
            }
        }
        console.log(this.population[0]);
        return this.population[0];
    }

    this.sort = function(){

        let aux;

        for(let x = 0; x < this.generationSize; x++){
            for(let y = x; y < this.generationSize; y++){
                if(this.scoreSet[x] < this.scoreSet[y]){
                    this.scoreSet[x] ^= this.scoreSet[y];
                    this.scoreSet[y] ^= this.scoreSet[x];
                    this.scoreSet[x] ^= this.scoreSet[y];

                    aux = this.population[x];
                    this.population[x] = this.population[y];
                    this.population[y] = aux;
                }
            }
        }
    }

    this.crossOver = function(){

    }

    this.mutation = function(){

    }

}