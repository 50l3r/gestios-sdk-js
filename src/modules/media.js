const FormData = require('form-data');

let isNode;
if (typeof window === 'undefined') {
	isNode = true;
} else {
	isNode = false;
}

module.exports = class Media {
	constructor(api) {
		this.gestiOS = api;
	}

	// List files
	list({ page = 1, search = null, order = null, limit = 20, folder = null, type = null } = {}) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.get('/emails', {
					params: {
						search: search || null,
						folder: folder || null,
						type: type || null,
						order: order ? JSON.stringify(order) : null,
						page,
						limit,
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

	// Get file
	get(id) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.get(`media/${id}`).then((res) => {
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

	// Share file with time limit
	share({ id, ts }) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.get(`media/link/${id}/${ts}`).then((res) => {
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

	// Add file
	add({ file, name, folder = '' }) {
		return new Promise((resolve, reject) => {
			try {
				const formData = new FormData();
				formData.append('file', file, name);
				if (folder) formData.append('folder', folder);

				this.gestiOS.$http.post('media', formData, {
					headers: isNode ? formData.getHeaders() : {},
				}).then((res) => {
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

	// Delete file
	delete(id) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.delete(`media/${id}`).then((res) => {
					resolve(res);
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}
};
