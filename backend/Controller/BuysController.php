<?php

declare(strict_types=1);

namespace Controller;

use Model\Trades;
use Model\TradesDbDAO;
use Support\ApplicationException;
use Support\Response;

class BuysController extends Controller {

	public function doGet(string $id): Response {
		$tradesDAO = new TradesDbDAO($id);
		$trades = new Trades($tradesDAO->getBuys());
		return $this->respond(json_encode($trades));
	}

}