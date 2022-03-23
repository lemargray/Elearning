import React, { Component, useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import moment from 'moment';

export default function Courses(props) {
    const [ subscriptions, setSubscriptions ] = useState([]);

    useEffect(() => {
        const studentId = localStorage.getItem('studentId');

        fetch("/api/students/" + studentId + "/courses", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            setSubscriptions(data);
        })
    }, []);

    
    const dataTrs = subscriptions.map(function (subscription, index) {
        return <tr key={index}>
            <td>{subscription.name}</td>
            <td>{subscription.lecturer}</td>
            <td>{moment(subscription.dateOffered).format('DD/MM/YYYY')}</td>
            <td>{moment(subscription.dateSubscribed).format('DD/MM/YYYY')}</td>
        </tr>
    });
    

    return (
        <div>
            <NavMenu studentId={props.studentId} logoutHandler={props.logoutHandler} />
            <Container>
                <div className="card">
                    <div className="card-body" style={{ minHeight: '500px' }}>
                <h1 style={{ fontWeight: 100, letterSpacing: '2px', wordSpacing: '3px', margin: '30px 0' }}>My Subscriptions</h1>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>Course Title</td>
                            <td>Lecturer</td>
                            <td>Date Offered</td>
                            <td>Date Subscribed</td>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTrs}
                    </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        </div>
    );
}
