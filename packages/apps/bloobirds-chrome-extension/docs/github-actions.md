Github Actions
==============

Currently we only use Github Actions to store a historical archive of all the published versions of the extension.

After merging a PR into `master`, an action builds the extension, zips it and uploads it to the [bloobirds chrome extension bucket](https://s3.console.aws.amazon.com/s3/buckets/bloobirds-chrome-extension). Log into this console in order to manage the bucket: https://857743578383.signin.aws.amazon.com/console.
