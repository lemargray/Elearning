import React, { Component, useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export default function Profile(props) {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const studentId = localStorage.getItem('studentId');

        fetch("/api/students/" + studentId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            setProfile(data);
        })
    }, []);
    

    return (
        <div>
            <NavMenu studentId={props.studentId} logoutHandler={props.logoutHandler} />
            <Container>
                <div className="card">
                    <div className="card-body" style={{ minHeight: '500px' }}>
                <h1 style={{ fontWeight: 100, letterSpacing: '2px', wordSpacing: '3px', margin: '30px 0' }}>My Profile</h1>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td><b>Name</b></td><td>{profile.name}</td>
                        </tr>
                        <tr>
                            <td><b>Email</b></td><td>{profile.email}</td>
                        </tr>
                    </tbody>
                        </table>
                    </div>
                    </div>
            </Container>
        </div>
    );
}
