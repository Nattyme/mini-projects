<?php
  // Getting allfilms from DB
  function films_all($link) {
    $query = "SELECT * FROM `films`";
    $films = array();
    $result = mysqli_query($link, $query);

    if ( $result = mysqli_query($link, $query) ) {
      while ( $row = mysqli_fetch_array($result)  ) {
        $films[] = $row;
      }
    }
    return $films;
  }

  function film_new($link, $title, $genre, $year) {
    if ( array_key_exists('add-film', $_POST) ) {
	
      // Обработка ошибок
      if ( $title == '') {
        $errors[] = "<p>Необходимо ввести название фильма!</p>";
      }
      if ( $genre == '') {
        $errors[] = "<p>Необходимо ввести жанр фильма!</p>";
      }
      if ( $year == '') {
        $errors[] = "<p>Необходимо ввести год фильма!</p>";
      }
    
    
      // Запись данных в БД
      $query = "INSERT INTO `films` (`title`, `genre`, `year`) VALUES (
        '". mysqli_real_escape_string($link, $title) ."', 
        '". mysqli_real_escape_string($link, $genre) ."', 
        '". mysqli_real_escape_string($link, $year) ."'
        )";

      if( mysqli_query($link, $query) ) {
        $result = true;
      } else {
        $result = false;
      }

      return $result;
      
    }
  }

  function get_film ($link, $id) {
    // Getting films from DB
    $query = "SELECT * FROM `films` WHERE `id` = ' " . mysqli_real_escape_string($link, $id) . "' LIMIT 1";
    $result = mysqli_query($link, $query);

    if ( $result = mysqli_query($link, $query) ) {
      $film = mysqli_fetch_array($result);
    }

    return $film;
  }

  function film_update($link, $title, $genre, $year, $id) {
    if ( array_key_exists('update-film', $_POST) ) {
	
      // Обработка ошибок
      if ( $title == '') {
        $errors[] = "<p>Необходимо ввести название фильма!</p>";
      }
      if ( $genre == '') {
        $errors[] = "<p>Необходимо ввести жанр фильма!</p>";
      }
      if ( $year == '') {
        $errors[] = "<p>Необходимо ввести год фильма!</p>";
      }
    
      // Запись данных в БД
      $query = "UPDATE `films` 
              SET `title` = '". mysqli_real_escape_string($link, $title) ."', 
                  `genre` = '". mysqli_real_escape_string($link, $genre) ."',
                  `year` = '". mysqli_real_escape_string($link,  $year) ."' 
                  WHERE `id` = ".mysqli_real_escape_string($link, $id)." LIMIT 1";

      if( mysqli_query($link, $query) ) {
        $result = true;
      } else {
        $result = false;
      }

      return $result;
      
    }
  }

  function film_delete($link, $id) {
    if (@$_GET['action'] == 'delete') {
      $query = "DELETE FROM `films` WHERE `id` = ' " . mysqli_real_escape_string($link, $id) . "' LIMIT 1";

      if (mysqli_affected_rows($link) > 0) {
        $resultInfo = "<p>Фильм был успешно удалён.</p>";
      } 

      if( mysqli_query($link, $query) ) {
        $result = true;
      } else {
        $result = false;
      }

      return $result;
  
    } 

  }

?>