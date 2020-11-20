const FormData = require('form-data');

module.exports = class Media {
	constructor(api) {
		this.gestiOS = api;
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
					headers: formData.getHeaders(),
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
