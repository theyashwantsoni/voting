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
            storageValue1:0,storageValue3:0
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

        this.setState({ storageValue1: response1 });
        this.setState({ storageValue2: response2 });
        this.setState({ storageValue3: response3 });
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
      <div className="Admin">
        <h2>Admin Page</h2>
        <Row>
           
                <Button className="Givemepad" type="submit" bsStyle="primary">start voting</Button>
        
                <Button type="submit" bsStyle="primary">stop voting</Button>
            
        </Row>
        <br/><hr/>
        <Row>
            <h2>Vote Count</h2>
            <ul>
                <li>ironman :-- {this.state.storageValue1}</li>
                <li>cap :-- {this.state.storageValue2}</li>
                <li>pepper :-- {this.state.storageValue3}</li>
            </ul>
            <button onClick={this.runExample}>update</button>
        </Row>
        <br/><hr/>
        {/* <Row>
        <h2>add Candidate</h2>

                    <form >
                        <FormGroup controlId="email">
                            <ControlLabel>name</ControlLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                   
                        </FormGroup >
                        <FormGroup controlId="email">
                            <ControlLabel>aadhar</ControlLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                   
                        </FormGroup >
                        <Button type="submit" bsStyle="primary" disabled>add</Button>
                        
                    </form>
        </Row>
        <br/><hr/> */}
        <Row>
        <h2>add voter</h2>
                    <form onSubmit={this.addvoter}>
                        <FormGroup controlId="email">
                            <ControlLabel>name</ControlLabel>
                            <FormControl type="text" name="name" placeholder="Enter name" onChange={this.handleInputChange} />
                   
                        </FormGroup >
                        <FormGroup controlId="email">
                            <ControlLabel>aadhar</ControlLabel>
                            <FormControl type="text" name="aadhar" placeholder="Enter aadhar" onChange={this.handleInputChange} />
                   
                        </FormGroup >
                        <Button type="submit" bsStyle="primary">add</Button>
                        
                    </form>
        </Row>
      </div>
    );
  }
}

export default Admin;