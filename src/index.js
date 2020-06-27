const Core = require('./core');

// Modules
const App = require('./modules/app');
const Config = require('./modules/config');
const Users = require('./modules/users');
const Utils = require('./modules/utils');
const Emails = require('./modules/emails');

// TODO: Restructure modules
// import helpers from './_helpers';
// import config from './_config';
// import auth from './_auth';
// import users from './_users';
// import groups from './_groups';
// import media from './_media';
// import avatars from './_avatars';
// import comments from './_comments';
// import notifications from './_notifications';

module.exports = class GestiOS extends Core {
	constructor({ project, token, url, debug }) {
		super({ project, token, url, debug });

		this._loadModules();
	}

	apps() {
		return new Promise((resolve, reject) => {
			this.$http.get('apps').then((response) => {
				this.apps = response.data;
				resolve(response.data);
			}).catch((error) => reject(error));
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
		this.emails = new Emails(this);
	}
};
