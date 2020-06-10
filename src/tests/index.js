const GestiOS = require('../index');

const gestios = new GestiOS({
	project: 'calltek',
	token: 'w8wwk44swow4ck0wskk4gocso8w8ccwkoksgwg44',
	env: 'local',
	debug: false,
});


async function getApps() {
	const init = await gestios.init(); //

	if (init) {
		try {
			// const empresas = await gestios.app('empresas');
			const data = await gestios.config.get(['FacturaSerie', 'IVA']);
			console.log(data);

			console.log(gestios.config.keys);
		} catch (error) {
			console.log(error.message);
		}
	}
}

getApps();
