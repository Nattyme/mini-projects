<?php
    require("./config.php");
    $headName = "Наталья Балашова";

    //Подключение к БД
    $link = mysqli_connect('localhost', 'root', '', 'filmoteka');

    //Проверка подключения
    if (mysqli_connect_errno()) {
        printf("Ошибка подключения к базе данных.: %s\n", mysqli_connect_error());
        exit();
    }

    //Если форма отправлена, проверяем данные на пробелы/код/спецсимволы и записываем в БД
    if(array_key_exists('newFilm', $_POST)) {
        if(empty(trim($_POST['title'])) ) {
            // echo "Название фильма не может быть пустым.";
        } else {
            $query = "INSERT INTO `films` (`title`, `genre`, `year`) VALUES (
                ' ".mysqli_real_escape_string($link, trim(strip_tags($_POST['title'])) )." ',
                ' ".mysqli_real_escape_string($link, strip_tags(trim($_POST['genre'])) )." ',
                ' ".mysqli_real_escape_string($link, strip_tags(trim($_POST['year']))  )." '
                )";
         
            if ( mysqli_query($link, $query) ) {
                $success = true;
        
                // Сброс POST массива
                foreach ($_POST as $key => $value) {
                    unset($_POST[$key]);
                }
            } else {
                $failure = true;
            }
        }
    }

    //Выводим карточки фильмов из БД и записываем в новый массив filmsList
    $query = "SELECT * FROM `films`";
    $filmsList = array();

    if( $result = mysqli_query($link, $query) ) {
        while($row = mysqli_fetch_array($result) ) {
            $filmsList[] = $row;
        }
    };
?>

<!-- Разные миксины по одному, которые понадобятся. Для логотипа, бейджа, и т.д.-->
<!DOCTYPE html>
<html lang="ru">
<?php include(ROOT . "templates/head.tpl") ?>
<body class="index-page">
	<div class="container user-content section-page">
		<div class="title-1">Фильмотека</div>
        <!-- cards rows -->
		<?php 
            foreach ($filmsList as $key => $value) {
                $filmTitle = $filmsList[$key]['title'];
                $filmGenre = $filmsList[$key]['genre'];
                $filmYear =  $filmsList[$key]['year'];

                include(ROOT . "templates/widgets/cardFilm.tpl");
            }
        ?> 
        <!--// cards rows -->

		<div class="panel-holder mt-80 mb-40">
			<div class="title-3 mt-0">Добавить фильм</div>
			<form action="index.php" method="POST">
                
                <?php if(isset($success) && $success) : ?>
                    <div class="notify notify--success mb-20">Фильм был успешно добавлен!</div>
                <?php endif; ?>

                <?php if(isset($_POST['newFilm']) && empty(trim($_POST['title'])) ) : ?>
                    <div class="notify notify--error mb-20">Название фильма не может быть пустым.</div>
                <?php endif; ?>

				<div class="form-group">
                    <label class="label">
                        Название фильма
                        <input class="input" name="title" type="text" placeholder="Такси 2" />
                    </label>
                </div>

				<div class="row">
					<div class="col">
						<div class="form-group">
                            <label class="label">
                                Жанр
                                <?php if(isset($_POST['newFilm']) && !empty(trim($_POST['genre']))) : ?>
                                    <input name="genre" type="text" class="input" value="<?php echo trim($_POST['genre']) ?>" />
                                <?php else: ?>
                                    <input class="input" name="genre" type="text" placeholder="комедия" />
                                <?php endif; ?>
                            </label>
                        </div>
					</div>
					<div class="col">
						<div class="form-group">
                            <label class="label">
                                Год
                                <?php if(isset($_POST['newFilm']) && !empty(trim($_POST['year']))) : ?>
                                    <input name="year" type="text" class="input" value="<?php echo trim($_POST['year']) ?>" />
                                <?php else: ?>
                                    <input class="input" name="year" type="text" placeholder="2000" />
                                <?php endif; ?>
                            </label>
                        </div>
					</div>
				</div>
                <input class="button" type="submit" name="newFilm" value="Добавить" />
			</form>
		</div>
	</div><!-- build:jsLibs js/libs.js -->
	<script src="libs/jquery/jquery.min.js"></script><!-- endbuild -->
	<!-- build:jsVendor js/vendor.js -->
	<script src="libs/jquery-custom-scrollbar/jquery.custom-scrollbar.js"></script>
	<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAIr67yxxPmnF-xb4JVokCVGgLbPtuqxiA"></script><!-- endbuild -->
	<!-- build:jsMain js/main.js -->
	<script src="js/main.js"></script><!-- endbuild -->
	<script defer="defer" src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
</body>

</html>