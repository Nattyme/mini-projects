<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Автоподключение модулей
require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {

	// Настройки PHP mailer
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	// Настройки SMTP для Google
	// $mail->isSMTP();
	// $mail->Host = 'smtp.gmail.com';
	// $mail->SMTPAuth = true;
	// $mail->Username = 'yourmail@gmail.com'; // Ваш адрес электронной почты Gmail
	// $mail->Password = 'password'; // Пароль приложения
	// $mail->SMTPSecure = 'tls';
	// $mail->Port = 587;

	// Настройки SMTP для Yandex
	$mail->isSMTP();
	$mail->Host = 'smtp.yandex.ru';
	$mail->SMTPAuth = true;
	$mail->Username = 'yourmail@yandex.ru'; // Ваш адрес электронной почты Yandex
	$mail->Password = 'password'; // Пароль приложения
	$mail->SMTPSecure = 'tls';
	$mail->Port = 587;

	// Настройки письма
	$mail->setFrom('yourmail@yandex.ru', 'John Doe'); // От кого
	$mail->addAddress('yourmail@gmail.com'); // Кому
	$mail->Subject = 'Сообщение с сайта'; // Тема письма

	// Формируем тело письма
	$message = "<b>Сообщение от:</b> {$_POST['name']} <br>";
	$message .= "<b>Email:</b>  {$_POST['email']} <br><br>";
	$message .= "<b>Текст сообщения:</b> <br> {$_POST['message']}";

	// Тело письма
	$mail->Body = $message;

	//Attachments
	// Проверка: есть ли прикрепленные файлы, еслои есть - то добавляем их к письму
	if (isset($_FILES['fileUpload']['name'])) {

		$target_dir = __DIR__ . '/files/';

		$total_files = count($_FILES['fileUpload']['name']);

		for ($key = 0; $key < $total_files; $key++) {
			// Check if file is selected
			if (
				isset($_FILES['fileUpload']['name'][$key])
				&& $_FILES['fileUpload']['size'][$key] > 0
			) {
				$original_filename = $_FILES['fileUpload']['name'][$key];
				$target = $target_dir . basename($original_filename); // site.ru/phphmail/files/01.jpg
				$tmp  = $_FILES['fileUpload']['tmp_name'][$key]; // temp/01.jpg
				move_uploaded_file($tmp, $target);

				//Attachments
				$mail->addAttachment($target, $original_filename);
			}
		}
	}

	// Отправка письма
	$mail->send();

	// В случае успеха, выводим 'SUCCESS'
	echo 'SUCCESS';
} catch (Exception $e) {
	// В случае ошибки выводим сообщение об ошибке и содержимое ошибки
	echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
