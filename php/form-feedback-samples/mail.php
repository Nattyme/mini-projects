<?php

//1. Убедиться, что мы открыли нужный файл
// echo "hello from mail PHP";

//2. Распечатываем полученный данные из формы

// print_r($_POST);

//3.Можем распечатать по отдельности элементы из массива $_Post
// echo $_POST['name'];

/* ***********Вариант 1*********** */
//Отправляем письмо
// mail('info@yandex.ru', 'Сообщение с сайта', $_POST['message']);

/* ***********Вариант 2*********** */

// trim(); обрезает пробелы в начале и в конце строки. Пример: "     Петр    Васильев   " ="Петр   Васильев"ж

// 3. Можем распечатать по отдельности элементы из $_POST массива
// echo $_POST['name'];
// echo "<br>";
// echo $_POST['email'];
// echo "<br>";
// echo $_POST['message'];
// echo "<br>";

$mail_to = "info@rightblog.ru"; // Email куда будет отправлено письмо
$email_from = "info@webcademy.ru"; // Указываем от кого будет отправлено письмо, email, reply to
$name_from = "Личный сайт портфолио"; // Указываем от кого будет отправлено письмо, имя
$subject = "Сообщение с сайта!"; // Тема письма

// Формируем текст письма
$message =  "Вам пришло новое сообщение с сайта: <br><br>\n" .
    "<strong>Имя отправителя:</strong>" . strip_tags(trim($_POST['name'])) . "<br>\n" .
    "<strong>Email отправителя: </strong>" . strip_tags(trim($_POST['email'])) . "<br>\n" .
    "<strong>Сообщение: </strong>" . strip_tags(trim($_POST['message']));

// Формируем тему письма, специально обрабатывая её
$subject = "=?utf-8?B?" . base64_encode($subject) . "?=";

// Формируем заголовки письма
$headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: text/html; charset=utf-8" . PHP_EOL .
    "From: " . "=?utf-8?B?" . base64_encode($name_from) . "?=" . "<" . $email_from . ">" .  PHP_EOL .
    "Reply-To: " . $email_from . PHP_EOL;

// Отправляем письмо
$mailResult = mail($mail_to, $subject, $message, $headers);

if ($mailResult) {
    // Перенаправляем на страницу "Спасибо"
    header('location: thankyou.html');
} else {
    header('location: error.html');
}