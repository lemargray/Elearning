import React, { Component, useState, useEffect, useHistory } from 'react';

export default function Register(props) {
    const [staffId, setStaffId] = useState('');
    const [staffName, setStaffName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //useEffect(() => {
    //    if (props.studentId != null) {
    //        window.location.replace('/');
    //        return;
    //    }
    //});

    const staffIdChangeHandler = (event) => {
        setStaffId(event.target.value);
    };

    const staffNameChangeHandler = (event) => {
        setStaffName(event.target.value);
    };

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const passwordConfirmationChangeHandler = (event) => {
        setPasswordConfirmation(event.target.value);
    };


    //let history = useHistory();

    const submitHandler = (event) => {
        event.preventDefault();

        var studentRegisterRequest = {
            staffId,
            name: staffName,
            email,
            password,
            passwordConfirmation,
        };

        fetch("/api/Auth/register", {
            method: "POST",
            body: JSON.stringify(studentRegisterRequest),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (!response.ok) {
                response.json().then((data) => {
                    console.log(data);
                    setErrorMessage(data.message);
                });

                return;
            }

            response.json().then((json) => {
                localStorage.setItem("token", json.data)
                setErrorMessage('');
                window.location.replace('/');
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
            <h1>Student Registration</h1>
            {alert}
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Staff Id</label>
                    <input type="text" onChange={staffIdChangeHandler} className="form-control" placeholder="Enter your staff id" />
                </div>
                <div className="form-group">
                    <label>Staff Name</label>
                    <input type="text" onChange={staffNameChangeHandler} className="form-control" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" onChange={emailChangeHandler} className="form-control" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={passwordChangeHandler} className="form-control" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" onChange={passwordConfirmationChangeHandler} className="form-control" placeholder="Confirm Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
