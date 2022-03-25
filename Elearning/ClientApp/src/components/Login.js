import React, { Component, useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './my-login.css';

export default function Login(props) {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const MySwal = withReactContent(Swal);

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
                MySwal.fire({
                    title: 'Successfully Logged In!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
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
        <div className="my-login-page">
            <section className="h-100">
                <div className="container h-100">
                    <div className="row justify-content-md-center h-100">
                        <div className="card-wrapper">
                            <div className="brand">
                                <img src="img/ncb-logo.png" alt="logo" />
                            </div>

                            <h3 className="company-name">E-learning University</h3>
                            {alert}
                            <div className="card fat">
                                <div className="card-body">
                                    <h4 className="card-title">Login</h4>
                                    <form onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <label for="studentId">Student ID</label>
                                            <input id="studentId" type="text" onChange={studentIdChangeHandler} className="form-control" name="studentId" required autofocus />
                                            <div className="invalid-feedback">
                                                Student ID is invalid
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="password">Password</label>
                                            <input id="password" type="password" onChange={passwordChangeHandler} className="form-control" name="password" required data-eye />
                                            <div className="invalid-feedback">
                                                Password is required
                                            </div>
                                        </div>

                                        <div className="form-group m-0">
                                            <button type="submit" className="btn btn-primary btn-block">
                                                Login
                                            </button>
                                        </div>
                                        <div className="mt-4 text-center">
                                            Don't have an account? <a className="a-link" onClick={() => props.history.push('/register')}>Register Now</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="footer">
                                Copyright &copy; 2022 &mdash; NCB E-learning University
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        );
}
