import React, { Component, useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

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
            console.log(data);
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

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const searchHandler = () => {
        let data = {
            courseTitle: name,
            lecturerName: lecturer,
            offeringDate: offeringDate != '' ?moment(offeringDate).format("YYYY-MM-DD") : ''
        };
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

    function objToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }

    const dataTrs = courses.map(function (course, index) {
        return <tr key={index}>
            <td>{course.name}</td>
            <td>{course.lecturer}</td>
            <td>{moment(course.offeringDate).format('DD/MM/YYYY')}</td>
            <td></td>
            {/*<td><button onClick={() => subscribeToCourse(course.courseId, course.lecturerId, course.offeringdate)}>Subscribe</button></td>*/}
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
                            <td></td>
                        </tr>
                        <tr>
                            <td><input onChange={(e) => setName(e.target.value)} type="text" /></td>
                            <td><input onChange={(e) => setLecturer(e.target.value)} type="text" /></td>
                            <td><DatePicker selected={offeringDate} dateFormat="dd/MM/yyyy" onChange={(date) => setOfferingDate(date)} /></td>
                            <td><button onClick={searchHandler}>Search</button></td>
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
