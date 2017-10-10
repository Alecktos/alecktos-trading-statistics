<?php

namespace Support;

class NotImplementedException extends ApplicationException {

    public function __construct($code = 0, \Exception $previous = null) {
        parent::__construct('Not implemented', $code, $previous);
    }

}