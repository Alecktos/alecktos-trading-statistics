<?php

namespace Model;


class Stock implements \JsonSerializable {

	private $meta;
	private $points;

	public function __construct(array $fileRows) {
		$this->meta = $fileRows[0];
		$pointsRows = array_slice($fileRows, 1, count($fileRows) - 2); //ignoring last row
		$this->points = array_map(function ($row) {
			return new StockPoint($row);
		}, $pointsRows);

	}

	public function jsonSerialize() {
		return [
			'meta' => $this->meta,
			'points' => $this->points
		];
	}
}