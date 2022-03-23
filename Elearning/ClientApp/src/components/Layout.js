import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
        <div>
            {this.props.noNavMenu ? '' :
            <NavMenu studentId={this.props.studentId} logoutHandler={this.props.logoutHandler} />
            }
            <Container>
              {this.props.children}
            </Container>
      </div>
    );
  }
}
