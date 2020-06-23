const GestiOS = require('../index');


async function getApps() {
	const gestios = new GestiOS({
		project: 'maras',
		token: '96432b7092583dd5c31158b39d3317d8fbaf0d43',
		url: 'https://local.gestios.dev',
		debug: true,
	});

	// const empresas = await gestios.app('review');
	const data = await gestios.app('review').add({
		client_mail: '500l3r@gmail.com',
		department: 0,
	});

	console.log(data);
}

getApps();
