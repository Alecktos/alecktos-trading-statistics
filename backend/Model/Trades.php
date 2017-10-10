<?php


namespace Model;


class Trades implements \JsonSerializable{

	private $trades;

	public function __construct(array $tradesData) {
		$this->trades = array_map(function($tradeData) {
			return new Trade($tradeData);
		}, $tradesData);
	}

	public function jsonSerialize() {
		return $this->trades;
	}

}