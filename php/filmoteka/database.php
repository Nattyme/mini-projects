<?php
  function db_connect() {
    $link = mysqli_connect(MYSQL_SERVER, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB) or exit("Error: " . mysqli_error($link));

    if(!mysqli_set_charset($link, "utf8")) {
      printf("Error: " . mysqli_error($link));
    }

    return $link;
  }
?>