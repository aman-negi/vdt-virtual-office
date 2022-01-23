import React, { Component } from 'react';
import HomePage from './component/main/HomePage.js'
import {Route, BrowserRouter as Router} from "react-router-dom";
import HeaderBar from "./component/HeaderBar";
import Signup from './component/Work/SignUp';
import Login from './component/Work/Login';
import {AuthProvider} from './component/Work/Auth'
import PrivateRoute from './component/PrivateRoute';
import Dashboard from './component/Work/Dashboard';
import AddDepart from './component/Work/admin-add/AddDepart.js';
import Departments from './component/Work/Departments.js';
import AddEmployee from './component/Work/admin-add/AddEmployee.js';
import AddNotice from './component/Work/admin-add/AddNotice.js';
import AddProject from './component/Work/admin-add/AddProject.js';
import TodoList from './component/Work/TodoList.js';
import Project from './component/Work/Project.js';
import ProjectWork from './component/Work/ProjectManage/ProjectWork.js';
import Chat from './component/Work/Chat.js';
import RankingSystem from './component/blog/RankingSystem.js';
import AuthorityArea from './component/Work/AuthorityArea.js';
import RankChanging from './component/Work/admin-add/RankChanging.js';
import AddEmployeeToDept from './component/Work/admin-add/AddEmployeeToDept.js';



class App extends Component {
  render (){
    return (
      <AuthProvider>
          <Router>
          <div className="App">
              <HeaderBar />
              <Route exact path="/" component={HomePage} />  
              <Route exact path="/blogs/RankingSystem" component={RankingSystem} />     
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/todo" component={TodoList} />
              <PrivateRoute exact path="/project" component={Project} />
              <PrivateRoute exact path="/chat" component={Chat} />
              <PrivateRoute exact path="/project/:projectid" component={ProjectWork} />
              <PrivateRoute exact path="/dashboard/department/:id" component={Departments} />
              <PrivateRoute exact path="/dashboard/authority-area" component = {AuthorityArea} />
              <PrivateRoute exact path ="/dashboard/authority-area/add-depart" component={AddDepart} />
              <PrivateRoute exact path ="/dashboard/authority-area/rank-changing" component={RankChanging} />
              <PrivateRoute exact path="/dashboard/authority-area/add-project" component={AddProject} />
              <PrivateRoute exact path ="/dashboard/authority-area/add-employee" component={AddEmployee} />
              <PrivateRoute exact path ="/dashboard/authority-area/add-notice" component={AddNotice} />
              <PrivateRoute exact path ="/dashboard/authority-area/add-employee-to-department" component={AddEmployeeToDept} />

          </div>
          </Router>
      </AuthProvider>
    );
  }
}

export default App;
