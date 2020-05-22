import React from 'react';
import axios from 'axios';

import Todo from './Todo.js';
import AddTodo from './AddTodo.js';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showAdd: false };

    this.switchAdd = this.switchAdd.bind(this);
    this.scrollBottom = this.scrollBottom.bind(this);
    this.deleteCard = this.deleteCard.bind(this);

    this.contentRef = React.createRef();
  }

  switchAdd(boolean) {
    this.setState({ showAdd: boolean });
  }

  scrollBottom() {
    setTimeout(() => {
      this.contentRef.current.scrollTop = this.contentRef.current.scrollHeight;
    }, 10);
  }

  deleteCard() {
    axios.delete(`http://localhost:3000/cards/${ this.props.id }`);

    this.props.deleteCard(this.props.index);
  }

  render() {
    return (
      <div className="Card">
        <div className='Card__header'>
          <h3>{ this.props.title }</h3>
          <button onClick={ this.deleteCard }>X</button>
        </div>
        <div ref={ this.contentRef } className={ this.state.showAdd ? 'Card__content__add' :'Card__content' }>
          {
            this.props.todos.map((value, index) => {
              return(
                <Todo
                  key={ this.props.title + 'todo' + index }
                  title={ value.title }
                  desc={ value.desc }
                  date={ value.date }
                  id={ value.id }
                  index={ index }
                  cardID={ this.props.id }
                  cardIndex={ this.props.index }
                  deleteTodo={ this.props.deleteTodo }
                  cards={ this.props.cards }
                  moveTodo={ this.props.moveTodo }
                  showPopUp={ this.props.showEditPopUp }
                  showTodoInfo={ this.props.showTodoInfo }
                />
              )
            })
          }
          {
            this.state.showAdd
            ? <AddTodo
                cardID={ this.props.id }
                close={ this.switchAdd }
                sendData={ this.props.sendData }
                scrollBottom={ this.scrollBottom }
              />
            : null
          }
        </div>
        {
          !this.state.showAdd
          ? <div className='Card__footer'>
              <button
                onClick={ () => {
                  this.switchAdd(true);
                  this.scrollBottom();
                }
              }>
              + Add another todo
              </button>
            </div>
          : null
        }
      </div>
    );
  }
}

export default Card;
