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

				if (this.gestiOS.debug) console.error('El campo o valor no existe');
				return '';
			}

			if (this.gestiOS.debug) console.error('No se encontró la aplicación o no tienes acceso a ella');
			return '';
		} catch (error) {
			return '';
		}
	}
};
