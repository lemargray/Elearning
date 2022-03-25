import React, { Component, useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import { objToQueryString } from '../utils/functions'

export default function Search(props) {
    const [courses, setNewCourses] = useState([]);
    const [name, setName] = useState('');
    const [lecturer, setLecturer] = useState('');
    const [offeringDate, setOfferingDate] = useState('');

    useEffect(() => {
        fetch("/api/courses/search", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            setNewCourses(data);
        })
    }, []);

    const subscribeToCourse = (courseId, lecturerId, offeringdate) => {
        const studentId = localStorage.getItem('studentId');

        var data = {
            CourseId: courseId,
            LecturerId: lecturerId,
            OfferingDate: offeringdate
        };

        fetch("/api/students/" + studentId + "/courses", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(function (response) {
            return response.json();
        });
    }

    const searchHandler = (key, value) => {
        console.log(value);
        if (key == 'courseTile') {
            setName(value);
        } else if (key == 'lecturerName') {
            setLecturer(value);
        } else if (key == 'offeringDate') {
            setOfferingDate(value);
            value = value != '' && value != null ? moment(value).format("YYYY-MM-DD") : '';
        }

        let data = {
            courseTitle: name,
            lecturerName: lecturer,
            offeringDate: (offeringDate != '' && offeringDate != null) ? moment(offeringDate).format("YYYY-MM-DD") : ''
        };
        data[key] = value;

        let queryParams = objToQueryString(data);

        fetch("/api/courses/search?" + queryParams, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            setNewCourses(data);
        })
    };

    const dataTrs = courses.map(function (course, index) {
        return <tr key={index}>
            <td>{course.name}</td>
            <td>{course.lecturer}</td>
            <td>{moment(course.offeringDate).format('DD/MM/YYYY')}</td>
        </tr>
    });    

    return (
        <div>
            <NavMenu studentId={props.studentId} logoutHandler={props.logoutHandler} />
            <Container>
                <div className="card">
                    <div className="card-body" style={{ minHeight: '500px' }}>
                <h1 style={{ fontWeight: 100, letterSpacing: '2px', wordSpacing: '3px', margin: '30px 0' }}>Search Courses</h1>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Lecturer</td>
                            <td>Offering Date</td>
                        </tr>
                        <tr>
                            <td><input onChange={(e) => searchHandler('courseTitle', e.target.value)} type="text" /></td>
                            <td><input onChange={(e) => searchHandler('lecturerName', e.target.value)} type="text" /></td>
                            <td><DatePicker selected={offeringDate} dateFormat="dd/MM/yyyy" onChange={(date) => searchHandler('offeringDate', date)} /></td>
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
