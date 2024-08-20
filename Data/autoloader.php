<?php
declare(strict_types=1);
spl_autoload_register(function () {

    $files = ['CareerStage', 'Project', 'DBConfig', 'ProjectNotExistException'];

    foreach ($files as $file) {
        if (file_exists('Business/' . $file . 'Service.php')) {
            require_once('Business/' . $file . 'Service.php');
        }
        if (file_exists('Data/' . $file . 'DAO.php')) {
            require_once('Data/' . $file . 'DAO.php');
        }
        if (file_exists('Data/' . $file . '.php')) {
            require_once('Data/' . $file . '.php');
        }
        if (file_exists('Entities/' . $file . '.php')) {
            require_once('Entities/' . $file . '.php');
        }
        if (file_exists('Exceptions/' . $file . '.php')) {
            require_once('Exceptions/' . $file . '.php');
        }
    }
});