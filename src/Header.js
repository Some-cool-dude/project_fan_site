import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './styles/header.scss';

class Header extends React.Component {

  handleClick = (event) => {
    event.preventDefault();
    this.props.cookies.remove('email')
    this.props.cookies.remove('id')
    this.props.cookies.remove('ava');
    this.props.hide();
  }

  render() {
    return (
      <div className="header-menu">
        <nav className="header-menu__nav">
          <NavLink className="header-menu__link" exact activeClassName="active" to="/">
            Home
          </NavLink>
          <div className="header-menu__dropdown">
            <button className="dropdown-btn">
              Dropdown&nbsp;
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <NavLink className="dropdown-content__link" to="/posts">Posts</NavLink>
              <NavLink className="dropdown-content__link" to="/gallery">Gallery</NavLink>
              <NavLink className="dropdown-content__link" to="/calendar">Calendar</NavLink>
            </div>
          </div>
          <NavLink className="header-menu__link" activeClassName="active" to="/contact">
            Contact
          </NavLink>
          <NavLink className="header-menu__link" activeClassName="active" onClick={this.handleClick} to="/logout">
            Logout
          </NavLink>
        </nav>
        <div className="user">
          <img className="user-ava" src={this.props.cookies.get('ava')} alt="ava" />
          <span className="user-name">{this.props.cookies.get('email')}</span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
    hide: PropTypes.func,
    cookies: PropTypes.instanceOf(Cookies)
};

export default Header;
