<?php 

$link = mysqli_connect('localhost', 'root', '', 'mini-site');

if ( mysqli_connect_error() ) {
	die("Ошибка подключения к базе данных.");
}

// $query = "UPDATE `users` SET `email` = 'joker@hotmail.com' WHERE `id` = 2 LIMIT 1 ";
$query = "UPDATE `users` SET `password` = '555' WHERE `email` = 'joker@hotmail.com' LIMIT 1 ";

mysqli_query($link, $query);



?>