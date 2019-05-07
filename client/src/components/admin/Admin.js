import React, { Component } from 'react';
import { Row,FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import './admin.css';
import { isEmpty } from '../../shared/validator';
import Election from "../../contracts/Election.json";
import getWeb3 from "../../utils/getWeb3";
// import Web3 from 'web3'
class Admin extends Component {
    constructor(props) {
        super(props)        
        this.state = {
            
            hassession:sessionStorage.getItem('user'),
            hasaadhar:sessionStorage.getItem('aadhar'),
            formData: {}, 
            formSubmitted: false,
            loading: false ,
            storageValue2: 0, web3: null, accounts: null, contract: null,
            storageValue1:0,storageValue3:0,storageValue4:0
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
    
          
          this.setState({ web3, accounts, contract: instance },this.runExample);
        } catch (error) {
          // Catch any errors for any of the above operations.
          // alert(
          //   `Failed to load web3, accounts, or contract. Check console for details.`,
          // );
          console.error(error);
        }
      };
    
      runExample = async () => {
        const {  contract } = this.state;

        const response1 = await contract.methods.get(11111111).call();
        const response2 = await contract.methods.get(22222222).call();
        const response3 = await contract.methods.get(33333333).call();
        const response4 = await contract.methods.get(44444444).call();
        this.setState({ storageValue1: response1 });
        this.setState({ storageValue2: response2 });
        this.setState({ storageValue3: response3 });
        this.setState({ storageValue4: response4 });
      };
        addvoter = async (e) => {
            e.preventDefault();
            const { formData } = this.state;                
            if (isEmpty(formData.name)) {
                alert("name can't be blank");
                
            }else if (isEmpty(formData.aadhar)) {
                alert("aadhar can't be blank");
                
            } else{
                  
                    const { accounts, contract } = this.state;
                    await contract.methods.registerVoter(formData.aadhar,formData.name).send({ from: accounts[0] });                    
            }
      };
      startvoting = async () => {
        // e.preventDefault();
        const { accounts, contract } = this.state;
        await contract.methods.startElection().send({ from: accounts[0] });                    
        const response4 = await contract.methods.electionsState().call();

        this.setState({ storageValue1: response4 });
    };
    endvoting = async () => {
        // e.preventDefault();
        const { accounts, contract } = this.state;
        await contract.methods.endElection().send({ from: accounts[0] });                    
        const response4 = await contract.methods.electionsState().call();

        this.setState({ storageValue1: response4 });
    };
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

  render() {
    // const data =[{"lang":"ironman","val":"11111111"},{"lang":"captainAmreica","val":"22222222"},{"lang":"pepper","val":"33333333"}];
    // const listItems = data.map((d) =><ul className="Label">{d.lang}</ul> );

    return (
        <div>
        <h1 class="login-header">Admin Page</h1>

      <div className="Admin ">
        <Row>
            
            <button class="Givemepad" onClick={this.startvoting}>Start Voting</button>
            <button onClick={this.endvoting}>Stop Voting</button>
        </Row>
        <br/><hr/>
        <Row>
            <h2>Vote Count</h2>
            <ul>
                <li>Bhartiya janata Party :-- {this.state.storageValue1}</li>
                <li>Congress :-- {this.state.storageValue2}</li>
                <li>NDA :-- {this.state.storageValue3}</li>
                <li>NOTA :-- {this.state.storageValue4}</li>
            </ul>
            <button onClick={this.runExample}>update</button>
        </Row>
        <br/><hr/>

        <Row>
        <h2>Add Voter</h2>
                    <form onSubmit={this.addvoter}>
                        <FormGroup controlId="email">
                          
                            <FormControl type="text" name="name" placeholder="Enter name" onChange={this.handleInputChange} />
                   
                        </FormGroup >
                        <br/>
                        <FormGroup controlId="email">
                     
                            <FormControl type="text" name="aadhar" placeholder="Enter aadhar" onChange={this.handleInputChange} />
                   
                        </FormGroup >
                        <Button type="submit" bsStyle="primary">add</Button>
                        
                    </form>
        </Row>
      </div>
      </div>
    );
  }
}

export default Admin;