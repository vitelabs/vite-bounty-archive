import React, { Component } from "react";
import { Card, Button } from 'semantic-ui-react';
import deposits from "../ethereum/deposits";
import 'semantic-ui-css/semantic.min.css';
import Layout from "../components/Layout";
import { Link } from '../routes';


class DepositIndex extends Component {
  static async getInitialProps() {
    const depositsAddress = await deposits.methods.getDepositors().call();    
    return { depositsAddress };
  }

  renderDeposits() {
     const items = this.props.depositsAddress.map(address => {
       return {
         header: address,
         description: (
         <Link route={`/deposits/${address}`}>
          <a> VIEW DEPOSIT</a>
          </Link>
          ),
         fluid: true
       };
     });
      return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
    <div>
     
      <h3>DEPOSITS MADE:</h3>
      <Link route="/deposits/new">
        <a>
      <Button
        floated="right"
        content="MAKE A DEPOSIT"
        icon="add circle"
        primary
      />
      </a>
      </Link>

        {this.renderDeposits()}
      </div>
    </Layout>
    );
  }
}

export default DepositIndex;