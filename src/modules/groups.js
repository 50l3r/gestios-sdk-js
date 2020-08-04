module.exports = class Groups {
	constructor(api) {
		this.gestiOS = api;
	}

	// List groups
	list() {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.get('/groups').then((res) => {
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
};
