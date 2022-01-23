import React, { Component } from "react";
import LeftSidebar from "../LeftSidebar";
import { auth, firestore } from "../../../initfirebase";
import "../../../css/add-department.css";
import ReactLoading from "react-loading";

export default class AddNotice extends Component {
  constructor(props) {
    super(props);
    var today = new Date(),
      month =
        today.getMonth() + 1 < 10
          ? "0" + (today.getMonth() + 1)
          : today.getMonth() + 1,
      date = today.getFullYear() + "-" + month + "-" + today.getDate();

    this.state = {
      NoticeTitle: "",
      NoticeEndDate: "",
      NoticeRealeasedDate: date,
      NoticeDescription: "",
      NoticeByName: "",
      ReferToEmail: "",
      CompanyId: this.props.location.state.ProfileState.CompanyId,
      DepartmentId: this.props.location.state.ProfileState.DepartmentId,
      userRank: this.props.location.state.ProfileState.rank,
      loading: true,
      selectedId: this.props.location.state.CompanyState.CompanyId,
      CompanyInfo: this.props.location.state.CompanyState,
      submitloading:false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.NavigatetoDashboard = this.NavigatetoDashboard.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {
    event.preventDefault();
    const selected = event.target.value;
    this.setState({
      selectedId: selected,
    });
    console.log("Succesfull ->" + selected);
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
    const timestamp = currentDate.getTime().toString();

    firestore
      .collection("companies")
      .doc(this.state.selectedId)
      .collection("Notices")
      .doc(timestamp)
      .set({
        NoticeTitle: this.state.NoticeTitle,
        NoticeRealeasedDate: this.state.NoticeRealeasedDate,
        NoticeEndDate: this.state.NoticeEndDate,
        NoticeDescription: this.state.NoticeDescription,
        NoticeByName: this.state.NoticeByName,
        ReferToEmail: this.state.ReferToEmail,
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + "  /  " + errorMessage);
        alert(errorCode + "  /  " + errorMessage);
        this.setState({
          submitloading:false
        });
      });;
    this.NavigatetoDashboard(event);
  }

  render() {
    const listItems = this.props.location.state.CompanyState.Departments.map(
      (d, idx) => (
        <option key={idx} value={d.DepartmentId}>
          {d.DepartmentName + "->" + d.DepartmentId}
        </option>
      )
    );
    console.log(this.props.location.state.CompanyState);
    return (
      <div>
        <LeftSidebar history={this.props.history} />
        {this.state.loading == false ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            loading...
          </div>
        ) : (
          <div>
            <div className="body-content">
              <div className="Heading">Enter The Public Notice : </div>
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
                    <label className="labels">Notice Title : </label>
                    <input
                      className="inputss"
                      type="text"
                      name="NoticeTitle"
                      value={this.state.NoticeTitle}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-childs">
                    <label className="labels">Notice End Date : </label>
                    <input
                      className="inputss"
                      type="date"
                      name="NoticeEndDate"
                      value={this.state.NoticeEndDate}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-childs">
                    <label className="labels">Notice by Name : </label>
                    <input
                      className="inputss"
                      type="text"
                      name="NoticeByName"
                      value={this.state.NoticeByName}
                      onChange={this.handleChange}
                    />
                  </div>
                  {(() => {
                    switch (this.state.userRank) {
                      case "1":
                        return (
                          <div className="form-childs">
                            <label className="labels">Notice To :</label>
                            <select
                              className="inputss"
                              name={this.state.selectedId}
                              onChange={this.handleSelect}
                            >
                              <option value={this.state.CompanyId}>
                                Comapny
                              </option>
                              {listItems}
                            </select>
                          </div>
                        );
                      case "1a":
                        return (
                          <div className="form-childs">
                            <label className="labels">Notice To :</label>
                            <select
                              className="inputss"
                              name={this.state.selectedId}
                              onChange={this.handleSelect}
                            >
                              <option value={this.state.CompanyId}>
                                Comapny
                              </option>
                              {listItems}
                            </select>
                          </div>
                        );
                      default:
                        return (
                          <div className="form-childs">
                            <label className="labels">Notice To :</label>
                            <select
                              className="inputss"
                              name={this.state.selectedId}
                              onChange={this.handleSelect}
                            >
                              <option value={this.state.CompanyId}>
                                Comapny
                              </option>
                              <option value={this.state.DepartmentId}>
                                Department
                              </option>
                            </select>
                          </div>
                        );
                    }
                  })()}

                  <div className="form-childs">
                    <label className="labels">Refer To E-mail : </label>
                    <input
                      className="inputss"
                      type="email"
                      name="ReferToEmail"
                      value={this.state.ReferToEmail}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="form-childs">
                  <label className="labels">Notice Description : </label>
                  <textarea
                    rows="4"
                    cols="30"
                    className="inputss"
                    name="NoticeDescription"
                    value={this.state.NoticeDescription}
                    onChange={this.handleChange}
                  />
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
        )}
      </div>
    );
  }
}
