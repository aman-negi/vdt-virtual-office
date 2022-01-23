import React, { Component } from 'react'

//import history from '../../history';
import "../../css/homepage.css";


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.NavigatetoSignUp = this.NavigatetoSignUp.bind(this);
        this.NavigatetoLogin = this.NavigatetoLogin.bind(this);
      }

    NavigatetoLogin(e) {
        e.preventDefault();
        this.props.history.push("./login");
    }

    NavigatetoSignUp(e) {
        e.preventDefault();
        this.props.history.push("./signup");
    }

    render() {
        return (
            <div>
                <header id="showcase" className="showcase">
                    <div className="bg-img">
                    </div>
                    <br></br>
                    <div className="Heading">
                        VDT OFFICES
                    </div>
                    <br />
                    <br />
                    <h4 style={{ color: "grey" }}>
                        Make your Own Virtual Office <br />to<br /> handle your company online
                    </h4>
                    <br />
                    <div className="button">
                        <div className="buttons">
                            <button className="btn" onClick={this.NavigatetoLogin}>
                                Sign In
                            </button>
                        </div>
                        <div className="buttons">
                            <button className="btn" onClick={this.NavigatetoSignUp}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </header>
                <section id="Features">
                    <div className="heading">
                        Features
                    </div>
                    <div className="features">
                        <div className="features-child">
                            <div className="features-heading">
                                Dashboard
                            </div>
                            <div className="features-definition">
                                <ul>
                                    <li>Navigate toward the department</li>
                                    <li>Contact To any department</li>
                                    <li>Admin Department to control office</li>
                                </ul>
                            </div>
                        </div>
                        <div className="features-child">
                            <div className="features-heading">
                                Attendance Services
                            </div>
                            <div className="features-definition">
                                Get the duration of any person working in the admin department.
                                This feature allow company to monitor the attendance of thier employees.
                            </div>
                        </div>

                        <div className="features-child">
                            <div className="features-heading">
                                Salary calculator
                        </div>
                            <div className="features-definition">
                                This services allows company to calculate the salary of the person through
                                per hour concept and per day concept as per the company need.

                        </div>
                        </div>
                        <div className="features-child">
                            <div className="features-heading">
                                Notice Board
                        </div>
                            <div className="features-definition">
                                Get the company notices Here for at per the section criteria.
                        </div>
                        </div>
                        <div className="features-child">
                            <div className="features-heading">
                                Project {'&'} Task
                        </div>
                            <div className="features-definition">
                                Get a complete Project {"&"} Task management system for every employees.
                                To give them tasks {"&"} handle their projects easily.
                            </div>
                        </div>
                    </div>
                </section>
                <section id="Application">
                    <div className="heading">
                        <div className="heading-style">
                            Application
                        </div>
                    </div>
                    <div className="applications">
                        <div>
                            <ul className="applications-list">
                                <li className="applications-lists">
                                    Could be use to give the employees the task for the day.
                                </li>
                                <li className="applications-lists">
                                    Could be used to handle projects.
                                </li>
                                <li className="applications-lists">
                                    Could be used to handle departments.
                                </li>
                                <li className="applications-lists">
                                    Could be used to deal with client contact them or integrate their team with yours
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section id="explanation">
                    <div className="heading">
                        <div>
                            Q{"&"}A
                        </div>
                    </div>
                    <div className="quesAns">
                        <div className = "quesAns-child">
                            <div className="question">
                                What is A Virtual Office ?
                            </div>
                            <div className="answer">
                                A virtual office is part of the flexible workspace industry that provides businesses
                                with any combination of services, space and/or technology. A Virtual office is best
                                for the companies to handle work from home {'&'} also they can completely operate their
                                company through it.
                            </div>
                        </div>
                        <div className = "quesAns-child">
                            <div className="question">
                                How's our Virtual Office different from others ?
                            </div>
                            <div className="answer">
                                Our virtual office has many different features that any company office should or must have.
                                We do have some additional features that automatically help you reduce the extra work {"&"} extra efforts.
                            </div>
                        </div>
                        {/*
                        <div className = "quesAns-child">
                            <div className="question">
                                How's our Virtual Office different from others ?
                            </div>
                            <div className="answer">
                                Our virtual office has many different features that any company office should or must have.
                                We do have some additional features that automatically help you reduce the extra work {"&"} extra efforts.
                            </div>
                        </div>
                        */}
                    </div>
                </section>
            </div>
        )
    }
}

