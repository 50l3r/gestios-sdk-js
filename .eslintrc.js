module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	extends: [
		'airbnb-base'
	],
	rules: {
		"no-console": ["error", { allow: ["warn", "error"] }],
		"no-param-reassign": 0,
		"global-require": 0,
		"object-curly-newline": 0,
		"indent": ["error","tab"],
		"no-tabs": 0,
		"no-underscore-dangle": 0,
		"semi": [2,"always"],
		"max-len": 0,
		"class-methods-use-this": 0
	}
}
