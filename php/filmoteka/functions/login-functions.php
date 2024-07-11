<?php 
  function isAdmin () {
    if ( isset($_SESSION['user']) ) {
      if( $_SESSION['user'] == 'admin' ) { 
        $result = true;
      } else {
        $result = false;
      }
    } else {
      $result = false;
    }

    return $result;
  }

  // Getting all admin from DB
  function user_all($link) {
    $query = "SELECT * FROM `users-list`";
    $admin = array();
    $result = mysqli_query($link, $query);

    if ( $result = mysqli_query($link, $query) ) {
      while ( $row = mysqli_fetch_array($result)  ) {
        $users[] = $row;
      }
    }
    return $users;
  }

  function who_login($link) {
    $users = user_all($link);

    if ( isset($_POST['enter']) ) {
      foreach($users as $key => $user) {
        if ( $_POST['login'] === $user['login'] ) {
          if( $_POST['password'] === $user['password']) {
            $_SESSION['user'] = 'admin';
            header('Location: ' . HOST . 'index.php');
          } 
        }
      }
    
    }
  }

  




 
  
