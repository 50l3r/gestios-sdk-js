module.exports = class App {
	constructor(api, app) {
		this.gestiOS = api;
		this.app = app;
		this.slug = app.Permalink;
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
	add({ params, callback = null }) {
		return new Promise((resolve, reject) => {
			try {
				const data = this._processFields(params);
				if (callback) data.callback_url = callback;

				this.gestiOS.$http.post(`/app/${this.slug}`, new URLSearchParams(data)).then((response) => {
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
				const data = this._processFields(params);
				if (callback) data.callback_url = callback;

				this.gestiOS.$http.post(`/app/${this.slug}/${id}`, new URLSearchParams(data)).then((response) => {
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

	// Process fields before request
	_processFields(params) {
		const FinalParams = {};

		Object.keys(params).forEach((key) => {
			if (key.substr(0, 1) !== '_') { // Only custom fields
				if (this.app.Fields[key]) {
					// Si es un campo de app se procesa
					if (params[key] || params[key] === 0 || this.app.Fields[key].Type === 'text' || this.app.Fields[key].Type === 'image') {
						if (this.app.Fields[key].Type === 'relation' && typeof params[key] === 'object') {
							if (params[key]._EntityId > 0) {
								FinalParams[key] = params[key]._EntityId;
							}
						} else if (this.app.Fields[key].Type === 'relation' && (params[key] === '' || params[key] === 0)) {
							FinalParams[key] = null;
						} else if ((this.app.Fields[key].Type !== 'relation' || params[key] !== 0) && params[key] != null) {
							FinalParams[key] = params[key];
						}
					}
				} else if (params[key] != null) {
					// Si es un campo ajeno se agrega
					FinalParams[key] = params[key];
				}
			}
		});

		return FinalParams;
	}

	// Generate app filter for search
	filter({ value, parent = 'OR' }) {
		try {
			const Filter = {
				_ParentOperator: parent,
				_Operator: 'OR',
				Fields: {},
			};

			Object.keys(this.app.Fields).forEach((i) => {
				if (this.app.Fields[i].Searchable) {
					Filter.Fields[this.app.Fields[i].Name] = {
						type: 4,
						string: value,
						opt: '%',
					};
				}
			});

			const Filters = [];

			if (value && Filter) {
				Filters.push(Filter);
			}

			return Filters;
		} catch (error) {
			// eslint-disable-next-line no-console
			if (this.gestiOS.debug) console.error(error);
			return false;
		}
	}

	// Get value of select field
	select(field, value) {
		if (typeof this.app.Fields[field] !== 'undefined') {
			const vars = JSON.parse(App.Fields[field].Vars);
			let name = '';

			value = parseInt(value, 10);
			vars.forEach((option) => {
				const id = parseInt(option.id, 10);
				if (value === id) {
					({ name } = option);
				}
			});

			if (name) return name;
		}

		return false;
	}
};
