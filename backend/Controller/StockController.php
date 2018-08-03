<?php

namespace Controller;

use Model\Stock;
use Support\ApplicationException;
use Support\Response;

class StockController extends Controller {

	const stocks_dir = '/stock/';

	public function doGet(string $id): Response {
		if($id) {
			return $this->getStock($id);
		}
		return $this->availableStocks();
	}

	private function getStock(string $id): Response {
		$filePath = self::stocks_dir . $id . '.txt';
		if(!file_exists($filePath)) {
			throw new ApplicationException("Could not find file");
		}
		$content = file_get_contents($filePath);
		$rows = explode("\n", $content);

		$stock = new Stock($rows);

		return $this->respond(json_encode($stock));
	}

	private function availableStocks(): Response {
		$dir = scandir(self::stocks_dir);
		$dir = array_filter($dir, function ($file) {
			return substr($file, 0, 1) != '.';
		});
		return $this->respond(json_encode(array_values($dir)));
	}

}