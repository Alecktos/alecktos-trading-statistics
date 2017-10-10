<?php


namespace Model;


use JsonSerializable;

class Trade implements JsonSerializable {

	private $time;
	private $price;

	public function __construct(array $data) {
		$this->time = $data['timestamp'];
		$this->price = $data['price'];
	}

	public function jsonSerialize() {
		return [
			'price' => $this->price,
			'time' => $this->time
		];
	}
}