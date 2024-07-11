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

  function film_new($link, $title, $genre, $year, $description = '') {
    if ( array_key_exists('add-film', $_POST) ) {
      // //Получаем данные по загруженному изображению
      if( isset($_FILES['photo']['name']) && $_FILES['photo']['tmp_name'] !="" )  {
        $db_file_name = photo_convert($_FILES);
      } else {
        $db_file_name = "default.jpeg";
      }
      // Запись данных в БД
      $query = "INSERT INTO `films` (`title`, `genre`, `year`, `description`, `photo`) VALUES (
        '". mysqli_real_escape_string($link, $title) ."', 
        '". mysqli_real_escape_string($link, $genre) ."', 
        '". mysqli_real_escape_string($link, $year) ."',
        '". mysqli_real_escape_string($link, $description) ."',
        '". mysqli_real_escape_string($link, $db_file_name) ."'
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
 
  function film_update($link, $title, $genre, $year, $id, $description) {
    // //Получаем данные по загруженному изображению
    if( isset($_FILES['photo']['name']) && $_FILES['photo']['tmp_name'] !="" )  {
      $db_file_name = photo_convert($_FILES);

      // Запись данных в БД
      $query = "UPDATE `films` 
        SET `title` = '". mysqli_real_escape_string($link, $title) ."', 
            `genre` = '". mysqli_real_escape_string($link, $genre) ."',
            `year` = '". mysqli_real_escape_string($link, $year) ."', 
            `description` = '". mysqli_real_escape_string($link, $description) ."', 
            `photo` = '". mysqli_real_escape_string($link, $db_file_name) ."' 
             WHERE `id` = ".mysqli_real_escape_string($link, $id)." LIMIT 1";
    } else {
      // Запись данных в БД                   
      $query = "UPDATE `films` 
        SET `title` = '". mysqli_real_escape_string($link, $title) ."', 
            `genre` = '". mysqli_real_escape_string($link, $genre) ."',
            `year` = '". mysqli_real_escape_string($link, $year) ."', 
            `description` = '". mysqli_real_escape_string($link, $description) ."'
             WHERE `id` = ".mysqli_real_escape_string($link, $id)." LIMIT 1";
    }

    if( mysqli_query($link, $query) ) {
      $result = true;
    } else {
      $result = false;
    }

    return $result;
    
  }

  function film_delete($link, $id) {
    if (@$_GET['action'] == 'delete') {
      $query = "DELETE FROM `films` WHERE `id` = ' " . mysqli_real_escape_string($link, $id) . "' LIMIT 1";
      mysqli_query($link, $query);
      
      if (mysqli_affected_rows($link) > 0) {
        $result = true;
      }  else {
        $result = false;
      }

      return $result;
  
    } 

  }

  function photo_convert() {
    $fileName = $_FILES['photo']['name'];
    $fileTmpLoc = $_FILES['photo']['tmp_name'];
    $fileType = $_FILES['photo']['type'];
    $fileSize = $_FILES['photo']['size'];
    $fileErrorMsg = $_FILES['photo']['error'];
    $kaboom = explode(".", $fileName);
    $fileExt = end($kaboom);

    list($width, $height) = getimagesize($fileTmpLoc);

    if($width < 10 || $height < 10){
      $errors[] = 'That image has not dimensions';
    }

    $db_file_name = rand(10000000, 99999999) . "." . $fileExt;

    if($fileSize > 10485760) {
      $errors[] = 'Your image file was large than 10mb';
    } else if (!preg_match("/\.(gif|jpg|png|jpeg|WebP)$/i", $fileName) ) {
      $errors[] = 'Your image file was not jpg, jpeg, WebP, gif or png type';
    } else if ($fileErrorMsg == 1) {
      $errors[] = 'An unknown error occurred';
    }

    $photoFolderLocationFull = ROOT . 'data/films/full/';
    $photoFolderLocationMin = ROOT . 'data/films/min/';
    
    $uploadFile = $photoFolderLocationFull . $db_file_name;
    $moveResult = move_uploaded_file($fileTmpLoc, $uploadFile);

    if ($moveResult !=true) {
      $errors[] = 'File upload failed';
    }

    require_once( ROOT . "/functions/image_resize_imagick.php");

    $target_file = $photoFolderLocationFull . $db_file_name;
    $resized_file_min = $photoFolderLocationMin . $db_file_name;
    $wmax_min = 137;
    $hmax_min = 200;
    $img_min = createThumbnail($target_file, $wmax_min, $hmax_min);
    $img_min->writeImage($resized_file_min);

    $resized_file_full = $photoFolderLocationFull . $db_file_name;
    $wmax_full = 236;
    $hmax_full = 352;
    $img_full = createThumbnail($target_file, $wmax_full, $hmax_full);
    $img_full->writeImage($resized_file_full);

    return $db_file_name;
  }
