const createHeader = token => {
	// set headers
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	// if token, add headers to config
	if(token) {
		config.headers['Authorization'] = `Token ${token}`;
	}

	return config;
}


export default createHeader