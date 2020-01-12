import React, { Component } from 'react';
import Identicon from 'identicon.js';

class School extends Component {

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const sname = this.sname.value
                  const location = this.location.value
                  this.props.registerschool(sname,location)
                }}>
                
                <div className="form-group mr-sm-2">
                  <input
                    id="Sname"
                    type="text"
                    ref={(input) => { this.sname = input }}
                    className="form-control"
                    placeholder="enter school name"
                    required />
                    
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="location"
                    type="text"
                    ref={(input) => { this.location = input }}
                    className="form-control"
                    placeholder="enter school location"
                    required />
                    
                </div>
                
                
                <button type="submit" className="btn btn-primary btn-block">Register</button>
             </form>
              <p>&nbsp;</p>
              { this.props.schools.map((school, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='100'
                        height='150'
                        src={`data:image/png;base64,${new Identicon(school.schooladdress, 30).toString()}`}
                      />
                      <small className="text-muted">{school.schooladdress}</small>
                    </div>
                    <ul id="postList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p>SCHOOL NAME:    {school.sname}</p>
                        <p>SCHOOL LOCATION: {school.location}</p>
                        
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          TIPS: {window.web3.utils.fromWei(school.fundingamount.toString(), 'Ether')} ETH
                        </small>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={school.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.fundschool(event.target.name, tipAmount)
                          }}
                        >
                          TIP 0.1 ETH
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default School;