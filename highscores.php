<?php

require 'Database.php';
require 'functions.php';

$db = new Database();
$query = "select * from highscores";

$statement = $db->connection->prepare($query);

$statement->execute();

$scores = $statement->fetchall();

usort($scores, function($a, $b) {
    return $b['Score'] - $a['Score'];
});

?>