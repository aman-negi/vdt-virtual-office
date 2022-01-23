import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlipMove from "react-flip-move";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import LeftSidebar from "./LeftSidebar";
import { auth, firestore } from "../../initfirebase";
import "../../css/todo.css";

library.add(faTrash);

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    var curr = new Date();
    curr.setDate(curr.getDate() + 3);
    var date = curr.toISOString().substr(0, 10);
    this.state = {
      items: [],
      loading: true,
      currentItem: {
        text: "",
        endDate: date,
        key: "",
        checker:false,
        StepNo:0
      },
    };
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem=this.updateItem.bind(this);
  }
  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    var user = auth.currentUser;
    if (newItem.text !== "") {

      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {
          text: "",
          key: "",
          endDate: newItem.endDate,
          StepNo:0,
          checker:false,
        },
      });
      if (window.location.pathname === "/todo") {
        firestore
          .collection("Employees")
          .doc(user.email)
          .collection("todo-list")
          .doc("todo")
          .set({
            items: items,
          });
      } else if (window.location.pathname.slice(0, 8) === "/project") {
        firestore
          .collection("companies")
          .doc(this.props.CompanyId)
          .collection("Projects")
          .doc(this.props.projectid)
          .collection("todo")
          .doc(this.props.partname)
          .set({
            items: items,
          });
      }
    }
  }

  handleInput(e) {
    this.setState({
      currentItem: {
        ...this.state.currentItem,
        key: Date.now(),
        [e.target.name]: e.target.value,
      },
    });
  }

  deleteItem(key) {
    var user = auth.currentUser;
    const filteredItems = this.state.items.filter((item) => item.key !== key);
    this.setState({
      items: filteredItems,
    });
    if (window.location.pathname === "/todo") {
      firestore
        .collection("Employees")
        .doc(user.email)
        .collection("todo-list")
        .doc("todo")
        .set({
          items: filteredItems,
        });
    } else if (window.location.pathname.slice(0, 8) === "/project") {
      firestore
        .collection("companies")
        .doc(this.props.CompanyId)
        .collection("Projects")
        .doc(this.props.projectid)
        .collection("todo")
        .doc(this.props.partname)
        .set({
          items: filteredItems,
        });
    }
  }



  updateItem=(key)=>{
      this.setState(prevState => ({
        items: prevState.items.map(
        obj => (obj.key === key ? Object.assign(obj, { checker:!obj.checker}) : obj)
      )
    }));
    var user = auth.currentUser;
    var filteredItems = [...this.state.items];
    filteredItems.map(
      obj => (obj.key === key ? Object.assign(obj, { checker:!obj.checker,}) : obj)
    )

    if (window.location.pathname === "/todo") {
      firestore
        .collection("Employees")
        .doc(user.email)
        .collection("todo-list")
        .doc("todo")
        .set({
          items: filteredItems,
        });
    } else if (window.location.pathname.slice(0, 8) === "/project") {
      firestore
        .collection("companies")
        .doc(this.props.CompanyId)
        .collection("Projects")
        .doc(this.props.projectid)
        .collection("todo")
        .doc(this.props.partname)
        .set({
          items: filteredItems,
        });
    }
    }

  componentDidMount() {
    var user = auth.currentUser;
    var component = this;
    console.log(user.email);
    if(this.state.loading){
    if (window.location.pathname === "/todo") {
      firestore
        .collection("Employees")
        .doc(user.email)
        .collection("todo-list")
        .doc("todo")
        .get()
        .then(function (doc) {
          var Items = [];
          if (doc.data().items) {
            Items.push(...doc.data().items);
            component.setState({
              ...component.state,
              items: Items,
              loading: false,
            });
          } else {
            component.setState({
              ...component.state,
              items: [],
            });
          }
        });
    } else if (window.location.pathname.slice(0, 8) === "/project") {
      firestore
        .collection("companies")
        .doc(this.props.CompanyId)
        .collection("Projects")
        .doc(this.props.projectid)
        .collection("todo")
        .doc(this.props.partname)
        .get()
        .then(function (doc) {
          var Items = [];
          if (doc.data()) {
            Items.push(...doc.data().items);
            component.setState({
              ...component.state,
              items: Items,
              loading: false,
            });
          } else {
            component.setState({
              ...component.state,
              items: [],
              loading: false,
            });
          }
        });
    }
  }
  }

  render() {
    return (
      <div className="body-content">
        <LeftSidebar history={this.props.history} />
        {this.state.loading === true ? (
          <div>loading.. </div>
        ) : (
          <div className="List-Area">
            <div className="todo-enter">
              <form
                id="to-do-form"
                onSubmit={this.addItem}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div className="todo-childs">
                  <label>Enter The Task</label>
                  <input
                    type="text"
                    name="text"
                    placeholder="Enter task"
                    value={this.state.currentItem.text}
                    onChange={this.handleInput}
                  ></input>
                </div>

                {window.location.pathname.slice(0, 8) === "/project" ? (
                                    <div className="todo-childs">
                                    <label>Step No.</label>
                                    <input
                                      type="number"
                                      name="StepNo"
                                      placeholder="Step No."
                                      value={this.state.currentItem.StepNo}
                                      onChange={this.handleInput}
                                    />
                                  </div>
                ) : (
                  <div className="todo-childs">
                    <label>End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      placeholder="end date"
                      value={this.state.currentItem.date}
                      onChange={this.handleInput}
                    />
                  </div>
                )}

                <div className="todo-childs">
                  <button className="todo-form-button" type="submit">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="todo-list">
              <div
                className="list-items"
                style={{
                  backgroundColor: "rgb(228, 228, 47)",
                  padding: 5,
                  borderRadius: 6,
                }}
              >
                {window.location.pathname.slice(0, 8) === "/project" ? (
                  <div style={{ flex: 2 }}>Step No.</div>
                ) : (
                  <div style={{ flex: 2 }}>Finish Till</div>
                )}
                <div style={{ flex: 5 }}>To-do task</div>
                <div style={{ flex: 1 }}>done</div>
                <div style={{ flex: 1 }}>delete it</div>
                
              </div>
              <ListItems
                items={this.state.items}
                deleteItem={this.deleteItem}
                updateItem={this.updateItem}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TodoList;

function ListItems(props) {
  var listItems = props.items.map((item) => {
    return (
      <div className="list" key={item.key}>
        <div className="list-items">
          {window.location.pathname.slice(0, 8) === "/project" ? (
            <div  style={{ flex: 2 }}>{item.StepNo}</div>
          ) : (
            <div style={{ flex: 2 }}>{item.endDate}</div>
          )}
          <div style={{ flex: 5 }}>{item.text}</div>
          <input
          style={{ flex: 1 }}
              type="checkbox"
              name="check"
              checked={item.checker}
              onChange={() => {
               props.updateItem(item.key);
              }}
            />

          <div style={{ flex: 1 }}>
            <span>
              <FontAwesomeIcon
                className="faicons"
                onClick={() => {
                  props.deleteItem(item.key);
                }}
                icon="trash"
              />
            </span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <FlipMove duration={300} easing="ease-in-out">
        {listItems}
      </FlipMove>
    </div>
  );
}
