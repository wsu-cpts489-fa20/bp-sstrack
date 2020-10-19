(this["webpackJsonpspeedgolf-react"]=this["webpackJsonpspeedgolf-react"]||[]).push([[0],{10:function(e,t,a){e.exports=a(19)},18:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(9),o=a.n(r),l=(a(15),a(16),a(17),a(18),a(1)),c=a(2),i=a(4),u=a(3),m=a(5),d={LOGIN:"LoginMode",FEED:"FeedMode",ROUNDS:"RoundsMode",ROUNDS_LOGROUND:"RoundsMode-LogRound",ROUNDS_EDITROUND:"RoundsMode-EditRound",COURSES:"CoursesMode"};Object.freeze(d);var p=d,h=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).getMenuBtnIcon=function(){return a.props.mode===p.ROUNDS_LOGROUND||a.props.mode===p.ROUNDS_EDITROUND?"fa fa-arrow-left":a.props.menuOpen?"fa fa-times":"fa fa-bars"},a.handleMenuBtnClick=function(){a.props.mode===p.ROUNDS_LOGROUND||a.props.mode===p.ROUNDS_EDITROUND?a.props.changeMode(p.ROUNDS):a.props.mode!=p.LOGIN&&a.props.toggleMenuOpen()},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"navbar"},s.a.createElement("span",{className:"navbar-items"},s.a.createElement("button",{className:"sidemenu-btn",onClick:this.handleMenuBtnClick},s.a.createElement("span",{id:"menuBtnIcon",className:"sidemenu-btn-icon "+this.getMenuBtnIcon()})),s.a.createElement("img",{src:"http://tiny.cc/sslogo",alt:"Speed Score Logo",height:"38px",width:"38px"}),s.a.createElement("span",{className:"navbar-title"},"\xa0",this.props.title)))}}]),t}(s.a.Component),f=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).renderModeMenuItems=function(){switch(a.props.mode){case p.FEED:return s.a.createElement("div",null,s.a.createElement("a",{className:"sidemenu-item"},s.a.createElement("span",{className:"fa fa-users"}),"\xa0Followed Users"),s.a.createElement("a",{className:"sidemenu-item "},s.a.createElement("span",{className:"fa fa-search"}),"\xa0Search Feed"));case p.ROUNDS:return s.a.createElement("div",null,s.a.createElement("a",{className:"sidemenu-item"},s.a.createElement("span",{className:"fa fa-plus"}),"\xa0Log New Round"),s.a.createElement("a",{className:"sidemenu-item"},s.a.createElement("span",{className:"fa fa-search"}),"\xa0Search Rounds"));case p.COURSES:return s.a.createElement("div",null,s.a.createElement("a",{className:"sidemenu-item"},s.a.createElement("span",{className:"fa fa-plus"}),"\xa0Add a Course"),s.a.createElement("a",{className:"sidemenu-item"},s.a.createElement("span",{className:"fa fa-search"}),"\xa0Search Courses"));default:return null}},a.getDisplayName=function(){return""==a.props.userId?"":JSON.parse(localStorage.getItem(a.props.userId)).displayName},a.getProfilePic=function(){if(""==a.props.userId)return"";var e=JSON.parse(localStorage.getItem(a.props.userId));return""!=e.profilePicURL?e.profilePicURL:e.profilePicDataURL},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"sidemenu "+(this.props.menuOpen?"sidemenu-open":"sidemenu-closed"),onClick:this.props.toggleMenuOpen},s.a.createElement("div",{className:"sidemenu-title"},s.a.createElement("img",{src:this.getProfilePic(),height:"60",width:"60"}),s.a.createElement("span",{id:"userID",className:"sidemenu-userID"},"\xa0",this.getDisplayName())),this.renderModeMenuItems(),s.a.createElement("a",{id:"aboutBtn",className:"sidemenu-item"},s.a.createElement("span",{className:"fa fa-info-circle"}),"\xa0About"),s.a.createElement("a",{id:"logOutBtn",className:"sidemenu-item",onClick:this.props.logOut},s.a.createElement("span",{className:"fa fa-sign-out-alt"}),"\xa0Log Out"))}}]),t}(s.a.Component),g=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"modebar"+(this.props.mode===p.LOGIN?" invisible":this.props.menuOpen?" ignore-click visible":" visible")},s.a.createElement("a",{className:this.props.mode===p.FEED?" item-selected":null,onClick:function(){return e.props.changeMode(p.FEED)}},s.a.createElement("span",{className:"modebaricon fa fa-th-list"}),s.a.createElement("span",{className:"modebar-text"},"Feed")),s.a.createElement("a",{className:this.props.mode===p.ROUNDS||this.props.mode===p.ROUNDS_EDITROUND||this.props.mode===p.ROUNDS_LOGROUND?" item-selected":null,onClick:function(){return e.props.changeMode(p.ROUNDS)}},s.a.createElement("span",{className:"modebar-icon  fa fa-history"}),s.a.createElement("span",{className:"modebar-text"},"Rounds")),s.a.createElement("a",{className:this.props.mode===p.COURSES?" item-selected":null,onClick:function(){return e.props.changeMode(p.COURSES)}},s.a.createElement("span",{className:"modebar-icon  fa fa-flag"}),s.a.createElement("span",{className:"modebar-text"},"Courses")))}}]),t}(s.a.Component),E=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"floatbtn",onClick:this.props.handleClick},s.a.createElement("span",{className:"floatbtn-icon fa fa-plus"}))}}]),t}(s.a.Component),b=a(6),O=a(7),N=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).checkAccountValidity=function(){e.state.accountPassword!=e.state.accountPasswordRepeat?e.repeatPassRef.current.setCustomValidity("This password must match original password."):e.repeatPassRef.current.setCustomValidity(""),null!=JSON.parse(localStorage.getItem(e.newUserRef.current.value))?e.newUserRef.current.setCustomValidity("An account already exists under this email address. Use 'Reset password' to recover the password."):e.newUserRef.current.setCustomValidity("")},e.handleNewAccountChange=function(t){if("profilePic"===t.target.name)if(0==t.target.value.length)e.setState({profilePicDataURL:"",profilePicURL:"https://icon-library.net//images/default-profile-icon/default-profile-icon-24.jpg"});else{var a=Object(O.a)(e),n=(t.target.value,new FileReader);n.readAsDataURL(e.profilePicRef.current.files[0]),n.addEventListener("load",(function(){a.setState({profilePicURL:"",profilePicDataURL:this.result})}))}else e.setState(Object(b.a)({},t.target.name,t.target.value),e.checkAccountValidity)},e.setDefaultDisplayName=function(t){t.target.value.length>0&&""===e.state.displayName&&e.setState({displayName:t.target.value})},e.handleCreateAccount=function(t){t.preventDefault();var a={displayName:e.state.displayName,password:e.state.accountPassword,profilePicUrl:e.state.profilePicURL,profilePicDataURL:e.state.profilePicDataURL,securityQuestion:e.state.accountSecurityQuestion,securityAnswer:e.state.accountSecurityAnswer,rounds:{},roundCount:0};localStorage.setItem(e.state.accountName,JSON.stringify(a)),e.props.newAccountCreated()},e.newUserRef=s.a.createRef(),e.repeatPassRef=s.a.createRef(),e.profilePicRef=s.a.createRef(),e.state={accountName:"",displayName:"",profilePicDataURL:"",profilePicURL:"https://icon-library.net//images/default-profile-icon/default-profile-icon-24.jpg",accountPassword:"",accountPasswordRepeat:"",accountSecurityQuestion:"",accountSecurityAnswer:""},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"modal",role:"dialog"},s.a.createElement("div",{className:"modal-dialog modal-lg"},s.a.createElement("div",{className:"modal-content"},s.a.createElement("div",{className:"modal-header"},s.a.createElement("center",null,s.a.createElement("h3",{className:"modal-title"},s.a.createElement("b",null,"Create New Account"))),s.a.createElement("button",{className:"close",onClick:this.props.cancelCreateAccount},"\xd7")),s.a.createElement("div",{className:"modal-body"},s.a.createElement("form",{onSubmit:this.handleCreateAccount},s.a.createElement("label",null,"Email:",s.a.createElement("input",{className:"form-control form-text form-center",name:"accountName",type:"email",size:"35",placeholder:"Enter Email Address",pattern:"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}",required:!0,ref:this.newUserRef,value:this.state.accountName,onChange:this.handleNewAccountChange,onBlur:this.setDefaultDisplayName})),s.a.createElement("label",null,"Password:",s.a.createElement("input",{className:"form-control form-text form-center",name:"accountPassword",type:"password",size:"35",placeholder:"Enter Password",pattern:"(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$",required:!0,value:this.state.accountPassword,onChange:this.handleNewAccountChange})),s.a.createElement("label",null,"Repeat Password:",s.a.createElement("input",{className:"form-control form-text form-center",name:"accountPasswordRepeat",type:"password",size:"35",placeholder:"Repeat Password",required:!0,ref:this.repeatPassRef,value:this.state.accountPasswordRepeat,onChange:this.handleNewAccountChange})),s.a.createElement("label",null,"Display Name:",s.a.createElement("input",{className:"form-control form-text form-center",name:"displayName",type:"text",size:"30",placeholder:"Display Name",required:!0,value:this.state.displayName,onChange:this.handleNewAccountChange})),s.a.createElement("label",null,"Profile Picture:",s.a.createElement("br",null),s.a.createElement("input",{className:"form-control form-text form-center",name:"profilePic",type:"file",accept:"image/x-png,image/gif,image/jpeg",ref:this.profilePicRef,value:this.state.profilePic,onChange:this.handleNewAccountChange}),s.a.createElement("img",{src:""!=this.state.profilePicURL?this.state.profilePicURL:this.state.profilePicDataURL,height:"60",width:"60"})),s.a.createElement("label",null,"Security Question:",s.a.createElement("textarea",{className:"form-control form-text form-center",name:"accountSecurityQuestion",size:"35",placeholder:"Security Question",rows:"2",cols:"35",maxLength:"100",required:!0,value:this.state.accountSecurityQuestion,onChange:this.handleNewAccountChange})),s.a.createElement("label",null,"Answer to Security Question:",s.a.createElement("textarea",{className:"form-control form-text form-center",name:"accountSecurityAnswer",type:"text",placeholder:"Answer",rows:"2",cols:"35",maxLength:"100",required:!0,value:this.state.accountSecurityAnswer,onChange:this.handleNewAccountChange})),s.a.createElement("br",null),s.a.createElement("button",{role:"submit",className:"btn btn-primary btn-color-theme modal-submit-btn"},s.a.createElement("span",{className:"fa fa-user-plus"}),"\xa0Create Account"))))))}}]),t}(s.a.Component),S=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){}}]),t}(s.a.Component),R=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).handleLogin=function(){e.setState({loginBtnIcon:"fa fa-sign-in",loginBtnLabel:"Log In"}),e.props.setUserId(e.emailInputRef.current.value),e.props.changeMode(p.FEED)},e.handleLoginSubmit=function(t){t.preventDefault(),e.setState({loginBtnIcon:"fa fa-spin fa-spinner",loginBtnLabel:"Logging In..."}),setTimeout(e.handleLogin,1e3)},e.handleLoginChange=function(){var t=e.emailInputRef.current.value,a=JSON.parse(localStorage.getItem(t));null!=a?(e.emailInputRef.current.setCustomValidity(""),a.password!=e.passwordInputRef.current.value?e.passwordInputRef.current.setCustomValidity("The password you entered is incorrect. Please try again or choose 'Reset your password'."):e.passwordInputRef.current.setCustomValidity("")):e.emailInputRef.current.setCustomValidity("No account with this email address exists. Choose 'Create an account'.")},e.newAccountCreated=function(){e.setState({newAccountCreated:!0,showCreateAccountDialog:!1})},e.cancelCreateAccount=function(){e.setState({showCreateAccountDialog:!1})},e.handleOAuthLogin=function(e){window.open("/auth/".concat(e),"_self")},e.handleOAuthLoginClick=function(t){var a;e.setState((a={},Object(b.a)(a,t+"Icon","fa fa-spin fa-spinner"),Object(b.a)(a,t+"Label","Connecting..."),a)),setTimeout((function(){return e.handleOAuthLogin(t)}),1e3)},e.emailInputRef=s.a.createRef(),e.passwordInputRef=s.a.createRef(),e.state={newAccountCreated:!1,loginBtnIcon:"fa fa-sign-in",loginBtnLabel:"Log In",showCreateAccountDialog:!1,showResetPasswordDialog:!1,githubIcon:"fa fa-github",githubLabel:"Sign in with GitHub"},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.emailInputRef.current.focus()}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{id:"login-mode-div",className:"padded-page"},s.a.createElement("center",null,s.a.createElement("h1",null),this.state.newAccountCreated?s.a.createElement("p",{className:"emphasis"},"New account created! Enter credentials to log in."):null,s.a.createElement("form",{id:"loginInterface",onSubmit:this.handleLoginSubmit,onChange:this.handleLoginChange},s.a.createElement("label",{htmlFor:"emailInput",style:{padding:0,fontSize:24}},"Email:",s.a.createElement("input",{ref:this.emailInputRef,className:"form-control login-text",type:"email",placeholder:"Enter Email Address",id:"emailInput",pattern:"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}",required:!0})),s.a.createElement("p",null),s.a.createElement("label",{htmlFor:"passwordInput",style:{padding:0,fontSize:24}},"Password:",s.a.createElement("input",{ref:this.passwordInputRef,className:"form-control login-text",type:"password",placeholder:"Enter Password",pattern:"[A-Za-z0-9!@#$%^&*()_+\\-]+",required:!0})),s.a.createElement("p",{className:"bg-danger",id:"feedback",style:{fontSize:16}}),s.a.createElement("button",{type:"submit",className:"btn-color-theme btn btn-primary btn-block login-btn"},s.a.createElement("span",{id:"login-btn-icon",className:this.state.loginBtnIcon}),"\xa0",this.state.loginBtnLabel),s.a.createElement("p",null,s.a.createElement("button",{type:"button",className:"btn btn-link login-link",onClick:function(){e.setState({showCreateAccountDialog:!0})}},"Create an account")," |",s.a.createElement("button",{type:"button",className:"btn btn-link login-link",onClick:function(){e.setState({showResetPasswordDialog:!0})}},"Reset your password")),s.a.createElement("button",{type:"button",className:"btn btn-github",onClick:function(){return e.handleOAuthLoginClick("github")}},s.a.createElement("span",{className:this.state.githubIcon}),"\xa0",this.state.githubLabel),s.a.createElement("p",null,s.a.createElement("i",null,"Version CptS 489"))),this.state.showCreateAccountDialog?s.a.createElement(N,{newAccountCreated:this.newAccountCreated,cancelCreateAccount:this.cancelCreateAccount}):null,this.state.showResetPasswordDialog?s.a.createElement(S,null):null))}}]),t}(s.a.Component),v=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"padded-page"},s.a.createElement("center",null,s.a.createElement("h1",null,"Activity Feed"),s.a.createElement("h2",null,"This page is under construction."),s.a.createElement("img",{src:"https://dl.dropboxusercontent.com/s/qpjhy9x9gwdxpob/SpeedScoreLogo64Trans.png",height:"200",width:"200"}),s.a.createElement("p",{style:{fontStyle:"italic"}},"Version CptS 489 React Demo")))}}]),t}(s.a.Component),C=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).editRound=function(e){a.props.setEditId(e),a.props.changeMode(p.ROUNDS_EDITROUND)},a.confirmDelete=function(e){a.props.setDeleteId(e),alert("Confirm Delete Goes here!")},a.renderTable=function(){var e=[],t=function(t){e.push(s.a.createElement("tr",{key:t},s.a.createElement("td",null,a.props.rounds[t].date),s.a.createElement("td",null,a.props.rounds[t].course),s.a.createElement("td",null,Number(a.props.rounds[t].strokes)+Number(a.props.rounds[t].minutes)+":"+a.props.rounds[t].seconds+" ("+a.props.rounds[t].strokes+" in "+a.props.rounds[t].minutes+":"+a.props.rounds[t].seconds+")"),s.a.createElement("td",null,s.a.createElement("button",{onClick:a.props.menuOpen?null:function(){return a.editRound(t)}},s.a.createElement("span",{className:"fa fa-eye"}))),s.a.createElement("td",null,s.a.createElement("button",{onClick:a.props.menuOpen?null:function(){return a.confirmDelete(t)}},s.a.createElement("span",{className:"fa fa-trash"})))))};for(var n in a.props.rounds)t(n);return e},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"padded-page"},s.a.createElement("h1",null),s.a.createElement("table",{className:"table table-hover"},s.a.createElement("thead",{className:"thead-light"},s.a.createElement("tr",null,s.a.createElement("th",null,"Date"),s.a.createElement("th",null,"Course"),s.a.createElement("th",null,"Score"),s.a.createElement("th",null,"View/Edit..."),s.a.createElement("th",null,"Delete"))),s.a.createElement("tbody",null,0===Object.keys(this.props.rounds).length?s.a.createElement("tr",null,s.a.createElement("td",{colSpan:"5",style:{fontStyle:"italic"}},"No rounds logged")):this.renderTable())))}}]),t}(s.a.Component),y=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){var t=e.target.name;if("seconds"===t){var n=e.target.value.length<2?"0"+e.target.value:e.target.value,s=a.computeSGS(a.state.strokes,a.state.minutes,n);a.setState({seconds:n,SGS:s})}else if("strokes"===t){var r=e.target.value,o=a.computeSGS(r,a.state.minutes,a.state.seconds);a.setState({strokes:r,SGS:o})}else if("minutes"===t){var l=e.target.value,c=a.computeSGS(a.state.strokes,l,a.state.seconds);a.setState({minutes:l,SGS:c})}else a.setState(Object(b.a)({},t,e.target.value))},a.handleSubmit=function(e){a.setState({faIcon:"fa fa-spin fa-spinner",btnLabel:a.props.mode===p.ROUNDS_LOGROUND?"Saving...":"Updating..."});var t=a.state;delete t.faIcon,delete t.btnLabel,setTimeout(a.props.saveRound,1e3,t),e.preventDefault()},a.computeSGS=function(e,t,a){return Number(e)+Number(t)+":"+a};var n=new Date(Date.now()-6e4*(new Date).getTimezoneOffset());return a.props.mode===p.ROUNDS_LOGROUND?a.state={date:n.toISOString().substr(0,10),course:"",type:"practice",holes:"18",strokes:80,minutes:50,seconds:"00",notes:"",faIcon:"fa fa-save",btnLabel:"Save Round Data"}:(a.state=a.props.startData,a.state.faIcon="fa fa-edit",a.state.btnLabel="Update Round Data"),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("form",{className:"padded-page",onSubmit:this.handleSubmit},s.a.createElement("center",null,s.a.createElement("label",null,"Date:",s.a.createElement("input",{name:"date",className:"form-control form-center",type:"date",value:this.state.date,onChange:this.handleChange})),s.a.createElement("p",null),s.a.createElement("label",null,"Course:",s.a.createElement("input",{name:"course",className:"form-control form-center",type:"text",value:this.state.course,onChange:this.handleChange,placeholder:"Course played",size:"50",maxLength:"50"})),s.a.createElement("p",null),s.a.createElement("label",null,"Type:",s.a.createElement("select",{name:"type",value:this.state.type,className:"form-control form-center",onChange:this.handleChange},s.a.createElement("option",{value:"practice"},"Practice"),s.a.createElement("option",{value:"tournament"},"Tournament"))),s.a.createElement("p",null),s.a.createElement("label",null,"# Holes:",s.a.createElement("select",{name:"holes",value:this.state.holes,className:"form-control form-center",onChange:this.handleChange},s.a.createElement("option",{value:"9"},"9"),s.a.createElement("option",{value:"18"},"18"))),s.a.createElement("p",null),s.a.createElement("label",null,"# Strokes:",s.a.createElement("input",{name:"strokes",className:"form-control form-center",type:"number",min:"9",max:"200",value:this.state.strokes,onChange:this.handleChange})),s.a.createElement("p",null),s.a.createElement("label",null,"Time: ",s.a.createElement("br",null),s.a.createElement("input",{name:"minutes",type:"number",size:"3",min:"10",max:"400",value:this.state.minutes,onChange:this.handleChange}),":",s.a.createElement("input",{name:"seconds",type:"number",size:"2",min:"0",max:"60",value:this.state.seconds,onChange:this.handleChange})),s.a.createElement("p",null),s.a.createElement("label",null,"Speedgolf Score: ",s.a.createElement("br",null),s.a.createElement("input",{name:"SGS",className:"form-center",type:"text",size:"6",disabled:!0,value:this.state.SGS})),s.a.createElement("p",null),s.a.createElement("label",null,"Notes:",s.a.createElement("textarea",{name:"notes",className:"form-control",rows:"6",cols:"75",placeholder:"Enter round notes",value:this.state.notes,onChange:this.handleChange})),s.a.createElement("p",null),s.a.createElement("p",null),s.a.createElement("button",{type:"submit",style:{width:"70%",fontSize:"36px"},className:"btn btn-primary btn-color-theme"},s.a.createElement("span",{className:this.state.faIcon}),"\xa0",this.state.btnLabel)))}}]),t}(s.a.Component),w=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).addRound=function(e){var t=JSON.parse(localStorage.getItem(a.props.userId));t.rounds[++t.roundCount]=e,localStorage.setItem(a.props.userId,JSON.stringify(t)),a.setState({rounds:t.rounds,roundCount:t.roundCount}),a.props.changeMode(p.ROUNDS)},a.editRound=function(e){var t=JSON.parse(localStorage.getItem(a.props.userId));t.rounds[a.state.editId]=e,localStorage.setItem(a.props.userId,JSON.stringify(t)),a.setState({rounds:t.rounds,editId:""}),a.props.changeMode(p.ROUNDS)},a.deleteRound=function(){var e=JSON.parse(localStorage.getItem(a.props.userId));delete e.rounds[a.state.deleteId],localStorage.setItem(a.props.userId,JSON.stringify(e)),a.setState({rounds:e.rounds,deleteId:""})},a.setDeleteId=function(e){a.setState({deleteId:e})},a.setEditId=function(e){a.setState({editId:e})};var n=JSON.parse(localStorage.getItem(a.props.userId));return null==n&&(n={rounds:{},roundCount:0},localStorage.setItem(a.props.userId,JSON.stringify(n))),a.state={rounds:n.rounds,roundCount:n.roundCount,deleteId:"",editId:""},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;switch(this.props.mode){case p.ROUNDS:return s.a.createElement(s.a.Fragment,null,s.a.createElement(C,{rounds:this.state.rounds,setEditId:this.setEditId,setDeleteId:this.setDeleteId,deleteRound:this.deleteRound,changeMode:this.props.changeMode,menuOpen:this.props.menuOpen}),s.a.createElement(E,{handleClick:function(){return e.props.changeMode(p.ROUNDS_LOGROUND)},menuOpen:this.props.menuOpen,icon:"fa fa-plus"}));case p.ROUNDS_LOGROUND:return s.a.createElement(y,{mode:this.props.mode,startData:"",saveRound:this.addRound});case p.ROUNDS_EDITROUND:return s.a.createElement(y,{mode:this.props.mode,startData:this.state.rounds[this.state.editId],saveRound:this.editRound})}}}]),t}(s.a.Component),D=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"padded-page"},s.a.createElement("center",null,s.a.createElement("h1",null,"Courses"),s.a.createElement("h2",null,"This page is under construction."),s.a.createElement("img",{src:"https://dl.dropboxusercontent.com/s/qpjhy9x9gwdxpob/SpeedScoreLogo64Trans.png",height:"200",width:"200"}),s.a.createElement("p",{style:{fontStyle:"italic"}},"Version CptS 489 React Demo")))}}]),t}(s.a.Component),I={};I[p.LOGIN]="Welcome to SpeedScore",I[p.FEED]="Activity Feed",I[p.ROUNDS]="My Rounds",I[p.ROUNDS_LOGROUND]="Log New Round",I[p.ROUNDS_EDITROUND]="Edit Round",I[p.COURSES]="Courses";var U={};U[p.LOGIN]=R,U[p.FEED]=v,U[p.ROUNDS]=w,U[p.ROUNDS_LOGROUND]=w,U[p.ROUNDS_EDITROUND]=w,U[p.COURSES]=D;var j=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).handleChangeMode=function(t){e.setState({mode:t})},e.openMenu=function(){e.setState({menuOpen:!0})},e.closeMenu=function(){e.setState({menuOpen:!1})},e.toggleMenuOpen=function(){e.setState((function(e){return{menuOpen:!e.menuOpen}}))},e.setUserId=function(t){e.setState({userId:t,authenticated:!0})},e.state={mode:p.LOGIN,menuOpen:!1,authenticated:!1,userId:""},e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;window.addEventListener("click",this.handleClick),this.state.authenticated||fetch("/auth/test").then((function(e){return e.json()})).then((function(t){if(t.isAuthenticated){var a=t.user.id,n=JSON.parse(localStorage.getItem(a));null==n&&(n={password:"",profilePicURL:t.user.profileImageUrl,displayName:t.user.username,securityQuestion:"",securityAnswer:"",rounds:{},roundCount:0},localStorage.setItem(a,JSON.stringify(n))),e.setState({userId:a,authenticated:!0,mode:p.FEED})}}))}},{key:"render",value:function(){var e=this,t=U[this.state.mode];return s.a.createElement("div",null,s.a.createElement(h,{title:I[this.state.mode],mode:this.state.mode,changeMode:this.handleChangeMode,menuOpen:this.state.menuOpen,toggleMenuOpen:this.toggleMenuOpen}),s.a.createElement(f,{menuOpen:this.state.menuOpen,mode:this.state.mode,toggleMenuOpen:this.toggleMenuOpen,userId:this.state.userId,logOut:function(){return e.handleChangeMode(p.LOGIN)}}),s.a.createElement(g,{mode:this.state.mode,changeMode:this.handleChangeMode,menuOpen:this.state.menuOpen}),s.a.createElement(t,{menuOpen:this.state.menuOpen,mode:this.state.mode,changeMode:this.handleChangeMode,userId:this.state.userId,setUserId:this.setUserId}))}}]),t}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[10,1,2]]]);
//# sourceMappingURL=main.059ac64b.chunk.js.map