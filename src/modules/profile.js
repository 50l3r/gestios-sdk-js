module.exports = class Profile {
	constructor(api) {
		this.gestiOS = api;
	}

	// Get user profile
	get() {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.get(`/profile/me`).then((res) => {
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
};
