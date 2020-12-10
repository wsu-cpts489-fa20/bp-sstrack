import React from 'react';

class View extends React.Component {
    constructor() {
        super();
        this.state = {showConfirmDelete: false};
      }
    renderTable = () => {
        let table = [];
        for (let r = 0; r < this.props.rounds.length; ++r) {
          table.push(
            <tr key={r}>
              <td>{this.props.rounds[r].date.substring(0,10)}</td>
              <td>{this.props.rounds[r].Wind + "/" + this.props.rounds[r].Weather}</td>        
              <td>{this.props.rounds[r].player}</td>
              <td>{(Number(this.props.rounds[r].Fairways) +"/" + Number(this.props.rounds[r].Greens)+ "(" +Number(this.props.rounds[r].putt)+")" ) }</td>
              <td>{this.props.rounds[r].type}</td>
              <td>{(Number(this.props.rounds[r].holes))} </td>
              <td>{(Number(this.props.rounds[r].strokes) + 
                    Number(this.props.rounds[r].minutes)) +
                    ":" + (this.props.rounds[r].seconds < 10 ?  
                      "0" + this.props.rounds[r].seconds :
                      this.props.rounds[r].seconds) + " (" + 
                    this.props.rounds[r].strokes + 
                    " in " + this.props.rounds[r].minutes + ":" + 
                    (this.props.rounds[r].seconds < 10 ?  
                      "0" + this.props.rounds[r].seconds :
                      this.props.rounds[r].seconds) + ")"}</td>
                <td>{this.props.rounds[r].notes}</td>
            </tr> 
          );
        }
        return table;
        }
render() {
    return (
            <div className="modal-content">
            <div className="padded-page">
      <table className="table table-hover">
        <thead className="thead-light">
        <tr>
          <th>Date</th>
          <th>Wind/Weather</th>
          <th>Course</th>
          <th>Fairway/Greens(Putt)</th>
          <th>Type</th>
          <th>Holes</th>
          <th>Score</th>          
          <th>Notes</th>
        </tr>
        </thead>
            </table>
            </div>
            </div>
    );
    }
}

export default View;