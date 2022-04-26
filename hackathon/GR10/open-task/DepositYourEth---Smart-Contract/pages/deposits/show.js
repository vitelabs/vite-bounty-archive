import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Card, Button, Form, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Deposit from '../../ethereum/deposit';
import web3 from '../../ethereum/web3';
import deposits from '../../ethereum/deposits';

class DepositIndex extends Component {
  
  state = {
    tenant: '',
    landlord: '',
    errorMessage: '',
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    
    this.setState({ loading: true, errorMessage: '' });
    
  try {
     const landlord = '0x27f4Da501032af7978CCb0158dDfC552527eeAb2'
     const accounts = await web3.eth.getAccounts();
     const { address } = this.props;
     await deposits.methods
     .Withdraw(address)
     .send({ to: address,
          from: landlord, 
          value: web3.utils.toWei("0.05", "ether"),
        });
       
    } catch (err) {
      this.setState({ errorMessage: err.message});
    }
   
    this.setState({ loading: false});

};

  static async getInitialProps(props) {
    const deposit = Deposit(props.query.address);
    return { 
      address: props.query.address        };
  }
   
 renderProperty() {
   const { address } = this.props;
   const items = [
     {
      header: address,
      description: 'ADDRESS OF DEPOSITOR',
      style: { overflowWrap: 'break-word'}

    },
      {
        header: '0.5 ETHER',
        description: 'DEPOSIT AMOUNT'
    }
    ];
   return <Card.Group items={items} />;

 }

 render() {
   return (
     <Layout>
   <div>
    
     <h3>DEPOSIT DETAILS:</h3>
     <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
     <Button 
       loading={this.state.loading}
       floated="right"
       icon="add circle"
       primary>WITHDRAW  ETHER <br></br> (RESTRICTED    TO    LANDLORD)</Button>
       <Message error header='something went wrong...' content={this.state.errorMessage} />
     </Form>
        {this.renderProperty()}
      </div>
   </Layout>
   );
 }

}

export default DepositIndex;