function GeneticAlgorithm (maxMoves){

    this.population = [];
    this.generationSize = 50;
    this.maxMoves = maxMoves;
    this.scoreSet = [];
    this.mutationRate = 25;

    this.save = function(score, time, invalidateTurn){
        
        this.scoreSet[time % this.generationSize] = score;
        
        if(time % this.generationSize == this.generationSize - 1){
            this.selection(time);
        }
        this.invalidation(invalidateTurn, time);
        return this.population[time % this.generationSize];
    }
    this.selection = function(time){
        this.sort();
        this.crossOver(time);
    }

    this.start = function(){
     
        for(let x = 0; x < this.generationSize; x++){
            this.population[x] = [];
            this.scoreSet[x] = 0;
            this.shufferFamily(x);
        }
       
        return this.population[0];
    }

    this.shufferFamily = function (idx){
        for(let y = 0; y < this.maxMoves; y++){
            this.population[idx][y] = Math.floor((Math.random() * 4) + 1);
        }
    }
    this.sort = function(){

        let aux, debug = 0;

        for(let x = 0; x < this.generationSize; x++){ debug += this.scoreSet[x];
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
        console.log(debug/50);
    }

    this.crossOver = function(){
        let aux = 0, valid = 0, sum = 0, one = 0, two = 0, counter = 0, idxSize = 0, acumulation = 0;
        
        while(aux <= this.generationSize && this.scoreSet[aux] > 0 ){
            aux++;
            valid++;
            sum += this.scoreSet[aux];
        }
        for(let b = aux + 1; b < this.generationSize; b++){
            this.shufferFamily(b);
        }
        if(valid <= 0){ // arrumar
            this.invalidation(0, time);
        }else{

            let arr = [];
            for(let a = 0; a < this.generationSize; a++){
                arr[a] = [];
                   
                    randomOne = Math.floor((Math.random() * sum) + 1);
                    
                    one = 0;
                    aux = 0;
                    counter = 0;
                    while(counter <= randomOne){
                        counter += this.scoreSet[aux];
                        one++;
                        aux++;
                    }
                    one--;

                    randomTwo = Math.floor((Math.random() * sum) + 1);
                    
                    two = 0;
                    counter = 0;
                    aux = 0;
                    
                    while(counter <= randomTwo){
                        counter += this.scoreSet[aux];
                        two++;
                        aux++;
                    }
                    two--;

                for(let b = 0; b < this.maxMoves; b++){
                    if(this.population[one][b] == 0 && this.population[two][b] == 0){ 
                        for(let c = b; c < this.maxMoves; c++){
                            arr[a][c] = 0;
                        }
                        b = this.maxMoves;
                    }else{
                        if(b%2 == 0 && this.population[one][b] != 0){
                            arr[a][b] = this.population[one][b];
                        }else{
                            arr[a][b] = this.population[two][b];
                        }   
                    let aux2 = this.mutation();
                    aux2 == 1 ? arr[a][b] = Math.floor((Math.random() * 4) + 1) : arr[a][b] += 0;  
                    }
                
                }
    
                one = 0;
                two = 0;
                aux = 0;
            }
        
            this.population = arr;
        }
    }

    this.mutation = function(){
        return Math.floor((Math.random() * this.mutationRate) + 1);
    }

    this.invalidation = function(idx, time){
        for(let a = idx; a < this.maxMoves; a++){
            let aux = time % this.generationSize;
            this.population[aux][a] = Math.floor((Math.random() * 4) + 1);
        }
    }
}