import React, { useState, useEffect } from "react";
import "../../css/department.css";
import LeftSidebar from "./LeftSidebar";
import ReactShadowScroll from "react-shadow-scroll";
import { useParams, useHistory } from "react-router-dom";
import { firestore } from "../../initfirebase";
import ReactLoading from "react-loading";

function Departments(props) {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);

  let { id } = useParams();
  useEffect(() => {
    if (loading) {
      setState(props.location.state.DepartmentState);
      setLoading(false);
    }
  },[loading, props.location.state.DepartmentState]);
  return (
    <div>
      <LeftSidebar history={props.history} />
      <div>
        {loading === true ? (
          <ReactLoading type="spokes" color="#2d3436" />
        ) : (
          <div className="department-body">
            <div className="department-head">{state.DepartmentName}</div>
            <div className="department-area">
              <div className="department-area-child1">
                <div>yo</div>
              </div>
              <div className="department-area-child2">
                <div>
                  <DepartmentDescription state={state} />
                </div>
                <div>
                  <Notice DepartmentId={state.DepartmentId} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

////////////////////////////////////////////////Department Description////////////////////////////////
function DepartmentDescription(props) {
  const [state, setstate] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setstate(props.state);
    setLoading(false);
  }, [props.state]);

  return (
    <div>
      {loading === true ? (
        <ReactLoading type="spokes" color="#2d3436" />
      ) : (
        <div className="dept-box">
          <div>
            <center>
              <h2>Department Description</h2>
            </center>
          </div>
          <div className="dept-inner-box">
            <div className="dept-desc-child">
              <div className="dept-desc-child1">Depts Name : &nbsp;</div>
              <div className="dept-desc-child2">{state.DepartmentName}</div>
            </div>
            <div className="dept-desc-child">
              <div className="dept-desc-child1">Depts Head Name : &nbsp;</div>
              <div classname="dept-desc-child2">{state.DepartmentHeadName}</div>
            </div>
            <div className="dept-desc-child">
              <div className="dept-desc-child1">Depts Head Email : &nbsp;</div>
              <div classname="dept-desc-child2">
                {state.DepartmentHeadEmail}
              </div>
            </div>
            <div className="dept-desc-child">
              <div className="dept-desc-child1">Depts Contact : &nbsp;</div>
              <div classname="dept-desc-child2">{state.DepartmentContact}</div>
            </div>
            <div className="dept-desc-child">
              <div className="dept-desc-child1">No. Of Employee : &nbsp;</div>
              <div classname="dept-desc-child2">{state.NoOfEmployees}</div>
            </div>
            <div className="dept-desc-child">
              <div className="dept-desc-child1">Dept Description : &nbsp;</div>
              <div classname="dept-desc-child2">
                {state.DepartmentDescription}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
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
        .doc(props.DepartmentId)
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
              .doc(props.DepartmentId)
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
    <ListNotice key={idx} value={d} />
  ));
  return (
    <div className="Notices-child">
      <h2 style={{ textAlign: "center" }}>NOTICE</h2>
      <div className="notice-box">
        <ReactShadowScroll isShadow={true} style={{ height: 300, padding: 5 }}>
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
  }, [props.value]);

  return (
    <div>
      {loading === true ? (
        <ReactLoading type="cylon" color="#2d3436" />
      ) : (
        <div className="Notices">
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

          <div>{state.NoticeDescription}</div>
        </div>
      )}
    </div>
  );
}

export default Departments;
