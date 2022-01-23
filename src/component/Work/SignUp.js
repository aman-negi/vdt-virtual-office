import React, { Component } from "react";
import "../../css/signup.css";
import { auth, firestore } from "../../initfirebase";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ReactLoading from 'react-loading';
import firebase from 'firebase/app'

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CompanyName: "",
      CeoName: "",
      Contact: 0,
      NoOfEmployees: 1,
      NoOfDepartment: 0,
      CompanyId: "",
      AdminDepartmentId: "",
      email: "",
      password: "",
      confirmpassword: "",
      currentUser: false,
      PersonName: "",
      Post: "",
      rank: "1",
      isloading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRankChange = this.handleRankChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.NavigatetoAdmin = this.NavigatetoAdmin.bind(this);
  }

  handleRankChange(e) {
    this.setState({ rank: e.target.value });
  }

  NavigatetoAdmin() {
    this.props.history.push("./dashboard");
  }

  NavigatetoBlogForRanking() {
    this.props.history.push("./blog/ranking-system");
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    target.name === "CompanyName"
      ? this.setState({
          [name]: value.toUpperCase(),
        })
      : this.setState({
          [name]: value,
        });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.password === this.state.confirmpassword) {
      this.setState({
        isloading: true,
      });
      // const update = {
      //   displayName: this.state.PersonName,
      // };
      
      // await firebase.auth().currentUser.updateProfile(update);


      auth
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
          var CompanyId =
            this.state.CompanyName.slice(0, 3) +
            this.state.NoOfDepartment +
            "VDT";

          // var AdminDepartmentId = "admin-" + CompanyId;
          console.log("submitting the data");
          firestore
            .collection("companies")
            .doc(CompanyId)
            .collection("info")
            .doc("info")
            .set({
              CompanyName: this.state.CompanyName,
              CompanyId: CompanyId,
              CeoName: this.state.CeoName,
              NoOfEmployees: this.state.NoOfEmployees,
              NoOfDepartment: this.state.NoOfDepartment,
              CeoEmail: this.state.CeoEmail,
              Departments: [],
              // AdminDepartmentId: AdminDepartmentId,
            })
            .then(() => {
              firestore
                .collection("Employees")
                .doc(this.state.email)
                .collection("todo-list")
                .doc("todo")
                .set({ items: [] });
            })
            .then(() => {
              firestore
                .collection("companies")
                .doc(CompanyId)
                .collection("Messages")
                .doc(CompanyId)
                .set({
                  groupName: "COMPANY",
                  groupId: CompanyId,
                  EmployeeEmails: [this.state.email],
                });
            })
            .then(() => {
              firestore
              .collection("companies")
              .doc(CompanyId)
              .collection("Messages")
              .doc(CompanyId)
              .collection("message-list")
              .add({
                text:"Hello Everyone Welcome To the Company Chat Group",
                createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                uid:"company",
                userName:this.state.CompanyName,
              });

            })
            .then(() => {
              firestore
                .collection("companies")
                .doc(CompanyId)
                .collection("ranks")
                .doc("1")
                .set({
                  EmployeeEmails: [this.state.CeoEmail],
                  rank: "1",
                });
            })
            .then(() => {
              firestore
                .collection("companies")
                .doc(CompanyId)
                .collection("ranks")
                .doc(this.state.rank)
                .set({
                  EmployeeEmails: [this.state.email],
                  rank: this.state.rank,
                });
            })
            .then(() => {
              firestore
                .collection("companies")
                .doc(CompanyId)
                .collection("ranks")
                .doc("1a")
                .set({
                  EmployeeEmails: [],
                  rank: "1a",
                });
            })
            .then(() => {
              firestore
                .collection("companies")
                .doc(CompanyId)
                .collection("ranks")
                .doc("2")
                .set({
                  EmployeeEmails: [],
                  rank: "2",
                });
            })
            .then(() => {
              firestore
                .collection("companies")
                .doc(CompanyId)
                .collection("ranks")
                .doc("2a")
                .set({
                  EmployeeEmails: [],
                  rank: "2a",
                });
            })
            .then(() => {
              firestore
                .collection("companies")
                .doc(CompanyId)
                .collection("ranks")
                .doc("3")
                .set({
                  EmployeeEmails: [],
                  rank: "3",
                });
            })
            .then(() => {
              firestore
                .collection("companies")
                .doc(CompanyId)
                .collection("ranks")
                .doc("3a")
                .set({
                  EmployeeEmails: [],
                  rank: "3a",
                });
            })
            .then(() => {
              firestore
                .collection("companies")
                .doc(CompanyId)
                .collection("ranks")
                .doc("4")
                .set({
                  EmployeeEmails: [],
                  rank: "4",
                });
            })
            .then(() => {
              firestore
                .collection("companies")
                .doc(CompanyId)
                .collection("ranks")
                .doc("4a")
                .set({
                  EmployeeEmails: [],
                  rank: "4a",
                });
            })
            .then(() => {
              firestore
                .collection("companies")
                .doc(CompanyId)
                .collection("ranks")
                .doc("5")
                .set({
                  EmployeeEmails: [],
                  rank: "5",
                });
            })

            .then(() => {
              firestore
                .collection("Employees")
                .doc(this.state.email)
                .collection("info")
                .doc("info")
                .set({
                  Contact: this.state.Contact,
                  CompanyId: CompanyId,
                  Post: this.state.Post,
                  Name: this.state.PersonName,
                  email: this.state.email,
                  rank: this.state.rank,
                  DepartmentId: "",
                  DepartmentName: "",
                });
              var user = auth.currentUser;

              user.updateProfile({
                displayName: this.state.PersonName,
              });
            })
            .then(() => {
              console.log("Document successfully written!");
              this.setState({
                currentUser: true,
              });
            })
            .then(() => {
              this.NavigatetoAdmin();
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + "  /  " + errorMessage);
          alert(errorCode + "  /  " + errorMessage);
          this.setState({
            isloading: false,
          });
        });
    } else {
      alert("password & Confirm Password are not same");
      this.setState({
        isloading: false,
      });
    }
  }

  render() {
    if (this.state.currentUser) {
      return <Redirect to="./dashboard" />;
    }

    return (
      <section id="SignUp">
        <div className="design">
          <div className="design-heading">See Before Filling the form</div>
          <div className="design-child">
            <div className="design-child-heading">Who should sign-up:-</div>
            <div className="design-child-content">
              We Prefer the admin filling the form, because the access given to
              the person signing-up will be granted admin access.
            </div>
          </div>
          <div className="design-child">
            <div className="design-child-heading">For the Company Id:-</div>
            <div className="design-child-content">
              A Unique company Id will be generated for the company signing Up
              and can be seen in admin page.
            </div>
          </div>
          <div className="design-child">
            <div className="design-child-heading"> No. of Departments :-</div>
            <div className="design-child-content">
              Number of departments are the no. of department the company have.
              eg :- finance department, technology department, etc.
            </div>
          </div>
          <div className="design-child">
            <div className="design-child-heading">For Ranking system :-</div>
            <div className="design-child-content">
              for ranking system goto this url :-
              <Link to="/blogs/RankingSystem"> click here</Link>
            </div>
          </div>{" "}
          <div className="design-child">
            <div className="design-child-heading">For Employees signUp :-</div>
            <div className="design-child-content">
              The account for the employees of the company will be created via
              admin department.
            </div>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-child">
            <label className="label">Company Name : </label>
            <input
              className="inputs"
              type="text"
              name="CompanyName"
              value={this.state.CompanyName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-child">
            <label className="label">C.E.O. Name : </label>
            <input
              className="inputs"
              type="text"
              name="CeoName"
              value={this.state.CeoName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-child">
            <label className="label">C.E.O. E-mail : </label>
            <input
              className="inputs"
              type="email"
              name="CeoEmail"
              value={this.state.CeoEmail}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-child">
            <label className="label">Your Name : </label>
            <input
              className="inputs"
              type="text"
              name="PersonName"
              value={this.state.PersonName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-child">
            <label className="label">Your Post : </label>
            <input
              className="inputs"
              type="text"
              name="Post"
              value={this.state.Post}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-child">
            <label className="label">Your Rank : </label>
            <select
              classname="inputss"
              value={this.state.rank}
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
          <div className="form-child">
            <label className="label">Your Contact : </label>
            <input
              className="inputs"
              type="text"
              name="Contact"
              value={this.state.Contact}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-child">
            <label className="label">Email-ID : </label>
            <input
              className="inputs"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-child">
            <label className="label">Password : </label>
            <input
              className="inputs"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-child">
            <label className="label">Confirm Password : </label>
            <input
              className="inputs"
              type="password"
              name="confirmpassword"
              value={this.state.confirmpassword}
              onChange={this.handleChange}
            />
          </div>
          <div className="button">
            {this.state.isloading === false ? (
              <button type="submit" className="input-button">
                submit
              </button>
            ) : (
              <div><ReactLoading type="spinningBubbles" color="#fff" height={'20%'} width={'20%'} /></div>
            )}
          </div>
        </form>
      </section>
    );
  }
}
