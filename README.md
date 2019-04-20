# CS506_Momentum_Website
Companion piece to CS506 Momentum

To run:
1. Clone the repository into a directory of your choice. Can be in a separate folder from the mobile application.
2. Navigate inside the project folder.
3. Open cmd, bash, or a similar window and type "npm start"
4. Normally, a local server should be created and automatically opens a tab on your web browser that renders the website.
4a. If it doesn't automatically open, the window should give a localhost address which you can paste into a web browser. (usually localhost:3000).
4b. If an error returns before the website is loaded, try creating an .env file (no text in front) in the project folder's root. This file should have the line 'SKIP_PREFLIGHT_CHECK=true' (no quotation marks). Repeating step 3 should then solve the error. (only an issue with some computers).
5. The website should normally look like a calendar with a list of clickable collapsible habits (if available) for the selected day.
