<?php

namespace Controller;

use Model\Stock;
use Support\ApplicationException;
use Support\Env;
use Support\Response;

class StockController extends Controller {

	public function doGet(string $id): Response {
		if($id) {
			return $this->getStock($id);
		}
		return $this->availableStocks();
	}

	private function getStock(string $id): Response {
		$filePath = Env::RESOURCES_PATH . $id . '/price.txt';
		if(!file_exists($filePath)) {
			throw new ApplicationException("Could not find file");
		}
		$content = file_get_contents($filePath);
		$rows = explode("\n", $content);

		$stock = new Stock($rows);

		return $this->respond(json_encode($stock));
	}

	private function availableStocks(): Response {
		$dir = scandir(Env::RESOURCES_PATH);
		$dir = array_filter($dir, function ($path) {
			$hidden = substr($path, 0, 1) == '.';
			if($hidden) {
				return false;
			}

			return is_dir(Env::RESOURCES_PATH . $path);
		});
		return $this->respond(json_encode(array_values($dir)));
	}

}