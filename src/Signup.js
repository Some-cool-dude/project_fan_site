import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import md5 from 'crypto-js/md5';
import './styles/login.scss';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        validate: false,
        letter: "invalid",
        length: "invalid",
        capital: "invalid",
        number: "invalid",
        invalidEmail: null,
        invalidPassword: null,
        errorMessage: null
    };
    this.email = '';
    this.password = '';
    this.lowerCaseLetters = /[a-z]/g;
    this.upperCaseLetters = /[A-Z]/g;
    this.numbers = /[0-9]/g;
    this.signal = axios.CancelToken.source();
  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled');
}

  handleSubmit = async(event) => {
    event.preventDefault();
    let invalidEmail = this.state.invalidEmail;
    let invalidPassword = this.state.invalidPassword;
    if (this.email === '') {
      this.setState({ invalidEmail: 'please fill this field' });
      invalidEmail = '';
    }
    if (this.password === '') {
      this.setState({ invalidPassword:  'please fill this field' });
      invalidPassword = '';
    }
    if (invalidEmail === null && invalidPassword === null) {
        event.persist();
      try {
        let res = await axios.get(`/api/users?email=${this.email}&socialType=none&socialId=0`, {cancelToken: this.signal.token});
        if(!res.data[0]) {
            res = await axios.post("/api/users", {email: this.email, socialType: "none", socialId: 0, password: md5(this.password).toString(), ava: "https://www.shareicon.net/data/2015/09/18/103159_user_512x512.png"}, {cancelToken: this.signal.token});
            this.props.cookies.set('email', this.email, {sameSite: 'lax'});
            this.props.cookies.set('id', res.data.id, {sameSite: 'lax'});
            this.props.cookies.set('ava', res.data.ava, {sameSite: 'lax'});
            this.props.show();
        }
        else {
          this.setState({invalidEmail: 'this email is already exist'});
          event.target.reset(); 
        }
      }
      catch(err) {
        if (!axios.isCancel(err)) {
            this.setState({errorMessage: err.message});
        }
      }
    }
  }

  handleFocus = () => {
    this.setState({validate: true});
  }

  handleBlur = () => {
    this.setState({validate: false});
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
    let letter = '';
    let capital = '';
    let number = '';
    let length = '';
    let invalidPassword = null;
    const message = "follow the rules";
    if(event.target.value.match(this.lowerCaseLetters)) {
        letter = "valid";
    }
    else {
        letter = "invalid";
        invalidPassword = message;
    }

    if(event.target.value.match(this.upperCaseLetters)) {
        capital = "valid";
    }
    else {
        capital = "invalid";
        invalidPassword = message;
    }

    if(event.target.value.match(this.numbers)) {
        number = "valid";
    }
    else {
        number = "invalid";
        invalidPassword = message;
    }

    if(event.target.value.length >= 8) {
        length = "valid";
    }
    else {
        length = "invalid";
        invalidPassword = message;
    }
    this.setState({letter: letter, capital: capital, number: number, length: length, invalidPassword: invalidPassword});
    this.password = event.target.value;
  }

  repeatPassword = (event) => {
      if(this.password !== event.target.value) {
        this.setState({invalidPassword: "password don`t match"});
      }
      else {
          if(this.state.letter !== "invalid" && this.state.capital !== "invalid" && this.state.number !== "invalid" && this.state.length !== "invalid") {
            this.setState({invalidPassword: null});
          }
          else {
            this.setState({invalidPassword: "follow the rules"});
          }
      }
  }

  redirect = (event) => {
    event.preventDefault();
    this.props.changeAuth("/login");
  }

  render() {
    return (
       <main className="content">
         <div className="login">
          <form className="login__form" onSubmit={this.handleSubmit}>
              <h1>Sign up</h1>
              {this.state.errorMessage && <h1 className="error">{this.state.errorMessage}</h1>}
              <div>
              <label htmlFor="email"><b>Email</b></label>
              <input className="login__email" type="text" placeholder="example@email.some" onChange={this.changeEmail} name="email" />
              {this.state.invalidEmail && <p className="error">{this.state.invalidEmail}</p>}
              <label htmlFor="psw"><b>Password</b></label>
              <input className="login__psw" type="password" placeholder="********" onChange={this.changePassword} onFocus={this.handleFocus} onBlur={this.handleBlur} name="password" />
              </div>
              {this.state.invalidPassword && <p className="error">{this.state.invalidPassword}</p>}
              {this.state.validate && 
                <div>
                    <p className={this.state.letter}>A <b>lowercase</b> letter</p>
                    <p className={this.state.capital}>A <b>capital (uppercase)</b> letter</p>
                    <p className={this.state.number}>A <b>number</b></p>
                    <p className={this.state.length}>Minimum <b>8 characters</b></p>
                </div>}
              <label htmlFor="psw"><b>Repeat password</b></label>
              <input className="login__psw" type="password" placeholder="********" onChange={this.repeatPassword} name="repeat" />
              <p>Already have an account? <a className="login__change" href="/login" onClick={this.redirect}>Log in</a>.</p>
              <button className="login__btn" type="submit">Sign up</button>
          </form>
         </div>
       </main>
    );
  }
}

Signup.propTypes = {
  show: PropTypes.func,
  changeAuth: PropTypes.func,
  cookies: PropTypes.instanceOf(Cookies)
};

export default Signup;
