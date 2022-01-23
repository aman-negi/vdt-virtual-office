import React, { Component, useState, useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import "../../css/dashboard.css";
import { auth, firestore } from "../../initfirebase";
import { useHistory } from "react-router-dom";
import ReactShadowScroll from "react-shadow-scroll";
import ReactLoading from "react-loading";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CompanyId: "",
      userName: "",
      ProfileState: {},
      loading: true,
    };

    this.Logout = this.Logout.bind(this);
    this.RenderRedirect = this.RenderRedirect.bind(this);
  }

  Logout = () => {
    auth
      .signOut()
      .then(function () {
        this.props.history.replace({
          pathname: "../",
        });
      })
      .catch(function (error) {
        // An error happened.
      });

  };

  RenderRedirect = () => {
    this.props.history.push({
      pathname: `./dashboard/authority-area`,
      state: { ProfileState: this.state.ProfileState },
    });
  };

  componentDidMount() {
    let currentComponent = this;
    var user = auth.currentUser;

    this.setState({
      userName: user.email,
    });

    if (this.state.loading) {
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
        <div id="body-content">
          <div className="area1">
            {this.state.loading === true ? (
              <ReactLoading type="spokes" color="#2d3436" />
            ) : (
              <div >
                <div className="authorityarea">
                  <div className="departments-heading">Authority Area</div>
                  <div className="departments-content">
                    Do all the company work that you are authorized for from
                    adding new employee to adding a branch to the company. You
                    can do all authorized work based on your rank.
                  </div>
                  <button onClick={this.RenderRedirect} className="btn">
                    Enter{"->"}
                  </button>
                </div>

                <DepartmentChilds CompanyId={this.state.CompanyId} />
              </div>
            )}
          </div>
          <div className="area2">
            {this.state.loading === true ? (
              <ReactLoading type="spokes" color="#2d3436" />
            ) : (
              <div >
                <Profile
                  ProfileState={this.state.ProfileState}
                  Logout={this.Logout}
                />
                <Notice CompanyId={this.state.CompanyId} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

//////////////////////            ///////////////////////                     ////////////////////////////////        //////////////////////

function DepartmentChilds(props) {
  const [departments, setdepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var user = auth.currentUser;
    if (loading) {
      firestore
        .collection("companies")
        .doc(props.CompanyId)
        .collection("Departments")
        .where("EmployeeEmails", "array-contains", user.email)
        .get()
        .then((querySnapshot) => {
          const departments = [];
          querySnapshot.forEach((documentSnapshot) => {
            departments.push({ ...documentSnapshot.data() });
          });
          setdepartments(departments);
          setLoading(false);
        });
    }
  }, [departments, loading, props.CompanyId]);

  return (
    <div>
      {loading === true ? (
        <ReactLoading type="spokes" color="#2d3436" />
      ) : (
        <div>
          <Display values={departments} />
        </div>
      )}
    </div>
  );
}

/////////////////////         //////////////////////////////////////////////        /////////////////////////////////

function Display(props) {
  var i = 1;
  const listItems = props.values.map((d, i) => (
    // <li key={idx}>{d.DepartmentName}</li>
    <ListItem key={i} value={d} noForCss={i++} />
  ));
  return <div>{listItems}</div>;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ListItem(props) {
  let history = useHistory();
  function RenderRedirect() {
    history.push({
      pathname: `./dashboard/department/${state.DepartmentName}`,
      state: { DepartmentState: state },
    });
  }

  const [state, setState] = useState({});
  const [loading, setloading] = useState("true");
  const [forcss, setforcss] = useState("");

  useEffect(() => {
    setState(props.value);
    var checker = props.noForCss + 1;
    if (checker % 2 === 1) {
      setforcss("departments-child1");
    }
    else {
      setforcss("departments-child2");
    }
    console.log(checker);
    setloading("false");
  }, [props.value, props.noForCss]);

  return (
    <div>
      {loading === "true" ? (
        <ReactLoading type="cylon" color="#2d3436" />
      ) : (
        <div className={forcss}>
          <div className="departments-heading">{state.DepartmentName}</div>
          <div className="departments-content">
            {state.DepartmentDescription}
          </div>
          <button onClick={RenderRedirect} className="btn">
            Enter{"->"}
          </button>
        </div>
      )}
    </div>
  );
}

//////////////////// ////////////////////////////////      Profile        /////////////////////////////////////////////////////////////////////////

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.ProfileState.email,
      Name: props.ProfileState.Name,
      DepartmentName: props.ProfileState.DepartmentName,
      DepartmentId: props.ProfileState.DepartmentId,
      Post: props.ProfileState.Post,
      Contact: props.ProfileState.Contact,
    };
  }

  render() {
    return (
      <div className="Profile">
        <div className="Profile-Heading">
          <div className="_profile">
            <div className="_head"></div>
            <div className="_body"></div>
          </div>&nbsp;
          <div className="Profile-Heading-write">
          User Profile
          </div>
        </div>
        <div className="Profile-Content">
          <div className="Profile-Content-Child">
            <div>Name : &nbsp; </div>
            <div>{this.state.Name}</div>
          </div>
          <div className="Profile-Content-Child">
            <div>Email : &nbsp; </div>
            <div>{this.state.email}</div>
          </div>
          <div className="Profile-Content-Child">
            <div>Department Name : &nbsp; </div>
            <div>{this.state.DepartmentName}</div>
          </div>
          <div className="Profile-Content-Child">
            <div>Department Id : &nbsp; </div>
            <div>{this.state.DepartmentId}</div>
          </div>
          <div className="Profile-Content-Child">
            <div>Post : &nbsp; </div>
            <div>{this.state.Post}</div>
          </div>
          <div className="Profile-Content-Child">
            <div>Contact : &nbsp; </div>
            <div>{this.state.Contact}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                this.props.Logout();
              }}
              style={{
                backgroundColor: "#4ea6fd",
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 6,
                paddingBottom: 6,
                borderRadius: 8,
                fontSize: 19,
                color: "white",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

///////////////////////////////////////////////// Notice //////////////////////////////////////////////////////////////////////////
function Notice(props) {
  const [Notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var today = new Date();
    //   month = ((today.getMonth() + 1) < 10 ? "0" +(today.getMonth() + 1) : (today.getMonth() + 1)),
    //  date = today.getFullYear() + '-' + month  + '-' + today.getDate();
    var noticeToDelete = [];
    if (loading) {
      firestore
        .collection("companies")
        .doc(props.CompanyId)
        .collection("Notices")
        .get()
        .then((querySnapshot) => {
          const notices = [];
          querySnapshot.forEach((documentSnapshot) => {
            var g2 = new Date(documentSnapshot.data().NoticeEndDate);

            if (g2 > today) {
              notices.push({ ...documentSnapshot.data() });
            } else {
              noticeToDelete.push(documentSnapshot.data().NoticeTitle);
            }
          });
          var i;
          for (i = 0; i < noticeToDelete.length; i++) {
            firestore
              .collection("companies")
              .doc(props.CompanyId)
              .collection("Notices")
              .doc(noticeToDelete[i])
              .delete()
              .then(function () {
                console.log("Document successfully deleted!");
              })
              .catch(function (error) {
                console.error("Error removing document: ", error);
              });
          }
          setNotices(notices);
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
          <DisplayNotices values={Notices} />
        </div>
      )}
    </div>
  );
}

function DisplayNotices(props) {
  const listItems = props.values.map((d, idx) => (
    // <li key={idx}>{d.DepartmentName}</li>
    <ListNotice key={idx} value={d} />
  ));
  return (
    <div className="Notices-child">
      <h2 style={{ textAlign: "center", padding: 3 }}>NOTICE</h2>
      <div className="notice-box">
        <ReactShadowScroll style={{ height: 300, padding: 5 }} autoHide>
          <div style={{ padding: 10 }}>{listItems}</div>
        </ReactShadowScroll>
      </div>
    </div>
  );
}

function ListNotice(props) {
  let history = useHistory();

  const [state, setState] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setState(props.value);
    setloading(false);
  });

  return (
    <div>
      {loading === true ? (
        <ReactLoading type="cylon" color="#2d3436" />
      ) : (
        <div>
          <div className="Notices-list">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <div>{state.NoticeRealeasedDate}</div>
              <div>{state.NoticeTitle}</div>
              <div>{state.NoticeEndDate}</div>
            </div>
            <p>{state.NoticeDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
}
