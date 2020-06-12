const GestiOS = require('../index');


async function getApps() {
	try {
		const gestios = await new GestiOS({
			project: 'calltek',
			token: 'w8wwk44swow4ck0wskk4gocso8w8ccwkoksgwg44',
			env: 'local',
			debug: false,
		});

		// const empresas = await gestios.app('empresas');
		const data = await gestios.app('empresas').list();
		console.log(data);
	} catch (error) {
		console.log(error.message);
	}
}

getApps();
