import React, { Component } from "react";
import LeftSidebar from ".././LeftSidebar";
import { auth, firestore } from "../../../initfirebase";
import "../../../css/add-department.css";
import firebase from 'firebase/app'
import ReactLoading from "react-loading";


export default class AddDepart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DepartmentName: "",
      DepartmentHeadName: "",
      DepartmentHeadEmail: "",
      DepartmentContact: 0,
      NoOfEmployees: 1,
      DepartmentId: "",
      DepartmentDescription: "",
      CompanyId: this.props.location.state.CompanyState.CompanyId,
      loading: true,
      DepartmentState: this.props.location.state.CompanyState.Departments,
      condition: true,
      Departments: [],
      submitloading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.NavigatetoDashboard = this.NavigatetoDashboard.bind(this);
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
      state: {
        ProfileState: this.props.location.state.ProfileState,
        CompanyState: this.props.location.state.CompanyState,
      },
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
    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    var y;
    if (this.state.DepartmentState[0] !== null) {
      for (y in this.state.DepartmentState) {
        if (
          this.state.DepartmentState[y].DepartmentId ===
            this.state.DepartmentId ||
          this.state.DepartmentState[y].DepartmentName ===
            this.state.DepartmentName
        ) {
          this.setState({
            condition: false,
          });
        }
      }
    }

    if (this.state.condition) {
      var EmployeeEmails = [];
      var departmentdata = this.state;
      var x;
      for (x in departmentdata) {
        var checker = x.slice(0, 13);
        if (checker === "EmployeeEmail" || x === "DepartmentHeadEmail") {
          EmployeeEmails.push(departmentdata[x]);
          firestore
            .collection("Employees")
            .doc(departmentdata[x])
            .collection("info")
            .doc("info")
            .update({
              DepartmentId: this.state.DepartmentId,
              DepartmentName: this.state.DepartmentName,
            });
          firestore
            .collection("companies")
            .doc(this.state.CompanyId)
            .collection("info")
            .doc("info")
            .update({
              NoOfDepartment: firebase.firestore.FieldValue.increment(1),
              Departments: firebase.firestore.FieldValue.arrayUnion({
                DepartmentId: this.state.DepartmentId,
                DepartmentName: this.state.DepartmentName,
              }),
            });
        }
      }

      var NoOfEmployees = parseInt(this.state.NoOfEmployees);

      firestore
        .collection("companies")
        .doc(this.state.CompanyId)
        .collection("Departments")
        .doc(this.state.DepartmentId)
        .set({
          DepartmentName: this.state.DepartmentName,
          DepartmentHeadName: this.state.DepartmentHeadName,
          DepartmentHeadEmail: this.state.DepartmentHeadEmail,
          DepartmentContact: this.state.DepartmentContact,
          NoOfEmployees: NoOfEmployees,
          DepartmentId: this.state.DepartmentId,
          DepartmentDescription: this.state.DepartmentDescription,
          EmployeeEmails: EmployeeEmails,
        })
        .then(() => {
          firestore
            .collection("companies")
            .doc(this.state.CompanyId)
            .collection("Messages")
            .doc(this.state.DepartmentId)
            .set({
              groupId: this.state.DepartmentId,
              groupName: this.state.DepartmentName,
              EmployeeEmails: EmployeeEmails,
            });
        })
        .then(() => {
          firestore
            .collection("companies")
            .doc(this.state.CompanyId)
            .collection("Messages")
            .doc(this.state.DepartmentId)
            .collection("message-list")
            .add({
              text: "Hello Everyone Welcome To Department Chat Group",
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              uid: this.state.DepartmentId,
              userName: this.state.DepartmentName,
            });
        })
        .then(() => {
          this.NavigatetoDashboard(event);
        });
    } else {
      alert(
        "A department is already registerd with this department Id or Department Name so please make diffferent name"
      );
      this.setState({
        DepartmentId: "",
        DepartmentName: "",
        submitloading: false,
      });
    }
  }

  componentDidMount() {}

  LoopForEmails = (number) => {
    let content = [];
    for (let i = 2; i <= number; i++) {
      var Emails = "EmployeeEmail" + i;
      content.push(
        <div className="form-childs">
          <label className="labels">Employee {i} Email : </label>
          <input
            className="inputss"
            type="email"
            {...{
              name: Emails,
            }}
            value={this.state.EmailCache}
            onChange={this.handleChange}
          />
        </div>
      );
    }
    return content;
  };

  render() {
    return (
      <div>
        <LeftSidebar history={this.props.history} />
        <div className="body-content">
          <div className="Heading">Enter the department Info. to Add</div>
          <form
            className="form-departs"
            onSubmit={(event) => {
              this.setState({
                submitloading: true,
              });
              this.handleSubmit(event);
            }}
          >
            <div className="form-child1">
              <div className="form-childs">
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
              </div>
              <div className="form-childs">
                <label className="labels">Department Head Name : </label>
                <input
                  className="inputss"
                  type="text"
                  name="DepartmentHeadName"
                  value={this.state.DepartmentHeadName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-childs">
                <label className="labels">Department Head E-mail : </label>
                <input
                  className="inputss"
                  type="email"
                  name="DepartmentHeadEmail"
                  value={this.state.DepartmentHeadEmail}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-childs">
                <label className="labels">No. Of Employees : </label>
                <input
                  className="inputss"
                  type="number"
                  name="NoOfEmployees"
                  value={this.state.NoOfEmployees}
                  onChange={this.handleChange}
                />
              </div>
              {this.LoopForEmails(this.state.NoOfEmployees)}
              <div className="form-childs">
                <label className="labels">Department Contact : </label>
                <input
                  className="inputss"
                  type="text"
                  name="DepartmentContact"
                  value={this.state.DepartmentContact}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-childs">
              <label className="labels">Department Description : </label>
              <textarea
                rows="4"
                cols="30"
                className="inputss"
                name="DepartmentDescription"
                value={this.state.DepartmentDescription}
                onChange={this.handleChange}
              />
            </div>
            {this.state.submitloading === false ? (
              <div className="button">
                <button type="submit" className="input-button-depart">
                  submit
                </button>
              </div>
            ) : (
              <ReactLoading
                type="spin"
                color="#2d3436"
                height={35}
                width={35}
              />
            )}
          </form>
        </div>
      </div>
    );
  }
}
