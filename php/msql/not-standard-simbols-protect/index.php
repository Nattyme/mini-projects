<?php 

$link = mysqli_connect('localhost', 'root', '', 'mini-site');

if ( mysqli_connect_error() ) {
	die("Ошибка подключения к базе данных.");
}

$name = "Brayan O'Konor";
// $name = "Joker";

// $query = "SELECT * FROM `users` WHERE `name` = '" . $name . "'";
$query = "SELECT * FROM `users` WHERE `name` = '" . mysqli_real_escape_string($link, $name) . "'";

if ( $result = mysqli_query($link, $query) ) {

	while ( $row = mysqli_fetch_array($result) ){
		echo "<pre>";
		print_r($row);
		echo "</pre>";
	}

}

?>