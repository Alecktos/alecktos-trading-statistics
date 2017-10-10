<?php

declare(strict_types=1);

namespace Controller;

use Support\NotImplementedException;
use Support\Response;

abstract class Controller {

	public function __construct() {

	}

	protected function respond(string $body = '', int $statusCode = 200): Response {
		return new Response($body, $statusCode);
	}

	public function doGet(string $id): Response {
		throw new NotImplementedException();
	}

	public function doCreate(array $data): Response {
		throw new NotImplementedException();
	}

	public function doUpdate(array $data): Response {
		throw new NotImplementedException();
	}

	public function doDelete(array $data): Response {
		throw new NotImplementedException();
	}

}