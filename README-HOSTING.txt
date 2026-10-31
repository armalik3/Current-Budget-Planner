CALM CURRENT BUDGET PLANNER — VERSION 54 (GITHUB + OFFLINE PACKAGE)

PACKAGE CONTENTS
- index.html: complete planner website; keep at the publishing root
- sw.js: GitHub Pages-safe service worker and offline cache
- manifest.webmanifest: installable PWA metadata with relative paths
- icons/current.svg: planner icon
- .nojekyll: prevents GitHub Pages from applying Jekyll processing

GITHUB PAGES SETUP
1. Create/open your GitHub repository.
2. Extract this ZIP on your computer.
3. Upload the CONTENTS of the extracted folder to the repository root
   (not the ZIP itself and not an extra enclosing folder).
4. Confirm index.html, sw.js, and manifest.webmanifest are visible at the
   same top level; the icons folder must also be at that level.
5. In GitHub: Settings > Pages > Deploy from a branch > select the main branch
   and /(root), then Save.
6. Open the published HTTPS GitHub Pages URL while online and wait for the
   page to finish loading. Refresh once after the first load.

OFFLINE MODE
- Service workers require HTTPS (GitHub Pages provides HTTPS) or localhost.
- Open the published planner at least once while online so the app shell can
  be cached. After that, it can reopen offline in the same browser/device.
- Planner data is stored locally in that browser using localStorage. Changes
  continue to save on that device while offline.
- Offline data is not automatically synced between devices or users. Use the
  planner's export/import backup options to move data.
- Clearing the browser's site data can remove locally stored planner data and
  the offline cache. Export a backup regularly.

REPOSITORY PATH SUPPORT
All manifest, icon, and service-worker paths are relative to the deployed app.
This supports both a user site (username.github.io) and a project site
(username.github.io/repository-name).

IMPORTANT
Do not open index.html directly as a file (file://). Test offline after
publishing over HTTPS: load the site once online, then disconnect the internet
and reload the same GitHub Pages address.
