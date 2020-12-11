//////////////////////////////////////////////////////////////////////////
//IMPORTS AND VARIABLE INITIALIZATIONS
//The following code imports necessary dependencies and initializes
//variables used in the server middleware.
//////////////////////////////////////////////////////////////////////////
import passport from 'passport';
import passportGithub from 'passport-github'; 
import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth2';
import passportFacebook from 'passport-facebook';
import session from 'express-session';
import regeneratorRuntime from "regenerator-runtime";
import path from 'path';
import express from 'express';
import dotenv from 'dotenv'
require('dotenv').config();

const LOCAL_PORT = 8080;
const DEPLOY_URL = "http://localhost:8081";
const PORT = process.env.HTTP_PORT || LOCAL_PORT;
const GithubStrategy = passportGithub.Strategy;
const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const app = express();

const result = dotenv.config()

if (result.error) {
  throw result.error
}


//////////////////////////////////////////////////////////////////////////
//MONGOOSE SET-UP
//The following code sets up the app to connect to a MongoDB database
//using the mongoose library.
//////////////////////////////////////////////////////////////////////////
import mongoose from 'mongoose';

const connectStr = process.env.MONGO_STR;
mongoose.connect(connectStr, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(
    () =>  {console.log(`Connected to ${connectStr}.`)},
    err => {console.error(`Error connecting to ${connectStr}: ${err}`)}
  );

const Schema = mongoose.Schema;
const roundSchema = new Schema({
  date: {type: Date, required: true},
  course: {type: String, required: true},
  type: {type: String, required: true, enum: ['practice','tournament']},
  Wind: {
    type: String,
    required: true,
    "enum": ['Calm', 'Light', 'Moderate', 'Strong']
  },
  Weather: {
    type: String,
    required: true,
    "enum": ['Clear', 'Partly Cloudy', 'Mostly Cloudy', 'Cloudy', 'Light Rain', 'Rain', 'Heavy Rain', 'Light Snow', 'Snow', 'Heavy Snow']
  },
  player:{
    type: String,
    required: true,
    "enum": ['ab (sw)', 'Albert Park Golf Course (Melbourne, Australia)', 'Arrowhead Golf Club Blue (Molalla, OR)', 'Bing Maloney Golf Course Red (Sacramento, CA)','Bing Maloney Golf Course White (Sacramento, CA)','Blackhorse Golf Club - South Course Blue (Cypress, TX)','Blackhorse Golf Club - South Course Red (Cypress, TX)','Blackhorse Golf Club - South Course White (Cypress, TX)','Bryden Canyon Golf Course White (Lewiston, ID)','Cascata Golf Course White (Boulder City, Nevada)','Esmeralda Golf Course White (Spokane, WA, USA)','Glenoaks Golf & Country Club Mens Blue (Prospect KY)','Glenoaks Golf & Country Club Seniors White (Prospect, KY)','Glenoaks Golf & Country Club Womens Red (Prospect, KY)','Horton Smith Golf Course Blue (Springfield, MO)','Horton Smith Golf Course Red (Springfield, MO)','Horton Smith Golf Course White (Springfield, MO)','Meriwether National Golf Club White (Hillsboro, OR)','Mountain Top Golf Course Back (Hollister, MO)','Oneway Golf Club Ladies (Tsuchiura, Ibaraki, Japan)']
  },
  type: {type: String, required: true, enum: ['Practice','Tournament', 'League']},
  Fairways:{type: Number, required: true, min: 1, max: 999},
  Greens:{type: Number, required: true, min: 1, max: 999},
  putt:{type: Number, required: true, min: 1, max: 999},
  holes: {type: Number, required: true, min: 1, max: 18},
  strokes: {type: Number, required: true, min: 1, max: 300},
  minutes: {type: Number, required: true, min: 1, max: 240},
  seconds: {type: Number, required: true, min: 0, max: 60},
  notes: {type: String, required: true}
},
{
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
});

roundSchema.virtual('SGS').get(function() {
  return (this.strokes * 60) + (this.minutes * 60) + this.seconds;
});

//Define schema that maps to a document in the Users collection in the appdb
//database.
const userSchema = new Schema({
  id: String, //unique identifier for user
  password: String,
  displayName: String, //Name to be displayed within app
  authStrategy: String, //strategy used to authenticate, e.g., github, local
  profilePicURL: String, //link to profile image
  securityQuestion: String,
  securityAnswer: {type: String, required: function() 
    {return this.securityQuestion ? true: false}},
  rounds: [roundSchema],
  // adding in more user fields that are not required
  firstName: String,
  lastName: String, 
  hometown: String,  
  bday: {type: Date, required: false},
  handicap: String,  
  homeCourse: String,  
  firstRoundDate: {type: Date, required: false},
  kmin : {type: Number, required: false, min: 0, max: 400},
  ksec : {type: Number, required: false, min: 0, max: 60},
  smin : {type: Number, required: false, min: 0, max: 400},
  ssec : {type: Number, required: false, min: 0, max: 60},
  sstrokes: String, 
  //clubs: String
  c2i: Number ,
  c3i: Number,
  c4i: Number,
  c5i: Number,
  c6i: Number,
  c7i: Number,
  c8i: Number,
  c9i: Number,
  cPW: Number,
  cGW: Number,
  cSW: Number,
  cLW: Number,
  c1W: Number,
  c3W: Number,
  c4W: Number,
  c5W: Number,
  cHybrid: Number,
  cPutter: Number,
});
const User = mongoose.model("User",userSchema); 

const courseSchema = new Schema({
  ID: String,
  Name: String,
  Location: String,
  Tees: String,
  Holes: String,
  StrokePars: String,
  TimePars: String,
  GolfYardage: String,
  RunninngYardage: String,
  StrokePar: String,
  TimePar: String,
  SGPar: String,
  Type: String,
  Ownership: String,
  TotalHoles: String,
  Address: String,
  City: String,
  StateProvence: String,
  Postal: String,
  Country: String,
  Phone: String,
  Picture: String,
  Website: String,
  Contact: String
})
const Course = mongoose.model("Course", courseSchema);

//////////////////////////////////////////////////////////////////////////
//PASSPORT SET-UP
//The following code sets up the app with OAuth authentication using
//the 'github' strategy in passport.js.
//////////////////////////////////////////////////////////////////////////
passport.use(new GithubStrategy({
    clientID: process.env.GH_CLIENT_ID,
    clientSecret: process.env.GH_CLIENT_SECRET,
    callbackURL: DEPLOY_URL + "/auth/github/callback"
  },
  //The following function is called after user authenticates with github
  async (accessToken, refreshToken, profile, done) => {
    console.log("User authenticated through GitHub! In passport callback.");
    //console.log(accessToken);
    //console.log(refreshToken);
    //Our convention is to build userId from displayName and provider
    const userId = `${profile.username}@${profile.provider}`;
    //See if document with this unique userId exists in database 
    let currentUser = await User.findOne({id: userId});
    if (!currentUser) { //Add this user to the database
        currentUser = await new User({
        id: userId,
        displayName: profile.displayName,
        authStrategy: profile.provider,
        profilePicURL: profile.photos[0].value,
        rounds: []
      }).save();
  }
  return done(null,currentUser);
}));

passport.use(new GoogleStrategy ({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: DEPLOY_URL + "/auth/google/callback"
},
  //The following function is called after user authenticates with github
  async (accessToken, refreshToken, profile, done) => {
    console.log("User authenticated through Google! In passport callback.");
    //console.log(accessToken);
    //console.log(profile)
    //Our convention is to build userId from displayName and provider
    const userId = `${profile.given_name}_${profile.family_name}@${profile.provider}`;
    //See if document with this unique userId exists in database 
    let currentUser = await User.findOne({id: userId});
    if (!currentUser) { //Add this user to the database
        currentUser = await new User({
        id: userId,
        displayName: profile.displayName,
        authStrategy: profile.provider,
        profilePicURL: profile.photos[0].value,
        rounds: []
      }).save();
  }
  return done(null,currentUser);
}));


passport.use(new FacebookStrategy ({
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL: DEPLOY_URL + "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
  //The following function is called after user authenticates with github
  async (accessToken, refreshToken, profile, done) => {
    console.log("User authenticated through Facebook! In passport callback.");
    //console.log(profile);
    //console.log(accessToken);
    const email = `${profile._json.email}`
    const emailId = email.split('@')
    //Our convention is to build userId from displayName and provider
    const userId = `${emailId[0]}@${profile.provider}`;
    //See if document with this unique userId exists in database 
    let currentUser = await User.findOne({id: userId});
    if (!currentUser) { //Add this user to the database
        currentUser = await new User({
        id: userId,
        displayName: profile.displayName,
        authStrategy: profile.provider,
        profilePicURL: profile.photos[0].value,
        rounds: []
      }).save();
  }
  return done(null,currentUser);
}));


passport.use(new LocalStrategy({passReqToCallback: true},
  //Called when user is attempting to log in with local username and password. 
  //userId contains the email address entered into the form and password
  //contains the password entered into the form.
  async (req, userId, password, done) => {
    let thisUser;
    try {
      thisUser = await User.findOne({id: userId});
      if (thisUser) {
        if (thisUser.password === password) {
          return done(null, thisUser);
        } else {
          req.authError = "The password is incorrect. Please try again" + 
                           " or reset your password.";
          return done(null, false)
        }
      } else { //userId not found in DB
        req.authError = "There is no account with email " + userId + 
                        ". Please try again.";
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  }
));

//Serialize the current user to the session
passport.serializeUser((user, done) => {
    console.log("In serializeUser.");
    console.log("Contents of user param: " + JSON.stringify(user));
    done(null,user.id);
});
  
//Deserialize the current user from the session
//to persistent storage.
passport.deserializeUser(async (userId, done) => {
  console.log("In deserializeUser.");
  console.log("Contents of userId param: " + userId);
  let thisUser;
  try {
    thisUser = await User.findOne({id: userId});
    console.log("User with id " + userId + 
      " found in DB. User object will be available in server routes as req.user.")
    done(null,thisUser);
  } catch (err) {
    done(err);
  }
});

//////////////////////////////////////////////////////////////////////////
//INITIALIZE EXPRESS APP
// The following code uses express.static to serve the React app defined 
//in the client/ directory at PORT. It also writes an express session
//to a cookie, and initializes a passport object to support OAuth.
/////////////////////////////////////////////////////////////////////////
app
  .use(session({secret: "speedgolf", 
                resave: false,
                saveUninitialized: false,
                cookie: {maxAge: 1000 * 60 * 60}}))
  .use(express.static(path.join(__dirname,"client/build")))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.json({limit: '20mb'}))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

//////////////////////////////////////////////////////////////////////////
//DEFINE EXPRESS APP ROUTES
//////////////////////////////////////////////////////////////////////////

/////////////////////////
//AUTHENTICATION ROUTES
/////////////////////////

//AUTHENTICATE route: Uses passport to authenticate with GitHub.
//Should be accessed when user clicks on 'Login with GitHub' button on 
//Log In page.
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));

app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

app.get('/link/facebook', passport.authenticate('facebook', {scope: ['email']}));
//CALLBACK route:  GitHub will call this route after the
//OAuth authentication process is complete.
//req.isAuthenticated() tells us whether authentication was successful.
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    console.log("auth/github/callback reached.")
    res.redirect('/'); //sends user back to login screen; 
                       //req.isAuthenticated() indicates status
  }
);

app.get('/auth/google/callback', passport.authenticate('google', { scope: ['profile'], failureRedirect: '/'}),
  (req,res) => {
    console.log("auth/google/callback reached.");
    res.redirect('/');
  });

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/'}),
  (req,res) => {
    console.log("auth/facebook/callback reached.");
    res.redirect('/');
  });

  app.get('/link/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/'}),
  (req,res) => {
    console.log("auth/facebook/callback reached.");
    res.redirect('/');
  });
//LOGOUT route: Use passport's req.logout() method to log the user out and
//redirect the user to the main app page. req.isAuthenticated() is toggled to false.
app.get('/auth/logout', (req, res) => {
    console.log('/auth/logout reached. Logging out');
    req.logout();
    res.redirect('/');
});

//TEST route: Tests whether user was successfully authenticated.
//Should be called from the React.js client to set up app state.
app.get('/auth/test', (req, res) => {
    console.log("auth/test reached.");
    const isAuth = req.isAuthenticated();
    if (isAuth) {
        console.log("User is authenticated");
        console.log("User record tied to session: " + JSON.stringify(req.user));
    } else {
        //User is not authenticated
        console.log("User is not authenticated");
    }
    //Return JSON object to client with results.
    res.json({isAuthenticated: isAuth, user: req.user});
});

//LOGIN route: Attempts to log in user using local strategy
app.post('/auth/login', 
  passport.authenticate('local', { failWithError: true }),
  (req, res) => {
    console.log("/login route reached: successful authentication.");
    //Redirect to app's main page; the /auth/test route should return true
    res.status(200).send("Login successful");
  },
  (err, req, res, next) => {
    console.log("/login route reached: unsuccessful authentication");
    if (req.authError) {
      console.log("req.authError: " + req.authError);
      res.status(401).send(req.authError);
    } else {
      res.status(401).send("Unexpected error occurred when attempting to authenticate. Please try again.");
    }
    //Note: Do NOT redirect! Client will take over.
  });

/////////////////////////////////
//USER ACCOUNT MANAGEMENT ROUTES
////////////////////////////////


//READ user route: Retrieves the user with the specified userId from users collection (GET)
app.get('/users/:userId', async(req, res, next) => {
  console.log("in /users route (GET) with userId = " + 
    JSON.stringify(req.params.userId));
  try {
    let thisUser = await User.findOne({id: req.params.userId});
    if (!thisUser) {
      return res.status(404).send("No user account with id " +
        req.params.userId + " was found in database.");
    } else {
      return res.status(200).json(JSON.stringify(thisUser));
    }
  } catch (err) {
    console.log()
    return res.status(400).send("Unexpected error occurred when looking up user with id " +
      req.params.userId + " in database: " + err);
  }
});

//CREATE user route: Adds a new user account to the users collection (POST)
app.post('/users/:userId',  async (req, res, next) => {
  console.log("in /users route (POST) with params = " + JSON.stringify(req.params) +
    " and body = " + JSON.stringify(req.body));  
  if (req.body === undefined ||
      !req.body.hasOwnProperty("password") || 
      !req.body.hasOwnProperty("displayName") ||
      !req.body.hasOwnProperty("profilePicURL") ||
      !req.body.hasOwnProperty("securityQuestion") ||
      !req.body.hasOwnProperty("securityAnswer")) {
    //Body does not contain correct properties
    return res.status(400).send("/users POST request formulated incorrectly. " + 
      "It must contain 'password','displayName','profilePicURL','securityQuestion' and 'securityAnswer fields in message body.")
  }
  try {
    console.log("looking for this user")
    let thisUser = await User.findOne({id: req.params.userId});
    console.log("grabed this user")
    if (thisUser) { //account already exists
      res.status(400).send("There is already an account with email '" + 
        req.params.userId + "'.");
    } else { //account available -- add to database
      thisUser = await new User({
        id: req.params.userId,
        password: req.body.password,
        displayName: req.body.displayName,
        authStrategy: 'local',
        profilePicURL: req.body.profilePicURL,
        securityQuestion: req.body.securityQuestion,
        securityAnswer: req.body.securityAnswer,
        rounds: [],
        // adding in more user fields that are not required
        firstName: "",
        lastName: "", 
        hometown: "",  
        bday: new Date(0),
        handicap: "",  
        homeCourse: "",  
        firstRoundDate: new Date(0),
        kmin : 0,
        ksec : 0,
        smin : 0,
        ssec : 0,
        sstrokes: "18", 
        c2i: 0 ,
        c3i: 0,
        c4i: 0,
        c5i: 0,
        c6i: 0,
        c7i: 0,
        c8i: 0,
        c9i: 0,
        cPW: 0,
        cGW: 0,
        cSW: 0,
        cLW: 0,
        c1W: 0,
        c3W: 0,
        c4W: 0,
        c5W: 0,
        cHybrid: 0,
        cPutter: 0,
      }).save();
      return res.status(201).send("New account for '" + 
        req.params.userId + "' successfully created.");
    }
  } catch (err) {
    return res.status(400).send("Unexpected error occurred when adding or looking up user in database. " + err);
  }
});

//UPDATE user route: Updates a new user account in the users collection (POST)
app.put('/users/:userId',  async (req, res, next) => {
  console.log("in /users update route (PUT) with userId = " + JSON.stringify(req.params) + 
    " and body = " + JSON.stringify(req.body));
  if (!req.params.hasOwnProperty("userId"))  {
    return res.status(400).send("users/ PUT request formulated incorrectly." +
        "It must contain 'userId' as parameter.");
  }
  const validProps = ['password', 'displayName', 'profilePicURL', 
    'securityQuestion', 'securityAnswer', 'firstName', 'lastName', 
    'hometown', 'bday','handicap', 'homeCourse', 'firstRoundDate',
    'kmin', 'ksec','smin','ssec','sstrokes', 'c2i','c3i','c4i','c5i',
    'c6i','c7i','c8i','c9i','cPW','cGW','cSW','cLW','c1W','c3W','c4W',
    'c5W','cHybrid','cPutter',];
    
  for (const bodyProp in req.body) {
    if (!validProps.includes(bodyProp)) {
      return res.status(400).send("users/ PUT request formulated incorrectly." +
        "Only the following props are allowed in body: " +
        "'password', 'displayname', 'profilePicURL', 'securityQuestion', 'securityAnswer'");
    } 
  }
  try {
        let status = await User.updateOne({id: req.params.userId}, 
          {$set: req.body});
        if (status.nModified != 1) { //account could not be found
          res.status(404).send("No user account " + req.params.userId + " exists. Account could not be updated.");
        } else {
          res.status(200).send("User account " + req.params.userId + " successfully updated.")
        }
      } catch (err) {
        res.status(400).send("Unexpected error occurred when updating user data in database: " + err);
      }
});

//DELETE user route: Deletes the document with the specified userId from users collection (DELETE)
app.delete('/users/:userId', async(req, res, next) => {
  console.log("in /users route (DELETE) with userId = " + 
    JSON.stringify(req.params.userId));
  try {
    let status = await User.deleteOne({id: req.params.userId});
    if (status.deletedCount != 1) {
      return res.status(404).send("No user account " +
        req.params.userId + " was found. Account could not be deleted.");
    } else {
      return res.status(200).send("User account " +
      req.params.userId + " was successfully deleted.");
    }
  } catch (err) {
    console.log()
    return res.status(400).send("Unexpected error occurred when attempting to delete user account with id " +
      req.params.userId + ": " + err);
  }
});

/////////////////////////////////
//COURSES ROUTES
/////////////////////////////////

app.get('/courses', async(req, res) => {
  console.log("in /courses (GET) route");
  try{
    var coursesList = [];
    //console.log("Inside Try block");
    var array = await Course.find({});
    //console.log("Inside Try block");
    //console.log(array);
    array.forEach(function (item,index) {
      let element = {id: item.ID,
                     name: item.Name};
      coursesList.push(element);
    })
    //console.log(coursesList);

    return res.status(200).json({coursesList});
  }
  catch (err){
    console.log();
    return res.status(400).message("Unexpected Error when getting course data " + err);
  }
})


/////////////////////////////////
//ROUNDS ROUTES
////////////////////////////////

//CREATE round route: Adds a new round as a subdocument to 
//a document in the users collection (POST)
app.post('/rounds/:userId', async (req, res, next) => {
  console.log("in /rounds (POST) route with params = " + 
              JSON.stringify(req.params) + " and body = " + 
              JSON.stringify(req.body));
  if (!req.body.hasOwnProperty("date") || 
      !req.body.hasOwnProperty("Wind")|| 
      !req.body.hasOwnProperty("Weather")||
      !req.body.hasOwnProperty("player")|| 
      !req.body.hasOwnProperty("type") ||
      !req.body.hasOwnProperty("Fairways") ||
      !req.body.hasOwnProperty("Greens") || 
      !req.body.hasOwnProperty("putt") ||
      !req.body.hasOwnProperty("holes") || 
      !req.body.hasOwnProperty("strokes") ||
      !req.body.hasOwnProperty("minutes") ||
      !req.body.hasOwnProperty("seconds") || 
      !req.body.hasOwnProperty("notes")) {
    //Body does not contain correct properties
    return res.status(400).send("POST request on /rounds formulated incorrectly." +
      "Body must contain all 8 required fields: date,player, Wind,Weather, type,Fairways, Greens,putt, holes, strokes, "       +  "minutes, seconds, notes.");
  }
  try {
    let status = await User.updateOne(
    {id: req.params.userId},
    {$push: {rounds: req.body}});
    if (status.nModified != 1) { //Should never happen!
      res.status(400).send("Unexpected error occurred when adding round to"+
        " database. Round was not added.");
    } else {
      res.status(200).send("Round successfully added to database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unexpected error occurred when adding round" +
     " to database: " + err);
  } 
});

//READ round route: Returns all rounds associated 
//with a given user in the users collection (GET)
app.get('/rounds/:userId', async(req, res) => {
  console.log("in /rounds route (GET) with userId = " + 
    JSON.stringify(req.params.userId));
  try {
    let thisUser = await User.findOne({id: req.params.userId});
    if (!thisUser) {
      return res.status(400).message("No user account with specified userId was found in database.");
    } else {
      return res.status(200).json(JSON.stringify(thisUser.rounds));
    }
  } catch (err) {
    console.log()
    return res.status(400).message("Unexpected error occurred when looking up user in database: " + err);
  }
});

//UPDATE round route: Updates a specific round 
//for a given user in the users collection (PUT)
app.put('/rounds/:userId/:roundId', async (req, res, next) => {
  console.log("in /rounds (PUT) route with params = " + 
              JSON.stringify(req.params) + " and body = " + 
              JSON.stringify(req.body));
  const validProps = ['date','player','Wind','Weather', 'type','Fairways', 'Greens', 'putt','holes', 'strokes',
    'minutes', 'seconds', 'notes'];
  let bodyObj = {...req.body};
  delete bodyObj._id; //Not needed for update
  delete bodyObj.SGS; //We'll compute this below in seconds.
  for (const bodyProp in bodyObj) {
    if (!validProps.includes(bodyProp)) {
      return res.status(400).send("rounds/ PUT request formulated incorrectly." +
        "It includes " + bodyProp + ". However, only the following props are allowed: " +
        "'date', 'player','Wind','Weather', 'type', 'Fairways', 'Greens','putt','holes', 'strokes', " +
        "'minutes', 'seconds', 'notes'");
    } else {
      bodyObj["rounds.$." + bodyProp] = bodyObj[bodyProp];
      delete bodyObj[bodyProp];
    }
  }
  try {
    let status = await User.updateOne(
      {"id": req.params.userId,
       "rounds._id": mongoose.Types.ObjectId(req.params.roundId)}
      ,{"$set" : bodyObj}
    );
    if (status.nModified != 1) {
      res.status(400).send("Unexpected error occurred when updating round in database. Round was not updated.");
    } else {
      res.status(200).send("Round successfully updated in database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unexpected error occurred when updating round in database: " + err);
  } 
});

//DELETE round route: Deletes a specific round 
//for a given user in the users collection (DELETE)
app.delete('/rounds/:userId/:roundId', async (req, res, next) => {
  console.log("in /rounds (DELETE) route with params = " + 
              JSON.stringify(req.params)); 
  try {
    let status = await User.updateOne(
      {id: req.params.userId},
      {$pull: {rounds: {_id: mongoose.Types.ObjectId(req.params.roundId)}}});
    if (status.nModified != 1) { //Should never happen!
      res.status(400).send("Unexpected error occurred when deleting round from database. Round was not deleted.");
    } else {
      res.status(200).send("Round successfully deleted from database.");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unexpected error occurred when deleting round from database: " + err);
  } 
});

