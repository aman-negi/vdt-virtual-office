import React, { Component, useState, useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import "../../css/Project.css";
import { auth, firestore } from "../../initfirebase";
import { useHistory } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar'
import ReactLoading from "react-loading";

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CompanyId: "",
      userName: "",
      ProfileState: "",
      loading: true,
    };
  }

  componentDidMount() {
    let currentComponent = this;
    var user = auth.currentUser;

    this.setState({
      userName: user.email,
    });
    if(this.state.loading){
    firestore
      .collection("Employees")
      .doc(user.email)
      .collection("info")
      .doc("info")
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var userCompanyId = doc.data().CompanyId;
          currentComponent.setState({
            ProfileState: doc.data(),
            CompanyId: userCompanyId,
            loading: false,
          });
          console.log(userCompanyId);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    }
  }

  render() {
    return (
      <div>
        <LeftSidebar history={this.props.history} />
        <div className="body-content-project">
          <div className="projects">
            {this.state.loading === true ? (
              <ReactLoading type="spokes" color="#2d3436" />
            ) : (
              <ProjectChilds email = {this.state.userName} CompanyId={this.state.CompanyId} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

//////////////////////            ///////////////////////                     ////////////////////////////////        //////////////////////

function ProjectChilds(props) {
  const [projects, setprojects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var user = auth.currentUser;
    if(loading){
    firestore
      .collection("companies")
      .doc(props.CompanyId)
      .collection("Projects")
      .where("EmployeeEmails","array-contains",user.email)
      .get()
      .then((querySnapshot) => {
        const projects = [];
        querySnapshot.forEach((documentSnapshot) => {
          projects.push({ ...documentSnapshot.data() });
        });
        setprojects(projects);
        setLoading(false);
      });
    }
  });

  return (
    <div>
      {loading === true ? (
        <ReactLoading type="cylon" color="#2d3436" />
      ) : (
        <div>
          <Display values={projects} />
        </div>
      )}
    </div>
  );
}

//////////////////////         //////////////////////////////////////////////        /////////////////////////////////

function Display(props) {
  var i = 1;

  const listItems = props.values.map((d, i) => (
    // <li key={idx}>{d.DepartmentName}</li>
    <div>
      <ListItem key={++i} index={++i} value={d} />
    </div>
  ));
  return (
    <div className="projectlists">
      <div className="projects-child-title">
        <div className="projects-sno">S. No.</div>
        <div className="projects-heading">Project Name </div>
        <div className="projects-endDate">Project End Date</div>
      </div>
      {listItems}
    </div>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function ListItem(props) {
  let history = useHistory();
  function RenderRedirect() {
    history.push({
      pathname: `./project/${state.ProjectId}`
    });
  }

  const [state, setState] = useState({});
  const [loading, setloading] = useState("true");
  const [show, setShow] = useState(false);


  var showHideClassName = show ? "showing" : "notShowing";

  useEffect(() => {
    setState(props.value);
    setloading("false");
  });

  return (
    <div>
      {loading === "true" ? (
        <ReactLoading type="cylon" color="#2d3436" />
      ) : (
        <div>
          <div className="project-child-list">          
          <div className="projects-child" onClick={() => {setShow(!show)}}>
            <div className="projects-sno">{props.index}</div>
            <div className="projects-heading">{state.ProjectName}</div>
            <div className="projects-endDate">{state.ToBeCompletedTill}</div>
          </div>
          </div>  

          <div className = {showHideClassName} style={{color:"white", fontSize:18}}>
            <div style ={{padding : 5,display:"flex" , flexDirection:"row" , flex: 10}}>
             <div style={{flex:1.8}}> Description : </div><div style={{flex:8.2}}>{state.ProjectBriefDescription}</div>
            </div> 
            <div style ={{ padding : 5,display:"flex" , flexDirection:"row" , flex: 10}}>
              <div style={{flex:1.8}}>No. Of Employees in it : </div><div style={{flex:8.2}}>{state.NoOfEmployeesInProject}</div>
            </div>
            <div style ={{ padding : 5,display:"flex" , flexDirection:"row" , flex: 10}}>
              <div style={{flex:1.8}}>CurrentStatus : </div><ProgressBar style={{backgroundColor:"white", flex:8.2}} now={state.CurrentStatus+1} label={`${state.CurrentStatus}%`} />
            </div>
            <div style = {{textAlign:"center"}}>
               <button onClick={() =>{RenderRedirect()}} style={{backgroundColor:"white" , borderRadius:8}}>Work On</button> 
            </div>  
          </div>
        </div>
      )}
    </div>
  );
}
