Test against the staging server
===============================

By default, the extension points to the production servers, meaning that if you want to log in you'll have to use the credentials of a user in production.

If you want to point to the staging server, go to the options page (click the extension icon > options) and update:

- Auth url: `https://jwt-api.preprod-bloobirds.com/service/jwt`
- Data backend url: `https://bobject-api.preprod-bloobirds.com`

Now the extension will point to the staging server and you'll need to login with a staging user.
