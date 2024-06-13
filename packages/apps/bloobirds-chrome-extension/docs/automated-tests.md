Automated Tests
===============

# Intro

The current setup for automated tests use puppeteer and jest.

It only have two simple tests, one that checks that the extension can be installed and another that checks the login against the bloobirds staging server.

There are several challenges to test this extension:

- It depends heavilty on linkedin.com, but we can't use it in automated tests or we would get banned.
- It also depends on the bloobirds platform, in the current setup it runs agains the staging server.
- We need to load and interact with the extension's native ui (for example: the extensions toolbar icon).

# Run

Build the extension pointing to the staging server:

`STAGING=true yarn run build`

Run the tests suite

`BB_LOGIN=dev@bloobirds.info BB_PASS=****** yarn run test`
