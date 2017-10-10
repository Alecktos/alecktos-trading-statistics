<?php

declare(strict_types=1);

namespace Support;


class Response {

	private $statusCode;
	private $body;

	public function __construct(string $body, int $statusCode) {
		$this->body = $body;
		$this->statusCode = $statusCode;
	}

	public function getBody(): string {
		return $this->body;
	}

	public  function getStatusCode(): int {
		return $this->statusCode;
	}

}