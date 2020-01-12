// import React, { Component } from 'react';
// import Web3 from 'web3';
// import Identicon from 'identicon.js';
// import './App.css';
// import SocialNetwork from '../abis/SocialNetwork.json'
// import Navbar from './Navbar'
// import Main from './Main'

// class App extends Component {

//   async componentWillMount() {
//     await this.loadWeb3()
//     await this.loadBlockchainData()
//   }

//   async loadWeb3() {
//     if (window.ethereum) {
//       window.web3 = new Web3(window.ethereum)
//       await window.ethereum.enable()
//     }
//     else if (window.web3) {
//       window.web3 = new Web3(window.web3.currentProvider)
//     }
//     else {
//       window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
//     }
//   }

//   async loadBlockchainData() {
//     const web3 = window.web3
//     // Load account
//     const accounts = await web3.eth.getAccounts()
//     this.setState({ account: accounts[0] })
//     // Network ID
//     const networkId = await web3.eth.net.getId()
//     const networkData = SocialNetwork.networks[networkId]
//     if(networkData) {
//       const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
//       this.setState({ socialNetwork })
//       const postCount = await socialNetwork.methods.postCount().call()
//       this.setState({ postCount })
//       // Load Posts
//       for (var i = 1; i <= postCount; i++) {
//         const post = await socialNetwork.methods.posts(i).call()
//         this.setState({
//           posts: [...this.state.posts, post]
//         })
//       }
//       // Sort posts. Show highest tipped posts first
//       this.setState({
//         posts: this.state.posts.sort((a,b) => b.tipAmount - a.tipAmount )
//       })
//       this.setState({ loading: false})
//     } else {
//       window.alert('SocialNetwork contract not deployed to detected network.')
//     }
//   }

//   

//   tipPost(id, tipAmount) {
//     this.setState({ loading: true })
//     this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account, value: tipAmount })
//     .once('receipt', (receipt) => {
//       this.setState({ loading: false })
//     })
//   }

//   constructor(props) {
//     super(props)
//     this.state = {
//       account: '',
//       socialNetwork: null,
//       postCount: 0,
//       posts: [],
//       loading: true
//     }

//     this.createPost = this.createPost.bind(this)
//     this.tipPost = this.tipPost.bind(this)
//   }

//   render() {
//     return (
//       <div>
//         <Navbar account={this.state.account} />
//         { this.state.loading
//           ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
//           : <Main
//               posts={this.state.posts}
//               createPost={this.createPost}
//               tipPost={this.tipPost}
//             />
//         }
//       </div>
//     );
//   }
// }

// export default App;
import React, { Component } from 'react';
import Identicon from 'identicon.js';
import Web3 from 'web3';
import './App.css';
import Navbar from'./Navbar';
import CSchool from './School';
import Main from './Main';
import Subject from './Subject';
import SocialNetwork from '../abis/SocialNetwork.json';
import School from '../abis/School.json';
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class App extends Component {
  
  async  componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
   async loadBlockchainData(){
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({account:accounts[0]})
    const networkId =await web3.eth.net.getId()
    const networkdatasocial =SocialNetwork.networks[networkId]
    const networkdataschool =School.networks[networkId]
    if(networkdatasocial) {
      console.log(networkId)
      const socialNetwork=web3.eth.Contract(SocialNetwork.abi,networkdatasocial.address)
      this.setState({socialNetwork})
      
      const postCount=await socialNetwork.methods.postcount().call()
      this.setState({postCount})
      console.log(postCount)

      //load subjectcount
      const subjectCount=await socialNetwork.methods.subjectcount().call()
      this.setState({subjectCount})

      // load schools
      const schoolc=web3.eth.Contract(School.abi,networkdataschool.address)
      this.setState({schoolc})
      
      //load schoolcount
      const schoolCount=await schoolc.methods.schoolcount().call()
      this.setState({subjectCount})

      //load post
      for (var i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call()

        this.setState({
          posts: [...this.state.posts, post]
        })
        console.log({posts:this.state.posts})
      }

      //load subjects
      for ( i = 1; i <= subjectCount; i++) {
        const subject = await socialNetwork.methods.subjects(i).call()

        this.setState({
          subjects: [...this.state.subjects, subject]
        })
        console.log({subjects:this.state.subjects})
      }

      //load schools
      
      for ( i = 1; i <= schoolCount; i++) {
        const school = await schoolc.methods.schoolstruct(i).call()                                                                                                                                                                                                                                                                                                            (i).call()

        this.setState({
          schools: [...this.state.schools, school]
        })
        console.log({schools:this.state.schools})
      }


       this.setState({loading:false})


    }
  
      
    else{
      window.alert('Social network contract not deployed to detected network')

    }

   }


  
   //create a new teacher profile
//    createPost(fname,age,degree,resumebuffer,photobuffer,content) {
//      let resultresume,resultphoto
//     ipfs.add(resumebuffer, (error, resultresume) => {
//       console.log('Ipfs result', resultresume)
//       if(error) {
//         console.error(error)
//         return
//       }
//       ipfs.add(photobuffer, (error, resultphoto) => {
//         console.log('Ipfs result', resultphoto)
//         if(error) {
//           console.error(error)
//           return
//       }
//       this.state.socialNetwork.methods.createPost(fname,age,degree,resultresume[0],resultphoto[0],content).send({ from: this.state.account })
//        .once('receipt', (receipt) => {
//      this.setState({ loading: false })
//   })
  
      
    
    
//   }

// }
//    }

//

onSubmitphoto=(photobuffer)=>{
  
  console.log("Submitting photo to ipfs...")
  ipfs.add(photobuffer, (error, result) => {
    console.log('Ipfs result', result)
    if(error) {
      console.error(error)
      return
    }
     
       return this.setState({ photobuffer: result[0].hash })
     
  })

}

onSubmitresume=(resumebuffer)=>{
  
  console.log("Submitting resume to ipfs...")
    ipfs.add(resumebuffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }
       
         return this.setState({ resumebuffer: result[0].hash })
         
       
    })
   
  
}







 onSubmitpost=(event,resumebuffer,photobuffer,name,age,degree,content)=>{
  event.preventDefault()
  this.onSubmitresume(resumebuffer)
  (this.onSubmitphoto(photobuffer).once(this.createPost(name,age,degree,this.state.resultresume,this.state.resultphoto,content)))
  
  
  
 
}

createPost(fname,age,degree,resultresume,resultphoto,content) {
      this.setState({ loading: true })
      this.state.socialNetwork.methods.createPost(fname,age,degree,resultresume,resultphoto,content).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
    }
  



  //register schools
  registerschool(name,location) {
    //this.setState({ loading: true })
    this.state.schoolc.methods.registerschool(name,location).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
    
    
  }
  //tip the teacher
  tipPost(id, tipAmount) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account, value: tipAmount })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }



  //fund school
  fundschool(id, tipAmount) {
    this.setState({ loading: true })
    this.state.schoolc.methods.fundschool(id).send({ from: this.state.account, value: tipAmount })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }




  // to tip books
  // tipPost(id, tipAmount) {
  //   this.setState({ loading: true })
  //   this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account, value: tipAmount })
  //   .once('receipt', (receipt) => {
  //     this.setState({ loading: false })
  //   })
  // }

  //to fund schools


  onSubmitsubject = (event,name,subjectbuffer) => {
    event.preventDefault()
    console.log(name)
    console.log("Submitting file to ipfs...")
    ipfs.add(subjectbuffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }
      console.log(result[0].hash)
       this.state.socialNetwork.methods.subjectupload(name,result[0].hash).send({ from: this.state.account })
       console.log(result[0].hash)
       console.log(this.subjectbuffer)
       
    })
    //call add subject 
    //this.subjectupload(name,this.state.subjectbuffer)
    
  }

  // captureFilesubject = (event) => {
  //   event.preventDefault()
  //   const file = event.target.files[0]
  //   const reader = new window.FileReader()
  //   reader.readAsArrayBuffer(file)
  //   reader.onloadend = () => {
  //     this.setState({ subjectbuffer: Buffer(reader.result) })
  //     console.log('subjectbuffer', this.state.subjectbuffer)
  //   }
  // }

  constructor(props){
      super(props)
      this.state={
        account:'',
        socialNetwork:null,
        schoolc:null,
        postCount:0, 
        subjectCount:0,
        schoolCount:0,
        posts: [],
        subjects:[],
        schools:[],
        loading:true,
        photobuffer:'',
        resumebuffer:'',
        subjectbuffer:''
      }
      this.createPost=this.createPost.bind(this)
      this.tipPost = this.tipPost.bind(this)
      

    }
   
  render(){
    return (
      <div>
     


      <Navbar account={this.state.account}/>

      {/* {this.state.loading
      ?<div id="loader" className="text-center mt-5"><p>loading......</p></div>
    :<div id="loader" className="text-center mt-5"> School reistration
    <CSchool schools={this.state.schools}
            registerschool={this.registerschool}
            />
        </div>

    } */}




    


      {this.state.loading
      ?<div id="loader" className="text-center mt-5"><p>loading......</p></div>
    :<div id="loader" className="text-center mt-5"> Teacher reistration
    <Main posts={this.state.posts}
            onSubmitpost={this.onSubmitpost}
            tipPost={this.tipPost}
            />
        </div>

    }

    {this.state.loading
      ?<div id="loader" className="text-center mt-5"><p>loading......</p></div>
      
    :<div id="loader" className="text-center mt-5">subject  reistration
    <Subject subjects={this.state.subjects}
            onSubmitsubject={this.onSubmitsubject}
            captureFilesubject={this.captureFilesubject}

            //tipPost={this.tipPost}
            />
             </div>
      }
     



            
            </div>
    );
  }
}

export default App;
