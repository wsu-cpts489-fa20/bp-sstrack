# Milestone 4
This week, our group focused on finishing some of the missed items from last week as well as further expand the functionality of the rounds table system. The main items for the week were linking the courses database content to the roundsForm since that had been hardcoded in, complete the local user account page with facebook integration should the user choose to link their account, and the ability to view the details of a round in a non editing format. Due to various issues, only the first item in that list was fully completed (see issues #19 and #3 for further details)

With this, the main files for review this week will be server.js for the routes associated with linking a Facebook account to a local user account and getting course  data from the database. RoundsForm.js for taking that data and putting it into <option> objects and CreateEditAccountDialog.js for being fully completed with the facebook integration button. View.js is a newly created component, however it doesn't currently display due to functionality issues so it will not be linked below

[server.js](https://github.com/wsu-cpts489-fa20/bp-sstrack/blob/master/server.js)

[RoundForm.js](https://github.com/wsu-cpts489-fa20/bp-sstrack/blob/master/client/src/components/RoundForm.js)

[CreateEditAccountDialog,js](https://github.com/wsu-cpts489-fa20/bp-sstrack/blob/master/client/src/components/CreateEditAccountDialog.js)

[Link to tests](https://drive.google.com/file/d/1BX4I4Yl8TL4sImDFXM2wrmFo5W9PDgCS/view?usp=sharing) 



# Final Speedgolf App
This code base starts with the MERN stack MVP implmentation of the speedgolf
app as it was deployed to MongoDB Atlas and AWS EB in Chapter 24. To that it adds
some key features that were included as end-of-chapter exercises:

* Ability to reset password using security question/answer
* Ability to delete a speedgolf round
* Ability to edit and delete a user account

This repo serves as the starting code for all of the CptS 489 project teams in the
Fa20 semester. It will be pushed to their repos, deployed to their instances on
AWS EB, and served through https://[proj-name].bfapp.org.

To connect the app to your MongoDB database, create a .env file in the 
project root directory. On the first line of that file, add this:
MONGO_STR=<YOUR_MONGO_CONNECTION_STRING>

You'll should also add the client ids and client secrets of each of your 
OAuth providers to the .env file. Here's an example for GitHub:
GH_CLIENT_ID='<CLIENT ID INSIDE QUOTES>'
GH_CLIENT_SECRET='<CLIENT SECRET INSIDE QUOTES>'

Make sure to add .env to your .gitignore file so that your secrets aren't
stored in your GitHub repo!

The app is presently set be served to http://localhost:8081 through the command
npm run dev. You'll need to update DEPLOY_URL in server.js for remote deployment.
