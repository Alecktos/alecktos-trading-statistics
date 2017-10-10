<?php


namespace Controller;


use Model\Trades;
use Model\TradesDbDAO;
use Support\ApplicationException;
use Support\Response;

class SellsController extends Controller {

	public function doGet(string $id): Response {
		$tradesDAO = new TradesDbDAO($id);
		$trades = new Trades($tradesDAO->getSells());
		return $this->respond(json_encode($trades));
	}


}