import React, { Component, useState } from 'react';
import AvailableCourses from './components/AvailableCourses';
import Register from './components/Register';
import Subscriptions from './components/Subscriptions';
import Profile from './components/Profile';
import Login from './components/Login';
import Search from './components/Search';

import './custom.css'
import { ProtectedRoute } from './components/ProtectedRoute';
import { UnprotectedRoute } from './components/UnprotectedRoute';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ProtectedRoute exact path='/' component={Search} />
                <ProtectedRoute path='/courses' component={AvailableCourses} />
                <ProtectedRoute path='/subscriptions' component={Subscriptions} />
                <ProtectedRoute path='/profile' component={Profile} />
                <UnprotectedRoute path='/register' component={Register} />
                <UnprotectedRoute path='/login' component={Login} />
            </div>
        );
    }
}
