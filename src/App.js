/* eslint-disable react/prop-types */
import React from 'react';
import Cookies from 'universal-cookie';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import Posts from './Posts';
import Gallery from './Gallery';
import Calendar from './Calendar';
import Contact from './Contact';
import './styles/style.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.cookies = new Cookies();
    this.redirect = false;
    this.state = {
      show: this.cookies.get('email'),
      auth: "/login"
    }
  }

  show = () => {
    this.redirect = true;
    this.setState({show: true});
  }

  hide = () => {
    this.setState({show: false});
  }

  changeAuth = (auth) => {
    this.setState({auth: auth});
  }

  render() {
    return (
      <Router>
        {this.state.show ? <><Header hide={this.hide} cookies={this.cookies} />{this.redirect && <Redirect to="/"/>}</> : <Redirect to={this.state.auth} />}
        <Switch>
          <Route exact path="/" render={(props) => <Main {...props} cookies={this.cookies} />} />
          <Route path="/login" render={(props) => <Login {...props} show={this.show} changeAuth={this.changeAuth} cookies={this.cookies} />} />
          <Route path="/signup" render={(props) => <Signup {...props} show={this.show} changeAuth={this.changeAuth} cookies={this.cookies} />} />
          <Route path="/posts" render={(props) => <Posts {...props} cookies={this.cookies} />} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/calendar" render={(props) => <Calendar {...props} cookies={this.cookies} />} />
          <Route path="/contact" component={Contact} />
        </Switch>
        {this.state.show && <Footer />}
      </Router>
    );
  }
}

export default App;
