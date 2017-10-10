<?php

namespace Model;


class StockPoint implements \JsonSerializable {

	private $price;
	private $timestamp;

	public function __construct(string $fileRow) {
		$rowCommentStartPos = strpos($fileRow, '#');

		if($rowCommentStartPos !== false) {
			$fileRow = substr($fileRow, 0, $rowCommentStartPos);
		}

		$contentArray = explode(':', $fileRow);
		$this->price = floatval($contentArray[0]);

		$this->timestamp = intval(rtrim($contentArray[1]));
	}

	function jsonSerialize() {
		return [
			'price' => $this->price,
			'timestamp' => $this->timestamp
		];
	}
}