<?php
// Подключение RedBean ORM
require "libs/rb-mysql.php";
// Подключение БД
R::setup('mysql:host=localhost;dbname=school', 'root', 'root');
// "Заморозка" состояния БД перед загрузкой на продакшен (на работающий сервер). На продакшене очень нежелательна ситуация, в которой БД может приобретать новые поля и т.п.
// В таком состоянии не получится создать новые поля в БД
R::freeze(TRUE);
?>