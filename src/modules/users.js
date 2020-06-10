module.exports = class Users {
	constructor(api) {
		this.gestiOS = api;
	}

	// List users
	list({ page = 1, search = null, limit = 10 } = {}) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.get('/users', {
					params: {
						page,
						search,
						limit,
					},
				}).then((response) => {
					resolve({
						ok: true,
						data: response.data.data,
						total: response.data.total,
					});
				}).catch((error) => {
					reject(this.gestiOS._error(error));
				});
			} catch (error) {
				reject(this.gestiOS._error(error));
			}
		});
	}

	// Get user
	get(id) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.get(`/users/${id}`).then((response) => {
					resolve({
						ok: true,
						data: response.data.data[0],
					});
				}).catch((error) => {
					reject(this.gestiOS._error(error));
				});
			} catch (error) {
				reject(this.gestiOS._error(error));
			}
		});
	}

	// Add user
	add({ email, nick, name, phone = null, group = null, password = null }) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.post('/users', new URLSearchParams({
					Email: email,
					Nick: nick,
					Name: name,
					Phone: phone,
					Group: group,
					Key: password,
				})).then((response) => {
					resolve({
						ok: true,
						data: response.data.data,
					});
				}).catch((error) => {
					reject(this.gestiOS._error(error));
				});
			} catch (error) {
				reject(this.gestiOS._error(error));
			}
		});
	}

	// Edit user
	edit({ id, email, nick, name, phone = null, group = null, password = null }) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.post(`/users/${id}`, new URLSearchParams({
					Email: email,
					Nick: nick,
					Name: name,
					Phone: phone,
					Group: group,
					Key: password,
				})).then((response) => {
					resolve({
						ok: true,
						data: response.data.data,
					});
				}).catch((error) => {
					reject(this.gestiOS._error(error));
				});
			} catch (error) {
				reject(this.gestiOS._error(error));
			}
		});
	}

	// Toggle user status
	status(id, status) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.post(`users/status/${id}/${status}`).then(() => {
					resolve({
						ok: true,
					});
				}).catch((error) => {
					reject(this.gestiOS._error(error));
				});
			} catch (error) {
				reject(this.gestiOS._error(error));
			}
		});
	}

	// Delete user
	delete(id) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.delete(`users/${id}`).then(() => {
					resolve({
						ok: true,
					});
				}).catch((error) => {
					reject(this.gestiOS._error(error));
				});
			} catch (error) {
				reject(this.gestiOS._error(error));
			}
		});
	}
};
