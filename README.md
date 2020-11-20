# Milestone 2 Readme

This week, we focused on bringing everything up to speed due to the technical issues we had last week. We currently have updated the login system with oauth logins and fixed the cookie duration associated with logging in. The files associated with these changes are LoginPage.js and server.js.
Other features that were supposed to be worked on (but no changes were pushed to the repository) included expanding the user account settings, expanding the information entered when entering a new round, and being able to sort listed rounds in a variety of ways. Due to the lack of communication and code present for these changes, I cannot give any updates related to how they progressed this milestone.

Link to tests recording for this week: https://streamable.com/m2rfcw


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