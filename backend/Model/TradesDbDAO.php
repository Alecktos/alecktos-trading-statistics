<?php

namespace Model;


use PDO;
use Support\ApplicationException;

class TradesDbDAO {

	private $db;

	function __construct($tradingRobotDb) {
		$filePath = '/trades/' . $tradingRobotDb . '.db';
		if(!file_exists($filePath)) {
			throw new ApplicationException("Could not find database file");
		}

		$this->db = new PDO('sqlite:' . $filePath);
	}

	function getBuys() {
		$stmt = $this->db->prepare('SELECT timestamp, price FROM buys');
		$stmt->execute();

		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $res;
	}

	function getSells() {
		$stmt = $this->db->prepare('SELECT timestamp, price FROM Sells');
		$stmt->execute();

		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $res;
	}

}