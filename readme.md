# GestiOS SDK for JavaScript
Official **GestiOS** SDK for **Node.js**. Connect to your GestiOS project and operate with your API Rest.

## 💾 Installing
To use the SDK, simply install by npm:

```
npm install gestios-sdk-js
```

You only need to instance library:

```
const GestiOS = require('gestios-sdk-js');

const gestios = new GestiOS({
	project: 'YOUR_PROJECT_NAME',
	token: 'YOUR_TOKEN_ACCESS',
	url: 'YOUR_GESTIOS_URL',
	debug: true|false,
});

const item = await gestios.app(YOUR_APP_NAME).get(YOUR_ITEM_ID);

console.log(item);
```

# 🗃️ **APPs**
First, you need to instance your app:

```
const myApp = await gestios.app(YOUR_APP_NAME);
```

## **List items**
You can list all items from specific app:

```
const data = await myApp.list({page: 1, limit: 20});
```

****Get specific item based on ID****

```
const data = await myApp.get(7465);
```

