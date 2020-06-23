const axios = require('axios');
const { NetworkError, GestiOSError } = require('./errors');

module.exports = class Core {
	constructor({ project, token, url = 'https://gestios.es', debug = false }) {
		if (project && token && url) {
			this.project = project;
			this.token = token;
			this.url = url;
			this.debug = debug;

			this.baseUrl = `${this.url}/api/1/${this.project}/`;

			this.$http = axios.create({
				baseURL: `${this.url}/api/1/${this.project}/`,
			});

			this._request();
		} else {
			throw new Error('No se han definido los parametros necesarios en la configuración de gestiOS');
		}
	}

	_request() {
		this.$http.interceptors.request.use((config) => {
			config.headers['X-API-KEY'] = this.token;
			return config;
		});
	}

	_error(error) {
		if (this.debug) console.error(error);

		if (!error.response) {
			return new NetworkError();
		}

		return new GestiOSError(error);
	}
};
