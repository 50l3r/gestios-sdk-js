const GestiOS = require('../index');


async function getApps() {
	try {
		const gestios = await new GestiOS({
			project: 'maras',
			token: '96432b7092583dd5c31158b39d3317d8fbaf0d43',
			url: 'http://192.168.1.100',
			debug: false,
		});

		// const empresas = await gestios.app('empresas');
		const data = await gestios.app('partes').list();
		console.log(data);
	} catch (error) {
		console.log(error.message);
	}
}

getApps();
