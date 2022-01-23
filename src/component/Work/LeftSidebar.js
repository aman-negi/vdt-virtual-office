import React, { Component } from "react";
import "../../css/left-sidebar.css";

export default class LeftSidebar extends Component {

  Navigate = (value) => {
    var arr = window.location.pathname.split("/");
    var newUrl = "",i;
    for (i = 0; i < arr.length; i++) {
      newUrl = newUrl + "../";
    }
    newUrl = newUrl + value;
    this.props.history.push(newUrl);
  };

  render() {
    return (
      <section id="leftbar">
        <div className="icons">
          <div className="icon"></div>
          <div
            className="name"
            onClick={(e) => {
              e.preventDefault();
              this.Navigate("project");
            }}
          >
            Project
          </div>
        </div>
        <div className="icons">
          <div className="icon"></div>
          <div
            className="name"
            onClick={(e) => {
              e.preventDefault();
              this.Navigate("todo");
            }}
          >
            To-Do
          </div>
        </div>
        <div className="icons">
          <div className="icon"></div>
          <div
            className="name"
            onClick={(e) => {
              e.preventDefault();
              this.Navigate("chat");
            }}
          >
            Chat
          </div>
        </div>
        <div className="icons">
          <div className="icon"></div>
          <div
            className="name"
            onClick={(e) => {
              e.preventDefault();
              this.Navigate("dashboard");
            }}
          >
            Dash
          </div>
        </div>
      </section>
    );
  }
}
