import React, { Component } from 'react';
import Identicon from 'identicon.js';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class Subject extends Component {
  

  constructor(props){
    super(props)
    this.state={
      subjectbuffer:''
    }
  }
  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ subjectbuffer: Buffer(reader.result) })
      console.log('subjectbuffer', this.state.subjectbuffer)
    }
  }
 
    
    
   

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const subname = this.subname.value
                  this.props.onSubmitsubject(event,subname,this.state.subjectbuffer)
                }}>
                    
                
                <div className="form-group mr-sm-2">
                  <input
                    id="subname"
                    type="text"
                    ref={(input) => { this.subname = input }}
                    className="form-control"
                    placeholder="enter the subject name"
                    required />
                    
                </div>
                
                <div className="form-group mr-sm-2">
                  <input
                    id="subjecthash"
                    type="file"  onChange={this.captureFile}
                    className="form-control"
                    placeholder="enter your resume"
                    required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit Subject and notes</button>
             </form>
              <p>&nbsp;</p>
              { this.props.subjects.map((subject, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='100'
                        height='150'
                        src={`data:image/png;base64,${new Identicon(subject.creator, 30).toString()}`}
                      />
                      <small className="text-muted">{subject.creator}</small>
                    </div>
                    <ul id="postList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p>NAME:    {subject.subjectname}</p>
                        <p>
                          <a href={`https://ipfs.infura.io/ipfs/${subject.notehash}`}>
                        <button
                          className="btn btn-link btn-sm float-left pt-0"
                          >click here to download notes</button>
                          </a>
                          </p>
                       
                        
                      </li>
                      {/* <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          TIPS: {window.web3.utils.fromWei(subject.tipAmount.toString(), 'Ether')} ETH
                        </small>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={post.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.tipnotes(event.target.name, tipAmount)
                          }}
                        >
                          TIP 0.1 ETH
                        </button>
                      </li> */}
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

export default Subject