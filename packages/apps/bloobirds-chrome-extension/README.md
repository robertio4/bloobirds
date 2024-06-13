Bloobird's Chrome extension
===========================

# Intro

This repo have all the source code regarding the Bloobird's Chrome extension. The extension is released in Chrome Marketplace, currently unlisted: https://chrome.google.com/webstore/detail/bloobirds/bfnmjliageccndnbpoadbigbnhicogbh?hl=en&authuser=0

# Developoment

Requirements:

- node
- yarn

Install the dependencies:

```
yarn
```

Start webpack:

```
yarn run build --watch
```

Webpack will build the extension into the `dist/` folder. Now you can load the extension in developer mode:

- Go to: chrome://extensions.
- Enable the developer mode (top right toggle).
- Click "Load unpacked".
- Select the `dist/` folder.

Now you are ready to use the local version of the extension you just built. If you do any change in the code, you'll need to reload clicking the circular arrow that shows in the extension item under chrome://extensions/.

# Distribute

We use the Chrome Store to distribute the application. To publish a new version:

Create a build of the version you want to publish:

```
yarn run build
```

Create the package (zip):

```
yarn run zip
```

Go to the Chrome Dashboard, upload the new package and submit for review:

https://chrome.google.com/webstore/devconsole/11a9f802-caf9-4cfd-818c-213f66857f5e/bfnmjliageccndnbpoadbigbnhicogbh/edit/package

Within 24 hours you should receive an answer from Google, saying that they accepted or rejected the new version.

# More documentation

- [Code architecture](docs/code-architecture.md)
- [Syncing messages](docs/syncing-messages.md)
- [Capturing leads](docs/capturing-leads.md)
- [Github Actions](docs/github-actions.md)
- [Automated tests](docs/automated-tests.md)
- [Test against the staging server](docs/test-against-the-staging-server.md)
- [Legacy background](docs/legacy-background.md)
- [Legacy: User instructions when manual distribution](docs/legacy-user-instructions-when-manual-distribution.md)
