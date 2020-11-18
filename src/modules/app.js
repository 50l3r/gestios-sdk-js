module.exports = class App {
	constructor(api, slug) {
		this.gestiOS = api;
		this.slug = slug;
	}

	// List items
	list({ page = 1, filters = null, order = null, limit = 20 } = {}) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.get(`/app/${this.slug}`, {
					params: {
						filters: filters ? JSON.stringify(filters) : null,
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

	// Get specific item
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
				}).then((res) => {
					resolve({
						...res,
						data: res.data ? res.data.data[0] : undefined,
					});
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}

	// Get all items
	all({ filters = null, order = null, limit = 100 } = {}) {
		return new Promise((resolve, reject) => {
			let page = 1;
			let total = 0;
			const data = [];

			const list = () => {
				try {
					// eslint-disable-next-line no-await-in-loop
					this.gestiOS.$http.get(`app/${this.slug}`, {
						params: {
							filters: filters ? JSON.stringify(filters) : null,
							order: order ? JSON.stringify(order) : null,
							limit,
							page,
						},
					}).then((res) => {
						if (res.data !== undefined) {
							res.data.data.forEach((item) => {
								data.push(item);
							});

							total = res.data.total;

							if (res.data.length < limit) {
								resolve({
									...res,
									data,
									total,
								});
							} else {
								page += 1;
								list(page);
							}
						} else if (data.length > 0) {
							resolve({
								ok: true,
								code: 200,
								data,
								total,
							});
						} else {
							resolve({
								ok: false,
								code: 404,
								data: [],
								total: 0,
							});
						}
					}).catch((error) => reject(error));
				} catch (error) {
					reject(error);
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

				this.gestiOS.$http.post(`/app/${this.slug}`, new URLSearchParams(params)).then((res) => {
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

	// Edit item
	edit({ id, params, callback = null }) {
		return new Promise((resolve, reject) => {
			try {
				if (callback) params.callback_url = callback;

				this.gestiOS.$http.post(`/app/${this.slug}/${id}`, new URLSearchParams(params)).then((res) => {
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

	// Toggle item status
	status(id) {
		return new Promise((resolve, reject) => {
			try {
				this.gestiOS.$http.post(`app/status/${this.slug}/${id}`).then((res) => {
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

	// Delete item
	delete(id, callback = null) {
		return new Promise((resolve, reject) => {
			try {
				let params = '';
				if (callback) params = `?callback_url=${callback}`;

				this.gestiOS.$http.delete(`app/${this.slug}/${id}${params}`).then((res) => {
					if (res.data && res.data.data) delete res.data;

					resolve(res);
				}).catch((error) => reject(error));
			} catch (error) {
				reject(error);
			}
		});
	}

	// Check auth item
	auth({ user, scopes = [], item, strict = true }) {
		let scopeCount = 0;
		let pass = false;

		if (user.BOSS === '1' || scopes.length === 0) return true;

		scopes.forEach((scope) => {
			const dp = scope.split('.');
			if (dp.length < 3 && dp[dp.length - 1] !== this.slug) scope += `.${this.slug}`;

			user.Roles.Readable.forEach((role) => {
				if (scope === role) {
					scopeCount += 1;
				}
			});

			switch (scope) {
			case `view.mine.${this.slug}`: // Ver propios (view.mine.)
				if (item._EntityCreateUser) {
					if (item._EntityCreateUser.ID !== user.ID) {
						scopeCount -= 1;
					}
				}
				break;

			case `view.${this.slug}`: // Ver todos (view.)

				break;

			case `add.mod.${this.slug}`: // Ver Añadir en moderacion (add.mod.)

				break;

			case `add.${this.slug}`: // Ver Añadir (add.)

				break;

			case `set.mine.${this.slug}`: // Editar propios (set.mine.)
				if (item._EntityCreateUser) {
					if (item._EntityCreateUser.ID.toString() !== user.ID) {
						scopeCount -= 1;
					}
				}
				break;

			case `set.${this.slug}`: // Editar todos (set.)

				break;

			case `del.mine.${this.slug}`: // Eliminar propios (del.mine.)
				if (item._EntityCreateUser) {
					if (item._EntityCreateUser.ID.toString() !== user.ID) {
						scopeCount -= 1;
					}
				}
				break;

			case `del.${this.slug}`: // Eliminar todos (del.)

				break;

			case `lock.${this.slug}`: // Cambiar estado (del.)

				break;

			case `comment.${this.slug}`: // Comentar (comment.)

				break;

			case `moderate.${this.slug}`: // Moderar comentarios (moderate.)

				break;

			case `uncomment.mine.${this.slug}`: // Eliminar comentarios (moderate.)

				break;
			default:
			}

			if ((strict && scopeCount >= scopes.length) || (!strict && scopeCount > 0)) pass = true;
		});

		return pass;
	}
};
