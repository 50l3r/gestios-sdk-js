/* eslint-disable max-classes-per-file */
const Core = require('./core');
const Project = require('./modules/project');

module.exports = class GestiOS extends Core {
	constructor({ project, token, url = 'https://gestios.es', debug = false }) {
		super({ project, token, url, debug });

		return this.init();
	}

	init() {
		return new Promise((resolve, reject) => {
			try {
				this.$http.get('apps').then((response) => {
					resolve(new Project({ project: this.project, token: this.token, url: this.url, debug: this.debug, apps: response.data }));
				}).catch((error) => {
					throw error;
				});
			} catch (error) {
				reject(this._error(error));
			}
		});
	}
};
