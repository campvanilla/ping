# ping

> Get notified when you're back online! ⚡️

![image](https://user-images.githubusercontent.com/6417910/81191213-66482980-8fd6-11ea-8949-21f37d0aa1ff.png)

### How does this work?

Ping registers a service worker on load. The UI responds to network connectivity and when requested to be notified, the service worker starts polling the network.

When the poll succeeds, Ping sends a system notification to alert the user that the network connectivity is back up.

_A project by [@abinavseelan](http://abinavseelan.com/) & [@rheaditi](http://aditimohanty.com/)_

## Contributing

Want to raise an issue or pull request? Do give our [Contributing](https://github.com/campvanilla/ping/master/CONTRIBUTING.md) page a read. 🤓

### First time setup

To set up the codebase, clone the repository.

```sh
git clone https://github.com/campvanilla/ping.git
```

Once the repository has been cloned, we need a way to serve the `/public` directory. You can use any tool that allows you to serve a folder on a port. One option is [http-server](https://www.npmjs.com/package/http-server).

To set things up with `http-server`, install the CLI

```sh
npm install -g http-server
```

Once installed, you can serve the `/public` folder using `http-server`

```sh
http-server /public
```

View the application at http://localhost:8080/

