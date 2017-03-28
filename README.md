# container.js

Microscopic dependency injection container

## Installation

    yarn add elao-container.js

## Usage

Given the given class, you want to declare as a service:

```js
// MyApiClient.js
export default class MyApiClient {
    constructor(host, key) {
        this.host = host;
        this.key keyhost;
    }

    login() {
        // ...
    }
}
```

Set up your container like that:

```js
// my-container.js
import Container from 'elao-container.js';
import MyApiClient from './MyApiClient';

const container = new Container();

// Register a parameter:
container.registerParameter('api:host', 'my.api.com');
container.registerParameter('api:key', 'xxxxxxxxxxx');

// Register a service:
container.registerDefinition('api', MyApiClient, ['api:host', 'api:key']);

export default container;
```

Require the `api` service wherever you need it:

```js
import container from 'my-container.js';

container.fetch('api').login();
```
