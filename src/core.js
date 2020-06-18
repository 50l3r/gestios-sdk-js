const axios = require('axios');
const { NetworkError, GestiOSError } = require('./errors');

module.exports = class Core {
	constructor({ project, token, url = 'https://gestios.es', debug = false }) {
		this.project = project;
		this.token = token;
		this.url = url;
		this.debug = debug;

		this.baseUrl = `${this.url}/api/1/${this.project}/`;

		this.$http = axios.create({
			baseURL: `${this.url}/api/1/${this.project}/`,
		});

		this._request();
	}

	_request() {
		this.$http.interceptors.request.use((config) => {
			config.headers['X-API-KEY'] = this.token;
			return config;
		});
	}

	_error(error) {
		// eslint-disable-next-line no-console
		if (this.debug) console.error(error);

		if (!error.response) {
			return new NetworkError();
		}

		return new GestiOSError(error);
	}
};
