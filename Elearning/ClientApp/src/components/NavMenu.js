import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    logoutHandler() {
        localStorage.clear();
        window.location.href = "/login";
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/"><img style={{width:'80px'}} src="/img/ncb-logo.png"/>E-learning University</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Search Courses</NavLink>
                                </NavItem> 
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/courses">Available Courses</NavLink>
                                </NavItem> 
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/subscriptions">Subscriptions</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="text-dark pointer" onClick={this.logoutHandler}>Logout</NavLink>
                                </NavItem>                                    
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
