import React from 'react';
import axios from 'axios';

import TodoMenu from './TodoMenu.js';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: this.props.cards,
      showMenu: false,
      showButton: false
    }

    this.buttonRef = React.createRef();

    this.onDelete = this.onDelete.bind(this);
    this.onMove = this.onMove.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onTodoClick = this.onTodoClick.bind(this);
  }

  onDelete() {
    axios.delete(`http://localhost:3000/cards/${ this.props.cardID }/todos/${ this.props.id }`);
    this.showMenu(false);
    this.onMouseLeave();
    this.props.deleteTodo(this.props.cardIndex, this.props.index);
  }

  onMove(dir) {
    if(dir === 1) {
      if(!this.props.cards[this.props.cardIndex + 1]) return;

      this.props.moveTodo(this.props.cardIndex, this.props.index, this.props.cardIndex + 1);

      axios.put(`http://localhost:3000/cards/${ this.props.cardID }/todos/${ this.props.id }/cards/${ this.props.cards[this.props.cardIndex + 1].id }`)
    }
    else if (dir === 0) {
      if(!this.props.cards[this.props.cardIndex - 1]) return;

      this.props.moveTodo(this.props.cardIndex, this.props.index, this.props.cardIndex - 1);

      axios.put(`http://localhost:3000/cards/${ this.props.cardID }/todos/${ this.props.id }/cards/${ this.props.cards[this.props.cardIndex - 1].id }`)
    }

    this.showMenu(false);
  }

  onEdit() {
    this.showMenu(false);
    this.onMouseLeave();
    this.props.showPopUp(true, {
      cardID: this.props.cardID,
      todoID: this.props.id,
      cardIndex: this.props.cardIndex,
      todoIndex: this.props.index,
      title: this.props.title,
      desc: this.props.desc
    });
  }

  onTodoClick(e) {
    if(e.target === this.buttonRef.current) return;

    this.props.showTodoInfo(true, {
      cardID: this.props.cardID,
      todoID: this.props.id,
      cardIndex: this.props.cardIndex,
      todoIndex: this.props.index,
      title: this.props.title,
      desc: this.props.desc,
      date: this.props.date
    });
  }

  showMenu(boolean) {
    this.setState({ showMenu: boolean });
  }

  onMouseEnter() {
    this.setState({ showButton: true });
  }

  onMouseLeave() {
    this.setState({ showButton: false });
  }

  render() {
    return (
      <div
        onMouseEnter={ this.onMouseEnter }
        onMouseLeave={ this.onMouseLeave }
        onClick={ this.onTodoClick }
        className="Todo"
      >
        <p>{ this.props.title }</p>
        {
          this.state.showButton
          ? <button ref={ this.buttonRef } onClick={ () => this.showMenu(true) }>☰</button>
          : null
        }
        {
          this.state.showMenu
          ? <TodoMenu
              showMenu={ this.showMenu }
              onMove={ this.onMove }
              onDelete={ this.onDelete }
              onEdit={ this.onEdit }
            />
          : null
        }
      </div>
    );
  }
}

export default Todo;
