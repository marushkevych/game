<?php
$yourname = htmlspecialchars($_POST['yourname']);
$points = htmlspecialchars($_POST['points']);

if (empty($yourname)) $yourname = "unknown";
if (empty($points)) $points = 0;

$myFile = "score.txt";
$freader = fopen($myFile, 'r') or die("can't open file");
$saved = fgets($freader);
fclose($freader);

$championScore=0;
if(!empty($saved))
{
    list($championName, $championScore) = explode(":", $saved);
}


if (intval($points) >  intval($championScore))
{
    // replace champion recors
    $fwriter = fopen($myFile, 'w') or die("can't open file");
    $stringData = $yourname.":".$points."\n";
    fwrite($fwriter, $stringData);
    fclose($fwriter);

    // add stats
    $statsFile = "stats.txt";
    $statswriter = fopen($statsFile, 'a') or die("can't open file");
    fwrite($statswriter, $yourname.":".$points."\n");
    fclose($statswriter);

    $championScore=$points;
    $championName=$yourname;
}


?>



<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type"
          content="text/html; charset=ISO-8859-1"/>
    <title>Example 1-1</title>
    <link rel="stylesheet" type="text/css" media="screen" href="board.css" />
    <script type="text/javascript" src="PathFinder.js"></script>
    <script type="text/javascript" src="Board.js"></script>
    <script type="text/javascript" src="Cell.js"></script>
    <script type="text/javascript" src="test.js"></script>
    <script type="text/javascript">
        function writeScore(s)
        {
          document.getElementById('score').innerHTML = s;
          document.scoreform.points.value = s;
        }
    </script>
  </head>
  <body>



 <center>
     <div>Current champion is <b><?php echo $championName; ?></b></div>
     <div>Highest Score is <span id='highscore' name='highscore'><?php echo $championScore; ?></span></div>
     <div>Your score is <span id='score' name='score'>0</span></div>



  <div id='formdiv' style="display:none;">
      <br>
      <h1>Congratulations! You are the champion!!!</h1>
      <form id='scoreform' name='scoreform' action="index.php" method="post">
        <p>Your Name: <input type="text" name="yourname" />
        <input id="points" type="hidden" name="points" value="0"/>

        <input type="submit" value="Save your score!">
      </form>
  </div>

</center>


  <script type="text/javascript">



      // display next colors
      document.writeln("<center><table><tr>");
      for (var i = 0; i < 3; i++)
      {
        document.writeln('<td><img width="32" id="' + i + '" height="32" border="0" src="0.gif"  /></td>');
      }
      document.writeln("</tr></table>");

      // render board
      document.writeln("<table>");
      for (var i = 0; i < board.size; i++)
      {
        document.writeln("<tr>");
        for (var j = 0; j < board.size; j++)
        {
          var id = i + "-" + j;
          document.writeln('<td id="' + id + 'td" ><img width="32" id="' + id + '" height="32" border="0" src="0.gif" onclick="doclick(' + i + ',' + j + ')"   /></td>');
          var cell = new Cell(i, j, id, board);
          board.addCell(cell);
        }
        document.writeln("</tr>");
      }
      document.writeln("</table></center>");

  </script>
  <div id='log'></div>

  </body>
</html>
