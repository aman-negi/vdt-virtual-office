import React, { useState, useEffect } from "react";
import { auth, firestore } from "../../../initfirebase";
import firebase from "firebase/app";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import LeftSidebar from "../LeftSidebar";
import "../../../css/project-work.css";
import SubParts from "./SubParts";
import { Pie, Line } from "react-chartjs-2";

export default function ProjectWork(props) {
  const [display, Setdisplay] = useState(null);
  const [loading, Setloading] = useState(true);
  const [CompanyId, SetCompanyId] = useState("");
  const [state, setState] = useState({});

  let { projectid } = useParams();

  useEffect(() => {
    var user = auth.currentUser;
    firestore
      .collection("Employees")
      .doc(user.email)
      .collection("info")
      .doc("info")
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var userCompanyId = doc.data().CompanyId;
          SetCompanyId(userCompanyId);
        } else {
          console.log("No such document!");
        }
      });
    if (CompanyId !== "") {
      firestore
        .collection("companies")
        .doc(CompanyId)
        .collection("Projects")
        .doc(projectid)
        .onSnapshot(function (doc) {
          var newstate = {};
          newstate = doc.data();
          setState(newstate);
          const EmployeeList = newstate.EmployeeEmails.map((d, idx) => {
            if (d !== newstate.ProjectHeadEmail) {
              return (
                <div className="project-employee-email" key={idx}>
                  {d}
                </div>
              );
            } else {
              return;
            }
          });
          Setdisplay(EmployeeList);
          Setloading(false);
        });
    }
  }, [props, CompanyId]);

  function dateleft(endDate) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    var date1 = new Date(endDate);
    var date2 = new Date(today);
    var time_difference = difference(date2, date1);
    return time_difference;
  }

  function difference(date1, date2) {
    const date1utc = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const date2utc = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );
    var day = 1000 * 60 * 60 * 24;
    return (date2utc - date1utc) / day;
  }

  let history = useHistory();

  return (
    <div className="body-content">
      <LeftSidebar history={history} />
      <div className="main-content-area">
        {loading === true ? (
          <div>Loading....</div>
        ) : (
          <div>
            <div className="project-heading-title">
              <center>
                <h1>{state.ProjectName}</h1>
              </center>
            </div>
            <div className="project-description">
              <center>{state.ProjectDetailDescription}</center>
            </div>
            <div className="project-date">
              <div className="project-end-date">
                Finish Till : {state.ToBeCompletedTill}
              </div>
              <div className="project-date-left">
                Dates Left : {dateleft(state.ToBeCompletedTill)}
              </div>
            </div>
            <div className="project-email-list">
              <div className="project-email-head">
                Head : {state.ProjectHeadEmail}
              </div>
              {display}
            </div>

            <div className="Project-content-child2">
              <ProjectPartList
                state={state}
                CompanyId={CompanyId}
                projectid={projectid}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

//////////////////////// List all the parts of the project///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ProjectPartList(props) {
  // const [pieLabel, setPieLabel] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [label, setLabel] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [graph1Loading, setGraph1Loading] = useState(true);

  useEffect(() => {
    var x;

    var arrLabel = [];
    var arrValues = [];
    var arrProgressValues = [];
      for (x in sortObj(props.state.CombineNameProgressOfParts)) {
        console.log();
        arrLabel.push(x);
        arrProgressValues.push(props.state.CombineNameProgressOfParts[x]);
        arrValues.push(props.state.CombineNameValueOfParts[x]);
      }
    
    setLineData(arrProgressValues);
    setLabel(arrLabel);
    setPieData(arrValues);
    setGraph1Loading(false);
  }, [props]);





  function LightenDarkenColor(col, amt) {
    var usePound = false;

    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }

    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    var b = ((num >> 8) & 0x00ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    var g = (num & 0x0000ff) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  }





  const pieGraphColorArray = [
    "#fffa65",
    "#ffaf40",
    "#ffb8b8",
    "#cd84f1",
    "#32ff7e",
    "#7efff5",
    "#18dcff",
    "#7d5fff",
    "#4b7bec",
    "#d1d8e0",
    "#2bcbba",
    "#F8EFBA",
    "#B33771",
    "#D6A2E8",
  ];

  const pieGraphHoverColorArray = [
    LightenDarkenColor("#fffa65", -30),
    LightenDarkenColor("#ffaf40", -30),
    LightenDarkenColor("#ffb8b8", -30),
    LightenDarkenColor("#cd84f1", -30),
    LightenDarkenColor("#32ff7e", -30),
    LightenDarkenColor("#7efff5", -30),
    LightenDarkenColor("#18dcff", -30),
    LightenDarkenColor("#7d5fff", -30),
    LightenDarkenColor("#4b7bec", -30),
    LightenDarkenColor("#d1d8e0", -30),
    LightenDarkenColor("#2bcbba", -30),
    LightenDarkenColor("#F8EFBA", -30),
    LightenDarkenColor("#B33771", -30),
    LightenDarkenColor("#D6A2E8", -30),
  ];

  const pieState = {
    labels: label,
    datasets: [
      {
        label: "Sub-part",
        backgroundColor: pieGraphColorArray,
        hoverBackgroundColor: pieGraphHoverColorArray,
        data: pieData,
      },
    ],
    height: 410,
    width: 500,
  };

  const lineState = {
    labels: label,
    datasets: [
      {
        label: "Progress in each",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: lineData,
      },
    ],
    height: 450,
    width: 500,
  };


  function sortObj(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
      result[key] = obj[key];
      return result;
    }, {});
  }

  const listItems = (CombineNameValueOfParts,CombineNameProgressOfParts,CompanyId,projectid) => {
    var d;
    var content = [];
    for(d in CombineNameValueOfParts){
      content.push(  
      <div>
        <ListParts
          label={d}
          value={CombineNameValueOfParts[d]}
          CompanyId={CompanyId}
          projectid={projectid}
          progress={CombineNameProgressOfParts[d]}
        />
      </div>
    );
    }
    return content;
  };

  return (
    <div>
      <div>
        {graph1Loading === true ? (
          <div></div>
        ) : (
          <div className="project-graph-area">
            <div>
              <div>
                <center>
                  <h3>Parts Percentage</h3>
                </center>
              </div>
              <Pie
                data={pieState}
                className="project-graph-Pie"
                options={{
                  options: {
                    title: {
                      display: true,
                      text: "Parts Percentage",
                      fontSize: 20,
                    },
                  },

                  legend: {
                    display: true,
                    position: "right",
                  },
                  responsive: true,
                }}
              />
            </div>
            <div>
              <div>
                <center>
                  <h3>Progress Report</h3>
                </center>
              </div>
              <Line
                data={lineState}
                className="project-graph-Line"
                options={{
                  title: {
                    display: true,
                    text: "Progress Report ",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "right",
                  },
                  responsive: true,
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="project-part-list">
        <center>
          <div className="project-part-head">
            <h2>Major Parts {" & "} Percentage</h2>
          </div>
        </center>
        <div className="project-major-part-container">{listItems(sortObj(props.state.CombineNameValueOfParts),props.state.CombineNameProgressOfParts,props.CompanyId,props.projectid)}</div>
      </div>
    </div>
  );
}

function ListParts(props) {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("NotStarted");
  const [percentageCompleted, setPercentageCompleted] = useState(0);
  const [oldPercentageCompleted, setOldPercentageCompleted] = useState(0);

  useEffect(() => {
    if (percentageCompleted === 100) {
      setStatus("Completed");
    }

    setPercentageCompleted(props.progress);
    setOldPercentageCompleted(props.progress);
    setState([props.label,props.value]);
    setLoading(false);
  }, [props.value]);





  const handleStatusChange = async (e) => {
    e.preventDefault();
    setStatus(e.target.value);
  };





  const handlePercentageChange = async (e) => {
    e.preventDefault();
    if (parseFloat(e.target.value) > 100) {
      alert("percentage cant be more than 100%");
    } else {
      setOldPercentageCompleted(percentageCompleted);
      setPercentageCompleted(e.target.value);
    }
  };


  
  const submitPercentageChange = async (e) => {
    e.preventDefault();

    firestore
      .collection("companies")
      .doc(props.CompanyId)
      .collection("Projects")
      .doc(props.projectid)
      .update({
        ["CombineNameProgressOfParts."+state[0]]: parseInt(percentageCompleted),
      })
  };

  return (
    <div>
      {loading === true ? (
        <div>loading....</div>
      ) : (
        <div className="project-major-parts-child">
          <div className="project-major-parts-child-head">
            <div className="major-part-name">{state[0]}</div>
            <div className="major-part-value">
              <form onSubmit={submitPercentageChange}>
                <label style={{ fontSize: 12, alignSelf: "center" }}>
                  {"%"} completed {" : "}
                </label>
                <input
                  className="major-part-value-input"
                  type="number"
                  value={percentageCompleted}
                  onChange={handlePercentageChange}
                />
                <button className="major-part-button" type="submit">change</button>
              </form>
            </div>
            <div className="major-part-status">
              <select
                className="major-part-status-select"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="InProgress">InProgress</option>
                <option value="Completed">Completed</option>
                <option value="Hault">Hault</option>
                <option value="NotStarted">NotStarted</option>
              </select>
            </div>
          </div>
          <div className="project-sub-part">
            <SubParts
              CompanyId={props.CompanyId}
              projectid={props.projectid}
              partname={state[0]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
