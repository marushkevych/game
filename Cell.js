function Cell(x, y, id, parent)
{
  this.board = parent;
  this.x = x;
  this.y = y;
  this.id = id;
  this.img = document.getElementById(this.id);
  this.td = document.getElementById(this.id + "td");
  this.color = "0";
  
  this.score = null;
  
  // path management
  this.isPath = false;
  this.isDead = false;
}

Cell.prototype.setScore = function(score)
{
  this.score = score;
  //this.td.innerHTML = score;
}


Cell.prototype.getAllNeighbors = function()
{
  var pathNeigbors = [];
  if(this.getNextCellUp() != null) pathNeigbors.push(this.getNextCellUp());
  if(this.getNextCellRight() != null) pathNeigbors.push(this.getNextCellRight());
  if(this.getNextCellDown() != null) pathNeigbors.push(this.getNextCellDown());
  if(this.getNextCellLeft() != null) pathNeigbors.push(this.getNextCellLeft());
  
  return pathNeigbors;
}

Cell.prototype.getNeigbors = function(/*function*/ isAvailable)
{
  var selectedNeigbors = [];
  var allNeighbors = this.getAllNeighbors();
  
  for(var index in allNeighbors)
  {
    var cell = allNeighbors[index];
    if (isAvailable(cell))
    {
      selectedNeigbors.push(cell);
    }
  }
  
  return selectedNeigbors;
};


Cell.prototype.getAvailableNeigbors = function()
{
  function isAvailable(cell)
  {
    return cell != null && cell.score == null && !cell.isDead && cell.isFree();
  }
  
  return this.getNeigbors(isAvailable);
};

Cell.prototype.getBestScoredNeighbor = function()
{
  function hasScore(cell)
  {
    return cell != null && cell.score != null;
  }
  
  var scored = this.getNeigbors(hasScore);
  var selected = scored.pop();
  while(scored.length != 0)
  {
    var next = scored.pop();
    if(next.score < selected.score)
    {
      selected = next;
    }
  }
  return selected;
}



Cell.prototype.equals = function(cell)
{
  if (cell == null) return false;
  return this.x == cell.x && this.y == cell.y;
};


Cell.prototype.select = function()
{
  //this.img.src=this.color +"_selected.gif";
  this.img.src = "grey.gif";
};

Cell.prototype.unselect = function()
{
  this.img.src = this.color + ".gif";
};


Cell.prototype.clear = function()
{
  this.color = "0";
  this.img.src = "0.gif";
};

Cell.prototype.isFree = function()
{
  return this.color == "0";
};

Cell.prototype.fill = function(color)
{
  this.color = color;
  this.img.src = color + ".gif";
};

/**
 * Returns true if resulted in complete row (at least one)
 * @param {Object} color
 */
Cell.prototype.putBall = function(color)
{
  this.fill(color);

  // here we check if we have complete rows
  return this.clearCompleteRows();
};

Cell.prototype.toString = function()
{
  return this.img.src + ", " + this.x + ", " + this.y;
};

// constants
Cell.VERTICAL = 'VERTICAL';
Cell.HORISONTAL = 'HORISONTAL';
Cell.DIAGONAL_UP = 'DIAGONAL_UP';
Cell.DIAGONAL_DOWN = 'DIAGONAL_DOWN';

Cell.prototype.getNextCell = function(direction)
{
  switch (direction)
  {
    case Cell.VERTICAL:
      return this.getNextCellUp();
    case Cell.HORISONTAL:
      return this.getNextCellRight();
    case Cell.DIAGONAL_UP:
      return this.getNextCellNorthWest();
    case Cell.DIAGONAL_DOWN:
      return this.getNextCellSouthWest();
    default:
      throw "No such direction " + direction;
  }
  
};

Cell.prototype.getPreviousCell = function(direction)
{
  switch (direction)
  {
    case Cell.VERTICAL:
      return this.getNextCellDown();
    case Cell.HORISONTAL:
      return this.getNextCellLeft();
    case Cell.DIAGONAL_UP:
      return this.getNextCellSouthEast();
    case Cell.DIAGONAL_DOWN:
      return this.getNextCellNorthEast();
    default:
      throw "No such direction " + direction;
  }
};


// returns its next neigbour below, or null if this is the bottom cell on the board
Cell.prototype.getNextCellDown = function()
{
  if (this.x + 1 == this.board.size) 
    return null;
  return this.board.cells[this.x + 1][this.y];
};

// returns its upper neigbour, or null if this is the top cell on the board
Cell.prototype.getNextCellUp = function()
{
  if (this.x - 1 < 0) 
    return null;
  return this.board.cells[this.x - 1][this.y];
};

// returns its next cell on the left, or null if this is the first cell in the row
Cell.prototype.getNextCellLeft = function()
{
  if (this.y - 1 < 0) 
    return null;
  return this.board.cells[this.x][this.y - 1];
};

// returns its next cell on the right, or null if this is the last cell in the row
Cell.prototype.getNextCellRight = function()
{
  if (this.y + 1 == this.board.size) 
    return null;
  return this.board.cells[this.x][this.y + 1];
};

// returns its next cell in diagonal row in north east direction, or null if this is the last cell in the row
Cell.prototype.getNextCellNorthEast = function()
{
  if (this.y + 1 == this.board.size || this.x - 1 < 0) 
    return null;
  return this.board.cells[this.x - 1][this.y + 1];
};

// returns its next cell in diagonal row in north west direction, or null if this is the last cell in the row
Cell.prototype.getNextCellNorthWest = function()
{
  if (this.y - 1 < 0 || this.x - 1 < 0) 
    return null;
  return this.board.cells[this.x - 1][this.y - 1];
};

// returns its next cell in diagonal row in south east direction, or null if this is the last cell in the row
Cell.prototype.getNextCellSouthEast = function()
{
  if (this.y + 1 == this.board.size || this.x + 1 == this.board.size) 
    return null;
  return this.board.cells[this.x + 1][this.y + 1];
};

// returns its next cell in diagonal row in south west direction, or null if this is the last cell in the row
Cell.prototype.getNextCellSouthWest = function()
{
  if (this.y - 1 < 0 || this.x + 1 == this.board.size) 
    return null;
  return this.board.cells[this.x + 1][this.y - 1];
};

/**
 * Returns true if there was complete row
 */
Cell.prototype.clearCompleteRows = function()
{
  var vertical = this.getNeighbors(Cell.VERTICAL);
  var horizontal = this.getNeighbors(Cell.HORISONTAL);
  var diagonalUp = this.getNeighbors(Cell.DIAGONAL_UP);
  var diagonalDown = this.getNeighbors(Cell.DIAGONAL_DOWN);
  
  // clear only after we get all neighbors
  var cleared;
  if(this.clearLine(vertical)) cleared = true;
  if(this.clearLine(horizontal)) cleared = true;
  if(this.clearLine(diagonalUp)) cleared = true;
  if(this.clearLine(diagonalDown)) cleared = true;
  return cleared;
};

Cell.prototype.getNeighbors = function(direction)
{
  var neighbors = [];
  
  // get next neighbors including current cell
  var currentCell = this;
  while (currentCell != null && currentCell.color == this.color) 
  {
    neighbors.push(currentCell);
    currentCell = currentCell.getNextCell(direction);
  }
  
  // get previous neighbors
  currentCell = this.getPreviousCell(direction);
  while (currentCell != null && currentCell.color == this.color) 
  {
    neighbors.push(currentCell);
    currentCell = currentCell.getPreviousCell(direction);
  }
  
  return neighbors;
};


/** 
 * Returns true if there was complete line
 * @param {Object} line
 */
Cell.prototype.clearLine = function(line)
{
  if (line.length > 4) 
  {
    for (var i = 0; i < line.length; i++) 
    {
      score++;
      line[i].clear();
      emptyCells.push(line[i]);
    }

    writeScore(score);
    return true;
  }
  return false
};

Cell.prototype.getDistance = function(dest)
{
  return Math.abs(dest.x - this.x) + Math.abs(dest.y - this.y);
};

