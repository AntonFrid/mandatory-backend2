import React from 'react';
import axios from 'axios';

class AddCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showAdd: false, newCard: '' };

    this.inputRef = React.createRef();

    this.switchAdd = this.switchAdd.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevState) {
    if(prevState.showAdd !== this.state.showAdd) {
      if(this.state.showAdd) {
        this.inputRef.current.focus();
      }
    }
  }

  switchAdd(boolean) {
    this.setState({ showAdd: boolean });
  }

  onSubmit(e) {
    e.preventDefault();

    axios.post('http://localhost:3000/cards/card', {
      title: this.state.newCard
    })
      .then((res) => {
        this.props.sendData(res.data);
        this.setState({ newCard: '' });
        this.switchAdd(false);
      });
  }

  render() {
    return (
      <div className="AddCard">
        { this.state.showAdd
          ? <div className='AddTodo'>
              <form onSubmit={ this.onSubmit }>
                <input
                  type='text'
                  value={ this.state.newCard }
                  onChange={ (e) => this.setState({ newCard: e.target.value })}
                  placeholder='Enter a title for your card...'
                  ref={ this.inputRef }
                />
                <div className='AddTodo__buttons'>
                  <input type='submit' value='Add card'/>
                  <button onClick={ () => this.switchAdd(false) }>X</button>
                </div>
              </form>
            </div>
          : <button onClick={ () => this.switchAdd(true) }>+ Add a new card</button>
        }
      </div>
    );
  }
}

export default AddCard;
