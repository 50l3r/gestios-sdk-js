const axios = require('axios');

const { NetworkError, GestiOSError } = require('./errors');

// const Apps = require('./modules/apps');
const App = require('./modules/app');
const Project = require('./modules/project');
const Config = require('./modules/config');
const Users = require('./modules/users');
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

module.exports = class GestiOS {
	constructor({ project, token, env = 'production', debug = false }) {
		this.project = project;
		this.token = token;
		this.env = env;
		this.debug = debug;

		this.apps = [];

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
		this._loadModules();
	}

	init() {
		return new Promise((resolve, reject) => {
			const project = new Project(this, this.project);
			project.apps().then((response) => {
				this.apps = response.data;
				resolve(true);
			}).catch((error) => {
				reject(this._error(error));
			});
		});
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

	_loadModules() {
		this.config = new Config(this);
		this.users = new Users(this);
	}

	app(slug) {
		const app = this.apps.find((a) => a.Permalink === slug);

		if (app) {
			return new App(this, app);
		}

		throw new Error(`No se ha instanciado el aplicativo: ${slug} o no tiene permisos para acceder a el`);
	}
};
