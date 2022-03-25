import React, { Component, useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import { objToQueryString } from '../utils/functions'

export default function Courses(props) {
    const [subscriptions, setSubscriptions] = useState([]);
    const [name, setName] = useState('');
    const [lecturer, setLecturer] = useState('');
    const [dateOffered, setDateOffered] = useState('');
    const [dateSubscribed, setDateSubscribed] = useState('');

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

    const searchHandler = (key, value) => {
        const studentId = localStorage.getItem('studentId');

        if (key == 'courseTile') {
            setName(value);
        } else if (key == 'lecturerName') {
            setLecturer(value);
        } else if (key == 'dateOffered') {
            setDateOffered(value);
            value = value != '' && value != null ? moment(value).format("YYYY-MM-DD") : '';
        } else if (key == 'dateSubscribed') {
            setDateSubscribed(value);
            value = value != '' && value != null ? moment(value).format("YYYY-MM-DD") : '';
        }

        let data = {
            courseTitle: name,
            lecturerName: lecturer,
            dateOffered: (dateOffered != '' && dateOffered != null) ? moment(dateOffered).format("YYYY-MM-DD") : '',
            dateSubscribed: (dateSubscribed != '' && dateSubscribed != null) ? moment(dateSubscribed).format("YYYY-MM-DD") : ''
        };
        data[key] = value;

        let queryParams = objToQueryString(data);

        fetch("/api/students/" + studentId + "/courses?" + queryParams, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            setSubscriptions(data);
        })
    };
    
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
                            <tr>
                                <td><input onChange={(e) => searchHandler('courseTitle', e.target.value)} type="text" /></td>
                                <td><input onChange={(e) => searchHandler('lecturerName', e.target.value)} type="text" /></td>
                                <td><DatePicker selected={dateOffered} dateFormat="dd/MM/yyyy" onChange={(date) => searchHandler('dateOffered', date)} /></td>
                                <td><DatePicker selected={dateSubscribed} dateFormat="dd/MM/yyyy" onChange={(date) => searchHandler('dateSubscribed', date)} /></td>
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
