Syncing messages
================

The extension syncs linkedin and sales navigator messages to the Bloobirds platform as activities.

The main challanges for the messages sync were:

- How to identify a message.
- Checking if a message have been already synced.

To identify a message we create a unique hash for each message. To build that hash we use the message `body`, the message `time` and the thread's `path`. (check `storageFormat` method in `dataTransform.js`). Once we have this unique hash, we store it in the Activity attribute `ACTIVITY__LINKEDIN_MESSAGE_HASH`, this way we can check if a message have been already synced.

The main part of the code for syncing messages lives under `/src/remote/messages/`, there's a folder for each "source" (linkedin messages tab, linkedin miniwindows and linkedin sales navigator) that follows a similar structure and share some code.
