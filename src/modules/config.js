
module.exports = class Config {
	constructor(api) {
		this.gestiOS = api;
		this.keys = {};
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
				}).then((response) => {
					const { data } = response.data;
					this.keys = { ...data, ...this.keys };

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

	// Edit config
	set(keys) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.post('/config', new URLSearchParams({ keys: JSON.stringify(keys) })).then(() => {
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
