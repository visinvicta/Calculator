<?php

require_once 'Database.php';

if(isset($_POST)) {
    $data = file_get_contents("php://input");
    $user = json_decode($data, true); 

    $db = new Database();

    $query = "INSERT INTO highscores (Username, Score, Time) VALUES (:username, :score, :time)";

    $statement = $db->connection->prepare($query);

    $statement->bindParam(':username', $user['username']);
    $statement->bindParam(':score', $user['score']);
    $statement->bindParam(':time', $user['time']); 

    $statement->execute();
}

// to do:

//display highscores

//different modes? (beginner, expert... )

