import React, { useState, useEffect } from "react";
import { auth, firestore, storage } from "../../../initfirebase";
import "../../../css/project-work.css";
import { useCollectionData } from "react-firebase-hooks/firestore";

import ReactShadowScroll from "react-shadow-scroll";

////////////////// to automatically re-render firestore for collection

const ConditionUseCollectionDataForParts = ({
  setPartsInfo,
  CompanyId,
  projectid,
  partname,
}) => {
  const subPartsRef = firestore
    .collection("companies")
    .doc(CompanyId)
    .collection("Projects")
    .doc(projectid)
    .collection(partname);
  const querry = subPartsRef.orderBy("stepNo");

  const [partsInfo] = useCollectionData(querry, { idField: "id" });
  setPartsInfo(partsInfo);

  return null;
};

/////////////////////// to create and manage subparts category

export default function SubParts(props) {
  const [partsInfo, setPartsInfo] = useState([]);
  const [stepNo, setStepNo] = useState(1);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [done, setDone] = useState(false);

  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  var date = curr.toISOString().substr(0, 10);
  const [finishTill, setFinishTill] = useState(date);

  const addSubPart = async (e) => {
    e.preventDefault();
    var user = auth.currentUser;
    var userName = user.displayName;
    var uid = user.email;
    if (userName) {
      await firestore
        .collection("companies")
        .doc(props.CompanyId)
        .collection("Projects")
        .doc(props.projectid)
        .collection(props.partname)
        .doc(`${description}-${finishTill}`)
        .set({
          description: description,
          stepNo: stepNo,
          done: false,
          finishTill: finishTill,
          userName,
          uid,
        });
    } else {
      alert(
        "not able to get name from authentication service check your internet connection or trying reloading your browser"
      );
    }

    var curr = new Date();
    curr.setDate(curr.getDate() + 3);
    var date = curr.toISOString().substr(0, 10);

    setDescription("");
    setStepNo(1);
    setFinishTill(date);
    setDone(false);
  };

  useEffect(() => {
    const subPartsRef = firestore
      .collection("companies")
      .doc(props.CompanyId)
      .collection("Projects")
      .doc(props.projectid)
      .collection(props.partname);
    const querry = subPartsRef.orderBy("stepNo");

    const partsInfo = [];
    querry
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          partsInfo.push(doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    setPartsInfo(partsInfo);
  }, [props]);

  const listSubPart = (partsInfo) => {
    const content = [];
    var d, x;
    for (d in partsInfo) {
      content.push(
        <ListChild
          partsInfo={partsInfo[d]}
          partname={props.partname}
          CompanyId={props.CompanyId}
          projectid={props.projectid}
          d={d}
        />
      );
    }
    return content;
  };

  return (
    <div>
      <ConditionUseCollectionDataForParts
        CompanyId={props.CompanyId}
        projectid={props.projectid}
        partname={props.partname}
        setPartsInfo={setPartsInfo}
      />
      <div className="sub-part">
        <div className={`add-sub-part`}>
          <form onSubmit={addSubPart}>
            <div className="sub-part-input">
              <div className="sub-part-input-child">
                <label>SNo.{" : "}</label>
                <input
                  className="sub-part-number-input"
                  type="number"
                  name="stepNo"
                  value={stepNo}
                  onChange={(e) => setStepNo(e.target.value)}
                />
              </div>
              <div className="sub-part-input-child">
                <label>Desc{" : "}</label>
                <input
                  className="sub-part-text-input"
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="sub-part-input">
              <div className="sub-part-input-child">
                <label>Finish Till{" : "}</label>
                <input
                  className="sub-part-text-input"
                  type="date"
                  name="finishTill"
                  placeholder="finish Till"
                  value={finishTill}
                  onChange={(e) => setFinishTill(e.target.value)}
                />
              </div>
              <div className="sub-part-input-child">
                <button className="sub-parts-form-button" type="submit">
                  Add
                </button>
              </div>
            </div>
            {/* <div className="sub-parts-input">
              <label>Add any file (not necessary) {" : "}</label>
              <input
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div> */}
            {/* <div className="file-name">{file.name ? file.name : ""}</div> */}
          </form>
        </div>
        <div className="sub-part-list-area">
          <ReactShadowScroll style={{ height: 300, padding: 2 }} autoHide>
            {/* <div className="sub-parts-head">
          <div className="sub-parts-head-stepNo">Step No.</div>
          <div className="sub-parts-head-desc">Description</div>
          <div className="sub-parts-head-finishTill">Finish Till</div>
          <div className="sub-parts-head-file">File</div>
        </div> */}
            {listSubPart(partsInfo)}
          </ReactShadowScroll>
        </div>
      </div>
    </div>
  );
}

function ListChild(props) {
  const [completed, setCompleted] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  // const [fileDownloadLoading, setFileDownloadLoading] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubPartCompletedCheckbox = (props) => {
    setCompleted(!completed);
  };


  useEffect(() => {
    
    setCompleted(props.partsInfo.done);

    // if (props.partsInfo.filePath) {
    //   storage.ref(`/sub-parts/${props.partname}`).child(`${props.partsInfo.stepNo}-${props.partsInfo.description}-${props.partsInfo.finishTill}/${props.partsInfo.fileName}`).getDownloadURL()
    //   .then((url) => {
    //     setFileUrl(url);

    //   })
    //   .catch((error) => {
    //     // Handle any errors
    //     alert("Error In Getting file from storage : " + error);
    //   });

      
    // }


  }, [props]);

  var user = auth.currentUser;
  var uid = user.email;

  const SubmitFile = async (e) => {
    e.preventDefault();
    var file = e.target.files[0];
    if (uid) {
      await firestore
        .collection("companies")
        .doc(props.CompanyId)
        .collection("Projects")
        .doc(props.projectid)
        .collection(props.partname)
        .doc(`${props.partsInfo.description}-${props.partsInfo.finishTill}`)
        .update({
          fileName: file.name ? file.name : "no file",
          filePath: file.name
            ? `/sub-parts/${props.partname}/${props.partsInfo.stepNo}-${props.partsInfo.description}-${props.partsInfo.finishTill}/${file.name}`
            : "",
        }).then(() =>{
          storage
          .ref(
            `/sub-parts/${props.partname}/${props.partsInfo.stepNo}-${props.partsInfo.description}-${props.partsInfo.finishTill}/${file.name}`
          )
          .put(file)
          .on("state_changed", alert("success"), alert);
        } );

    } else {
      alert(
        "not able to get name from authentication service check your internet connection or trying reloading your browser"
      );
    }

    setFile(null);
  };

  const DownloadFile = async (e) => {
    e.preventDefault();


    const url = await storage.ref(`/sub-parts/${props.partname}`).child(`${props.partsInfo.stepNo}-${props.partsInfo.description}-${props.partsInfo.finishTill}/${props.partsInfo.fileName}`).getDownloadURL();
            var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

    console.log("inside download file function and url is : "+ url );
    // storage.ref(`/sub-parts/${props.partname}`).child(`${props.partsInfo.stepNo}-${props.partsInfo.description}-${props.partsInfo.finishTill}/${props.partsInfo.fileName}`).getDownloadURL()
    //   .then((url) => {
    //     // `url` is the download URL for 'images/stars.jpg'

    //     // This can be downloaded directly:
    //     var xhr = new XMLHttpRequest();
    //     xhr.responseType = 'blob';
    //     xhr.onload = (event) => {
    //       var blob = xhr.response;
    //     };
    //     xhr.open('GET', url);
    //     xhr.send();

    //   })
    //   .catch((error) => {
    //     // Handle any errors
    //     alert("Error In Getting file from storage : " + error);
    //   });
  } 

  return (
    <div>
      <div className="sub-part-list-child">
        <div className="sub-part-list-child-content-step">
          {props.partsInfo.stepNo}
        </div>
        <div className="sub-part-list-child-content-date">
          {props.partsInfo.finishTill.slice(5)}
        </div>
        <div className="sub-part-list-child-content-desc">
          {props.partsInfo.description}
        </div>
        <div className="sub-part-list-child-content-checkbox">
          <form>
            <input
              name={`completed`}
              type="checkbox"
              checked={completed}
              onChange={handleSubPartCompletedCheckbox}
            />
          </form>
        </div>
        <div className="sub-part-list-child-content-file-upload">
          <form>
            <label className="sub-part-upload-file-label" for="sub-file">
              <div className="file-upload-logo">
                <div className="file-upload-content">upload</div>
              </div>
            </label>
            <input id="sub-file" type="file" onChange={SubmitFile} />
          </form>
        </div>
        <div className="sub-part-list-child-content-file-upload">
          {props.partsInfo.fileName ? (
            <div className="file-download-logo" onClick ={DownloadFile}>
              <div className="file-upload-logo">
                <div className="file-upload-content">down</div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          </div>
      </div>
    </div>
  );
}
