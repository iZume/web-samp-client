<?php

/**
 * SACNR Monitor PHP API v1.1
 *
 * Enables easy access to SACNR Monitor's API using cURL.
 * 
 * @author Blacklite - blacklite@sacnr.com
 * @license GPL - http://www.gnu.org/licenses/gpl-3.0.html
 * 
 */ 
class Monitor
{
	/**
	 * @var Resource
	 */
	private $ch = null;

	const QUERY_URL    = 'http://monitor.sacnr.com/api/?';
	const DATA_AD      = 'ad';
	const DATA_QUERY   = 'query';
	const DATA_PLAYERS = 'players';
	const DATA_INFO    = 'info';
	
	public function __construct() {}

	public function __destruct()
	{
		if ($this->ch) {
			curl_close($this->ch);
		}
	}
	
	/**
	 * @param int $server_id
	 */
	public function get_info_by_id($server_id)
	{
		return $this->get_data_by_id($server_id, self::DATA_INFO);
	}

	/**
	 * @param int $server_id
	 */
	public function get_players_by_id($server_id)
	{
		return $this->get_data_by_id($server_id, self::DATA_PLAYERS);
	}

	/**
	 * @param int $server_id
	 */
	public function get_query_by_id($server_id)
	{
		return $this->get_data_by_id($server_id, self::DATA_QUERY);
	}

	/**
	 * @param int $server_id
	 */
	public function get_ad_by_id($server_id)
	{
		return $this->get_data_by_id($server_id, self::DATA_AD);
	}

	/**
	 * @param string $ip
	 * @param int $port
	 */
	public function get_info_by_ip($ip, $port)
	{
		return $this->get_data_by_ip($ip, $port, self::DATA_INFO);
	}

	/**
	 * @param string $ip
	 * @param int $port
	 */
	public function get_players_by_ip($ip, $port)
	{
		return $this->get_data_by_ip($ip, $port, self::DATA_PLAYERS);
	}

	/**
	 * @param string $ip
	 * @param int $port
	 */
	public function get_query_by_ip($ip, $port)
	{
		return $this->get_data_by_ip($ip, $port, self::DATA_QUERY);
	}

	/**
	 * @param string $ip
	 * @param int $port
	 */
	public function get_ad_by_ip($ip, $port)
	{
		return $this->get_data_by_ip($ip, $port, self::DATA_AD);
	}

	/**
	 * Gets the requested $action by the $server_id.
	 *
	 * @param int $server_id
	 * @param string $action
	 */
	private function get_data_by_id($serverID, $action)
	{
		return $this->get(array('ServerID' => $serverID, 'Action'   => $action));
	}

	/**
	 * Gets the requested $action by the $ip and $port.
	 *
	 * @param string $ip
	 * @param int $port
	 * @param string $action
	 */
	private function get_data_by_ip($ip, $port, $action)
	{
		return $this->get(array('IP' => $ip, 'Port' => $port, 'Action' => $action));
	}

	/**
	 * Builds the final query URL, and handles errors. $options contains a list
	 * of querystrings to put into the URL. Eg, ['ServerID' => 123] will append
	 * &ServerID=123 onto the request URL. Uses SACNRMonitor::get_url() to fetch
	 * the URL.
	 *
	 * @param array $options
	 */
	public function getAccess($options)
	{
		return $this->get($options);
	}

	private function get(array $options)
	{
		$options['Format'] = 'json';
		$url = self::QUERY_URL . http_build_query($options);
		$response = $this->get_url($url);
		if ($response === false) {
			throw new \Exception('The server returned an error while fetching the requested data: '. $text);
		}
		return $response;
	}

	/**
	 * @param string $url
	 * @param string &$text
	 */
	private function get_url($url)
	{
		$this->curl_setup();
		curl_setopt($this->ch, CURLOPT_URL, $url);
		$result = curl_exec($this->ch);
		return json_decode($result);
	}

	private function curl_setup()
	{
		if (!$this->ch) {
			$this->ch = curl_init();
			curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, true);
		}
	}
}
?>