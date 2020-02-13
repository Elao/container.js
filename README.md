# container.js

Microscopic dependency injection container

## Installation

    npm install @elao/container.js

## Usage

Given the given class, you want to declare as a service:

```javascript
// MyApiClient.js
export default class MyApiClient {
    constructor(host, key) {
        this.host = host;
        this.key = key;
    }

    login() {
        // ...
    }
}
```

Set up your container like that:

```javascript
// my-container.js
import { Container } from '@elao/container.js';
import { createStore } from 'redux';
import MyApiClient from './MyApiClient';
import reducer from './myReducer';

const container = new Container();

// Register a parameter:
container.registerParameter('api:host', 'my.api.com');
container.registerParameter('api:key', 'xxxxxxxxxxx');

// Register a service:
container.registerService('api', MyApiClient, ['api:host', 'api:key', 'store']);

// Register a callback:
container.registerCallback('store', () => createStore(reducer));

export default container;
```

Require the `api` service wherever you need it:

```javascript
import container from 'my-container.js';

container.get('api').login();
```

### Requiring

With ES modules:

```javascript
import { Container } from '@elao/container.js';
````

With CommonJS modules:

```javascript
const { Container } = require('@elao/container.js');
````

In the browser:

```html
<!DOCTYPE html>
<html>
<head>
    <script src="dist/container.js" async></script>
</head>
<body>
    <script>
        window.addEventListener('load', () => {
            const { Container } = containerjs;
        });
    </script>
</body>
</html>
```
