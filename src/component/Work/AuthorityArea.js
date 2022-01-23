import React, { Component, useState, useEffect } from "react";
import "../../css/authority-area.css";
import LeftSidebar from "./LeftSidebar";
import { useHistory, useParams } from "react-router-dom";
import { auth, firestore } from "../../initfirebase";
import ReactLoading from "react-loading";

function AuthorityArea(props) {
  let history = useHistory();
  let { id } = useParams();
  const [ProfileState , setProfileState] = useState(props.location.state.ProfileState);
  const [CompanyState , setCompanyState] = useState({});
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState(props.location.state.ProfileState.rank);

  function RenderRedirect(event) {
    event.preventDefault();
    var renderto = event.target.name;
    history.push({
      pathname: `./authority-area/${renderto}`,
      state: { ProfileState: ProfileState , CompanyState: CompanyState },
    });
  }

  useEffect(() => {
    var user = auth.currentUser;
    var i = 0;
    i++;
    console.log(ProfileState);
    if (loading){
    firestore
      .collection("Employees")
      .doc(user.email)
      .collection("info")
      .doc("info")
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var userCompanyId = doc.data().CompanyId;
          setProfileState(doc.data());
          console.log(doc.data().CompanyId);
          setUserRank(doc.data().rank);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
      if(ProfileState.CompanyId){
        firestore
        .collection("companies")
        .doc(ProfileState.CompanyId)
        .collection("info")
        .doc("info")
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setCompanyState(doc.data());
            setLoading(false);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        });
      }
    }
      
  },[ProfileState]);
  
  return (
    <div>
      {loading == true ? (
        <div style ={{margin:70}}>
          <ReactLoading type="spokes" color="#2d3436" />
        </div>

      ) : (
        <section>
          <LeftSidebar history={history} />
          <section className="body-content-authority">
            <div className="heading">
              Authority Area for rank : - {userRank}
            </div>
            <section>
              {(() => {
                switch (userRank) {
                  case "1":
                    return (
                      <div id="admin">
                        {" "}
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            1. Add Employees
                          </div>
                          <div className="admin-content">
                            Add an employee in any deaprtment using that
                            department ID after that the employee can sign-in
                            using that entered e-mail and password.
                          </div>
                          <button
                            name="add-employee"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add {"+"}
                          </button>
                        </div>
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            2. Add Department
                          </div>
                          <div className="admin-content">
                            Add any department only after that you can use
                            dashboard and can add employees to those
                            departments. Using the department Id (that you
                            create while creating department).
                          </div>
                          <button
                            name="add-depart"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add
                          </button>
                        </div>
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            3. Add Notice
                          </div>
                          <div className="admin-content">
                            Add Notice to Notice Section you can select to whom
                            this notice may concern to or the notice might be
                            directly for the whole Company.
                          </div>
                          <button
                            name="add-notice"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add Notice
                          </button>
                        </div>
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            4. Add Project
                          </div>
                          <div className="admin-content">
                            Add Project to the particular person through their
                            department Id and their email-id. The project will
                            be shown at that particular employees.
                          </div>
                          <button
                            name="add-project"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add Project
                          </button>
                        </div>
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            5. Rank changing
                          </div>
                          <div className="admin-content">
                            You can change the rank of other employees using this. 
                            You are authorized to change the rank of employee lower then you to your rank or lower.
                          </div>
                          <button
                            name="rank-changing"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Change
                          </button>
                        </div>
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            6. Add Employee To Department
                          </div>
                          <div className="admin-content">
                            Add An Employee to any Department they belong. Make
                            sure that Department and employee both are created
                            before hand.
                          </div>
                          <button
                            name="add-employee-to-department"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add to dept.
                          </button>
                        </div>
                      </div>
                    );
                  case "2":
                    return (
                      <div id="admin">
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            1. Add Employees
                          </div>
                          <div className="admin-content">
                            Add an employee in any deaprtment using that
                            department ID after that the employee can sign-in
                            using that entered e-mail and password.
                          </div>
                          <button
                            name="add-employee"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add {"+"}
                          </button>
                        </div>

                        <div className="admin-child">
                          <div className="admin-content-heading">
                            2. Add Notice
                          </div>
                          <div className="admin-content">
                            Add Notice to Notice Section you can select to whom
                            this notice may concern to or the notice might be
                            directly for the whole Company.
                          </div>
                          <button
                            name="add-notice"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add Notice
                          </button>
                        </div>
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            3. Add Project
                          </div>
                          <div className="admin-content">
                            Add Project to the particular person through their
                            department Id and their email-id. The project will
                            be shown at that particular employees.
                          </div>
                          <button
                            name="add-project"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add Project
                          </button>
                        </div>
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            4. Rank changing
                          </div>
                          <div className="admin-content">
                          You can change the rank of other employees using this. 
                            you are authorized to change the rank of employee lower then you to your rank or lower.
                          </div>
                          <button
                            name="rank-changing"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Change
                          </button>
                        </div>

                        <div className="admin-child">
                          <div className="admin-content-heading">
                            5. Add Employee To Department
                          </div>
                          <div className="admin-content">
                            Add An Employee to any Department they belong. Make
                            sure that Department and employee both are created
                            before hand.
                          </div>
                          <button
                            name="add-employee-to-department"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    );
                  case "3":
                    return (
                      <div id="admin">
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            1. Add Employees
                          </div>
                          <div className="admin-content">
                            Add an employee in any deaprtment using that
                            department ID after that the employee can sign-in
                            using that entered e-mail and password.
                          </div>
                          <button
                            name="add-employee"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add {"+"}
                          </button>
                        </div>

                        <div className="admin-child">
                          <div className="admin-content-heading">
                            2. Add Notice
                          </div>
                          <div className="admin-content">
                            Add Notice to Notice Section you can select to whom
                            this notice may concern to or the notice might be
                            directly for the whole Company.
                          </div>
                          <button
                            name="add-notice"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add Notice
                          </button>
                        </div>

                        <div className="admin-child">
                          <div className="admin-content-heading">
                            3. Rank changing
                          </div>
                          <div className="admin-content">
                          You can change the rank of other employees using this. 
                            you are authorized to change the rank of employee lower then you to your rank or lower.
                          </div>
                          <button
                            name="rank-changing"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Change
                          </button>
                        </div>

                        <div className="admin-child">
                          <div className="admin-content-heading">
                            4. Add Employee To Department
                          </div>
                          <div className="admin-content">
                            Add An Employee to any Department they belong. Make
                            sure that Department and employee both are created
                            before hand.
                          </div>
                          <button
                            name="add-employee-to-department"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    );
                  case "4":
                    return (
                      <div id="admin">
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            1. Add Employees
                          </div>
                          <div className="admin-content">
                            Add an employee in any deaprtment using that
                            department ID after that the employee can sign-in
                            using that entered e-mail and password.
                          </div>
                          <button
                            name="add-employee"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add {"+"}
                          </button>
                        </div>

                        <div className="admin-child">
                          <div className="admin-content-heading">
                            2. Add Notice
                          </div>
                          <div className="admin-content">
                            Add Notice to Notice Section you can select to whom
                            this notice may concern to or the notice might be
                            directly for the whole Company.
                          </div>
                          <button
                            name="add-notice"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add Notice
                          </button>
                        </div>

                        <div className="admin-child">
                          <div className="admin-content-heading">
                            3. Rank changing
                          </div>
                          <div className="admin-content">
                          You can change the rank of other employees using this. 
                            you are authorized to change the rank of employee lower then you to your rank or lower.
                          </div>
                          <button
                            name="rank-changing"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Change
                          </button>
                        </div>

                        <div className="admin-child">
                          <div className="admin-content-heading">
                            4. Add Employee To Department
                          </div>
                          <div className="admin-content">
                            Add An Employee to any Department they belong. Make
                            sure that Department and employee both are created
                            before hand.
                          </div>
                          <button
                            name="add-employee-to-department"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add to department
                          </button>
                        </div>
                      </div>
                    );

                  case "5":
                    return (
                      <div className="admin-child">
                        <div className="admin-content-heading">
                          Nothing to Show
                        </div>
                        <div className="admin-content">
                          If this is being displayed that means that your rank
                          is low and you are not currently authorized do any
                          stuff for the company. You can work in project and
                          departments that you are alloted for any other rank.
                        </div>
                      </div>
                    );

                  case "1a":
                    return (
                      <div id="admin">
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            1. Add Employees
                          </div>
                          <div className="admin-content">
                            Add an employee in any deaprtment using that
                            department ID after that the employee can sign-in
                            using that entered e-mail and password.
                          </div>
                          <button
                            name="add-employee"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add {"+"}
                          </button>
                        </div>

                        <div className="admin-child">
                          <div className="admin-content-heading">
                            2. Add Department
                          </div>
                          <div className="admin-content">
                            Add any department only after that you can use
                            dashboard and can add employees to those
                            departments. Using the department Id (that you
                            create while creating department).
                          </div>
                          <button
                            name="add-depart"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add
                          </button>
                        </div>

                        <div className="admin-child">
                          <div className="admin-content-heading">
                            3. Add Notice
                          </div>
                          <div className="admin-content">
                            Add Notice to Notice Section you can select to whom
                            this notice may concern to or the notice might be
                            directly for the whole Company.
                          </div>
                          <button
                            name="add-notice"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add Notice
                          </button>
                        </div>
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            4. Add Project
                          </div>
                          <div className="admin-content">
                            Add Project to the particular person through their
                            department Id and their email-id. The project will
                            be shown at that particular employees.
                          </div>
                          <button
                            name="add-project"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add Project
                          </button>
                        </div>
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            5. Rank changing
                          </div>
                          <div className="admin-content">
                          You can change the rank of other employees using this. 
                            you are authorized to change the rank of employee lower then you to your rank or lower.
                          </div>
                          <button
                            name="rank-changing"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Change
                          </button>
                        </div>
                       
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            6. Add Employee To Department
                          </div>
                          <div className="admin-content">
                            Add An Employee to any Department they belong. Make
                            sure that Department and employee both are created
                            before hand.
                          </div>
                          <button
                            name="add-employee-to-department"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add 
                          </button>
                        </div>
                      </div>
                    );
                  case "2a":
                    return (
                      <div id="admin">
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            1. Add Employees
                          </div>
                          <div className="admin-content">
                            Add an employee in any deaprtment using that
                            department ID after that the employee can sign-in
                            using that entered e-mail and password.
                          </div>
                          <button
                            name="add-employee"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add {"+"}
                          </button>
                        </div>

                        <div className="admin-child">
                          <div className="admin-content-heading">
                            2. Add Notice
                          </div>
                          <div className="admin-content">
                            Add Notice to Notice Section you can select to whom
                            this notice may concern to or the notice might be
                            directly for the whole Company.
                          </div>
                          <button
                            name="add-notice"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add Notice
                          </button>
                        </div>
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            3. Add Project
                          </div>
                          <div className="admin-content">
                            Add Project to the particular person through their
                            department Id and their email-id. The project will
                            be shown at that particular employees.
                          </div>
                          <button
                            name="add-project"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add Project
                          </button>
                        </div>
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            4. Add Employee To Department
                          </div>
                          <div className="admin-content">
                            Add An Employee to any Department they belong. Make
                            sure that Department and employee both are created
                            before hand.
                          </div>
                          <button
                            name="add-employee-to-department"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add to department
                          </button>
                        </div>
                      </div>
                    );
                  case "3a":
                    return (
                      <div id="admin">
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            1. Add Employees
                          </div>
                          <div className="admin-content">
                            Add an employee in any deaprtment using that
                            department ID after that the employee can sign-in
                            using that entered e-mail and password.
                          </div>
                          <button
                            name="add-employee"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add {"+"}
                          </button>
                        </div>

                        <div className="admin-child">
                          <div className="admin-content-heading">
                            2. Add Notice
                          </div>
                          <div className="admin-content">
                            Add Notice to Notice Section you can select to whom
                            this notice may concern to or the notice might be
                            directly for the whole Company.
                          </div>
                          <button
                            name="add-notice"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add Notice
                          </button>
                        </div>

                        <div className="admin-child">
                          <div className="admin-content-heading">
                            3. Add Employee To Department
                          </div>
                          <div className="admin-content">
                            Add An Employee to any Department they belong. Make
                            sure that Department and employee both are created
                            before hand.
                          </div>
                          <button
                            name="add-employee-to-department"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    );

                  case "4a":
                    return (
                      <div id="admin">
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            1. Add Employees
                          </div>
                          <div className="admin-content">
                            Add an employee in any deaprtment using that
                            department ID after that the employee can sign-in
                            using that entered e-mail and password.
                          </div>
                          <button
                            name="add-employee"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add {"+"}
                          </button>
                        </div>
                        <div className="admin-child">
                          <div className="admin-content-heading">
                            2. Add Notice
                          </div>
                          <div className="admin-content">
                            Add Notice to Notice Section you can select to whom
                            this notice may concern to or the notice might be
                            directly for the whole Company.
                          </div>
                          <button
                            name="add-notice"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add Notice
                          </button>
                        </div>

                        <div className="admin-child">
                          <div className="admin-content-heading">
                            3. Rank changing
                          </div>
                          <div className="admin-content">
                          You can change the rank of other employees using this. 
                            you are authorized to change the rank of employee lower then you to your rank or lower.
                          </div>
                          <button
                            name="rank-changing"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Change
                          </button>
                        </div>

                        <div className="admin-child">
                          <div className="admin-content-heading">
                            4. Add Employee To Department
                          </div>
                          <div className="admin-content">
                            Add An Employee to any Department they belong. Make
                            sure that Department and employee both are created
                            before hand.
                          </div>
                          <button
                            name="add-employee-to-department"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add to department
                          </button>
                        </div>
                      </div>
                    );

                  default:
                    return (
                      <div className="admin-child">
                        <div className="admin-content-heading">
                          Nothing to Show
                        </div>
                        <div className="admin-content">
                          If this is being displayed that means that your rank
                          is low and you are not currently authorized do any
                          stuff for the company. You can work in project and
                          departments that you are alloted for any other rank.
                        </div>
                      </div>
                    );
                }
              })()}

              {/*                           
          <div className="admin-child">
              <div className="admin-content-heading">1. Add Employees</div>
              <div className="admin-content">
                Add an employee in any deaprtment using that department ID after
                that the employee can sign-in using that entered e-mail and
                password.
              </div>
              <button
                name="add-employee"
                onClick={RenderRedirect}
                className="admin-content-button"
              >
                Add {"+"}
              </button>
            </div>
  
            <div className="admin-child">
              <div className="admin-content-heading">2. Add Department</div>
              <div className="admin-content">
                Add any department only after that you can use dashboard and can
                add employees to those departments. Using the department Id (that
                you create while creating department).
              </div>
              <button
                name="add-depart"
                onClick={RenderRedirect}
                className="admin-content-button"
              >
                Add
              </button>
            </div>
           
            <div className="admin-child">
              <div className="admin-content-heading">3. Add Notice</div>
              <div className="admin-content">
                Add Notice to Notice Section you can select to whom this notice
                may concern to or the notice might be directly for the whole
                Company.
              </div>
              <button
                name="add-notice"
                onClick={RenderRedirect}
                className="admin-content-button"
              >
                Add Notice
              </button>
            </div>
            <div className="admin-child">
              <div className="admin-content-heading">4. Add Project</div>
              <div className="admin-content">
                Add Project to the particular person through their department Id
                and their email-id. The project will be shown at that particular
                employees.
              </div>
              <button
                name="add-project"
                onClick={RenderRedirect}
                className="admin-content-button"
              >
                Add Project
              </button>
            </div>
            <div className="admin-child">
              <div className="admin-content-heading">5. Rank changing</div>
              <div className="admin-content">
               You can change the rank of other employees using this. 
                            you are authorized to change the rank of employee lower then you to your rank or lower.
              </div>
              <button
                name="rank-changing"
                onClick={RenderRedirect}
                className="admin-content-button"
              >
                Change
              </button>
            </div>
             <div className="admin-child">
              <div className="admin-content-heading">Monitor The Attendance</div>
              <div className="admin-content">
                Monitor the attendance of any employee through their working hours
                that they worked in the website for the day basis.
              </div>
              <button
                name="attendance-monitoring"
                onClick={RenderRedirect}
                className="admin-content-button"
              >
                Monitor
              </button>
            </div> 
                                    <div className="admin-child">
                          <div className="admin-content-heading">
                            6. Add Employee To Department
                          </div>
                          <div className="admin-content">
                            Add An Employee to any Department they belong. Make
                            sure that Department and employee both are created
                            before hand.
                          </div>
                          <button
                            name="add-employee-to-department"
                            onClick={RenderRedirect}
                            className="admin-content-button"
                          >
                            Add 
                          </button>
                        </div> */}
            </section>
          </section>
        </section>
      )}
    </div>
  );
}

export default AuthorityArea;
