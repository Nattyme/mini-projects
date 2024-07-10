<h1 class="title-1"> Фильмотека</h1>
	<?php
		foreach ($films as $key => $film) { ?>
		<div class="card mb-20">
      <!-- row -->
      <div class="row">

        <!-- Если в БД нет данных о кратинке - использовать default.  -->
        <!-- Как добавить проверку, если на сервере нет изображения с именем, указанным в БД? -->

        <!-- col-4 -->
        <div class="col-auto">
          <img src="
                  <?php 
                    echo HOST . 'data/films/min/' . $film['photo']; 
                    if ($film['photo'] == "") { echo "default.jpeg";}
                  ?>" 
               alt="Обложка фильма">
        </div>
        <!--// col-4 -->

        <!-- col-8 -->
        <div class="col">
          <div class="card__header">
            <h4 class="title-4"><?php echo $film['title']?></h4>
            <div class="buttons">
              <a href="edit.php?id=<?php echo $film['id']?>" class="button button--edit">Редактировать</a>
              <a href="index.php?action=delete&id=<?php echo $film['id']?>" class="button button--delete">Удалить</a>
            </div>
          </div>
          <div class="badge"><?php echo $film['genre']?></div>
          <div class="badge"><?php echo $film['year']?></div>
          <div class="mt-20">
            <a href="single.php?id=<?php echo $film['id']?>" class="button">Подробнее</a>
          </div>
        </div>
        <!--// col-8 -->
      </div>
      <!--// row -->
      
		</div>
	<?php } ?>