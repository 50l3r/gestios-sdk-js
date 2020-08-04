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
				}).then((res) => {
					resolve({
						...res,
						data: res.data ? res.data.data : [],
						total: res.data ? res.data.total : 0,
					});
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}

	// Get user
	get(id) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.get(`/users/${id}`).then((res) => {
					resolve({
						...res,
						data: res.data ? res.data.data[0] : null,
					});
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
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
				})).then((res) => {
					resolve({
						...res,
						data: res.data ? res.data.data : null,
					});
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}

	// Edit user
	edit({ id, email, nick, name, phone = null, group = null, password = null }) {
		return new Promise((resolve, reject) => {
			try {
				const params = {
					Email: email,
					Nick: nick,
					Name: name,
				};

				if (phone !== null) params.Phone = phone;
				if (group !== null) params.Group = group;
				if (password !== null) params.Key = password;

				this.gestiOS.$http.post(`/users/${id}`, new URLSearchParams(params)).then((res) => {
					resolve({
						...res,
						data: res.data ? res.data.data : null,
					});
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}

	// Toggle user status
	status(id, status) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.post(`users/status/${id}/${status}`).then((res) => {
					resolve({
						...res,
						data: res.data ? res.data.data : null,
					});
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}

	// Delete user
	delete(id) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.delete(`users/${id}`).then((res) => {
					resolve(res);
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}
};
