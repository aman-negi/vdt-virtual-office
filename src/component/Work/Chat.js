import React, { Component, useState, useEffect, useRef } from "react";
import { auth, firestore } from "../../initfirebase";
import LeftSidebar from "./LeftSidebar";
import "../../css/chat.css";
import { useHistory, useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import ReactShadowScroll from "react-shadow-scroll";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";

function Chat(props) {
  let history = useHistory();

  const [list, setList] = useState([{}]);
  const [firstloading, setfirstLoading] = useState(true);
  const [secondLoading, setsecondLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedList, setSelectedList] = useState({});
  const [CompanyId, setCompanyId] = useState("");
  const [ProfileState, setProfileState] = useState({});

  useEffect(() => {
    var user = auth.currentUser;
    if (firstloading) {
      firestore
        .collection("Employees")
        .doc(user.email)
        .collection("info")
        .doc("info")
        .get()
        .then(function (doc) {
          if (doc.exists) {
            var userCompanyId = doc.data().CompanyId;
            setCompanyId(userCompanyId);
            setSelectedId(userCompanyId);
            setProfileState(doc.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
          alert(error + "in getting companyId in first search");
        });

      if (CompanyId != "") {
        firestore
          .collection("companies")
          .doc(CompanyId)
          .collection("Messages")
          .where("EmployeeEmails", "array-contains", user.email)
          .get()
          .then((querySnapshot) => {
            const Lists = [];
            querySnapshot.forEach((documentSnapshot) => {
              Lists.push({ ...documentSnapshot.data() });
              if (documentSnapshot.data().groupId === CompanyId) {
                setSelectedList(documentSnapshot.data());
              }
            });
            setList(Lists);
            setsecondLoading(false);
            setfirstLoading(false);
          })
          .catch(function (error) {
            console.error("Error removing document: ", error);
            alert(error + "in putting CompanyId in second search");
          });
      }
    }
  },[props,selectedId]);

  const changeSelectedGroup = (props) => {
    setSelectedId(props);
    for (var d in list) {
      console.log(list[d].groupId);
      if (list[d].groupId === props) {
        setSelectedList(list[d]);
        break;
      }
    }
  };

  return (
    <div className="parent-body">
      <LeftSidebar history={history} />
      {secondLoading === true ? (
        <div className="loading">
          <div style={{ fontSize: 50 }}>loading </div>
          <ReactLoading
            type="bubbles"
            color="#2d3436"
            height={100}
            width={100}
          />
        </div>
      ) : (
        <div className="body-for-chat">
          <ChatGroupList
            CompanyId={CompanyId}
            selectedId={selectedId}
            list={list}
            changeSelectedGroup={changeSelectedGroup}
          />
          <BeforeMessagingArea
            CompanyId={CompanyId}
            selectedId={selectedId}
            selectedList={selectedList}
            ProfileState={ProfileState}
          />
        </div>
      )}
    </div>
  );
}

//////////////////////////////////// group-list ///////////////////////////////////

function ChatGroupList(props) {
  const [loading, setLoading] = useState(true);

  const listItems = props.list.map((d, idx) => (
    <ListChild
      changeSelectedGroup={props.changeSelectedGroup}
      selectedId={props.selectedId}
      d={d}
      key={idx}
    />
  ));

  // var listItems = "yo";

  return (
    <div className="group-list">
      <div className="group-list-head">
        <div className="group-name-head">Group Names</div>
      </div>
      <div>
        <ReactShadowScroll style={{ height: 300, padding: 5 }} autoHide>
          {listItems}
        </ReactShadowScroll>
      </div>
    </div>
  );
}

function ListChild(props) {
  const [selected, setSelected] = useState(false);
  var selectedStyle = selected ? "isSelectedGroup" : "notSelectedGroup";
  useEffect(() => {
    if (props.selectedId === props.d.groupId) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  },[props]);

  return (
    <div className={selectedStyle}>
      <div
        className="inside-box"
        onClick={(e) => {
          e.preventDefault();
          props.changeSelectedGroup(props.d.groupId);
        }}
      >
        {props.d.groupName}
      </div>
    </div>
  );
}

class BeforeMessagingArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: "",
      selectedList: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({
      selectedId: this.props.selectedId,
      selectedList: this.props.selectedList,
      loading: false,
    });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.selectedId !== prevProps.selectedId) {
      this.forceUpdate();
      this.setState({
        selectedId: this.props.selectedId,
        selectedList: this.props.selectedList,
        loading: false,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.loading === true ? (
          <ReactLoading
            type="spinningBubbles"
            color="#2d3436"
            height={200}
            width={200}
          />
        ) : (
          <MessagingArea
            CompanyId={this.props.CompanyId}
            selectedId={this.state.selectedId}
            selectedList={this.state.selectedList}
            ProfileState={this.props.ProfileState}
          />
        )}
      </div>
    );
  }
}
/////////////////////////////////// for wrapping conditionally rendered hoook /////////////////////////////////
const ConditionUseCollectionData = ({
  setMessageList,
  CompanyId,
  selectedId,
}) => {
  const messageRef = firestore
    .collection("companies")
    .doc(CompanyId)
    .collection("Messages")
    .doc(selectedId)
    .collection("message-list");
  const querry = messageRef.orderBy("createdAt").limit(50);

  const [messageList] = useCollectionData(querry, { idField: "id" });
  setMessageList(messageList);

  return null;
};

/////////////////////////////////// messaging area ///////////////////////////////

function MessagingArea(props) {
  const [messageList, setMessageList] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formValue, setFormValue] = useState("");
  const { name, email } = props.ProfileState;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom
    ,[messageList]);

  const sendMessage = async (e) => {
    e.preventDefault();
    var user = auth.currentUser;
    var userName = user.displayName;
    var uid = user.email;
    if(userName){
      await firestore
      .collection("companies")
      .doc(props.CompanyId)
      .collection("Messages")
      .doc(props.selectedId)
      .collection("message-list")
      .add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userName,
        uid,
      });
    }
    else {
      alert("not able to get name from authentication service check your internet connection or trying reloading your browser")
    }
    setFormValue("");
    scrollToBottom();
  };

  return (
    <div className="messaging-area-body">
      <div className="message-chat-window">
      {props.CompanyId && props.selectedId && (
          <ConditionUseCollectionData
            CompanyId={props.CompanyId}
            selectedId={props.selectedId}
            setMessageList={setMessageList}
          />
        )}
        <div className="message-chat-window-header">
          Group Name {"-> "}{props.selectedList.groupName}
        </div>
        <div className="message-chat-window-body">
          <ReactShadowScroll
            style={{ height: 525, padding: 4}}
            autoHide
          >
            {loading === true ? (
              <ReactLoading
                type="spinningBubbles"
                color="#2d3436"
                height={250}
                width={200}
              />
            ) : (
              <div>
                {messageList &&
                  messageList.map((d, idx) => (
                    <MessageList
                      key={idx}
                      d={d}
                      messageList={messageList}
                      uid={email}
                      userName={name}
                    />
                  ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ReactShadowScroll>
        </div>
        <div className="message-chat-window-footer">
          <form onSubmit={sendMessage}>
            <input
              className="text-input"
              type="text"
              name="text"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
            />
            <button type="submit" className="send-button">
              send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/////////////////////////////////   Message List   ////////////////////////////////////////////////////////

function MessageList(props) {
  const [sender, setSender] = useState(false);

  var selectedStyle = sender ? "message-sent" : "message-recived";
  useEffect(() => {
    var user = auth.currentUser;
    if (props.d.uid === props.uid || props.d.uid === user.email) {
      setSender(true);
    }
  }, [props]);
  return (
    <div className={selectedStyle}>
      <div>
        <div className="message-child">{props.d.text}</div>
        <div className="uid-style">{props.d.userName}</div>
      </div>
    </div>
  );
}

export default Chat;
