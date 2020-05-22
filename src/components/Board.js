import React from 'react';
import axios from 'axios';

import Card from './Card.js';
import AddCard from './AddCard.js';
import TodoEditPopUp from './TodoEditPopUp.js';
import TodoInfo from './TodoInfo.js';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      showEditPopUp: false,
      showTodoInfo: false,
      editData: null,
      todoInfo: null
    };

    this.appendData = this.appendData.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.moveTodo = this.moveTodo.bind(this);
    this.showEditPopUp = this.showEditPopUp.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.showTodoInfo = this.showTodoInfo.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/cards')
      .then((res) => {
        this.setState({ data: res.data });
      })
  }

  deleteTodo(cIndex, tIndex) {
    let tempData = this.state.data;
    tempData[cIndex].content.splice(tIndex, 1);

    this.setState({ data: tempData });
  }

  deleteCard(index) {
    let tempData = this.state.data;
    tempData.splice(index, 1);

    this.setState({ data: tempData });
  }

  moveTodo(ocIndex, tIndex, ncIndex) {
    let tempData = this.state.data;
    let todo = tempData[ocIndex].content[tIndex];

    tempData[ncIndex].content.push(todo);
    tempData[ocIndex].content.splice(tIndex, 1);

    this.setState({ data: tempData });
  }

  appendData(data) {
    this.setState({ data: data });
  }

  updateTodo(todoData, title, desc) {
    const {
      cardID,
      todoID,
      cardIndex,
      todoIndex
    } = todoData;

    let tempData = this.state.data;
    let now = Date.now();

    tempData[cardIndex].content[todoIndex] = {
      title: title,
      desc: desc,
      date: now,
      id: todoID
    }

    this.setState({ data: tempData });

    axios.patch(`http://localhost:3000/cards/${cardID}/todos/${todoID}`, {
      title: title,
      desc: desc,
      date: now,
      id: todoID
    });
  }

  showEditPopUp(boolean, todoData) {
    this.setState({
      showEditPopUp: boolean,
      editData: todoData
     });
  }

  showTodoInfo(boolean, todoData) {
    this.setState({
      showTodoInfo: boolean,
      todoInfo: todoData
     });
  }

  render() {
    if (this.state.data === null) return null;

    return (
      <div className="Board">
        {
          this.state.data.map((value, index) => {
            return(
              <Card
                key={ 'card' + index }
                title={ value.title }
                todos={ value.content }
                id={ value.id }
                sendData={ this.appendData }
                index={ index }
                deleteTodo={ this.deleteTodo }
                deleteCard={ this.deleteCard }
                cards={ this.state.data }
                moveTodo={ this.moveTodo }
                showEditPopUp={ this.showEditPopUp }
                showTodoInfo={ this.showTodoInfo }
              />
            )
          })
        }
        <AddCard sendData={ this.appendData }/>
        {
          this.state.showEditPopUp
          ? <TodoEditPopUp
              editData={ this.state.editData }
              updateTodo={ this.updateTodo }
              showEditPopUp={ this.showEditPopUp }
            />
          : null
        }
        {
          this.state.showTodoInfo
          ? <TodoInfo
              todoInfo={ this.state.todoInfo }
              showTodoInfo={ this.showTodoInfo }
              showEditPopUp={ this.showEditPopUp }
            />
          : null
        }
      </div>
    );
  }
}

export default Board;
