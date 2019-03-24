function GeneticAlgorithm (maxMoves){

    this.population = [];
    this.generationSize = 100;
    this.maxMoves = maxMoves;
    this.scoreSet = [];

    this.save = function(score, time){

        this.scoreSet[time % this.generationSize] = score;
        
        if(time % this.generationSize == this.generationSize - 1){console.log("Time : "+time);
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

    this.crossOver = function(){console.log(this.population)
        let aux = 0, valid = 0, sum = 0, one = 0, two = 0, counter = 0, idxSize = 0, acumulation = 0;
        
        while(this.scoreSet[aux] != 0){
            aux++;
            valid++;
            sum += this.scoreSet[aux];
        }
        //console.log("in "+ sum)
        let arr = [];
        for(let a = 0; a < this.generationSize; a++){
            arr[a] = [];

            randomOne = Math.floor((Math.random() * sum) + 1);
            randomTwo = Math.floor((Math.random() * sum) + 1);

            aux = 0;
            while(counter <= randomOne){
                counter += this.scoreSet[aux];
                one++;
                aux++;
            }
            one--;
            
            counter = 0;
            aux = 0;
            //console.log("for : "+sum);
            while(counter <= randomTwo){//console.log("qqq");
                counter += this.scoreSet[aux];
                two++;
                aux++;
            }
            two--;

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
           
            
            for(let b = aux; b < this.generationSize; b++){
                arr[a][b] = this.population[two][b];
            }


        }

        this.population = arr;
        console.log(this.population);
    }

    this.mutation = function(){

    }

}