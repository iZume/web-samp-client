<?php

if(!isset($_GET['q']))
	return false;

$data = preg_split('/\s+/', file_get_contents('http://monitor.sacnr.com/list/masterlist.txt'));

if($_GET['q'] == 'master')
{
	echo json_encode($data);
}
?>