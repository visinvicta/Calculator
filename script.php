<?php


if(isset($_POST)) {
    $data = file_get_contents("php://input");
    $user = json_decode($data, true); 
}



echo $user['userName'];
echo $user['tilesClicked'];
echo $user['time'];


//database connection

//post to database

//display highscores

//different modes? (beginner, expert... )

