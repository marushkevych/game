<?php
$yourname = htmlspecialchars($_POST['yourname']);
$points = htmlspecialchars($_POST['points']);

if (!isset($points) || empty($points)) $points = 0;

$myFile = "score.txt";
$freader = fopen($myFile, 'r') or die("can't open file");
$saved = fgets($freader);
fclose($freader);

$championScore=0;
if(!empty($saved))
{
    list($championName, $championScore) = explode(":", $saved);
}


if (isset($points) && !empty($points) && $points >  $championScore)
{
    $fwriter = fopen($myFile, 'w') or die("can't open file");
    $stringData = $yourname.":".$points."\n";
    fwrite($fwriter, $stringData);
}


?>

<html>
<body>

Saved name is:   <?php echo $championName; ?><br />
Saved name score:   <?php echo $championScore; ?><br /><br />

Your name is: <?php echo $yourname; ?><br />
Your points: <?php echo $points; ?><br />



</body>
</html>