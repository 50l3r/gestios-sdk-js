const axios = require('axios');
const { NetworkError, GestiOSError } = require('./errors');

module.exports = class Core {
	constructor({ project, token, url, debug }) {
		this._project = project;
		this._token = token;
		this._url = url;
		this.debug = debug;

		this.baseUrl = `${this.url}/${this.project}/`;
		this.$http = axios.create();

		this._request();
		this._response();
	}

	get project() {
		return this._project;
	}

	set project(value) {
		this._project = value.toLowerCase();
		this.baseUrl = `${this.url}/${this.project}/`;
	}

	get token() {
		return this._token;
	}

	set token(value) {
		this._token = value;
	}

	get url() {
		return this._url;
	}

	set url(value) {
		this._url = value;

		if (this.project) {
			this.baseUrl = `${this.url}/${this.project}/`;
		} else {
			this.baseUrl = `${this.url}/`;
		}
	}

	projects(project) {
		return new Promise((resolve, reject) => {
			try {
				this.$http.get(`${this.url}/${project}`).then((res) => {
					resolve({
						...res,
						data: res.data ? res.data.data : undefined,
					});
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}

	_request() {
		this.$http.interceptors.request.use((config) => {
			if (this.url) {
				if (this.token) config.headers['X-API-KEY'] = this.token;
				config.baseURL = this.baseUrl;

				return config;
			}

			throw new Error('No se ha definido una url válida en la configuración de gestiOS');
		}, (err) => Promise.reject(err));
	}

	_response() {
		this.$http.interceptors.response.use((res) => {
			const { status, data } = res;

			return {
				ok: true,
				code: status,
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
