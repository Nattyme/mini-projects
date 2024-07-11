<?php 

require('config.php');
require('database.php');
$link = db_connect();
require('functions\login-functions.php');

$userLogin = who_login($link);

if(isset($_POST['enter'])) {
  $userName = $_POST['login'];
  $expire = time() + 60*60*24*30;

  setcookie('user-name', $userName, $expire);
}

include('views/head.tpl');
include('views/login.tpl');
include('views/footer.tpl');
