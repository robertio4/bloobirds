Legacy background
=================

Initially, this extension was not distributed via Chrome store, instead, we distributed the package manually among the Bloobird users and most of the application logic came from a "remote script" that we hosted in S3 and updated when we wanted.

This architecture had its challenges:

- it was painful for the users to install the extension manually.
- only a part of the application could come from the remote script, all the `content`, `background` and `option` scripts still had to live in the package that was manually distributed. This meant that we had to handle two kind of updates (updating the package and updating the remote script).
- the future v3 version of the chrome extensions manifest won't allow remote code.

Due to these and other reasons, and because the store review time was short enough (< 24h) we decided to distribute via Chrome store, which ended up simplifying a lot the development of the extension.
