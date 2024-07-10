<h1 class="title-1">Редактировать фильм</h1>

<div class="panel-holder mt-30 mb-100">
  <div class="card__header">
    <div class="title-4 mt-0">Редактировать фильм</div>
    <a href="index.php?action=delete&id=<?php echo $film['id']?>" class="button button--delete">Удалить</a>
  </div>

  <form enctype="multipart/form-data" action="edit.php?id=<?php echo $film['id']?>" method="POST">

    <?php 
      if ( !empty($errors)) {
        foreach ($errors as $key => $value) {
        echo "<div class='error'>$value</div>";
        }
      }
    ?>

    <label class="label-title">Название фильма</label>
    <input class="input" type="text" placeholder="Такси 2" name="title"
           value="<?php echo $film['title']?>" />
    <div class="row">
      <div class="col">
        <label class="label-title">Жанр</label>
        <input class="input" type="text" placeholder="комедия" name="genre"
               value="<?php echo $film['genre']?>"/>
      </div>
      <div class="col">
        <label class="label-title">Год</label>
        <input class="input" type="text" placeholder="2000" name="year"
               value="<?php echo $film['year']?>"/>
      </div>
    </div>
    <textarea class="textarea mb-20" name="description" placeholder="Введите описание фильма">
      <?php echo $film['description']?>
    </textarea>
    <div class="mb-20"> 
      <input type="file" name="photo"/> 
    </div>
    <input type="submit" class="button" value="Обновить" name="update-film">

  </form>

</div>