<?php 

mysqli_connect('localhost', 'root', '', 'mini-site');

// if ( mysqli_connect_error() ) {
// 	echo "Ошибка подключения к базе данных.";
// } else {
// 	echo "Подключение прошло успешно!";
// }

if ( mysqli_connect_error() ) {
	die("Ошибка подключения к базе данных.");
}


?>