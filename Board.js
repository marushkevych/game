function Board(size){
    this.size = size;
    this.cells = [];
    
    // init rows
    for (var i = 0; i < size; i++) {
        this.cells[i] = [];
    }
    
    /**
     * @param {Cell} cell the cell to add
     */
    this.addCell = function(cell){
        this.cells[cell.x][cell.y] = cell;
        emptyCells.push(cell);
    };
    
    this.generateBalls = function(/*number of cell to populate*/ n){
        if(!n) n=3;
      
        if (nextColors == null) 
            nextColors = this.generateNextColors(n);
            
        var colors = nextColors;
        nextColors = this.generateNextColors();
        var emptyIndex;
        var color;
        
        var intervalId = setInterval(generateOneBall, 200);
        function generateOneBall()
        {
            n = n-1;
 
            if (n==-1) {
              clearInterval(intervalId);
              
              for (var i = 0; i < 3; i++) {
                  document.getElementById(i).src = nextColors[i] + '.gif';
              }
              
              return;
              
            } 
            
            if(n<3) document.getElementById(n).src = '0.gif';
             
            emptyIndex = Math.floor(Math.random() * emptyCells.length);
            color = colors[n];
            
            // put ball
            var newEmptyCells = [];
            for (var i = 0; i < emptyCells.length; i++) {
                if (i == emptyIndex) {
                    emptyCells[i].putBall(color);
                }
                else {
                    newEmptyCells.push(emptyCells[i]);
                }
            }
            emptyCells = newEmptyCells;





            if(emptyCells.length == 0)
            {
               clearInterval(intervalId);
                var yourPoints = Number(document.getElementById('score').innerHTML);
                var highPoints = Number(document.getElementById('highscore').innerHTML);
                if(yourPoints > highPoints)
                    document.getElementById("formdiv").style.display = "block";
            }
            
        }
        

    };
    
  
    
    this.generateNextColors = function(/*number of colors to populate*/ n){
        if(!n) n=3;
        var colors = [];
        for (var i = 0; i < n; i++) {
            colors.push(Board.getColor(Math.floor(Math.random() * 4) + 1));
        }
        return colors;
    };
    

    
    
    
    this.replaceEmptyCells = function(oldEpty, newEmpty){
        for (var i = 0; i < emptyCells.length; i++) {
            if (emptyCells[i].x == oldEpty.x && emptyCells[i].y == oldEpty.y) {
                emptyCells[i] = newEmpty;
            }
        }
    };
    
    this.cleanCells = function()
    {
      for (var i = 0; i < this.size; i++) 
      {
        for (var j = 0; j < this.size; j++) 
        {
          this.cells[i][j].isDead = false;
          this.cells[i][j].isPath = false;
          this.cells[i][j].score = null;
        
        };
      }
    };
}


Board.getColor = function(index){
    switch (index) {
        case 1:
            return 'red';
        case 2:
            return 'green';
        case 3:
            return 'blue';
        case 4:
            return 'yellow';
        default:
            throw "The color with this index is not suprted: " + index;
    }
};
