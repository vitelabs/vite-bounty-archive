import {Navbar, Container, Nav, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import routes from '../../../router/routeList';
import './styles.css';
import Web3 from "web3";
import React from 'react'
import {AuthContext} from "../../../providers/authProvider";
import contract from '../../../contract/contract.json'


const NavBarComponent = () => {
	const [connect, setConnect] = React.useState("Connect with MetaMask")
	const {state, dispatch} = React.useContext(AuthContext)
	const init = async () => {
		if (window.ethereum?.isMetaMask) {
			const accounts = await window.ethereum.request({
				method: 'eth_requestAccounts'
			})
			const networkId = await window.ethereum.request({
				method: "net_version"
			})
			// 4 for testing 1 for mainnet
			if (networkId == 4) {
				let web3 = new Web3(window.ethereum);
				setConnect(`${accounts[0].substr(0, 9)}...`)
				dispatch({
					type: 'SET_ACCOUNT', payload: {
						...state,
						connected: true,
						account: accounts[0],
						contract: new web3.eth.Contract(contract.abi, contract.address)
					}
				})
			} else {
				setConnect('Switch to Rinkeby')
				dispatch({type: 'SET_ACCOUNT', payload: {...state, status: "You are on a different network."}})
			}
		} else {
			setConnect('You need MetaMask')
			dispatch({type: 'SET_ACCOUNT', payload: {...state, status: "You need metamask."}})
		}
	}

	console.log(state)

	return (
		<div className="App">
			<header className="App-header">
				<Navbar expand="lg">
					<Container>
						<Navbar.Brand >
							<div className="Brand">
								<img className="photo" src="/images/logo3.png" alt="Logo"/>
								<Link className="Brand-Link" to={routes.landing}> DiviDAO </Link>
							</div>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav"/>
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav style={{
								display: "flex",
								width: "100%",
								justifyContent: "space-between",
								alignItems: "center"
							}}>
								<Nav.Link className="link" href={routes.landing}> Home </Nav.Link>
								<Nav.Link className="link" href={routes.explore}> Explore </Nav.Link>
								<Nav.Link className="link" href={routes.propertyCreate}> Create </Nav.Link>
								<Nav.Link className="link" href={routes.signIn}> About </Nav.Link>
								<a href="https://twitter.com/divi_dao">
									<img className="photo" src="/images/discord.png" alt="Logo"/>
								</a>
								<a href="https://twitter.com/divi_dao">
									<img className="photo" src="/images/twitter.png" alt="Logo"/>
								</a>
								<Button id="Landing-Button" onClick={init}> {connect} </Button>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
		</div>
	);
}

export default NavBarComponent;
