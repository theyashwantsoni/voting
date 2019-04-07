import React, { Component } from 'react';
import { Row, FormGroup, FormControl, Button } from 'react-bootstrap';
import './home.css';
import {  isEmpty } from '../../shared/validator';
import Election from "../../contracts/Election.json";
import getWeb3 from "../../utils/getWeb3";
// import Web3 from 'web3'
class Home extends Component {
    constructor(props) {
        super(props)        
        this.state = {
            
            hassession:sessionStorage.getItem('user'),
            hasaadhar:sessionStorage.getItem('aadhar'),
            formData: {}, 
            formSubmitted: false,
            loading: false ,
            storageValue: 0, web3: null, accounts: null, contract: null
        };
    } 
    componentDidMount = async () => {
        try {
          const web3 = await getWeb3();
    
          const accounts = await web3.eth.getAccounts();
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = Election.networks[networkId];
          const instance = new web3.eth.Contract(
            Election.abi,
            deployedNetwork && deployedNetwork.address,
          );
    
          
          this.setState({ web3, accounts, contract: instance });
        } catch (error) {
          // Catch any errors for any of the above operations.
          // alert(
          //   `Failed to load web3, accounts, or contract. Check console for details.`,
          // );
          console.error(error);
        }
      };
    
      // runExample = async () => {
      //   const { accounts, contract } = this.state;
    
      //   await contract.methods.set(1000).send({ from: accounts[0] });
    
      //   const response = await contract.methods.get().call();
    
      //   this.setState({ storageValue: response });
      // };
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }
    castvote = async (e) => {
        
        e.preventDefault();
        const { formData } = this.state;
        // const { history } = this.props;
            
        if (isEmpty(formData.vote)) {
            alert("vote can't be blank");
            
        } else{
                alert(formData.vote+"----"+formData.aadhar);
                const { accounts, contract } = this.state;
                await contract.methods.castVote(formData.aadhar,formData.vote).send({ from: accounts[0] });
                // const response = await contract.methods.get(formData.vote).call();
                
        }

    }
  render() {
    if (!this.state.web3) {
        return <div>Loading Web3, accounts, and contract...</div>;
      }
    const data =[{"lang":"ironman","val":"11111111"},{"lang":"captainAmreica","val":"22222222"},{"lang":"pepper","val":"33333333"}];
    const listItems = data.map((d) =><label className="Label"><input type="radio" name="vote" onChange={this.handleInputChange}  value={d.val}/>{d.lang}</label> );
    return (
      <div>
                <h2 class="login-header">Home Page</h2>
                <marquee>Welcome To blockchain based voting system</marquee>
                <p>welcome {sessionStorage.getItem('user') && (JSON.stringify(sessionStorage.getItem('user')))}</p>
        {/* <p>pass :-- {sessionStorage.getItem('aadhar') && (JSON.stringify(sessionStorage.getItem('aadhar')))}</p> */}
      <div className=" Home">
      {/* <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div> */}
        

         
        <Row>
                    <form onSubmit={this.castvote}>
                    <p><FormGroup controlId="aadhar" class="text-input">
                            <FormControl type="text" name="aadhar"id="input1" placeholder="Enter your aadhar" onChange={this.handleInputChange} />
                        {/* { errors.email && 
                            <HelpBlock>{errors.aadhar}</HelpBlock> 
                        } */}
                   
                        </FormGroup ></p>
                        <b>vote - Who will die in endgame?</b> <br/>
                                               
                        {listItems}
                    
                        <Button type="submit" bsStyle="primary">cast vote</Button>
                        
                    </form>
        </Row>
      </div>
      </div>
    );
  }
}

export default Home;