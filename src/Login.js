import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import md5 from 'crypto-js/md5';
import {GoogleLogin} from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import './styles/login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidEmail: null,
      invalidPassword: null,
      errorMessage: null,
    };
    this.email = '';
    this.password = '';
    this.signal = axios.CancelToken.source();
  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled');
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let invalidEmail = this.state.invalidEmail;
    let invalidPassword = this.state.invalidPassword;
    if (this.email === '') {
      this.setState({ invalidEmail: 'please fill this field' });
      invalidEmail = '';
    }
    if (this.password === '') {
      this.setState({ invalidPassword: 'please fill this field' });
      invalidPassword = '';
    }
    if (invalidEmail === null && invalidPassword === null) {
      event.persist();
      axios.get(`/api/users?email=${this.email}`, {cancelToken: this.signal.token})
      .then(res => {
        if(res.data[0] && res.data[0].password === md5(this.password).toString()) {
          this.props.cookies.set('email', this.email, {sameSite: 'lax'});
          this.props.cookies.set('id', res.data[0].id, {sameSite: 'lax'});
          this.props.cookies.set('ava', res.data[0].ava, {sameSite: 'lax'});
          this.props.show();
        }
        else {
          this.setState({invalidPassword: 'wrong email or password', invalidEmail: 'wrong email or password'});
          event.target.reset();
        }
      })
      .catch(err => this.setState({errorMessage: err.message}));
    }
  }

  changeEmail = (event) => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailRex.test(event.target.value)) {
      this.setState({invalidEmail: null});
    }
    else {
      this.setState({invalidEmail: 'incorrect email'})
    }
    this.email = event.target.value;
  }

  changePassword = (event) => {
    if (event.target.value === '') {
      this.setState({ invalidPassword: 'please fill this field' });
    } else {
      this.setState({ invalidPassword: null });
    }
    this.password = event.target.value;
  }

  redirect = (event) => {
    event.preventDefault();
    this.props.changeAuth("/signup");
  }

  success = async(response) => {
    try {
      let res = await axios.get(`/api/users?socialId=${response.googleId}&socialType=google`, {cancelToken: this.signal.token});
      res.data = res.data[0]
      if(!res.data) {
        res = await axios.post(`/api/users`, {socialId: response.profileObj.googleId, socialType: "google"}, {cancelToken: this.signal.token});
      }
      this.props.cookies.set('email', response.profileObj.email, {sameSite: 'lax'});
      this.props.cookies.set('id', res.data.id, {sameSite: 'lax'});
      this.props.cookies.set('ava', response.profileObj.imageUrl, {sameSite: 'lax'});
      this.props.show();
    }
    catch(err) {
      if(!axios.isCancel(err)) {
        this.setState({errorMessage: err.message})
      }
    }
  }

  failure = (res) => {
    console.log(res);
  }

  responseFacebook = async(response) => {
    if(response.id) {
      try {
        let res = await axios.get(`/api/users?socialId=${response.id}&socialType=facebook`, {cancelToken: this.signal.token});
        res.data = res.data[0]
        if(!res.data) {
          res = await axios.post(`/api/users`, {socialId: response.id, socialType: "facebook"}, {cancelToken: this.signal.token});
        }
        this.props.cookies.set('email', response.emai, {sameSite: 'lax'});
        this.props.cookies.set('id', res.data.id, {sameSite: 'lax'});
        this.props.cookies.set('ava', response.picture.data.url, {sameSite: 'lax'});
        this.props.show();
      }
      catch(err) {
        if(!axios.isCancel(err)) {
          this.setState({errorMessage: err.message})
        }
      }
    }
  }

  render() {
    return (
       <main className="content">
         <div className="login">
          <form className="login__form" onSubmit={this.handleSubmit}>
              <h1>Login</h1>
              {this.state.errorMessage && <h1 className="error">{this.state.errorMessage}</h1>}
              <div>
              <label htmlFor="email"><b>Email</b></label>
              <input className="login__email" type="text" placeholder="example@email.some" onChange={this.changeEmail} name="email" />
              {this.state.invalidEmail && <p className="error">{this.state.invalidEmail}</p>}
              <label htmlFor="psw"><b>Password</b></label>
              <input className="login__psw" type="password" placeholder="********" onChange={this.changePassword} name="password" />
              </div>
              {this.state.invalidPassword && <p className="error">{this.state.invalidPassword}</p>}
              <p>Create new account? <a className="login__change" href="/signup" onClick={this.redirect}>Sign up</a>.</p>
              <GoogleLogin
                className="google-btn"
                clientId="219069550398-20c0t4f1l8bn8571svp50psjkh75sgmd.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.success}
                onFailure={this.failure}
                cookiePolicy={'single_host_origin'}
              />
              <FacebookLogin
                cssClass="facebook-btn"
                appId="564989494220175"
                fields="name,email,picture"
                callback={this.responseFacebook}
                scope="public_profile"
                textButton=" Login with Facebook"
                icon="fa-facebook" />
              <button className="login__btn" type="submit">Login</button>
          </form>
         </div>
       </main>
    );
  }
}

Login.propTypes = {
  show: PropTypes.func,
  changeAuth: PropTypes.func,
  cookies: PropTypes.instanceOf(Cookies)
};

export default Login;
