import React, { Component, useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useHistory } from 'react-router'

import { objToQueryString } from '../utils/functions'

export default function AvailableCourses(props) {
    const [courses, setNewCourses] = useState([]);
    const [lecturer, setLecturer] = useState('');
    const [name, setName] = useState('');
    const [offeringDate, setOfferingDate] = useState('');

    const MySwal = withReactContent(Swal);
    const history = useHistory();

    useEffect(() => {
        const studentId = localStorage.getItem('studentId');

        fetch("/api/courses?studentId=" + studentId, {
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
            if (!response.ok) {
                response.json().then((json) => {
                    MySwal.fire({
                        title: 'An Error Occured!',
                        text: json.message,
                        icon: 'error',
                    });
                });
                return;
            }
            return response.json();
        }).then(function (data) {
            MySwal.fire({
                title: 'Subscribed Successfully!',
                icon: 'success',
            });

            var newCourses = courses.filter(function (c) { return c.courseId !== courseId });
            setNewCourses(newCourses);
        });
    }

    const searchHandler = (key, value) => {
        if (key == 'courseTile') {
            setName(value);
        } else if (key == 'lecturerName') {
            setLecturer(value);
        } else if (key == 'offeringDate') {
            setOfferingDate(value);
            value = value != '' && value != null ? moment(value).format("YYYY-MM-DD") : '';
        }

        const studentId = localStorage.getItem('studentId');

        let data = {
            studentId: studentId,
            courseTitle: name,
            lecturerName: lecturer,
            offeringDate: (offeringDate != '' && offeringDate != null) ? moment(offeringDate).format("YYYY-MM-DD") : ''
        };
        data[key] = value;

        let queryParams = objToQueryString(data);

        fetch("/api/courses?" + queryParams, {
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
            <td>{course.title}</td>
            <td>{course.lecturer}</td>
            <td>{moment(course.offeringDate).format('DD/MM/YYYY')}</td>
            <td><button onClick={() => subscribeToCourse(course.courseId, course.lecturerId, course.offeringDate)}>Subscribe</button></td>
        </tr>
    });    

    return (
        <div>
            <NavMenu studentId={props.studentId} logoutHandler={props.logoutHandler} />
            <Container>
                <div className="card">
                    <div className="card-body" style={{minHeight: '500px'}}>
                <h1 style={{ fontWeight: 100, letterSpacing: '2px', wordSpacing: '3px', margin: '30px 0' }}>Available Courses</h1>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Lecturer</td>
                            <td>Offering Date</td>
                            <td>Action</td>
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
