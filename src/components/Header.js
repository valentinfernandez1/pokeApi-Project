import { Component } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
} from 'reactstrap';
import * as FaIcons from 'react-icons/fa';
import { CgPokemon } from 'react-icons/cg';
import {NavLink} from 'react-router-dom';


class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isToggle: false
		}
		this.toggleNavbar = this.toggleNavbar.bind(this);
	}

	toggleNavbar() {
		this.setState({ isToggle: !this.state.isToggle })
	};

	render() {
		return (
			<>
				<Navbar color="danger" light expand="md">
					<NavbarBrand href="/">PokeApi<CgPokemon /></NavbarBrand>
					<NavbarToggler onClick={this.toggleNavbar} />
					<Collapse isOpen={this.state.isToggle} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink className='nav-link mr-2' to='/search'><FaIcons.FaSearch className='mr-1'/>Buscar Pokemon</NavLink>
							</NavItem>
							
							<NavItem>
								<NavLink className='nav-link mr-2' to="/teams"><FaIcons.FaDragon className='mr-1' /> Mis Equipos </NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
			</>
		);
	}
}

export default Header;
