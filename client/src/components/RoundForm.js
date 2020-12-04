import React from 'react';
import AppMode from './../AppMode.js';

class RoundForm extends React.Component {
  constructor(props) {
  super(props);
  //Create date object for today, taking time zone into consideration
  let today = new Date(Date.now()-(new Date()).getTimezoneOffset()*60000);
  //store date as ISO string
  if (this.props.mode === AppMode.ROUNDS_LOGROUND) {
    //If logging a new round, the starting state is a default round with
    //today's date.
    this.state = {date:  today.toISOString().substr(0,10), 
                  Wind:"calm",
                  player:"Course played",
                  Weather:"clear",
                  type: "practice",
                  Fairways: 1,
                  Greens: 1,
                  putt: 1,
                  holes: "18",
                  strokes: 80,
                  minutes: 50,
                  seconds: "00",
                  notes: "",
                  faIcon: "fa fa-save",
                  btnLabel: "Save Round Data"}
  } else {
    //if editing an existing round, the starting state is the round's
    //current data
    let thisRound = {...this.props.startData};
    delete thisRound.id;
    thisRound.faIcon = "fa fa-edit";
    thisRound.btnLabel = "Update Round Data";
    this.state = thisRound;
  }
}
  
  
    handleChange = (event) => {
        const name = event.target.name;
        if (name === "seconds") {
          let newSec = (event.target.value.length < 2 ? "0" + 
            event.target.value : event.target.value);
          let newSGS = this.computeSGS(this.state.strokes, this.state.minutes, 
                                       newSec);
          this.setState({seconds: newSec, SGS: newSGS});
        } else if (name === "strokes") {
          let newStrokes = event.target.value;
          let newSGS = this.computeSGS(newStrokes, this.state.minutes, 
            this.state.seconds);
          this.setState({strokes: newStrokes, SGS: newSGS});
        } else if (name === "minutes") {
            let newMin = event.target.value;
            let newSGS = this.computeSGS(this.state.strokes, newMin, 
              this.state.seconds);
            this.setState({minutes: newMin, SGS: newSGS});
        } else {
          this.setState({[name]: event.target.value});
        }
    }
  
  
    //handleSubmit -- When the user clicks on the button to save/update the
    //round, start the spinner and invoke the parent component's saveRound
    //method to do the actual work. Note that saveRound is set to the correct
    //parent method based on whether the user is logging a new round or editing
    //an existing round.
    handleSubmit = (event) => {
        //start spinner
        this.setState({faIcon: "fa fa-spin fa-spinner",
                        btnLabel: (this.props.mode === AppMode.ROUNDS_LOGROUND ? 
                                    "Saving..." : "Updating...")});
        //Prepare current round data to be saved
        let roundData = this.state;
        delete roundData.faIcon;
        delete roundData.btnLabel;
        //call saveRound on 1 second delay to show spinning icon
        setTimeout(this.props.saveRound,1000,roundData); 
        event.preventDefault(); 
        }
  

    computeSGS = (strokes, min, sec) => {
      return (Number(strokes) + Number(min)) 
                  + ":" + sec;
    }
  
    render() {
      return (
        <form className="padded-page" onSubmit={this.handleSubmit}>
          <center>
            <label>
              Date:
              <input name="date" className="form-control form-center" 
                type="date" value={this.state.date} onChange={this.handleChange} />
            </label>
            <p></p>
            <label>Wind:
          <select name="Wind" value={this.state.Wind} 
            className="form-control form-center" onChange={this.handleChange}>
            <option value="Calm">Calm</option>
            <option value="Light">Light</option>
            <option value="Moderate">Moderate</option>
            <option value="Strong">Strong</option>
          </select> 
          </label>
          <label>Weather:
          <select name="Weather" value={this.state.Weather} 
            className="form-control form-center" onChange={this.handleChange}>
            <option value="Clear">Clear</option>
            <option value="Partly Cloudy">Partly Cloudy</option>
            <option value="Mostly Cloudy">Mostly Cloudy</option>
            <option value="Cloudy">Cloudy</option>
            <option value="Light Rain">Light Rain</option>
            <option value="Rain">Rain</option>
            <option value="Heavy Rain">Heavy Rain</option>
            <option value="Light Snow">Light Snow</option>
            <option value="Snow">Snow</option>
            <option value="Heavy Snow">Heavy Snow</option>
          </select> 
          </label>
            <p></p>
            <label>Course:
          <select id="coursesDropDown" name="player" value={this.state.player} 
            className="form-control form-center" onChange={this.handleChange}>
            <option value="ab (sw)">ab (sw)</option>
            <option value="Albert Park Golf Course (Melbourne, Australia)">Albert Park Golf Course (Melbourne, Australia)</option>
            <option value="Arrowhead Golf Club Blue (Molalla, OR)">Arrowhead Golf Club Blue (Molalla, OR)</option>
            <option value="Bing Maloney Golf Course Red (Sacramento, CA)">Bing Maloney Golf Course Red (Sacramento, CA)</option>
            <option value="Bing Maloney Golf Course White (Sacramento, CA)">Bing Maloney Golf Course White (Sacramento, CA)</option>
            <option value="Blackhorse Golf Club - South Course Blue (Cypress, TX)">Blackhorse Golf Club - South Course Blue (Cypress, TX)</option>
            <option value="Blackhorse Golf Club - South Course Red (Cypress, TX)">Blackhorse Golf Club - South Course Red (Cypress, TX)</option>
            <option value="Blackhorse Golf Club - South Course White (Cypress, TX)">Blackhorse Golf Club - South Course White (Cypress, TX)</option>
            <option value="Bryden Canyon Golf Course White (Lewiston, ID)">Bryden Canyon Golf Course White (Lewiston, ID)</option>
            <option value="Cascata Golf Course White (Boulder City, Nevada)">Cascata Golf Course White (Boulder City, Nevada)</option>
            <option value="Esmeralda Golf Course White (Spokane, WA, USA)">Esmeralda Golf Course White (Spokane, WA, USA)</option>
            <option value="Glenoaks Golf & Country Club Mens Blue (Prospect KY)">Glenoaks Golf & Country Club Mens Blue (Prospect KY)</option>
            <option value="Glenoaks Golf & Country Club Seniors White (Prospect, KY)">Glenoaks Golf & Country Club Seniors White (Prospect, KY)</option>
            <option value="Glenoaks Golf & Country Club Womens Red (Prospect, KY)">Glenoaks Golf & Country Club Womens Red (Prospect, KY)</option>
            <option value="Horton Smith Golf Course Blue (Springfield, MO)">Horton Smith Golf Course Blue (Springfield, MO)</option>
            <option value="Horton Smith Golf Course Red (Springfield, MO)">Horton Smith Golf Course Red (Springfield, MO)</option>
            <option value="Horton Smith Golf Course White (Springfield, MO)">Horton Smith Golf Course White (Springfield, MO)</option>
            <option value="Meriwether National Golf Club White (Hillsboro, OR)">Meriwether National Golf Club White (Hillsboro, OR)</option>
            <option value="Mountain Top Golf Course Back (Hollister, MO)">Mountain Top Golf Course Back (Hollister, MO)</option>
            <option value="Oneway Golf Club Ladies (Tsuchiura, Ibaraki, Japan)">Oneway Golf Club Ladies (Tsuchiura, Ibaraki, Japan)</option>
          </select> 
          </label>
          <p></p>
          <label>Type:
          <select name="type" value={this.state.type} 
            className="form-control form-center" onChange={this.handleChange}>
            <option value="Practice">Practice</option>
            <option value="Tournament">Tournament</option>
            <option value="League">League</option>
          </select> 
          </label>
          <p></p>
          <label># Fairways:
          <input name="Fairways" className="form-control form-center" type="number" 
            min="1" max="999" value={this.state.Fairways} 
            onChange={this.handleChange} /> 
          </label>
          <p></p>
          <label># Greens:
          <input name="Greens" className="form-control form-center" type="number" 
            min="1" max="999" value={this.state.Greens} 
            onChange={this.handleChange} />
          </label>
          <label># putt:
          <input name="putt" className="form-control form-center" type="number" 
            min="1" max="999" value={this.state.putt} 
            onChange={this.handleChange} />
          </label>                       
          <p></p>
          <label># Holes:
          <select name="holes" value={this.state.holes} 
            className="form-control form-center" onChange={this.handleChange}>
            <option value="9">9</option>
            <option value="18">18</option>
          </select> 
          </label>
          <p></p>
          <label># Strokes:
          <input name="strokes" className="form-control form-center" type="number" 
            min="9" max="200" value={this.state.strokes} 
            onChange={this.handleChange} />
          </label>
          <p></p>
          <label>Time: <br></br>
          <input name="minutes" type="number" size="3"
            min="10" max="400" value={this.state.minutes}
            onChange={this.handleChange} />:  
          <input name="seconds" type="number" size="2"
            min="0" max="60" value={this.state.seconds} 
            onChange={this.handleChange} />
          </label>
          <p></p>
          <label>Speedgolf Score: <br></br>
              <input name="SGS" className="form-center" type="text" size="6" 
                disabled={true} value={this.computeSGS(this.state.strokes,this.state.minutes,this.state.seconds)} />
          </label>
          <p></p>
          <label>Notes:
              <textarea name="notes" className="form-control" rows="6" cols="75" 
                placeholder="Enter round notes" value={this.state.notes} 
                onChange={this.handleChange} />
          </label>
          <p></p>
          <p></p>
          <button type="submit" style={{width: "70%",fontSize: "36px"}} 
            className="btn btn-primary btn-color-theme">
              <span className={this.state.faIcon}/>&nbsp;{this.state.btnLabel}
          </button>
          </center>
        </form>
      );
    }
}

export default RoundForm;