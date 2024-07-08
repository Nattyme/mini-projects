<?php 
require('config.php');
require('database.php');
$link = db_connect();
require('models/films.php');


if ( @$_GET['action'] == 'delete' ) {
	// Если ошщибок нет - удаляем фильм
	if ( empty($errors) ) {
    $result = film_delete($link, $_GET['id']);

    //Проверяем был ли удален фильм
    if (mysqli_affected_rows($link) > 0) {
      $resultInfo = "<p>Фильм был успешно удалён.</p>";
    } 
	}
}

$films = films_all($link);


include('views/head.tpl');
include('views/index.tpl');
include('views/footer.tpl');

