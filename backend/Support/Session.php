<?php

namespace Support;


class Session {

	public static function start() {
		//Force sessions to only use cookies.
		if(ini_set('session.use_only_cookies', 1) === FALSE) {
			return false;
		}

		$httpOnly = true;
		$cookieParams = session_get_cookie_params();
		session_set_cookie_params($cookieParams["lifetime"],
			$cookieParams["path"],
			$cookieParams["domain"],
			Env::HTTPS,
			$httpOnly);

		session_name('alecktosSessionId');
		session_start();
		session_regenerate_id();
	}

}