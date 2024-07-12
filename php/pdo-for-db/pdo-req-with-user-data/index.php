<?php 
// ==== 0 Подключение одинаковое для способов 1, 2 и 3 ниже

//NB!!! Инф ниже применяется к коду, кот. принимает данные от пользователя
//Подключение к БД. 
//Создаем новый объект PDO.Передаем параметры: хост и название БД, пользователь, пароли.
//Модет быть 4й параметр с настройками
$db = new PDO('mysql:host=localhost;dbname=mini-site', 'root', '');

// 1- Делаем выборку без защиты от инъекций!
$username = 'Joker';
$password = '555';

$sql = "SELECT * FROM users WHERE name = '{$username}' AND password = '{$password }' LIMIT 1";
$result = $db->query($sql);
print_r($result->fetch(PDO::FETCH_ASSOC));

//Проверка методом rowCount(), что получаем только одно значение
//Метод rowCount() возвращает кол-во строк, затронутое в запросе
// Ожидаем, что равно 1 и не равно 0
if ( $result->rowCount() == 1) {
  $user = $result->fetch(PDO::FETCH_ASSOC);
  echo "Имя пользователя: {$user['name']}";
}

// 2 - Выборка с защитой от SQL инъекций в РУЧНОМ РЕЖИМЕ!
// Он дольше, использовать не стоит. Есть еще автоматический
$username = 'Joker';
$password = '555';


$username = $db->quote( $username );
// функция strtr экранирует все символы, заменяет одни на другие
$username = strtr( $username, array('_' => '\_', '\%') );


$password = $db->quote( $username );
$password = strtr( $password, array('_' => '\_', '\%') );

$sql = "SELECT * FROM users WHERE name = '{$username}' AND password = '{$password }' LIMIT 1";
$result = $db->query($sql);
print_r($result->fetch(PDO::FETCH_ASSOC));

//Проверка методом rowCount(), что получаем только одно значение
//Метод rowCount() возвращает кол-во строк, затронутое в запросе
// Ожидаем, что равно 1 и не равно 0
if ( $result->rowCount() == 1) {
  $user = $result->fetch(PDO::FETCH_ASSOC);
  echo "Имя пользователя: {$user['name']}";
}


// 3 - Выборка с защитой от SQL инъекций в АВТОМАТИЧЕСКОМ РЕЖИМЕ!

$sql = "SELECT * FROM users WHERE name = :username AND password = :password LIMIT 1";
// Метода prepare() подготавливает sql запрос
$stmt = $db->prepare($sql);

$username = 'Joker';
$password = '555';

//Делаем подстановку переменной чрез bindValue
$stmt->bindValue(':username', $username); // или
$stmt->bindValue(':username', $_POST['login']); 
$stmt->bindValue(':password', $password);

//Запускаем метод execute() и полусаем ассоциативный массив
$stmt->execute();

// Чтобы не вызывать bindValue для каждого значения, то можно сразу в execute передать ассоциативный массив
// $stmt->execute(array(':username' => $username, ':password' => $password));

$stmt->bindColumn('name', $name);
$stmt->bindColumn('email', $email);

$stmt->fetch();
//Здесь делаем проверку условий
echo "Имя пользователя: {$name}";
echo "Имя пользователя: {$email}";

//Защита от скриптов
$string = "<script>hello</script>";
$string = htmlentities($string);
echo $string;