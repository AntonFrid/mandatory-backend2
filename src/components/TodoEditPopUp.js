import React from 'react';

class TodoEditPopUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: this.props.editData.title, desc: this.props.editData.desc };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    document.body.classList.add("body__hidescroll");
  }

  componentWillUnmount() {
    document.body.classList.remove("body__hidescroll");
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.updateTodo(this.props.editData, this.state.title, this.state.desc);
    this.props.showEditPopUp(false, null);
  }

  render() {
    return (
      <>
        <div onClick={() => this.props.showEditPopUp(false, null)} className='popup__overlay'>
        </div>
        <div className="TodoEditPopUp">
          <div className='TodoEditPopUp__header'>
            <h2>Edit Todo</h2>
            <button onClick={ () => this.props.showEditPopUp(false, null) }>X</button>
          </div>
          <form onSubmit={ this.onSubmit }>
            <label>
              Title
              <input
                className='TodoEditPopUp__titleInput'
                type='text'
                value={ this.state.title }
                onChange={ (e) => this.setState({ title: e.target.value })}
              />
            </label>
            <label>
              Description
              <textarea
                className='TodoEditPopUp__descInput'
                type='textarea'
                value={ this.state.desc }
                onChange={ (e) => this.setState({ desc: e.target.value })}
              />
            </label>
            <input type='submit' value='Confirm'/>
          </form>
        </div>
      </>
    );
  }
}

export default TodoEditPopUp;
