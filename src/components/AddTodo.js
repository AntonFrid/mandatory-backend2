import React from 'react';
import axios from 'axios';

class AddTodo extends React.Component {
  constructor(props) {
    super(props);

    this.state = { newTodo: '' };

    this.inputRef = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  onSubmit(e) {
    e.preventDefault();

    let now = Date.now();

    axios.post(`http://localhost:3000/cards/${ this.props.cardID }/todo`, {
      title: this.state.newTodo,
      desc: '',
      date: now
    })
      .then((res) => {
        this.props.sendData(res.data)
        this.setState({ newTodo: '' });
        this.props.close(false);
        this.props.scrollBottom();
      });
  }

  render() {
    return (
      <div className='AddTodo'>
        <form onSubmit={ this.onSubmit }>
          <input
            type='text'
            value={ this.state.newTodo }
            onChange={ (e) => this.setState({ newTodo: e.target.value })}
            placeholder='Enter a title for your todo...'
            ref={ this.inputRef }
          />
          <div className='AddTodo__buttons'>
            <input type='submit' value='Add todo'/>
            <button onClick={ () => this.props.close(false) }>X</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddTodo;
