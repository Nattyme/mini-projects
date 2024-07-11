<?php
require('config.php');

$userName = '';
$userCity = '';
$expire = time() - 60*60*24*30;

setcookie('user-name', $userName, $expire);
setcookie('user-city', $userCity, $expire);

unset($_SESSION['user']);
session_destroy();

header('Location: ' . HOST . 'index.php');

