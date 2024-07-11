<h1 class="title-1">Информация о фильме</h1>

<div class="card mb-20">
  <!-- row -->
  <div class="row">
    <!-- col -->
    <div class="col-auto">
      <img src="
          <?php 
              echo HOST . 'data/films/full/' . $film['photo']; 
              if ($film['photo'] == "") { echo "default.jpeg";}
          ?>" 
          alt="<?php echo $film['title']?>">
    </div>
    <!--// col -->

    <!-- col -->
    <div class="col">
      <div class="card__header">
        <h4 class="title-4"><?php echo $film['title']?></h4>
        <div class="buttons">

          <?php if ( isAdmin () ) { ?>
                <a href="edit.php?id=<?php echo $film['id']?>" class="button button--edit">Редактировать</a>
                <a href="index.php?action=delete&id=<?php echo $film['id']?>" class="button button--delete">Удалить</a>
          <?php } ?>
          
        </div>
      </div>
      <div class="badge"><?php echo $film['genre']?></div>
      <div class="badge"><?php echo $film['year']?></div>
      <div class="user-content">
        <p><?php echo $film['description']?></p>
      </div>
    </div>
    <!--// col -->
  </div>
  <!--// row -->
 
</div>
	