module.exports = class App {
	constructor(api, slug) {
		this.gestiOS = api;
		this.slug = slug;
	}

	// List items
	list({ page = 1, filters = null, order = null, limit = this.limit } = {}) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.get(`/app/${this.slug}`, {
					params: {
						filters: filters ? JSON.stringify(filters) : null,
						order: order ? JSON.stringify(order) : null,
						page,
						limit,
					},
				}).then((response) => {
					resolve({
						ok: true,
						data: response.data.data,
						total: response.data.total,
					});
				}).catch((error) => {
					reject(this.gestiOS._error(error));
				});
			} catch (error) {
				reject(this.gestiOS._error(error));
			}
		});
	}

	get(id) {
		return new Promise((resolve, reject) => {
			try {
				const filters = [{
					_ParentOperator: 'OR',
					_Operator: 'OR',
					Fields: {
						_EntityId: {
							type: 3,
							int: id,
							opt: '=',
						},
					},
				}];

				this.gestiOS.$http.get(`/app/${this.slug}`, {
					params: {
						filters: filters ? JSON.stringify(filters) : null,
						page: 1,
						limit: 1,
					},
				}).then((response) => {
					resolve({
						ok: true,
						data: response.data.data[0],
					});
				}).catch((error) => {
					reject(this.gestiOS._error(error));
				});
			} catch (error) {
				reject(this.gestiOS._error(error));
			}
		});
	}

	// Get all items
	all({ filter = null, order = null } = {}) {
		return new Promise((resolve, reject) => {
			let page = 1;
			let total = 0;
			const data = [];

			const list = () => {
				try {
					// eslint-disable-next-line no-await-in-loop
					this.gestiOS.$http.get(`app/${this.slug}`, {
						params: {
							filters: filter ? JSON.stringify(filter) : null,
							order: order ? JSON.stringify(order) : null,
							limit: 100,
							page,
						},
					}).then((response) => {
						response.data.data.forEach((item) => {
							data.push(item);
						});

						total = response.data.total;

						if (response.data.data.length < 100) {
							resolve({
								ok: true,
								data,
								total,
							});
						} else {
							page += 1;
							list(page);
						}
					}).catch((error) => {
						const code = error.response.status;

						if (code === 404) {
							resolve({
								ok: true,
								data,
								total,
							});
						} else {
							reject(this.gestiOS._error(error));
						}
					});
				} catch (error) {
					reject(this.gestiOS._error(error));
				}
			};

			list(page);
		});
	}

	// Add item
	add(params, callback = null) {
		return new Promise((resolve, reject) => {
			try {
				if (callback) params.callback_url = callback;

				this.gestiOS.$http.post(`/app/${this.slug}`, new URLSearchParams(params)).then((response) => {
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

	// Edit item
	edit({ id, params, callback = null }) {
		return new Promise((resolve, reject) => {
			try {
				if (callback) params.callback_url = callback;

				this.gestiOS.$http.post(`/app/${this.slug}/${id}`, new URLSearchParams(params)).then((response) => {
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

	// Toggle item status
	status(id) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.post(`app/status/${this.slug}/${id}`).then(() => {
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

	// Delete item
	delete(id, callback = null) {
		return new Promise((resolve, reject) => {
			try {
				let params = '';
				if (callback) params = `?callback_url=${callback}`;

				this.gestiOS.$http.delete(`app/${this.slug}/${id}${params}`).then(() => {
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
