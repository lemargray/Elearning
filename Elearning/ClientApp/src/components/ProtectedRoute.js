import React, { Component, useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { NavMenu } from './NavMenu';
import { Container } from 'reactstrap';

export const ProtectedRoute = ({ component: Component, ...rest }) => {

    const isAuthenticated = () => {
        let token = localStorage.getItem('token');
        return token != null && token != 'null' && token != '';
    }

    return (
        <Route {...rest}
            render={props => {
                if (isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to={{
                        pathname: "/login",
                        state: {
                            from: props.location
                        }
                    }}/>
                }
            }} />
    );
}
