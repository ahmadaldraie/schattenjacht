<?php
    declare(strict_types = 1);
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Schattenjacht dashboard</title>
        <link rel="stylesheet" href="CSS/style.css">
        <script type="module" src="JavaScript/dashboard.js" defer></script>
    </head>
    <body>
        <div class="wrapper">
            <h1 class="title">Schattenjacht</h1>
            <form method="post" action="schattenjacht.php" class="wrapper" id="gameSettings">
                <div id="moeilijkheid">
                    <h2>Moeilijkheid</h2>
                    <select id="difficultySelect">
                        <option value="easy">Gemakkelijk</option>
                        <option value="medium" selected>Gemiddeld</option>
                        <option value="hard">Moeilijk</option>
                        <option value="impossible">Onmogelijk</option>
                        <option value="custom">Aangepaste moeilijkheid</option>
                    </select>
                    <div class="fieldsContainer" id="customDifficulty" style="display: none;">
                        <div class="inputField">
                            <label for="walls">Aantal muren</label>
                            <input type="number" min="5" max="50" value="10" id="walls" name="walls" required>
                        </div>
                        <div class="inputField">
                            <label for="treasures">Aantal schatten</label>
                            <input type="number" min="1" max="25" value="3" id="treasures" name="treasures" required>
                        </div>
                        <div class="inputField">
                            <label for="enemySpeed">Vijand vertraging</label>
                            <input type="number" min="50" max="3000" step="10" value="500" id="enemySpeed" name="enemySpeed" required> ms
                        </div>
                    </div>
                </div>
                <div id="boardSettings">
                    <h2>Bord Grootte</h2>
                    <div class="fieldsContainer">
                        <div class="inputField">
                            <label for="boardWidth">Breedte</label>
                            <input type="range" min="10" max="25" value="15" class="slider" id="boardWidth" name="boardWidth" required>
                        </div>
                        <div class="inputField">
                            <label for="boardHeight">Hoogte</label>
                            <input type="range" min="10" max="25" value="15" class="slider" id="boardHeight" name="boardHeight" required>
                        </div>
                    </div>
                    <p><span id="widthOutput"></span> X <span id="heightOutput"></span></p>
                </div>
                <div id="cellSettings">
                    <h2>cel grootte</h2>
                    <div class="inputField">
                        <label for="cellSize">Grootte</label>
                        <input type="number" min="16" max="128" value="48" id="cellSize" name="cellSize" required> px
                    </div>
                    <input type="submit" value="Start">
                </div>
            </form>
        </div>
    </body>
</html>