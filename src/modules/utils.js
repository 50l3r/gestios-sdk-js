module.exports = class Utils {
	constructor(api, apps) {
		this.gestiOS = api;
		this.apps = apps;
	}

	// Generate app filter for search
	filter(appName, value, parent = 'OR') {
		try {
			const app = this.apps.find((a) => a.Permalink === appName);

			if (app) {
				const Filter = {
					_ParentOperator: parent,
					_Operator: 'OR',
					Fields: {},
				};

				Object.keys(app.Fields).forEach((i) => {
					if (app.Fields[i].Searchable) {
						Filter.Fields[app.Fields[i].Name] = {
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
			}

			if (this.gestiOS.debug) console.error('No se encontró la aplicación o no tienes acceso a ella');
			return false;
		} catch (error) {
			return false;
		}
	}

	// Get value of select field
	getValue(appName, field, value) {
		try {
			if ((!value && value !== 0) || field === null) return '';

			const app = this.apps.find((a) => a.Permalink === appName);

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

					if (name) return name;
				}

				throw new Error('El campo o valor no existe');
			}

			throw new Error('No se encontró la aplicación o no tienes acceso a ella');
		} catch (error) {
			if (this.gestiOS.debug) console.error(error);
			return '';
		}
	}
};
