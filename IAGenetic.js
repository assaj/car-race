function GeneticAlgorithm (maxMoves){

    this.population = [];
    this.generationSize = 100;
    this.maxMoves = maxMoves;
    this.scoreSet = [];

    this.save = function(score, time, invalidateTurn){
        console.log(invalidateTurn);
        time == 0 ? time = 0 : this.scoreSet[time % this.generationSize -1] = score;
        
        if(time % this.generationSize == this.generationSize - 1){
            this.selection();
        }
        this.invalidation(invalidateTurn, time);
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
        let aux = 0, valid = 0, sum = 0, one = 0, two = 0, counter = 0, idxSize = 0, acumulation = 0;
        
        while(aux <= this.generationSize && this.scoreSet[aux] != 0 ){
            aux++;
            valid++;
            sum += this.scoreSet[aux];
        }
        
        let arr = [];
        for(let a = 0; a < this.generationSize; a++){
            arr[a] = [];

            randomOne = Math.floor((Math.random() * sum) + 1);
            randomTwo = Math.floor((Math.random() * sum) + 1);

            aux = 0;
            counter = 0;
            while(counter <= randomOne){
                counter += this.scoreSet[aux];
                one++;
                aux++;
            }
            one--;
            
            counter = 0;
            aux = 0;
            
            while(counter <= randomTwo){
                counter += this.scoreSet[aux];
                two++;
                aux++;
            }
            two--;

            idxSize = 0;
            idxSize += this.scoreSet[one]; 
            idxSize += this.scoreSet[two];

            idxSize = idxSize/this.maxMoves;

            acumulation = this.scoreSet[one];
            aux = 0;
            while(acumulation >= idxSize){
                acumulation -= idxSize;
                arr[a][aux] = this.population[one][aux];
                aux++;
            }
            
            for(let b = aux; b < this.population[two].length; b++){
                arr[a][b] = this.population[two][b];
            }
 
            one = 0;
            two = 0;
            aux = 0;
        }

        this.population = arr;
    }

    this.mutation = function(){

    }

    this.invalidation = function(idx, time){
        for(let a = idx; a < this.maxMoves; a++){
            let aux = time % this.generationSize;
            this.population[aux][a] = 0;
        }
    }
}