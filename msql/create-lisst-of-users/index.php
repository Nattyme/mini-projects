<?php 

// DB CONNECTION
$link = mysqli_connect('localhost', 'root', '', 'mini-site');

if ( mysqli_connect_error() ) {
	die("Ошибка подключения к базе данных.");
}

// Add user to DB from Form
// print_r($_POST);
if ( array_key_exists('add-user', $_POST) ) {
	if ( $_POST['name'] == '') {
		echo "<p>Необходимо ввести имя!</p>";
	} else if ( $_POST['password'] == '') {
		echo "<p>Необходимо ввести пароль!</p>";
	} else if ( $_POST['email'] == '') {
		echo "<p>Необходимо ввести email!</p>";
	} else {
		$query = "INSERT INTO `users` (`name`, `email`, `password`) VALUES (
		'".mysqli_real_escape_string($link, $_POST['name'])."',  
		'".mysqli_real_escape_string($link, $_POST['password'])."',  
		'".mysqli_real_escape_string($link, $_POST['email'])."'  
		)";

		if ( mysqli_query($link, $query) ) {
			echo "<p>Пользователь был успешно добавлен!</p>";
		} else {
			echo "<p>Пользователь НЕ был добавлен! Произошла ошибка.</p>";
		}
	}
}

// QUERY USERS
$query = "SELECT * FROM `users`";
$users = array();

if ( $result = mysqli_query($link, $query) ) {
	while ( $row = mysqli_fetch_array($result) ){
		$users[] = $row;
	}
}
// print_r($users);

?>


<h1>ТАБЛИЦА C ПОЛЬЗОВАТЕЛЯМИ</h1>

<table border="1">
	<thead>
		<tr>
			<th>ID</th>
			<th>Имя</th>
			<th>Email</th>
			<th>Пароль</th>
		</tr>
	</thead>
	<tbody>
		<?php 

		foreach ($users as $key => $value) {
	?>
			<tr>
				<td><?php echo $users[$key]['id'] ?></td>
				<td><?php echo $users[$key]['name'] ?></td>
				<td><?php echo $users[$key]['email'] ?></td>
				<td><?php echo $users[$key]['password'] ?></td>
			</tr>
	<?php
		}
	?>
	</tbody>
</table>

<h2>ФОРМА ДОБАВЛЕНИЯ ПОЛЬЗОВАТЕЛЯ </h2>

<form action="index.php" method="POST">
	<input type="text" placeholder="Введите имя" name="name">
	<input type="text" placeholder="Введите email" name="email">
	<input type="password" placeholder="Введите пароль" name="password">
	<input type="submit" value="Добавить пользователя" name="add-user">
</form>

