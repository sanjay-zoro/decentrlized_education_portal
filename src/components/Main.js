import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Main extends Component {

  constructor(props){
    super(props)
    this.state={
      photobuffer:'',
      resumebuffer:''
    }
  }
  captureFilephoto = (event) => {
    event.preventDefault()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ photobuffer: Buffer(reader.result) })
      console.log('photobuffer', this.state.photobuffer)
    }
  }

  captureFileresume = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ resumebuffer: Buffer(reader.result) })
      console.log('resumebuffer', this.state.resumebuffer)
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
                  const content = this.postContent.value
                  const fname = this.fname.value
                  const age = this.age.value
                  const degree=this.degree.value
                  this.props.onSubmitpost(event,this.state.resumebuffer,this.state.photobuffer,fname,age,degree,content)
                }}>
                
                <div className="form-group mr-sm-2">
                  <input
                    id="fname"
                    type="text"
                    ref={(input) => { this.fname = input }}
                    className="form-control"
                    placeholder="enter your first name"
                    required />
                    
                </div>
                
                <div className="form-group mr-sm-2">
                  <input
                    id="age"
                    type="number"
                    ref={(input) => { this.age = input }}
                    className="form-control"
                    placeholder="enter your age"
                    required />
                    
                </div>
                
                <div className="form-group mr-sm-2">
                  <input
                    id="degree"
                    type="text"
                    ref={(input) => { this.degree = input }}
                    className="form-control"
                    placeholder="enter your degree"
                    required />
                    
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="postContent"
                    type="text"
                    ref={(input) => { this.postContent = input }}
                    className="form-control"
                    placeholder="write about yourself"
                    required />
                </div>
                <div className="form-group mr-sm-2">enter photo
                  <input
                    id="photohash"
                    type="file"
                    onChange={this.captureFilephoto}
                    className="form-control"
                    
                    required />
                </div>
                <div className="form-group mr-sm-2">enter resume
                  <input
                    id="resumehash"
                    type="file"
                    onChange={this.captureFileresume}
                    className="form-control"
                    
                    required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
             </form>
              <p>&nbsp;</p>
              { this.props.posts.map((post, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='100'
                        height='150'
                        src={`https://ipfs.infura.io/ipfs/${post.photo}`}
                      />
                      <small className="text-muted">{post.author}</small>
                    </div>
                    <ul id="postList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p>NAME:    {post.sname}</p>
                        <p>AGE:     {post.age.toNumber()}</p>
                        <p>DEGREE:  {post.degree}</p>
                        <p>ABOUT:   {post.content}</p>
                        <p>
                          <a href={`https://ipfs.infura.io/ipfs/${post.resume}`}>
                        <button
                          className="btn btn-link btn-sm float-left pt-0"
                          >click here to download resume</button>
                          </a>
                          </p>
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                        </small>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={post.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.tipPost(event.target.name, tipAmount)
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

export default Main;
// import React,{Component} from 'react';
// import Identicon from 'identicon.js';

// class Main extends Component{
//     render(){
//         return (
//             <div className="container-fluid mt-5">
//           <div className="row">
//             <main role="main" className="col-lg-12 d-flex text-center">
//               <div className="content mr-auto ml-auto" style={{ maxWidth: '500px' }}>
//               <p>&nbsp;</p>
//                 <form onSubmit={(event) => {
//                   event.preventDefault()
//                   const content = this.postContent.value
//                   this.props.createPost(content)
//                 }}>
//                 <div className="form-group mr-sm-2">
//                   <input
//                     id="postContent"
//                     type="text"
//                     ref={(input) => { this.postContent = input }}
//                     className="form-control"
//                     placeholder="What's on your mind?"
//                     required />
//                 </div>
//                 <button type="submit" className="btn btn-primary btn-block">Share</button>
//               </form>
//               <p>&nbsp;</p>
//               { this.props.posts.map((post, key) => {
//                 return(
//                   <div className="card mb-4" key={key} >
//                     <div className="card-header">
//                       <img
//                         className='mr-2'
//                         width='30'
//                         height='30'
//                         src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
//                       />
//                       <small className="text-muted">{post.author}</small>
//                     </div>
//                     <ul id="postList" className="list-group list-group-flush">
//                       <li className="list-group-item">
//                         <p>{post.content}</p>
//                       </li>
//                       <li key={key} className="list-group-item py-2">
//                         <small className="float-left mt-1 text-muted">
//                           TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
//                         </small>
//                         <button
//                           className="btn btn-link btn-sm float-right pt-0"
//                           name={post.id}
//                           onClick={(event) => {
//                             let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
//                             console.log(event.target.name, tipAmount)
//                             this.state.tipPost(event.target.name, tipAmount)
//                           }}
//                         >
//                           TIP 0.1 ETH
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 )
//               })}
                
                
               
//               </div>
//             </main>
//           </div>
//         </div>
            
//         );
//     }
// }

// export default Main