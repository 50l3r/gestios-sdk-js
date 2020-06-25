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
const app = await gestios.app('contacts');
```

## **List items**

You can list all items from specific app:

```
const data = await app.list({page: 1, limit: 2});
```

will output:

```
⛔: 404 {
    ok: false,
    code: 404,
    message: 'No se encontraron resultados',
    errors: []
}

✅: 200 {
    ok: true,
    code: 200,
    data: [
        {
            _EntityId: 20,
            _EntityStatus: 1,
            _EntityCreateDate: '2020-06-25 11:49:59',
            _EntityCreateUser: {
                ID: 40,
                Nick: 'Jhon',
                Nombre: 'Jhon Doe',
                Email: 'jhon@doe.com'
            },
            _EntityCreateIp: '127.0.0.1',
            _EntityUpdateDate: null,
            _EntityUpdateUser: null,
            _EntityUpdateIp: null,
            client_name: 'Connie E. Ward',
            client_mail: 'connieeward@gustr.com',
            client_location: '3806 Alfred Drive',
            client_phone: '718-242-6537'
            _Comments: []
        },{
            _EntityId: 21,
            _EntityStatus: 1,
            _EntityCreateDate: '2020-06-25 16:49:59',
            _EntityCreateUser: {
                ID: 41,
                Nick: 'Stella',
                Nombre: 'Stella R. Converse',
                Email: 'stellarconverse@superrito.com'
            },
            _EntityCreateIp: '127.0.0.1',
            _EntityUpdateDate: null,
            _EntityUpdateUser: null,
            _EntityUpdateIp: null,
            client_name: 'Richard L. Smith',
            client_mail: 'richardlsmith@gustr.com',
            client_location: '78 Brooke Street',
            client_phone: '713-718-1768'
            _Comments: []
        }
  ],
  total: 13
}
```

Parameters:

|Param|Required|Default|Description|
|---------|---------|---------|---------|
| `page` |⚫| `1` |Number of page to list         |
| `limit` |⚫| `20` |Items per page from `1` to `100` |
| `filters` |⚫| `null` |Filter array|
| `order` |⚫| `null` |Order array|

If u need all items from app *(Page & limit params not required):*

```
const data = await app.all();
```

> **💁 ADVISE**
> This method may cause high load on your api usage

## **Get item**

Get specific item based on unique ID:
********

```
const data = await app.get(20);
```

will output:

```
⛔: 404 {
    ok: false,
    code: 404,
    message: 'No se encontraron resultados',
    errors: []
}

✅: 200 {
    ok: true,
    code: 200,
    data: {
        _EntityId: 20,
        _EntityStatus: 1,
        _EntityCreateDate: '2020-06-25 11:49:59',
        _EntityCreateUser: {
            ID: 40,
            Nick: 'Jhon',
            Nombre: 'Jhon Doe',
            Email: 'jhon@doe.com'
        },
        _EntityCreateIp: '127.0.0.1',
        _EntityUpdateDate: null,
        _EntityUpdateUser: null,
        _EntityUpdateIp: null,
        client_name: 'Connie E. Ward',
        client_mail: 'connieeward@gustr.com',
        client_location: '3806 Alfred Drive',
        client_phone: '718-242-6537'
        _Comments: []
    }
}
```

Parameters:

|Param|Required|Default|Description|
|---------|---------|---------|---------|
| `id` |🔴| `1` |Unique item identifier|

## **New item**

You can create new items. All field's validations will processed by API and throw errors if exists
********

```
const params = {
    client_name: 'Brandon W. Woody',
    client_mail: 'brandonwwoody@gustr.com',
    client_location: '2372 Clinton Street',
    client_phone: '501-241-5023'
};

const data = await app.add(params);
```

will output:

```
// With bad params (ex: invalid email)
⛔: 400 {
    ok: false,
    code: 400,
    message: 'No se han recibido los parámetros correctos',
    errors: [ 'El campo Email debe contener una dirección de correo válida.' ],
    data: null
}

// All params correct
✅: 200 {
    ok: true,
    code: 200,
    data: {
        _EntityId: 22,
        _EntityStatus: 1,
        _EntityCreateDate: '2020-06-25 13:34:59',
        _EntityCreateUser: {
            ID: 40,
            Nick: 'Jhon',
            Nombre: 'Jhon Doe',
            Email: 'jhon@doe.com'
        },
        _EntityCreateIp: '127.0.0.1',
        _EntityUpdateDate: null,
        _EntityUpdateUser: null,
        _EntityUpdateIp: null,
        client_name: 'Brandon W. Woody',
        client_mail: 'brandonwwoody@gustr.com',
        client_location: '2372 Clinton Street',
        client_phone: '501-241-5023'
        _Comments: []
    }
}
```

Parameters:

|Param|Required|Default|Description|
|-|-|-|--|
| `params` |🔴| `null` |All fields to sent|
| `callback` |⚫| `null` |GestiOS will call this url with job data|
