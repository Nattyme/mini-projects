<?php 

$link = mysqli_connect('localhost', 'root', '', 'mini-site');

if ( mysqli_connect_error() ) {
	die("Ошибка подключения к базе данных.");
}

// $query = "SELECT * FROM `users`";
// $query = "SELECT * FROM `users` WHERE `id` = 1";
// $query = "SELECT * FROM `users` WHERE `email` = 'joker@hotmail.com'";
// $query = "SELECT * FROM `users` WHERE `email` LIKE 'joker@hotmail.com'";
// $query = "SELECT * FROM `users` WHERE `email` LIKE '%gmail.com'";
// $query = "SELECT * FROM `users` WHERE `email` LIKE '%man%'";
// $query = "SELECT * FROM `users` WHERE `id` > 2";
// $query = "SELECT * FROM `users` WHERE `id` >= 2";
$query = "SELECT * FROM `users` WHERE `id` >= 2 AND `email` LIKE '%gmail.com'";

if ( $result = mysqli_query($link, $query) ) {

	while ( $row = mysqli_fetch_array($result) ){
		echo "<pre>";
		print_r($row);
		echo "</pre>";
	}

}

?>