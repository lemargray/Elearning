import React, { Component, useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

export const UnprotectedRoute = ({ component: Component, ...rest }) => {

    const isAuthenticated = () => {
        let token = localStorage.getItem('token');
        return token != null && token != 'null' && token != '';
    }

    return (
        <Route {...rest}
            render={props => {
                if (!isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to={{
                        pathname: "/",
                        state: {
                            from: props.location
                        }
                    }}/>
                }
            }} />
    );
}
