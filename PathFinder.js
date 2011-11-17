function PathFinder()
{
  this.steps = [];
  this.canMove = false;

  this.move = function(source, destination)
  {
    this.steps = [];
    this.canMove = false;
    
    this.score(source, destination);
    this.doMove(source, destination);
    
    //this.doMove();
  }
  
  this.score = function(source, destination)
  {
    source.setScore(0);
    var score = 1;
    
    // array of arrays of neigbors by score
    // neighborsByScore[1] = array with neighbors with score 1
    var scoredNeighbors = [];
    scoredNeighbors.push(source);
    
    var complete = false;
    var newNeighbors;
    while(true)
    {
      newNeighbors = [];
      for(var index in scoredNeighbors)
      {
        var cell = scoredNeighbors[index];
        var neighbors = cell.getAvailableNeigbors();
        for(var i in neighbors)
        {
          var neighbor = neighbors[i]
          if(neighbor.equals(destination))
          {
            this.canMove = true;
            return;
          }
          neighbor.setScore(score);
          newNeighbors.push(neighbor);
        }
      }
      if(newNeighbors.length == 0)
      {
        return;
      }
      score++;
      scoredNeighbors = newNeighbors;
    }
    
  }
  
  this.findPath = function(cell)
  {
    this.addStep(cell);
    
    if(cell.score == 0)
    {
      // we are done
      return;
    }
    this.findPath(cell.getBestScoredNeighbor());
  }
  
  
  
  this.addStep = function(cell)
  {
    cell.isPath = true;
    //cell.td.style.backgroundColor="#ccc";
    //cell.td.innerHTML=this.steps.length;
    
    //cell.td.style.backgroundColor="#FF0000";
    
    //cell.td.style.backgroundColor=null;
    this.steps.push(cell);
  }
  
  this.doMove = function(source, destination)
  {
    // if can not move just do clean-up
    if (!this.canMove) 
    {
      //this.cleanCells();
      return;
    }
    
    this.findPath(destination);

    // reverse our step (we were tracking steps backwards)
    this.steps.reverse();
    
    var src = this.steps[0];
    var step = 1;
    var steps = this.steps;
    var color = src.color;
    
    var intervalId = setInterval(moveOneStep, 50);
    
    function moveOneStep()
    {
      // this is last step - do actual move
      if (step == steps.length - 1) 
      {
        steps[step - 1].clear();
        var completed = steps[step].putBall(color);
        clearInterval(intervalId);
        selectedCell = null;
        // dont generate new balls if there was complete raw
        if(!completed) board.generateBalls();
      }
      // just fill each step to animate movement
      else 
      {
        steps[step - 1].clear();
        steps[step].fill(color);
        step++;
      }
    }
    
    board.replaceEmptyCells(destination, src);
  }
  
  
}

