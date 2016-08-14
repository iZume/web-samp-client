<?php
require('./monitor.php');

if(isset($_GET['ip']) && isset($_GET['data'])) 
{
	$i = getDataFromServer($_GET['ip'], $_GET['data']);
	
	echo json_encode($i);
}

function getDataFromServer($ip, $type)
{
	$m = new Monitor();

	if($type == 'players')
	{
		$partirIP = explode(":", $ip);

		return $m->get_players_by_ip($partirIP[0], $partirIP[1]); 
	}
	else if($type == 'l_by_id')
	{
		$s['players'] = $m->get_players_by_id($ip);

		$s['info'] = $m->get_info_by_id($ip);
		return $s;
	}
	else if($type == 'info')
	{
		$partirIP = explode(":", $ip);

		return $m->get_info_by_ip($partirIP[0], $partirIP[1]); 
	}
	return null;
}

?>