import React from 'react';

class TodoInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.todoInfo.title,
      desc: this.props.todoInfo.desc,
      date: this.props.todoInfo.date
    };

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
    this.props.showEditPopUp(true, this.props.todoInfo);
    this.props.showTodoInfo(false, null);
  }

  getDate(ts) {
    let date_ob = new Date(ts);

    let dayArr = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'];

    let dayIndex = date_ob.getDay();
    let year = date_ob.getFullYear();
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let date = ("0" + date_ob.getDate()).slice(-2);
    let hh = ("0" + date_ob.getHours()).slice(-2);
    let mm = ("0" + date_ob.getMinutes()).slice(-2);
    let ss = ("0" + date_ob.getSeconds()).slice(-2);

    return `${dayArr[dayIndex]}, ${year}-${month}-${date} ${hh}:${mm}`;
  }

  render() {
    return (
      <>
        <div onClick={() => this.props.showTodoInfo(false, null) } className='popup__overlay'>
        </div>
        <div className="TodoInfo">
          <div className='TodoInfo__header'>
            <h2>Todo Info</h2>
            <button onClick={ () => this.props.showTodoInfo(false, null) }>X</button>
          </div>
          <form onSubmit={ this.onSubmit }>
            <label>
              Title
              <p className='TodoInfo__title'>{ this.state.title }</p>
            </label>
            <label>
              Description
              <p className='TodoInfo__desc'>{ this.state.desc }</p>
            </label>
            <div className='TodoInfo__footer'>
              <input type='submit' value='Edit'/>
              <p className='TodoInfo__date'>{ this.getDate(this.state.date) }</p>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default TodoInfo;
