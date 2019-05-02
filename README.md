# CS506_Momentum_Website
Companion piece to CS506 Momentum

To run:
1. Clone the repository into a directory of your choice. Can be in a separate folder from the mobile application.
2. Navigate inside the project folder.
3. Open cmd, bash, or a similar window and type "npm install". This is necessary as node modules are not included with the program. This will take a while.
4. Once it has finished installing, type "npm start". Normally, a local server should be created and automatically open a tab on your web browser that renders the website.
5. If it doesn't automatically open, the window should give a localhost address which you can paste into a web browser. (usually localhost:3000).
6. If an error returns before the website is loaded, try creating an .env file (no text in front) in the project folder's root. This file should have the line 'SKIP_PREFLIGHT_CHECK=true' (no quotation marks). Repeating step 3 should then solve the error. (only an issue with some computers).
7. The website should normally have two fields for an email and password, which only lets you log in once correct authentication is input. If correctly authenticated, you should be able to view an interactible calendar with your specific habits.
