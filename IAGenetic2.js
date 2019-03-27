function GeneticAlgorithm2 (maxMoves){

    this.population = [];
    this.generationSize = 100;
    this.maxMoves = maxMoves;
    this.scoreSet = [];
    this.mutationRate = 100;
    this.save = function(score, time, invalidateTurn){
        
        time == 0 ? time = 0 : this.scoreSet[time % this.generationSize -1] = score;
        
        if(time % this.generationSize == this.generationSize - 1){
            this.selection(time);
        }
        this.invalidation(invalidateTurn, time);
        return this.population[time % this.generationSize];
        this.invalidation(invalidateTurn, time);
    }
    this.selection = function(time){

        //Selection:
        this.sort();
        this.crossOver(time);

    }

    this.start = function(){
     
        for(let x = 0; x < this.generationSize; x++){
            this.population[x] = [];
            this.scoreSet[x] = 0;
            for(let y = 0; y < this.maxMoves; y++){
                this.population[x][y] = Math.floor((Math.random() * 4) + 1);
            }
        }
       
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

    this.crossOver = function(time){
        this.invalidation(5,time)
    }

    this.mutation = function(){
        return Math.floor((Math.random() * this.mutationRate) + 1);
    }

    this.invalidation = function(idx, time){
        for(let a = idx; a < this.maxMoves; a++){
            let aux = time % this.generationSize;
            this.population[aux][a] = 0;
        }
    }
}