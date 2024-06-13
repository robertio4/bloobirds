Capturing Leads
===============

One of the main features of the extension is the hability to easily create leads directly from Linkedin and Sales Navigator.

The extension has a form to create a new lead which automatically prefills several fields by scrapping the linkedin/sales navigator profile. In case that Linkedin or Sales Navigator changes their UI we would need to update the scarpper. That logic can be found in `/src/remote/lib/profileScrapper.ts`.

### Sales Navigator

Currently we only save the LinkedIn' profile url in the Bloobirds Lead, under the attribute `LEAD__LINKEDIN_URL`. We use this field to check if a given Linkedin profile have been already captured.

When implementing capturing leads in Sales Navigator, we found the challenge of getting the associated LinkedIn url from a Sales Navigator profile. At the end, we retrieved that information from the button "Copy Linkedin.com URL" and stored in a local cache store.
