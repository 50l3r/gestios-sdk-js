const axios = require('axios');
const { NetworkError, GestiOSError } = require('./errors');

module.exports = class Core {
	constructor({ project, token, env = 'production', debug = false }) {
		this.project = project;
		this.token = token;
		this.env = env;
		this.debug = debug;

		switch (this.env) {
		case 'local':
			this.baseURL = `http://gestios.loc/api/1/${this.project}`;
			break;

		case 'development':
			this.baseURL = `https://gestios.dev/api/1/${this.project}`;
			break;

		default:
			this.baseURL = `https://gestios.es/api/1/${this.project}`;
		}

		this.$http = axios.create({
			baseURL: this.baseURL,
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
