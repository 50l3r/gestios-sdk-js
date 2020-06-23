// /* eslint-disable max-classes-per-file */
// const Core = require('./core');
// const Project = require('./modules/project');

// module.exports = class GestiOS extends Core {
// 	constructor({ project, token, url = 'https://gestios.es', debug = false }) {
// 		super({ project, token, url, debug });

// 		return this.init();
// 	}

// 	init() {
// 		return new Promise((resolve, reject) => {
// 			try {
// 				this.$http.get('apps').then((response) => {
// 					resolve(new Project({ project: this.project, token: this.token, url: this.url, debug: this.debug, apps: response.data }));
// 				}).catch((error) => {
// 					throw error;
// 				});
// 			} catch (error) {
// 				reject(this._error(error));
// 			}
// 		});
// 	}
// };


const Core = require('./core');

// Modules
const App = require('./modules/app');
const Config = require('./modules/config');
const Users = require('./modules/users');
const Utils = require('./modules/utils');

// import helpers from './_helpers';
// import config from './_config';
// import auth from './_auth';
// import users from './_users';
// import groups from './_groups';
// import media from './_media';
// import avatars from './_avatars';
// import comments from './_comments';
// import emails from './_emails';
// import notifications from './_notifications';


module.exports = class GestiOS extends Core {
	constructor({ project, token, url, debug }) {
		super({ project, token, url, debug });

		this._loadModules();
	}

	apps() {
		return new Promise((resolve, reject) => {
			try {
				this.$http.get('apps').then((response) => {
					this.apps = response.data;
					resolve(response.data);
				}).catch((error) => {
					reject(this._error(error));
				});
			} catch (error) {
				reject(this._error(error));
			}
		});
	}

	app(slug) {
		return new App(this, slug);
	}

	utils(app) {
		return new Utils(this, app);
	}

	_loadModules() {
		this.config = new Config(this);
		this.users = new Users(this);
	}
};
