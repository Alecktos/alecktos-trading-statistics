<?php

declare(strict_types=1);

use Support\ApplicationException;
use Support\Session;

include 'Support/Autoloader.php';

run();

function run() {
	try {
		Session::start();

		//Hantera requesten och ta ut data ifrån den
		$request = $_SERVER['REQUEST_URI'];
		$request = stristr($request, 'api/');
		$requestArray =  explode("/", $request);

		$resource = $requestArray[1];
		$idParts = [];

		$requestArrayLength = count($requestArray);
		for($i = 2; $i < $requestArrayLength; $i++) {
			$idParts[] = $requestArray[$i];
		}

		$id = implode("/", $idParts);

		//Decode JSON string to array
		$data = json_decode(file_get_contents("php://input"), true);
//		if(!$data && isset($id)) {
//			$data = array('id' => $id);
//		}

		$activeController = null;
		switch($resource) {
			case 'buys':
				$activeController = new \Controller\BuysController();
				break;
			case 'sells':
				$activeController = new \Controller\SellsController();
				break;
			case 'stock':
				$activeController = new \Controller\StockController();
				break;
			default:
				throw new ApplicationException("Invalid path");
		}

		$response = doWork($activeController, $data, $id);
		echoResponse($response);

	} catch (Exception $e) {
		$message = $e->getMessage();
		die($message);
	}
}

function echoResponse(\Support\Response $response) {
	http_response_code($response->getStatusCode());
	echo $response->getBody();
}

function doWork(\Controller\Controller $activeController, array $data = null, $id = null) {
	
	switch($_SERVER['REQUEST_METHOD']) {
		case 'GET':
			$response = $activeController->doGet($id);
			break;
		case 'POST':
			$response = $activeController->doCreate($data);
			break;
		case 'PUT':
			$response = $activeController->doUpdate($data);
			break;
		case 'DELETE':
			$response = $activeController->doDelete($data);
			break;
	}
	return $response;
}