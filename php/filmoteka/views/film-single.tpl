<h1 class="title-1">Информация о фильме</h1>

<div class="card mb-20">
        <div class="card__header">
            <h4 class="title-4"><?php echo $film['title']?></h4>
            <div class="buttons">
              <a href="edit.php?id=<?php echo $film['id']?>" class="button button--edit">Редактировать</a>
              <a href="index.php?action=delete&id=<?php echo $film['id']?>" class="button button--delete">Удалить</a>
            </div>
        </div>
  <div class="badge"><?php echo $film['genre']?></div>
  <div class="badge"><?php echo $film['year']?></div>
</div>
	