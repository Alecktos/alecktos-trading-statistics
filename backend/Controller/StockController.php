<?php

namespace Controller;

use Model\Stock;
use Support\ApplicationException;
use Support\Response;

class StockController extends Controller {

	public function doGet(string $id): Response {
		$filePath = '/stock/' . $id . '.txt';
		if(!file_exists($filePath)) {
			throw new ApplicationException("Could not find file");
		}
		$content = file_get_contents($filePath);
		$rows = explode("\n", $content);

		$stock = new Stock($rows);

		return $this->respond(json_encode($stock));
	}

}