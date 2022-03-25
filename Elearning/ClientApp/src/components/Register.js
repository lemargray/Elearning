import React, { Component, useState, useEffect, useHistory } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './my-login.css';

export default function Register(props) {
    const [staffId, setStaffId] = useState('');
    const [staffName, setStaffName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const MySwal = withReactContent(Swal);

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
                MySwal.fire({
                    title: 'Successfully Logged In!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
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
        <div className="my-login-page">
            <section className="h-100">
                <div className="container h-100">
                    <div className="row justify-content-md-center h-100">
                        <div className="card-wrapper">
                            <div className="brand">
                                <img src="img/ncb-logo.png" alt="bootstrap 4 login page" />
                            </div>
                            <h3 className="company-name">E-learning University</h3>
                            {alert}
                            <div className="card fat">
                                <div className="card-body">
                                    <h4 className="card-title">Register</h4>
                                    <form onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <label for="staffId">Staff ID</label>
                                            <input id="staffId" type="text" onChange={staffIdChangeHandler} className="form-control" name="staffId" required autofocus />
                                            <div className="invalid-feedback">
                                                Please enter your staff id
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label for="name">Staff Name</label>
                                            <input id="name" type="text" onChange={staffNameChangeHandler} className="form-control" name="name" required autofocus />
                                            <div className="invalid-feedback">
                                                What's your name?
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="email">E-Mail Address</label>
                                            <input id="email" type="email" onChange={emailChangeHandler} className="form-control" name="email" required />
                                            <div className="invalid-feedback">
                                                Your email is invalid
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="password">Password</label>
                                            <input id="password" type="password" onChange={passwordChangeHandler} className="form-control" name="password" required data-eye />
                                            <div className="invalid-feedback">
                                                Password is required
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label for="passwordConfirmation">Confirm Password</label>
                                            <input id="passwordConfirmation" type="password" onChange={passwordConfirmationChangeHandler} className="form-control" name="passwordConfirmation" required data-eye />
                                            <div className="invalid-feedback">
                                                Please confirm your password
                                            </div>
                                        </div>

                                        <div className="form-group m-0">
                                            <button type="submit" className="btn btn-primary btn-block">
                                                Register
                                            </button>
                                        </div>
                                        <div className="mt-4 text-center">
                                            Already have an account?  <a className="a-link" onClick={() => props.history.push('/login')}>Login</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="footer">
                                Copyright &copy; 2022 &mdash; NCB E-learing University
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
