import React from 'react';

class TodoMenu extends React.Component {
  constructor(props) {
    super(props);

    this.menuRef = React.createRef();

    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.closeMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closeMenu);
  }

  closeMenu(e) {
    if(this.menuRef && this.menuRef.current !== e.target.parentElement) {
      this.props.showMenu(false);
    }
  }

  render() {
    return (
      <div onClick={ (e) => e.stopPropagation() } ref={ this.menuRef } className="TodoMenu">
        <button onClick={ () => this.props.onMove(0) }>{'Move left'}</button>
        <button onClick={ () => this.props.onMove(1) }>{'Move right'}</button>
        <button onClick={ this.props.onEdit }>Edit</button>
        <button onClick={ this.props.onDelete }>Delete</button>
      </div>
    );
  }
}

export default TodoMenu;
