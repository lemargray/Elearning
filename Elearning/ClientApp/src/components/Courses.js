import React, { Component, useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import moment from 'moment';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useHistory } from 'react-router'

export default function Courses(props) {
    const [courses, setNewCourses] = useState([]);

    const MySwal = withReactContent(Swal);
    const history = useHistory();

    useEffect(() => {
        fetch("/api/courses", {
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

        console.log(data);

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
