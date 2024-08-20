<?php
    declare(strict_types = 1);
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Schattenjacht</title>
        <link rel="stylesheet" href="CSS/style.css">
        <script type="module" src="JavaScript/app.js" defer></script>
        <script>
            if (sessionStorage.getItem('settings') === null) {
                window.location.href = "index.php";
            }
        </script>
    </head>
    <body>
        <div class="popupContainer" id="endgamePopup">
                <h1 id="popupTitle">You won!</h1>
                <p>Your score: <span id="popup_score">0000</span></p>
                <button onclick="window.location.reload();">Play again!</button>
                <button onclick="window.location.href = 'index.php';">Back to dashboard</button>
        </div>
        <div class="wrapper">
            <div class="horizontalFlexContainer" id="infoContainer">
                <div id="scoreInfo">
                    Score: <span id="score"></span>
                </div>
                <div id="healthInfo">
                    
                </div>
            </div>
            <div class="board" id="speelbord">

            </div>
        </div>
    </body>
</html>