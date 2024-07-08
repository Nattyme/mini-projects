<?php if ( @$resultSuccess != '' ) { ?> 
	<div class="info-success"><?=$resultSuccess?></div>
<?php } ?>

<?php if ( @$resultInfo != '' ) { ?> 
	<div class="info-notification"><?=$resultInfo?></div>
<?php } ?>

<?php if ( @$resultError != '' ) { ?> 
	<div class="error"><?=$resultError?></div>
<?php } ?>

<h1 class="title-1">Редактировать фильм</h1>

<div class="panel-holder mt-30 mb-100">
  <div class="card__header">
    <div class="title-4 mt-0">Редактировать фильм</div>
    <a href="index.php?action=delete&id=<?php echo $film['id']?>" class="button button--delete">Удалить</a>
  </div>
  <form action="edit.php?id=<?php echo $film['id']?>" method="POST">

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
    <input type="submit" class="button" value="Обновить" name="update-film">
  </form>
</div>