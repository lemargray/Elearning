import React, { Component, useState } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import Courses from './components/Courses';
import Register from './components/Register';
import Subscriptions from './components/Subscriptions';
import Profile from './components/Profile';
import Login from './components/Login';
import Search from './components/Search';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'
import { ProtectedRoute } from './components/ProtectedRoute';
import { UnprotectedRoute } from './components/UnprotectedRoute';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            studentId: localStorage.getItem('studentId')
        };
        this.loginHandler = this.loginHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
    }

    logoutHandler() {
        localStorage.clear();
    }

    loginHandler(studentId) {
        this.setState({ studentId });
    }

    render() {
        return (
            <div>
                <ProtectedRoute exact path='/' component={() => <Search logoutHandler= { this.logoutHandler } />} />
                <ProtectedRoute path='/courses' component={Courses} />
                <ProtectedRoute path='/subscriptions' component={Subscriptions} />
                <ProtectedRoute path='/profile' component={Profile} />
                <UnprotectedRoute path='/register' component={Register} />
                <UnprotectedRoute path='/login' component={Login} />
            </div>
        );
    }
}
