function include(filename)
{
  var head = document.getElementsByTagName('head')[0];
  
  var script = document.createElement('script');
  script.src = filename;
  script.type = 'text/javascript';
  
  head.appendChild(script);
}

window.onload = function()
{
  board.generateBalls(5);
};



var selectedCell = null;
var board = new Board(9);
var emptyCells = [];
var nextColors = null;
var score = 0;


// controller
function doclick(x, y)
{
  var clickedCell = board.cells[x][y];
  //alert(clickedCell.toString());
  if (selectedCell != null) 
  {
    if (clickedCell.isFree()) 
    {
      //alert("moving selected cell");
      
      var pathFinder = new PathFinder();
      pathFinder.move(selectedCell, clickedCell);
      
      board.cleanCells();     
    }
    else 
    {
      //alert("re-selecting cell");
      selectedCell.unselect();
      selectCell(clickedCell);
    }
  }
  else 
  {
    if (!clickedCell.isFree()) 
    {
      //alert("selecting cell");
      selectCell(clickedCell);
    }
  }
  
}

function selectCell(cell)
{
  cell.select();
  selectedCell = cell;
}

function logCells(cells)
{
  var message = "";
  for (var i = 0; i < cells.length; i++) 
  {
    message = message + cells[i].x + "-" + cells[i].y + "<br>";
  }
  document.getElementById('log').innerHTML = message;
}

function log(s)
{

  document.getElementById('log').innerHTML = s;
}

function writeScore(s)
{
  document.getElementById('score').innerHTML = s;
  document.getElementById('points').value = s;
}









