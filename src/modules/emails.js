module.exports = class App {
	constructor(api, slug) {
		this.gestiOS = api;
		this.slug = slug;
	}

	// List emails
	list({ page = 1, folder = null } = {}) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.get('/emails', {
					params: {
						page,
						folder,
					},
				}).then((res) => {
					resolve({
						...res,
						data: res.data ? res.data.data : 0,
						total: res.data ? res.data.total : 0,
					});
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}

	// List folders
	folders(page = 1) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.get('/emails/folders', {
					params: {
						page,
					},
				}).then((res) => {
					resolve({
						...res,
						data: res.data ? res.data.data : 0,
						total: res.data ? res.data.total : 0,
					});
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}

	// Send email
	send({ email, subject, message, cc = [], replyto = '', folder = '' } = {}) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.post('/emails', new URLSearchParams({ email, cc, subject, message, replyto, folder })).then((res) => {
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

	// Delete email
	delete(id) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.delete(`emails/${id}`).then(() => {
					resolve(true);
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}
};
