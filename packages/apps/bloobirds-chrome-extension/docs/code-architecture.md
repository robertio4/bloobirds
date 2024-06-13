Code Architecture
=================

The extension is a Typescript application which uses `yarn` for the dependencies and `webpack` for the bundling.

The bundled code follows a standard structure of a chrome extension's architecture, check [this article](https://developer.chrome.com/docs/extensions/mv3/architecture-overview/#arch) for a good overview on chrome extension's architecture.

The repo is structured as follows:

```
/assets (shared assets)
/builds (contains the zipped packages, ready to be published)
/dist (contains the bundled code and assets)
/docs (documentation)
/scripts (scripts used in the package.json)
/src (application code)
/tests (automated tests)
```

Looking inside the `/src` folder:

```
/background (code for the background script)
/content (code for the content script)
/images (shared images acros scripts)
/lib (shared utility libs across scripts)
/options (code for the options page ui/script)
/popup (code for the popup ui/script)
/remote (legacy folder for the remote code, currently this code is used inside the content script and could be moved there, check the Legacy Background docs article for context)
```

