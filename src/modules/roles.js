module.exports = class Roles {
	constructor(api) {
		this.gestiOS = api;
	}

	// List user roles
	list(id) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.get(`/roles/${id}`).then((res) => {
					resolve({
						...res,
						data: res.data ? res.data.data : [],
					});
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}

	// Check user permissions
	// eslint-disable-next-line class-methods-use-this
	check({ user, scopes = [], strict = true }) {
		if (user.BOSS === '1' || scopes.length === 0) return true;

		let scopeCount = 0;
		let pass = false;

		scopes.forEach((scope) => {
			user.Roles.Readable.forEach((item) => {
				if (scope === item) {
					scopeCount += 1;
				}
			});
		});

		if ((strict && scopeCount >= scopes.length) || (!strict && scopeCount > 0)) pass = true;

		return pass;
	}
};
