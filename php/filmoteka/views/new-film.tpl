<h1 class="title-1">Добавить новый фильм</h1>

<div class="panel-holder mt-30 mb-100">
  <div class="title-4 mt-0">Добавить фильм</div>

  <form enctype="multipart/form-data" action="new.php" method="POST">

    <?php 
      if ( !empty($errors)) {
        foreach ($errors as $key => $value) {
        echo "<div class='error'>$value</div>";
        }
      }
    ?>

    <label class="label-title">Название фильма</label>

    <?php if(isset($_POST['add-film']) && !empty(trim($_POST['title']))) : ?>
    <input class="input" type="text" name="title" value=" <?php echo trim($_POST['title']) ?> "/>
    <?php else: ?>
    <input class="input" type="text" placeholder="Такси 2" name="title"/>
    <?php endif; ?>

    <div class="row">
      <div class="col">
        <label class="label-title">Жанр</label>

        <?php if(isset($_POST['add-film']) && !empty(trim($_POST['genre']))) : ?>
        <input class="input" type="text" name="genre" value=" <?php echo trim($_POST['genre']) ?> "/>
        <?php else: ?>
        <input class="input" type="text" placeholder="комедия" name="genre"/>
        <?php endif; ?>

      </div>
      <div class="col">
        <label class="label-title">Год</label>

        <?php if(isset($_POST['add-film']) && !empty(trim($_POST['year']))) : ?>
        <input class="input" type="text" name="year" value=" <?php echo trim($_POST['year']) ?> "/>
        <?php else: ?>
        <input class="input" type="text" placeholder="2000" name="year"/>
        <?php endif; ?>

      </div>
    </div>

    <?php if(isset($_POST['add-film']) && !empty(trim($_POST['description']))) : ?>
    <textarea class="textarea mb-20" name="description"><?php echo trim($_POST['description']) ?></textarea>
    <?php else: ?>
    <textarea class="textarea mb-20" name="description" placeholder="Введите описание фильма"></textarea>
    <?php endif; ?>

    <div class="mb-20"> 
      <input type="file" name="photo"/> 
    </div>
    <input type="submit" class="button" value="Добавить" name="add-film">
  </form>
</div>