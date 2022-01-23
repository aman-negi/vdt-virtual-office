import React, { Component } from "react";
import LeftSidebar from ".././LeftSidebar";
import { firestore, secondaryAppAuth } from "../../../initfirebase";
import "../../../css/add-department.css";
import firebase from 'firebase/app';
import ReactLoading from "react-loading";

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // DepartmentId: "",
      Contact: "",
      // DepartmentName : "",
      Post: "",
      Name: "",
      email: "",
      CompanyId: this.props.location.state.CompanyState.CompanyId,
      Password: "",
      ConfirmPassword: "",
      loading: true,
      rank: "1",
      submitloading:false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.NavigatetoDashboard = this.NavigatetoDashboard.bind(this);
    this.handleRankChange = this.handleRankChange.bind(this);
  }

  handleRankChange(e) {
    this.setState({ rank: e.target.value });
  }

  NavigatetoDashboard(event) {
    event.preventDefault();
    var arr = window.location.pathname.split("/");
    var newUrl = "",
      i;
    for (i = 1; i < arr.length; i++) {
      newUrl = newUrl + "../";
    }
    newUrl = newUrl + "dashboard/authority-area";
    // this.props.history.push(newUrl);

    this.props.history.push({
      pathname: `./${newUrl}`,
      state: { ProfileState: this.props.location.state.ProfileState , CompanyState: this.props.location.state.CompanyState },
    });
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    target.name === "DepartmentName"
      ? this.setState({
          [name]: value.toUpperCase(),
        })
      : this.setState({
          [name]: value,
        });
  }

  handleSubmit(event) {
    event.preventDefault();
    var arr=[];
    secondaryAppAuth
      .createUserWithEmailAndPassword(this.state.email, this.state.Password)
      .then(() => {
        var user = secondaryAppAuth.currentUser;
        user.updateProfile({
          displayName: this.state.Name,
        });
        arr.push("true");
      }).then(() =>{
        firestore
        .collection("companies")
        .doc(this.state.CompanyId)
        .collection("Messages")
        .doc(this.state.CompanyId)
        .update({
          EmployeeEmails: firebase.firestore.FieldValue.arrayUnion(
            this.state.email
          ),
        });
      }).then(() =>{
        firestore
        .collection("Employees")
        .doc(this.state.email)
        .collection("info")
        .doc("info")
        .set({
          DepartmentId: "",
          DepartmentName : "",
          Contact: this.state.Contact,
          CompanyId: this.state.CompanyId,
          Post: this.state.Post,
          Name: this.state.Name,
          email: this.state.email,
          rank: this.state.rank,
        });
      })
      .then( () => {
        firestore
        .collection("companies")
        .doc(this.state.CompanyId)
        .collection("info")
        .doc("info")
        .update({
          NoOfEmployees: firebase.firestore.FieldValue.increment(1)
        });
    
      }).then(() =>{
        firestore
        .collection("Employees")
        .doc(this.state.email)
        .collection("todo-list")
        .doc("todo")
        .set({ items: [] });
      secondaryAppAuth.signOut();
      this.NavigatetoDashboard(event);
      }) .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + "  /  " + errorMessage);
        alert(errorCode + "  /  " + errorMessage);
        this.setState({
          submitloading:false
        });
      });


  }

  render() {
    return (
      <div>
        <LeftSidebar history={this.props.history} />
        <div className="body-content">
          <div className="Heading">Enter the Employee Info. to Add</div>
          <form className="form-departs" onSubmit={
            (event)=>{
              this.setState({
                submitloading:true
              });
              this.handleSubmit(event);
            }
            }>
            <div className="form-child1">
              {/* <div className="form-childs">
                <label className="labels">Department Name : </label>
                <input
                  className="inputss"
                  type="text"
                  name="DepartmentName"
                  value={this.state.DepartmentName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-childs">
                <label className="labels">Department Id : </label>
                <input
                  className="inputss"
                  type="text"
                  name="DepartmentId"
                  value={this.state.DepartmentId}
                  onChange={this.handleChange}
                />
              </div> */}
              {/* <div className="form-childs">
                <label className="labels">Company Id : </label>
                <input
                  className="inputss"
                  type="text"
                  name="CompanyId"
                  value={this.state.CompanyId}
                  onChange={this.handleChange}
                />
              </div> */}
              <div className="form-childs">
                <label className="labels">Employee Name : </label>
                <input
                  className="inputss"
                  type="text"
                  name="Name"
                  value={this.state.Name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-childs">
                <label className="labels">Employee Contact : </label>
                <input
                  className="inputss"
                  type="text"
                  name="Contact"
                  value={this.state.Contact}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-childs">
                <label className="labels">Employee Post : </label>
                <input
                  className="inputss"
                  type="text"
                  name="Post"
                  value={this.state.Post}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-childs">
                <label className="labels">Employee Rank : </label>

                <select
                  classname="inputss"
                  value={this.state.rank}
                  style={{width:200,borderRadius:7}}
                  onChange={this.handleRankChange}
                >
                  <option name="1">1</option>
                  <option name="1a">1a</option>
                  <option name="2">2</option>
                  <option name="2a">2a</option>
                  <option name="3">3</option>
                  <option name="3a">3a</option>
                  <option name="4">4</option>
                  <option name="4a">4a</option>
                  <option name="5">5</option>
                </select>
              </div>
              <div className="form-childs">
                <label className="labels">Employee E-mail : </label>
                <input
                  className="inputss"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-childs">
                <label className="labels">Password : </label>
                <input
                  className="inputss"
                  type="password"
                  name="Password"
                  value={this.state.Password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-childs">
                <label className="labels">Confirm Password : </label>
                <input
                  className="inputss"
                  type="password"
                  name="ConfirmPassword"
                  value={this.state.ConfirmPassword}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {/* <div className="button">
              <button type="submit" className="input-button-depart">
                submit
              </button>
            </div> */}
                        {this.state.submitloading === false ? (
              <div className="button">
                <button type="submit" className="input-button-depart">
                  submit
                </button>
              </div>
            ) : (
              <ReactLoading type="spin" color="#2d3436" height={35} width={35} />
            )}
          </form>
        </div>
      </div>
    );
  }
}
