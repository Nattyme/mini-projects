<?php
    //Физический путь к корневой директории скрипта
    //config.php должен лежать в корневой директории скрипта!!
    //Пример: E:\OpenServer\domains\site-php-template
    define("ROOT", dirname(__FILE__) . "/");

    //Хост сайта
    //Пример: //site-php-template/
    define("HOST", "//" . $_SERVER["HTTP_HOST"] . "/");