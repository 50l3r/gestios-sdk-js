module.exports = class Project {
	constructor(app) {
		this.gestiOS = app;
	}

	apps() {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.get('apps').then((response) => {
					resolve({
						ok: true,
						data: response.data,
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
