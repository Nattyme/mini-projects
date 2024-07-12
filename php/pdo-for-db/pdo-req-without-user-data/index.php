<?php 
// ==== 0 Подключение одинаковое для способов 1, 2 и 3 ниже

//NB!!! Инф ниже применяется к коду, кот. не принимает данные от пользователя
//Подключение к БД. 
//Создаем новый объект PDO.Передаем параметры: хост и название БД, пользователь, пароли.
//Модет быть 4й параметр с настройками
$db = new PDO('mysql:host=localhost;dbname=filmoteka', 'root', '');

//Запрос на выбор данных из таблицы
$sql = "SELECT * FROM films";

//Выполняем запрос. $db уже является объектом PDO и у нее есть методы.
//Метод query выполняет запрос
$result = $db->query($sql);

echo "<h2>Вывод записей  из результата по одной: </h2>";





//====== 1 - Получаем данные  с помощью $result->fetch и метода ASSOC ====
//====== Каждый раз получая по одноый записи из объекта и записывая их в ассоциативный массив ====

//Метод fetch возвращает по одной строке из БД, кот мы получили
//Каждый раз получает по 1му результату
$result->fetch(PDO::FETCH_ASSOC);
$result->fetch(PDO::FETCH_ASSOC);
print_r( $result->fetch(PDO::FETCH_ASSOC) );

//Чтобы выводить запись несколько раз можно использовать цикл while
//Ниже мы выводим запись по одной и записываем каждую в $film
while ( $film = $result->fetch(PDO::FETCH_ASSOC) ) {
  print_r($film);
  //Распечатать отдельную информацию
  echo $film['title'];
  echo $film['genre'];
}




// ============= 2 формат вывода через fetchAll =================

// $db = new PDO('mysql:host=localhost;dbname=filmoteka', 'root', '');
$sql = "SELECT * FROM films";
$result = $db->query($sql);
// У результата вызываем метод fetchAll - получаем сразу все данные
//Получаем весь ассоциатывный массив со всеми фильмами
$films = $result->fetchAll(PDO::FETCH_ASSOC);

// Обходим полученный массив через foreach и вывожим данные по одному
foreach ($films as $film ) {
  echo $film['title'];
  echo $film['genre'];
}





// ====== 3 форматы вывода bindColumn ======
// $db = new PDO('mysql:host=localhost;dbname=filmoteka', 'root', '');
$sql = "SELECT * FROM films";
$result = $db->query($sql);

//Вызываем метод bindColumn. Записывает каждый столбц БД в указанную переменную 
$result->bindColumn('id', $id); // Название столбца в БД -> Название переменной для него
$result->bindColumn('title', $title);
$result->bindColumn('year', $year);

// Выводим через цикл
while ($result->fetch(PDO::FETCH_ASSOC) ) {
  echo "ID: {$id} <br>";
  echo "Название: {$title} <br>";
  echo "Жанр: {$genre} <br>";
}


























































