module.exports = class Utils {
	constructor(api) {
		this.gestiOS = api;
	}

	// Generate app filter for search
	filter(appName, value, parent = 'OR') {
		return new Promise((resolve, reject) => {
			this.gestiOS.$http.get('apps').then((response) => {
				const app = response.data.find((a) => a.Permalink === appName);

				if (app) {
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

					resolve(Filters);
				}

				if (this.gestiOS.debug) console.error('No se encontró la aplicación o no tienes acceso a ella');
				resolve('');
			}).catch((error) => reject(error));
		});
	}

	// Get value of select field
	getValue(appName, field, value) {
		return new Promise((resolve, reject) => {
			this.gestiOS.$http.get('apps').then((response) => {
				const app = response.data.find((a) => a.Permalink === appName);

				if (app) {
					if (typeof app.Fields[field] !== 'undefined') {
						const vars = JSON.parse(app.Fields[field].Vars);
						let name = '';

						value = parseInt(value, 10);
						vars.forEach((option) => {
							const id = parseInt(option.id, 10);
							if (value === id) {
								({ name } = option);
							}
						});

						if (name) resolve(name);
					}

					if (this.gestiOS.debug) console.error('El campo o valor no existe');
					resolve('');
				}

				if (this.gestiOS.debug) console.error('No se encontró la aplicación o no tienes acceso a ella');
				resolve('');
			}).catch((error) => reject(error));
		});
	}
};
