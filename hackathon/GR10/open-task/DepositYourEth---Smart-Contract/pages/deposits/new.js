import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import deposits from '../../ethereum/deposits';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';


class DepositIndex extends Component {
    state = {
      tenant: '',
      landlord: '',
      errorMessage: '',
      loading: false,
      PropertyNumber: '',
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });
        
      try {
         const landlord = '0x27f4Da501032af7978CCb0158dDfC552527eeAb2'
         const accounts = await web3.eth.getAccounts();
         await deposits.methods
         .depositEth(this.state.tenant, this.state.PropertyNumber)
         .send({ to: landlord,
              from: accounts[0], 
              value: web3.utils.toWei("0.05", "ether"),
            });
           
          //redirect user to new page with address inserted above:
          Router.pushRoute('/');
        } catch (err) {
          this.setState({ errorMessage: err.message});
        }
       
        this.setState({ loading: false});

    };
    

    render() {
        return (
            <Layout>
               <h3>Make a Deposit</h3>

               <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                   <Form.Field>
                       <label>tenant address:</label>
                       <Input
                        value={this.state.tenant}
                        onChange={(event) =>
                          this.setState({ tenant: event.target.value})}
                       /> 

                       <label>Property Number:</label>
                       <Input
                       type = "number"
                        value={this.state.PropertyNumber}
                        onChange={(event) =>
                          this.setState({ PropertyNumber: event.target.value})}
                       /> 

                   </Form.Field>

                       
               
               <Message error header='make sure you have sufficient funds in your account' content={this.state.errorMessage} />
               <h5>By clicking the create button you are agreeing to send "0.05 ether" to the landlord address</h5>
               <Button loading={this.state.loading} primary>Create</Button>
               </Form>
            </Layout>
        );
    }
}

export default DepositIndex;