<?php
require('config.php');
require('database.php');
$link = db_connect();
require('models/films.php');

// Save form data to DB
if ( array_key_exists('update-film', $_POST) ) {
	
	// Обработка ошибок
	if ( $_POST['title'] == '') {
		$errors[] = "<p>Необходимо ввести название фильма!</p>";
	}
	if ( $_POST['genre'] == '') {
		$errors[] = "<p>Необходимо ввести жанр фильма!</p>";
	}
	if ( $_POST['year'] == '') {
		$errors[] = "<p>Необходимо ввести год фильма!</p>";
	}

	// Если ошщибок нет - сохраняем фильм
	if ( empty($errors) ) {
    $result = film_update($link, $_POST['title'], $_POST['genre'], $_POST['year'], $_GET['id'], $_POST['description']);
    
    if ( $result) {
      $resultSuccess = "<p>Фильм был успешно обновлен</p>";
    } else { 
      $resultError = "<p>Что то пошло не так. Добавьте фильм еще раз!</p>";
    }
	}
}

$film = get_film ($link, $_GET['id']);

if ( @$_GET['action'] == 'delete' ) {
	// Если ошщибок нет - удаляем фильм
	if ( empty($errors) ) {
    $result = film_delete($link, $_GET['id']);

    //Проверяем был ли удален фильм
    if ($result) {
      $resultInfo = "<p>Фильм был успешно удалён.</p>";
    } else {
      $resultError = "<p>Что-то пошло не так..</p>";
    }
	}
}

include('views/head.tpl');
include('views/notifications.tpl');
include('views/edit-film.tpl');
include('views/footer.tpl');





