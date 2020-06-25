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
			this._response();
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

	_response() {
		this.$http.interceptors.response.use((res) => {
			const { status, data } = res;

			// if (res.data && res.data.message) msg = res.data.message;
			// if (res.data && res.data.errors) errs = res.data.errors;

			return {
				ok: true,
				code: status,
				// message: msg,
				// errors: errs,
				data,
			};
		}, (err) => {
			if (this.debug) console.error(err);
			if (!err.response) return new NetworkError();

			const gErr = new GestiOSError(err);

			switch (gErr.code) {
			case 404: case 400:
				return {
					ok: gErr.ok,
					code: gErr.code,
					message: gErr.message,
					errors: gErr.errors,
				};
			default:
				return Promise.reject(new GestiOSError(err));
			}
		});
	}
};
