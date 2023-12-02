<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">

    <title>Document</title>

</head>

<body>




    <div>
        <div class="data">
            <input class="gamedata" type="text" id="score" placeholder="Score"> </input>
            <button class="reset" id="reset"><img src="minesweepersmiley.png" alt="smiley"></button>
            <input class="gamedata" type="text" id="username" placeholder="Username"> </input>

        </div>
        <div>
            <div id="board"></div>
        </div>
    </div>
    <div class="highscorescontainer">
        <table>
            <thead>
                <tr>
                    <th class="tableheader">Player</th>
                    <th class="tableheader">Score</th>
                  
                </tr>
            </thead>
            <tbody>
                <?php
                include 'highscores.php';
                foreach ($scores as $score) {
                    echo "<tr>";
                    echo '<td class="scores">' . $score['Username'] . '</td>';
                    echo '<td class="scores">' . $score['Score'] . '</td>';
                    echo "</tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</body>
<script src="minesweeper.js"></script>

</html>