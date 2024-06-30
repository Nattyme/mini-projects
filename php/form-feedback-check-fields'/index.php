<!-- Отправка без перенаправления на другие страницы -->
<!--  1.   Была ли отправлена форма и заполнены ли все поля формы -->
<!-- 1.2  Отправка формы -->

<!-- 2.   Если форма отправлена и поле ИМЯ пустое -->
<!-- 2.1  Показывает сообщение  "Заполните "Имя"-->

<?php
    $mail_to = "info@mail.ru"; // Email куда будет отправлено письмо
    $email_from = "sender@mail.ru";// Указываем от кого будет отправлено письмо, email, reply to
    $name_from = "Личный сайт портфолио";// Указываем от кого будет отправлено письмо, имя
    $subject = "Сообщение с сайта!";// Тема письма

    if (isset($_POST['submit']) 
        && !empty(trim($_POST['name']))
        && !empty(trim($_POST['email']))
        && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
        && !empty(trim($_POST['message']))
        ) 
    {
        //Формируем текст письма
        $message =  "Вам пришло новое сообщение с сайта: <br><br>\n" . 
                    "<strong>Имя отправителя: </strong>" . strip_tags(trim($_POST['name'])) . "<br>\n" . 
                    "<strong>Email  отправителя: </strong>" . strip_tags(trim($_POST['email'])) . "<br>\n" . 
                    "<strong>Сообщение: </strong>" . strip_tags(trim($_POST['message'])); 

        //Формируем тему письма, специально обрабатывая её
        $subject = "=?utf-8?B?" . base64_encode($subject) . "?=";

        //Формируем заголовки письма
        $headers =  "MIME-Version: 1.0" . PHP_EOL . 
                    "Content-Type: text/html; charset=utf-8" . PHP_EOL . 
                    "From: " . "=?utf-8?B?" . base64_encode($name_from) . "?=" . "<" . $email_from . ">" . PHP_EOL . 
                    "Reply-To: " . $email_from . PHP_EOL;

        //Отправляем письмо
        $mailResult = mail($mail_to, $subject, $message, $headers);

        if ($mailResult) {
            $success = true;

            // Сброс POST массива
            foreach ($_POST as $key => $value) {
                unset($_POST[$key]);
            }
        } else {
            $failure = true;
        }
    }
?>


<!DOCTYPE html>
<html lang="en">

<head>
	<!-- Required meta tags -->
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous" />

	<title>Форма обратной связи</title>

</head>

<body>
	<div class="container pt-5 pb-5">
		<div class="row justify-content-center">
			<div class="col-6">
				<!-- Content -->
				<div class="card p-3">
					<form method="POST" action="index.php">
						<div class="badge badge-success">Версия 2</div>
						<h1 class="mb-4">Форма обратной связи</h1>

                        <?php if(isset($success) && $success): ?>
                            <div class="alert alert-success" role="alert">
							    Сообщение отправлено успешно!
						    </div>
                        <?php endif; ?>

                        <?php if(isset($failure) && $failure): ?>
                            <div class="alert alert-danger" role="alert">
                                Что-то пошло не так. Соообщение не было отправлено.
                                Попробуйте еще раз.
						    </div>
                        <?php endif; ?>
						

						<div class="form-group">
							<label for="name">Имя</label>

                            <?php if(isset($_POST['submit']) && empty(trim($_POST['name']))): ?>
							    <div class="alert alert-danger" role="alert">Заполните поле "Имя"</div>
                            <?php endif; ?>

                            <?php if(isset($_POST['submit']) && !empty(trim($_POST['name']))) : ?>
                                <input name="name" type="text" class="form-control" id="name" value="<?php echo trim($_POST['name']) ?>" />
                            <?php else: ?>
                                <input name="name" type="text" class="form-control" id="name"/>
                            <?php endif; ?>

                            <!-- Условие для Input value можно записать через тернарный оператор -->
                            <!-- <input 
                                name="name" type="text" class="form-control" id="name" 
                                value="<?php echo isset($_POST['name']) && !empty(trim($_POST['name'])) ? trim($_POST['name']) : ''; ?>"
                            /> -->

						</div>

						<div class="form-group">
							<label for="email">Email</label>

                            <?php if(isset($_POST['submit']) && empty(trim($_POST['email']))): ?>
							    <div class="alert alert-danger" role="alert">Заполните поле "Email"</div>
                            <?php elseif(isset($_POST['submit']) && !filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL)): ?>
							    <div class="alert alert-danger" role="alert">Введен неверный формат "Email"</div>
                            <?php endif; ?>

                            <?php if(isset($_POST['submit']) && !empty(trim($_POST['email']))) : ?>
                                <input name="email" type="text" class="form-control" id="email" value="<?php echo trim($_POST['email']) ?>" />
                            <?php else: ?>
                                <input name="email" type="text" class="form-control" id="email" />
                            <?php endif; ?>
						</div>

						<div class="form-group">
							<label for="message">Сообщение</label>
                            <?php if(isset($_POST['submit']) && empty(trim($_POST['message']))) : ?>
                                <div class="alert alert-danger" role="alert">Заполните поле "Сообщение"</div>
                            <?php endif; ?>

                            <?php if(isset($_POST['submit']) && !empty(trim($_POST['message']))) : ?>
                                <textarea id="message" name="message" class="form-control" rows="5"><?php echo trim($_POST['message']) ?></textarea>
                            <?php else: ?>
                                <textarea id="message" name="message" class="form-control" rows="5"></textarea>
                            <?php endif; ?>
						</div>

						<button type="submit" name="submit" class="btn btn-primary">Отправить</button>
						<button type="reset" class="btn btn-light">Сбросить</button>
					</form>
				</div>
				<!-- // Content -->
			</div>
			<!-- // col-6 -->
		</div>
		<!-- // row -->
	</div>
	<!-- // container -->


</body>

</html>