import React, { Component, useState, useEffect } from 'react';

export default function Login(props) {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //useEffect(() => {
    //    if (props.studentId != null) {
    //        window.location.replace('/');
    //        return;
    //    }
    //});

    const studentIdChangeHandler = (event) => {
        setStudentId(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        var studentLoginRequest = {
            studentId,
            password,
        };

        fetch("/api/Auth/login", {
            method: "POST",
            body: JSON.stringify(studentLoginRequest),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (!response.ok) {
                response.json().then((data) => {
                    if (data.message == null || data.message == undefined) {
                        setErrorMessage("All fields are required");
                    } else {
                        setErrorMessage(data.message);
                    }
                });

                return;
            }

            response.json().then((json) => {
                localStorage.setItem("token", json.data.token);
                localStorage.setItem("studentId", json.data.studentId);
                props.history.push('/');
                //props.loginHandler(json.data.studentId);
            });
        });
    };


    let alert = '';
    if (errorMessage != '') {
        alert = <div className="alert alert-danger" role="alert" >
            {errorMessage}
        </div>;
    }
    

    return (
        <div>
            <h1>Student Login</h1>
            {alert}
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Student Id</label>
                    <input type="text" required onChange={studentIdChangeHandler} className="form-control" placeholder="Enter your student id" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" required onChange={passwordChangeHandler} className="form-control" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button> <a style={{cursor:'pointer', color: 'blue', marginLeft: '20px'}} onClick={() => props.history.push('/register')}>Register</a>
            </form>
        </div>
    );
}
