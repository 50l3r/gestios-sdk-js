const Core = require('./core');

// Modules
const App = require('./modules/app');
const Config = require('./modules/config');
const Users = require('./modules/users');
const Utils = require('./modules/utils');
const Emails = require('./modules/emails');
const Auth = require('./modules/auth');
const Groups = require('./modules/groups');
const Roles = require('./modules/roles');
const Media = require('./modules/media');
const Profile = require('./modules/profile');

// TODO: Restructure modules
// import avatars from './_avatars';
// import comments from './_comments';
// import notifications from './_notifications';

module.exports = class GestiOS extends Core {
	constructor({ project = '', token = '', url = 'https://gestios.es', debug = false } = {}) {
		super({ project, token, url, debug });

		this._loadModules();
	}

	apps() {
		return new Promise((resolve, reject) => {
			this.$http.get('apps').then((response) => {
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
		this.auth = new Auth(this);
		this.roles = new Roles(this);
		this.groups = new Groups(this);
		this.media = new Media(this);
		this.profile = new Profile(this);
	}
};
