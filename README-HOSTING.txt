CALM CURRENT BUDGET PLANNER — VERSION 53

FILES
- index.html: the complete planner website (Version 53)
- sw.js: offline/PWA service worker
- manifest.webmanifest: installable app metadata
- icons/current.svg: planner icon

HOSTING
1. Extract this ZIP.
2. Upload the files and the icons folder together to the root/public folder of a static website host. Keep index.html at the site root.
3. Publish the site over HTTPS so installation and offline caching can work. No API key or backend is required for this static version.

GITHUB PAGES NOTE
This bundle uses root-based paths for the service worker and icon. It works best at a domain root (for example, username.github.io) or on a custom domain. A repository URL under username.github.io/repository-name may need path adjustments for the service worker and asset paths.

DATA NOTE
Planner data is stored in the visitor's browser on that device. This bundle does not add cloud sync between devices; use the planner's export/import options to move data.
