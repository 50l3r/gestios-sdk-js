const Core = require('../core');

// Modules
const App = require('./app');
const Config = require('./config');
const Users = require('./users');

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


module.exports = class Project extends Core {
	constructor({ project, token, url, debug, apps = [] }) {
		super({ project, token, url, debug });

		this.apps = apps;
		this._loadModules();
	}

	get() {
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
		const app = this.apps.find((a) => a.Permalink === slug);

		if (app) {
			return new App(this, app);
		}

		throw new Error(`No se ha instanciado el aplicativo: ${slug} o no tiene permisos para acceder a el`);
	}

	_loadModules() {
		this.config = new Config(this);
		this.users = new Users(this);
	}
};
