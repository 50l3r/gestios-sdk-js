# GestiOS SDK for JavaScript
Official **GestiOS** SDK for **Node.js**. Connect to your GestiOS project and operate with your API Rest.

## 💾 Installing
To use the SDK, simply install by npm:

```
npm install gestios-sdk-js
```

You need to instance the library and execute init method:

```
const GestiOS = require('gestios-sdk-js');

const gestios = new GestiOS({
	project: 'YOUR_PROJECT_NAME',
	token: 'YOUR_TOKEN_ACCESS',
	url: 'YOUR_GESTIOS_URL',
	debug: true|false,
});

const init = await gestios.init();

if (init) {
	console.log('It Works');
}
```

## Apps
You can manage app records before instance your app

```
const myApp = await gestios.app(APPNAME);
```

### List items

```
const data = await myApp.list();
```

