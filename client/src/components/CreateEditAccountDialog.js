import React from 'react';
import ConfirmDeleteAccount from './ConfirmDeleteAccount.js';

class CreateEditAccountDialog extends React.Component {

    constructor(props) {
        super(props);
        this.origAccountInfo = null;
        //Create a ref for the email input DOM element
        this.newUserRef = React.createRef();
        this.repeatPassRef = React.createRef();
        this.profilePicRef = React.createRef();
        //Create date object for today for filing in the date
        let today = new Date(Date.now()-(new Date()).getTimezoneOffset()*60000);
        this.state = {accountName: "",
                      displayName: "",
                      profilePicURL: "https://icon-library.net//images/default-profile-icon/default-profile-icon-24.jpg",
                      password: "",
                      passwordRepeat: "",
                      securityQuestion: "",
                      securityAnswer: "",
                      firstName: "",
                      lastName: "",
                      hometown: "",
                      bday: today.toISOString().substr(0,10),
                      handicap: "",
                      homeCourse: "",
                      firstRoundDate: today.toISOString().substr(0,10),
                      kmin: 0,
                      ksec: 0,
                      smin: 0,
                      ssec: 0,
                      sstrokes: "18",
                      // clubs storage
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
                      formUpdated: false,
                      confirmDelete: false};
    } 

    //componentDidMount -- If we are editing an existing user acccount, we need to grab the data from
    //the database and push them into the state.
    async componentDidMount() {
        if (!this.props.create) {
            //obtain current user data from database and push into state
            const url = "/users/" + this.props.userId;
            const res = await fetch(url);
            const json = await res.json();
            const userData = JSON.parse(json);
            this.origAccountInfo = userData; //This determines whether update can occur
            this.origAccountInfo.passwordRepeat = userData.password;
            this.setState({accountName: this.props.userId,
                           displayName: userData.displayName,
                           profilePicURL: userData.profilePicURL,
                           password: userData.password,
                           passwordRepeat: userData.password,
                           securityQuestion: userData.securityQuestion,
                           securityAnswer: userData.securityAnswer,
                           firstName: userData.firstName,
                           lastName: userData.lastName,
                           hometown: userData.hometown,
                           bday: userData.bday.substr(0,10),
                           handicap: userData.handicap,
                           homeCourse: userData.homeCourse,
                           firstRoundDate: userData.firstRoundDate.substr(0,10),
                           kmin: userData.kmin,
                           ksec: userData.ksec,
                           smin: userData.smin,
                           ssec: userData.ssec,
                           sstrokes: userData.sstrokes,
                           c2i: userData.c2i ,
                           c3i: userData.c3i,
                           c4i: userData.c4i,
                           c5i: userData.c5i,
                           c6i: userData.c6i,
                           c7i: userData.c7i,
                           c8i: userData.c8i,
                           c9i: userData.c9i,
                           cPW: userData.cPW,
                           cGW: userData.cGW,
                           cSW: userData.cSW,
                           cLW: userData.cLW,
                           c1W: userData.c1W,
                           c3W: userData.c3W,
                           c4W: userData.c4W,
                           c5W: userData.c5W,
                           cHybrid: userData.cHybrid,
                           cPutter: userData.cPutter,
                        });
        }
    }

    //checkDataValidity -- Callback function invoked after a form element in
    //the 'Create Account' dialog box changes and component state has been
    //updated. We first check whether the passwords match. If they do not, 
    //we set a custom validity message to be displayed when the user clicks the
    //'Create Account' button. Otherwise, we reset the custom validity message
    //to empty so that it will NOT fire when the user clicks 'Create Account'.
    //Second, we check whether anything in the form changed from the original.
    //If so, we update the 'formUpdated' state var, so that the form's submit
    //button is enabled.
    checkDataValidity = () => {
        if (this.state.password != this.state.passwordRepeat) {
            //Passwords don't match
            this.repeatPassRef.current.setCustomValidity(
            "This password must match password entered in previous field.");
        } else {
            this.repeatPassRef.current.setCustomValidity("");
        }
    }

    //handleChange--Called when a field in a dialog box form changes.
    handleChange = (event) => {
        const formUpdated = (this.origAccountInfo == null ? true : this.formIsUpdated(event.target.name,event.target.value));

        if (event.target.name === "profilePic") {
            if (event.target.value.length == 0) { //The user canceled the file selection -- set back to default
                this.setState({profilePicURL: "https://icon-library.net//images/default-profile-icon/default-profile-icon-24.jpg",
                               formUpdated: formUpdated},
                               this.checkDataValidity);
            } else { //The user selected a file
                const self = this;
                const reader = new FileReader();
                reader.readAsDataURL(this.profilePicRef.current.files[0]);
                reader.addEventListener("load",function() {
                    self.setState({profilePicURL:  this.result,
                                   formUpdated: formUpdated},this.checkDataValidity);
                });
                
            }
        } else {
            this.setState({[event.target.name]: event.target.value,
                           formUpdated: formUpdated},this.checkDataValidity);
        }

        
    }
    
    getVal = (name) => {
        return this.state
    }

    //formisUpdated-- Checks whether any form data element has changed from the original. If so, 
    //returns true. Returns false otherwise. Note that in case of editing new account, always returns
    //true since this.origAccountInfo is set to null.
    //Should be called whenever the user makes a change to form data.
    formIsUpdated = (updateField,updateVal) => {
        if (this.origAccountInfo[updateField] != updateVal) {return true;}
        if (updateField != "displayName" && 
             this.state.displayName != this.origAccountInfo.displayName) 
             {return true;}
        if (updateField != "profilePicURL" && 
             this.state.profilePicURL != this.origAccountInfo.profilePicURL) 
             {return true;}
        if (updateField != "password" &&
            this.state.password !== this.origAccountInfo.password)
            {return true;}
        if (updateField != "passwordRepeat" &&
            this.state.passwordRepeat !== this.origAccountInfo.passwordRepeat)
            {return true;}
        if (updateField != "securityQuestion" &&
            this.state.securityQuestion !== this.origAccountInfo.securityQuestion)
            {return true;}
        if (updateField != "securityAnswer" &&
            this.state.securityAnswer !== this.origAccountInfo.securityAnswer)
            {return true;}
        return false;
    }

    //setDefaultDisplayName -- Triggered by onBlur() event of Email field.
    //Sets default value of display name to value entered into Email field 
    //as a courtesy.
    setDefaultDisplayName = (event) => {
      if (event.target.value.length > 0 && this.state.displayName === "") {
        this.setState({displayName: event.target.value});
      }
    }

    //handleSubmit -- Triggered when user clicks on submit button to
    //either create or edit account.
    //Custom data checking ensures user account under this email does not 
    //already exist and that the rest of the info is valid. We create a new  
    // object for user, save it to localStorage and take user to app's 
    //landing page. 
    handleSubmit = async(event) => {
        event.preventDefault();
        //Initialize user account
        let userData = {
            displayName: this.state.displayName,
            password: this.state.password,
            profilePicURL: this.state.profilePicURL,
            securityQuestion: this.state.securityQuestion,
            securityAnswer: this.state.securityAnswer,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            hometown: this.state.hometown,
            bday: this.state.bday,
            handicap: this.state.handicap,
            homeCourse: this.state.homeCourse,
            firstRoundDate: this.state.firstRoundDate,
            kmin: this.state.kmin,
            ksec: this.state.ksec,
            smin: this.state.smin,
            ssec: this.state.ssec,
            sstrokes: this.state.sstrokes,
            c2i: this.state.c2i ,
            c3i: this.state.c3i,
            c4i: this.state.c4i,
            c5i: this.state.c5i,
            c6i: this.state.c6i,
            c7i: this.state.c7i,
            c8i: this.state.c8i,
            c9i: this.state.c9i,
            cPW: this.state.cPW,
            cGW: this.state.cGW,
            cSW: this.state.cSW,
            cLW: this.state.cLW,
            c1W: this.state.c1W,
            c3W: this.state.c3W,
            c4W: this.state.c4W,
            c5W: this.state.c5W,
            cHybrid: this.state.cHybrid,
            cPutter: this.state.cPutter,
        };
                      
        const url = '/users/' + this.state.accountName;
        let res;
        if (this.props.create) { //use POST route to create new user account
            res = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                method: 'POST',
                body: JSON.stringify(userData)}); 
            if (res.status == 200) { //successful account creation!
                this.props.done("New account created! Enter credentials to log in.",false);
            } else { //Unsuccessful account creation
                //Grab textual error message
                const resText = await res.text();
                this.props.done(resText,false);
            }

        } else if(this.props.handleOAuthLoginClick) {
            this.props.handleOAuthLoginClick("facebook");

        } else { //use PUT route to update existing user account
            res = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                method: 'PUT',
                body: JSON.stringify(userData)}); 
            if (res.status == 200) { //successful account creation!
                this.props.done("User Account Updated!",false);
            } else { //Unsuccessful account update
                //Grab textual error message
                const resText = await res.text();
                this.props.done(resText,false);
            }
        }
    }

    //deleteAccount -- Called after confirms account deletion. 
    //Uses DELETE server route to perform server deletion. 
    //Calls on done with status message and
    //true if delete was succesful, false otherwise.
    deleteAccount = async() => {
       const url = '/users/' + this.state.accountName;
       const res = await fetch(url, 
                    {method: 'DELETE'}); 
        if (res.status == 200) { //successful account deletion!
            this.props.done("Account '" + this.state.accountName + "' has been deleted.",true);
        } else { //Unsuccessful account deletion
            //Grab textual error message
            const resText = await res.text();
            this.props.done(resText,false);
        }
        this.setState({confirmDelete: false});
    }

    //confirmDeleteAccount -- Called when user clicks on "Delete Account..."
    //button to indicate intention to delete account. Presents the Confirm
    //Delete dialog box.
    confirmDeleteAccount = (e) => {
        e.preventDefault();
        this.setState({confirmDelete: true});
    }

    render() {
    return (  
    <div className="modal" role="dialog">
    <div className="modal-dialog modal-lg"></div>
        <div className="modal-content form-center">
            <div className="modal-header">
              <h3><b>{this.props.create ? "Create New Account" : "Edit Account"}</b></h3>
              <button className="modal-close" 
                       onClick={this.props.cancel}>
                &times;</button>
            </div>
            <div className="modal-body">
            <form onSubmit={this.handleSubmit}>
            <label>
                Email: 
                <input  
                id="email"
                autocomplete="off"
                disabled={!this.props.create}
                className="form-control form-text form-center"
                name="accountName"
                type="email"
                size="35"
                placeholder="Enter Email Address"
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                required={true}
                ref={this.newUserRef}
                value={this.state.accountName}
                onChange={this.handleChange}
                onBlur={this.setDefaultDisplayName}
                />
            </label>
            <br/>
            <label>
                Password:
                <input
                autocomplete="off"
                id="password"
                className="form-control form-text form-center"
                name="password"
                type="password"
                size="35"
                placeholder="Enter Password"
                pattern=
                "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                required={true}
                value={this.state.password}
                onChange={this.handleChange}
                />
            </label>
            <br/>
            <label>
                Repeat Password:
                <input
                id="passwordR"
                className="form-control form-text form-center"
                name="passwordRepeat"
                type="password"
                size="35"
                placeholder="Repeat Password"
                required={true}
                ref={this.repeatPassRef}
                value={this.state.passwordRepeat}
                onChange={this.handleChange}
                />
            </label>
            <br/>
            <label>
                Display Name:
                <input
                id="displayName"
                className="form-control form-text form-center"
                name="displayName"
                type="text"
                size="30"
                placeholder="Display Name"
                required={true}
                value={this.state.displayName}
                onChange={this.handleChange}
                />
            </label>
            <br/>
            <label>
                Profile Picture:<br/>
                <input
                className="form-control form-text form-center"
                name="profilePic"
                type="file"
                accept="image/x-png,image/gif,image/jpeg" 
                ref={this.profilePicRef}
                value={this.state.profilePic}
                onChange={this.handleChange}
                />
                <img src={this.state.profilePicURL != "" ? 
                            this.state.profilePicURL :
                            this.state.profilePicDataURL} 
                        height="60" width="60" 
                 />
            </label> 
            <br/>
            <label>
                Security Question:
                <textarea
                id="securityQ"
                className="form-control form-text form-center"
                name="securityQuestion"
                size="35"
                placeholder="Security Question"
                rows="2"
                cols="35"
                maxLength="100"
                required={true}
                value={this.state.securityQuestion}
                onChange={this.handleChange}
                />
            </label>
            <br/>
            <label>
                Answer to Security Question:
                <textarea
                id="securityQAnswer"
                className="form-control form-text form-center"
                name="securityAnswer"
                type="text"
                placeholder="Answer"
                rows="2"
                cols="35"
                maxLength="100"
                required={true}
                value={this.state.securityAnswer}
                onChange={this.handleChange}
                />
            </label>
            <br/>
            {this.props.create ? null :
            <div>
             <label id="firstNameBox">
                 First Name:
                 <textarea
                 id="firstName"
                 className="form-control form-text form-center"
                 name="firstName"
                 type="text"
                 placeholder="First Name"
                 rows="2"
                 cols="35"
                 maxLength="30"
                 required={false}
                 value={this.state.firstName}
                 onChange={this.handleChange}
                 />
             </label>
             <br></br>
             <label id="lastNameBox">
                 Last Name:
                 <textarea
                 id="lastName"
                 className="form-control form-text form-center"
                 name="lastName"
                 type="text"
                 placeholder="Last Name"
                 rows="2"
                 cols="35"
                 maxLength="30"
                 required={false}
                 value={this.state.lastName}
                 onChange={this.handleChange}
                 />
             </label>
             <br></br>
             <label id="hometownBox">
                 Hometown:
                 <textarea
                 id="hometown"
                 className="form-control form-text form-center"
                 name="hometown"
                 type="text"
                 placeholder="Seattle"
                 rows="2"
                 cols="35"
                 maxLength="30"
                 required={false}
                 value={this.state.hometown}
                 onChange={this.handleChange}
                 />
             </label>
             <br></br>
             <label id="birthdayBox">
                 Birthday:
                 <input
                 id="bday"
                 className="form-control form-text form-center"
                 name="bday"
                 type="date"
                 required={false}
                 value={this.state.bday}
                 onChange={this.handleChange}
                 />
             </label>
             <br></br>
             <label id="handicapBox">
                 Golf Handicap:
                 <textarea
                 id="handicap"
                 className="form-control form-text form-center"
                 name="handicap"
                 type="text"
                 placeholder="Handicap requirments"
                 rows="2"
                 cols="35"
                 maxLength="60"
                 required={false}
                 value={this.state.handicap}
                 onChange={this.handleChange}
                 />
             </label>
             <br></br>
             <button type="button" className="btn btn-facebook" 
                onClick={this.props.handleOAuthLoginClick}>
                <span id="facebookBtn" className="fa fa-facebook"></span>&nbsp;
                    Link Account with Facebook
            </button>
            <br></br>
             <label id="firstRoundBox">
                 First Speedgolf Round:
                 <input
                 id="firstRoundDate"
                 className="form-control form-text form-center"
                 name="firstRoundDate"
                 type="date"
                 required={false}
                 value={this.state.firstRoundDate}
                 onChange={this.handleChange}
                 />
             </label>
             <br></br>
             <label id="homeCourseBox">
                 Home Course:
                 <textarea
                 id="homeCourse"
                 className="form-control form-text form-center"
                 name="homeCourse"
                 type="text"
                 placeholder="Seattle's Speedgolf"
                 rows="2"
                 cols="35"
                 maxLength="30"
                 required={false}
                 value={this.state.homeCourse}
                 onChange={this.handleChange}
                 />
             </label>
             <br></br>
             <label id="best5kBox">
                Best 5km:
                <br></br>
                <input name="kmin" type="number" size="3"
                min="0" max="400" value={this.state.kmin}
                onChange={this.handleChange} />:  
                <input name="ksec" type="number" size="2"
                min="0" max="60" value={this.state.ksec} 
                onChange={this.handleChange} /> 
            </label>
             <br></br>
             <label id="statsBox">
                Best Speedgolf Stats:
                <br></br>
                Strokes:
                <br></br>
                <input name="sstrokes" className="form-center" type="text" size="6" 
                disabled={true} value={this.state.sstrokes} />
                <br></br>
                Time:
                <br></br>
                <input name="smin" type="number" size="3"
                min="0" max="400" value={this.state.smin}
                onChange={this.handleChange} />:  
                <input name="ssec" type="number" size="2"
                min="0" max="60" value={this.state.ssec} 
                onChange={this.handleChange} /> 
            </label>
             <br></br>
             <label>Clubs:
             <br></br>
                <label>1W:
                    <select id="c1W" name="c1W" value={this.state.c1W} 
                    className="form-control form-center clubItem" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                <label>3W:
                    <select id="c3W" name="c3W" value={this.state.c3W} 
                    className="form-control form-center clubItem" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                <label>4W:
                    <select id="c4W" name="c4W" value={this.state.c4W} 
                    className="form-control form-center clubItem" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                <label>5W:
                    <select id="c5W" name="c5W" value={this.state.c5W} 
                    className="form-control form-center" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                <label>Hybrid:
                    <select id="cHybrid" name="cHybrid" value={this.state.cHybrid} 
                    className="form-control form-center" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                <br></br>
                <label>2i:
                    <select id="c2i" name="c2i" value={this.state.c2i} 
                    className="form-control form-center" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                <label>3i:
                    <select id="c3i" name="c3i" value={this.state.c3i} 
                    className="form-control form-center" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                <label>4i:
                    <select id="c4i" name="c4i" value={this.state.c4i} 
                    className="form-control form-center" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                <label>5i:
                    <select id="c5i" name="c5i" value={this.state.c5i} 
                    className="form-control form-center" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                <label>6i:
                    <select id="c6i" name="c6i" value={this.state.c6i} 
                    className="form-control form-center" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                <label>7i:
                    <select id="c7i" name="c7i" value={this.state.c7i} 
                    className="form-control form-center" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                <label>8i:
                    <select id="c8i" name="c8i" value={this.state.c8i} 
                    className="form-control form-center" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                <label>9i:
                    <select id="c9i" name="c9i" value={this.state.c9i} 
                    className="form-control form-center" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                /<br/><br/>
                <label>PW:
                    <select id="cPW" name="cPW" value={this.state.cPW} 
                    className="form-control form-center" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                <label>GW:
                    <select id="cGW" name="cGW" value={this.state.cGW} 
                    className="form-control form-center" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                <label>SW:
                    <select id="cSW" name="cSW" value={this.state.cSW} 
                    className="form-control form-center" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                <label>LW:
                    <select id="cLW" name="cLW" value={this.state.cLW} 
                    className="form-control form-center" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>
                <label>Putter:
                    <select id="cPutter" name="cPutter" value={this.state.cPutter} 
                    className="form-control form-center" onChange={this.handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    </select> 
                </label>

             </label>
             


             </div> 
             
            }
            {!this.props.create ?  
            <button className="btn btn-small btn-danger" onClick={this.confirmDeleteAccount}>
                Delete Account...
            </button> : null}
            <br/><br/>
            <button role="submit" 
                disabled={!this.state.formUpdated}
                id="submitCreateOrUpdate"
                className="btn btn-primary btn-color-theme modal-submit-btn">
                <span className={this.props.create ? "fa fa-user-plus" : "fa fa-user"}></span>
                &nbsp;{this.props.create ? "Create Account" : "Update Account"}
            </button>
            </form>
            </div>
        </div>
        {this.state.confirmDelete ? 
          <ConfirmDeleteAccount email={this.state.accountName}
                                deleteAccount={this.deleteAccount}
                                close={() => (this.setState({confirmDelete: false}))}
         /> : null}
    </div>
    );
}
}

export default CreateEditAccountDialog;