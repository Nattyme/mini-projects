<?php

// Подключение файла с подключением к БД
require "db.php";

// Создание новых записей в БД
//$course = R::dispense('courses');               // Создание нового объекта - бина (фасолинки) в таблице courses
//$course->title = "Курс по React";               // Заполнение колонки title бина (задание значения для бина)
//$course->tuts = 10;                             // Количество уроков в курсе
//$course->homeworks = 8;                         // Количество домашних заданий на курсе
//$course->level = "Для новичков";                // Уровень курса
//$course->price = 100;                           // Цена курса
//R::store($course);                              // Сохранение бина в БД

// Вывод всех записей из БД
$courses = R::find('courses');                    // В переменную сохраняется ассоциативный массив со всеми данными о курсах
foreach ($courses as $course) {
    echo "ID: " . $course->id . "<br>";
    echo "Название: " . $course->title . "<br>";
    echo "Количество уроков: " . $course->tuts . "<br>";
    echo "Количество домашних заданий: " . $course->homeworks . "<br>";
    echo "Цена: " . $course->price . "<br>";
    echo "<hr>";
}

?>