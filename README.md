# Milestone 3
For this week, we focused on expanding the core systems of the base app. The systems this week were the user account information and the logging a new round form. For the most part, we were able to get most of the features for each of these systems expanded to where it coincided with the requirements document. Some more advanced features were not able to be done this week due to the added stress of having to meet with Dr. H to remove some inactive members, the whole situation hasn't been great for group morale, but at least we're making progress again.

Files modified: [CreateEditAccountDialog](https://github.com/wsu-cpts489-fa20/bp-sstrack/blob/master/client/src/components/CreateEditAccountDialog.js)
[RoundForm](https://github.com/wsu-cpts489-fa20/bp-sstrack/blob/master/client/src/components/RoundForm.js)

The rounds form was the most modified one, but to have that save properly the other rounds documents were also modified.


Link to tests: https://streamable.com/kbix25




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
