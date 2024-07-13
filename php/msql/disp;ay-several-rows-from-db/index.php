<?php 

$link = mysqli_connect('localhost', 'root', '', 'mini-site');

if ( mysqli_connect_error() ) {
	die("Ошибка подключения к базе данных.");
}

$query = "SELECT * FROM `users`";

if ( $result = mysqli_query($link, $query) ) {
	// $row = mysqli_fetch_array($result);
	// print_r($row);

	// $row = mysqli_fetch_array($result);
	// print_r($row);

	// $row = mysqli_fetch_array($result);
	// print_r($row);

	while ( $row = mysqli_fetch_array($result) ){
		print_r($row);
	}

}



?>