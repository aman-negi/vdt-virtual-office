import React, { Component } from "react";
import LeftSidebar from ".././LeftSidebar";
import { auth, firestore } from "../../../initfirebase";
import "../../../css/add-department.css";
import ReactLoading from "react-loading";
import firebase from 'firebase/app'

export default class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProjectName: "",
      ProjectHeadName: "",
      ProjectContact: "",
      NoOfEmployeesInProject: 1,
      ProjectId: "",
      ProjectDetailDescription: "",
      ProjectBriefDescription: "",
      CompanyId: this.props.location.state.ProfileState.CompanyId,
      ProfileState: this.props.location.state.ProfileState,
      CompanyState: this.props.location.state.CompanyState,
      NoOfParts: 0,
      CurrentStatus: 0,
      ToBeCompletedTill: "",
      loading: true,
      submitloading:false
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
    if (target.name === "ProjectName") {
      this.setState({
        ...this.state,
        [name]: value.toUpperCase(),
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  PercentageConverter = (ValueOfPart) =>{
    var totalValue = [0];
    for(var i = 0; i < ValueOfPart.length; i++){
          totalValue[0] = parseInt(totalValue[0]) + parseInt(ValueOfPart[i]); 
    }

    var PartsPercentage = [];
    for(var i = 0; i < ValueOfPart.length; i++){
      var newValue;
      newValue = (parseInt(ValueOfPart[i])/ parseInt(totalValue[0]))*100;
      PartsPercentage.push(newValue);
    }     
    return PartsPercentage;
  }

  handleSubmit(event) {
    event.preventDefault();
    var projectdata = this.state;

    var EmployeeEmails = [];
    var NameOfParts = [];
    var ValueOfParts = [];
    var x;

    /////////////////////////////      For loop over array for employee emails, Name of Part, Value of parts

    for (x in projectdata) {
      var checker = x.slice(0, 13);
      var checker2 = x.slice(0, 10);
      var checker3 = x.slice(0, 4);
      if (checker === "EmployeeEmail" || x === "ProjectHeadEmail") {
        EmployeeEmails.push(projectdata[x]);
      } else if (checker2 === "NameOfPart") {
        NameOfParts.push(projectdata[x]);
      } else if (checker3 === "Part") {
        ValueOfParts.push(projectdata[x]);
      }
    }

    var PartsPercentage = this.PercentageConverter(ValueOfParts);

    var CombineNameValueOfParts = {};
    var CombineNameProgressOfParts = {};
    for (var i = 0; i < NameOfParts.length; i++) {
      // CombineNameValueOfParts.push({ [NameOfParts[i]]: PartsPercentage[i]});
      CombineNameValueOfParts[[NameOfParts[i]]]=PartsPercentage[i];
      CombineNameProgressOfParts[[NameOfParts[i]]]=0;
      // CombineNameProgressOfParts.push({ [NameOfParts[i]]: 0});
    }

    firestore
      .collection("companies")
      .doc(this.state.CompanyId)
      .collection("Projects")
      .doc(this.state.ProjectId)
      .set({
        ...projectdata,
        EmployeeEmails: EmployeeEmails,
        CombineNameValueOfParts: CombineNameValueOfParts,
        CombineNameProgressOfParts:CombineNameProgressOfParts
      })
      .then(() => {
        firestore
          .collection("companies")
          .doc(this.state.CompanyId)
          .collection("Messages")
          .doc(this.state.ProjectId)
          .set({
            groupId: this.state.ProjectId,
            groupName: this.state.ProjectName,
            EmployeeEmails: EmployeeEmails,
          })
          .then(() => {
            firestore
            .collection("companies")
            .doc(this.state.CompanyId)
            .collection("Messages")
            .doc(this.state.ProjectId)
            .collection("message-list")
            .add({
              text:"Hello Everyone Welcome To the Project Chat Group",
              createdAt:firebase.firestore.FieldValue.serverTimestamp(),
              uid:this.state.ProjectId,
              userName:this.state.ProjectName,
            });

          });
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + "  /  " + errorMessage);
        alert(errorCode + "  /  " + errorMessage);
        this.setState({
          submitloading:false
        });
      });
    this.NavigatetoDashboard(event);
  }

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

  LoopForParts = (number) => {
    let content = [];
    for (let i = 1; i <= number; i++) {
      var Parts = "NameOfPart" + i;
      var PartPercentage = "Part" + i + "Percentage";
      content.push(
        <div className ="form-child1"> 
        <div className="form-childs">
          <label className="labels">Name of part {i} : </label>
          <input
            className="inputss"
            type="text"
            {...{
              name: Parts,
            }}
            value={this.state.PartsInfoCache}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-childs">
          <label className="labels">Part {i} Percentage : </label>
          <input
            className="inputss"
            type="number"
            {...{
              name: PartPercentage,
            }}
            value={this.state.PercentageByPartsCache}
            onChange={this.handleChange}
          />
        </div>
        </div>

      );
    }
    return content;
  };

  componentDidMount() {
    let currentComponent = this;
    var user = auth.currentUser;
    console.log(user.email);
    firestore
      .collection("Employees")
      .doc(user.email)
      .collection("info")
      .doc("info")
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());

          var userCompanyId = doc.data().CompanyId;
          console.log(userCompanyId);
          currentComponent.setState({
            CompanyId: userCompanyId,
            loading: false,
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  render() {
    return (
      <div>
        <LeftSidebar history={this.props.history} />
        <div className="body-content">
          <div className="Heading">Enter the Project Info. to Add</div>
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
                <label className="labels">Project Name : </label>
                <input
                  className="inputss"
                  type="text"
                  name="ProjectName"
                  value={this.state.ProjectName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-childs">
                <label className="labels">Project Id : </label>
                <input
                  className="inputss"
                  type="text"
                  name="ProjectId"
                  value={this.state.ProjectId}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-childs">
                <label className="labels">End Date : </label>
                <input
                  className="inputss"
                  type="date"
                  name="ToBeCompletedTill"
                  value={this.state.ToBeCompletedTill}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-childs">
                <label className="labels">No. Of Employees in Project : </label>
                <input
                  className="inputss"
                  type="number"
                  name="NoOfEmployeesInProject"
                  value={this.state.NoOfEmployeesInProject}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-childs">
                <label className="labels">Project Head Name : </label>
                <input
                  className="inputss"
                  type="text"
                  name="ProjectHeadName"
                  value={this.state.ProjectHeadName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-childs">
                <label className="labels">Project Head E-mail : </label>
                <input
                  className="inputss"
                  type="email"
                  name="ProjectHeadEmail"
                  value={this.state.ProjectHeadEmail}
                  onChange={this.handleChange}
                />
              </div>
              {this.LoopForEmails(this.state.NoOfEmployeesInProject)}
              <div className="form-childs">
                <label className="labels">No. Of Major Project part's : </label>
                <input
                  className="inputss"
                  type="number"
                  name="NoOfParts"
                  value={this.state.NoOfParts}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {this.LoopForParts(this.state.NoOfParts)}

            <div className="form-child1">
              <div className="form-childs">
                <label className="labels">Project Brief Description : </label>
                <textarea
                  className="inputss"
                  name="ProjectBriefDescription"
                  rows="4"
                  cols="57"
                  value={this.state.ProjectBriefDescription}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-childs">
                <label className="labels">
                  Project Detailed Description :{" "}
                </label>
                <textarea
                  className="inputss"
                  rows="4"
                  cols="57"
                  name="ProjectDetailDescription"
                  value={this.state.ProjectDetailDescription}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {/* <div className="button" style={{ marginTop: 25 }}>
              <button type="submit" className="input-button-depart">
                submit
              </button>
            </div> */}
            {this.state.submitloading === false ? (
              <div className="button" style={{ marginTop: 25 }}>
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
