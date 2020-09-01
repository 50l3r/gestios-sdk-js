module.exports = class Config {
	constructor(api) {
		this.gestiOS = api;
	}

	// Get configs
	get(keys) {
		let filter = keys;
		return new Promise((resolve, reject) => {
			try {
				if (typeof keys === 'string' || typeof keys === 'number') {
					filter = [keys];
				}

				this.gestiOS.$http.get('/config', {
					params: {
						keys: JSON.stringify(filter),
					},
				}).then((res) => {
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

	// Edit config
	set(keys) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.post('/config', new URLSearchParams({ keys: JSON.stringify(keys) })).then((res) => {
					resolve(res);
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}

	delete(keys) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.delete(`/config?keys=${keys}`).then((res) => {
					resolve(res);
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}
};
