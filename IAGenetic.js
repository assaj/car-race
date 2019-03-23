function GeneticAlgorithm (maxMoves){

    this.population = [];
    this.generationSize = 100;

    this.algorithm = function(scoreSet){

        this.selection();

        return this.population;

    }

    this.selection = function(){
        this.sort();
        this.crossOver();
        this.mutation();
    }

    this.sort = function(){

    }

    this.crossOver = function(){

    }

    this.mutation = function(){

    }

}