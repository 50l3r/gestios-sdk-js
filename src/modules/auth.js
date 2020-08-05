module.exports = class Auth {
	constructor(api) {
		this.gestiOS = api;
	}

	// Login
	login({ username, password }) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.post('/auth/login', new URLSearchParams({ username, password })).then((res) => {
					resolve({
						...res,
						data: res.data || null,
					});
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}

	// Forgot password
	forgot(email) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.post('/auth/forgot', new URLSearchParams({ email })).then((res) => {
					resolve(res);
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}

	// Restore password
	restore({ email, authcode, password }) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.post('/auth/restore', new URLSearchParams({ email, authcode, password })).then((res) => {
					resolve(res);
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}
};
