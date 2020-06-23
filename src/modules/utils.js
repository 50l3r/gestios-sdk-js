module.exports = class Users {
	constructor(api, app) {
		this.gestiOS = api;
		this.app = app;
	}

	// Prepare & clean field params
	cleanFields(params) {
		try {
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
		} catch (err) {
			if (this.gestiOS.debug) console.error(err);
			return false;
		}
	}

	// Generate app filter for search
	filter(value, parent = 'OR') {
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
			if (this.gestiOS.debug) console.error(error);
			return false;
		}
	}

	// Get value of select field
	getSelectValue(field, value) {
		try {
			if (typeof this.app.Fields[field] !== 'undefined') {
				const vars = JSON.parse(this.app.Fields[field].Vars);
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
		} catch (err) {
			if (this.gestiOS.debug) console.error(err);
			return false;
		}
	}
};
