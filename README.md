# Northwestern Student Holdings Site
This is a website we built for Northwestern Student Holdings! We're continuously updating the site to support the needs of the organization. We use Node.js and Express for the server and a ton of interesting, handwritten code for the visual/design features. We like to experiment with plugins as well.

Check out the site here! http://northwesternstudentholdings.com/

###Setting Up The Project
First, clone this project to your computer using `git clone https://github.com/nshtech/NSHSiteServer.git` from the Terminal, or by using the "Clone to Desktop" button.

This project uses Node.js. In order to run the site locally, you will first need to [install Node.js](https://nodejs.org/en/download/package-manager/). Mac users are suggested to install Node with [Homebrew](http://brew.sh/).

Once Node is installed, you should be able to use Node Package Manager (npm). This project requires a few packages to run. To install the necessary packages, open a Terminal window and `cd` to the project directory. Then, run `npm install`. This command will automatically install all of the dependencies, since they are listed in packages.json.

After this, you should be ready to run the code. Remain in the top-level directory for the project and run `node server.js` from the terminal. A message should appear noting that the site is being served to http://localhost:3000/. Open this page, and you should see a local version of the site running.

###Editing The NSH Team Page

The important code for editing the [NSH Team](http://northwesternstudentholdings.com/team) page can be found in `team.json`, `team.hbs`, and `_content/team`.

#####Editing Team Members And Positions
In order to edit membership for each team, simply opn the `team.json` file and add/edit the names or positions of each person in the JSON. Don't forget to make sure that the JSON is formatted correctly using something like [JSON Formatter](https://jsonformatter.curiousconcept.com/). If the JSON is invalid, the page will not render correctly.

If you're adding or changing someone's profile image, navigate to the `_content/team` folder and add their image. The image must utilize this naming convention exactly: `<firstname>-<lastname>.jpg, where the first and last name match the name listed in `team.json` (casing doesn't matter).

After addiing an image, run the `resize.sh` script which can be found in the `_content/team` directory. This script ensures that each image has the correct resolution. You will need to `brew install imagemagick` and then use something like `bash resize.sh` to start the script. Git will show all of the photos as edited, but don't worry about that.

#####Adding or Removing A Team
In order to add a team, add a block of JSON to `team.json` containing the team name and its membership. Afterwards, make sure to go to `team.hbs` and edit the links in the `groups-btn-group-row-container` section. The `id`s for these links should be the lowercase first word in the team name (as listed in the JSON file). You can fill the link text with whatever you like, such as the team name or an abbreviation.

###How to make change to header and footer for NSH website

Follow these steps closely -

These two files - header.hbs and footer.hbs - are stored under /partials folder. Any change made to these two files are automatically updated across all pages for NSH website.

They are called by each page via the {{> header }} or {{> footer }} command.

Once any change is made to these two files, use standard procedure ot first update the github repo https://github.com/nshtech/NSHSiteServer.git. Then ssh on to the server and pull from the repo. Make sure the versions are consistent across your local computer, github repo and server.

Partials are loaded when the server begin and changes will not be reflected until the server.js file run again. This can be seen from this line from server.js file - hbs.registerPartials(__dirname + '/partials')

We use Forever.js to run the server.js file on our Webfaction server. To restart the server, you can just ‘cd’ into the ‘webapps/nsh_node_website’ directory, run ‘forever stopall’ to stop the current instance of the running server (the website will go down at this point by the way), and then start it again with `forever start server.js`.

Changes made to header and footer will be visible once the server restarts.
