<?php
$host_name = 'db5017676906.hosting-data.io';
$database = 'dbs14137291';
$user_name = 'dbu5385048';
$password = 'Z9EYceyh28Up9kH';

$link = new mysqli($host_name, $user_name, $password, $database);
// Set charset for phpMyAdmin compatibility
$link->set_charset('utf8mb4');

if ($link->connect_error) {
  die('<p>Failed to connect to MySQL: '. $link->connect_error .'</p>');
} else {
  echo '<p>Connection to MySQL server successfully established.</p>';
}
?>