/* eslint-disable max-classes-per-file */
const Core = require('./core');
const Project = require('./modules/project');

module.exports = class GestiOS extends Core {
	constructor({ project, token, env = 'production', debug = false }) {
		super({ project, token, env, debug });

		return this.init();
	}

	init() {
		return new Promise((resolve, reject) => {
			try {
				this.$http.get('apps').then((response) => {
					resolve(new Project({ project: this.project, token: this.token, env: this.env, debug: this.debug, apps: response.data }));
				}).catch((error) => {
					reject(this._error(error));
				});
			} catch (error) {
				reject(this._error(error));
			}
		});
	}
};
