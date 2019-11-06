import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/uielements/input";
import Button from "../../components/uielements/button";
import authAction from "../../redux/auth/actions";
import appAction from "../../redux/app/actions";
import IntlMessages from "../../components/utility/intlMessages";
import SignInStyleWrapper from "./signin.style";
import Spin from "../Feedback/Spin/spin.style";

import {attemptLogin} from '../../redux/_store/profileContainer/auth/actions'

const { login } = authAction;
const { clearMenu } = appAction;

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    email: "",
    pass: ""
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {
    //const { login, clearMenu } = this.props;
    console.log('signing in')
    this.props.attemptLogin(this.state.email, this.state.pass, this.props.history)
    //clearMenu();
  };
  onKeyPress = e => {
    if (e.which === 13) {
      this.handleLogin();
    }
  };
  render() {
    const from = { pathname: "/dashboard" };
    const { redirectToReferrer } = this.state;
    const onEmailChange = event => {
      const value = event.target.value;
      this.setState({ email: value });
    };
    const onPassChange = event => {
      const value = event.target.value;
      this.setState({ pass: value });
    };

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="EDURain Sign In" />
              </Link>
            </div>
            {this.props.loginError && (<div style={{color: 'red'}}>
                <p>Error: Could not sign in</p>
                <p>{this.props.loginError.message}</p>
              </div>)}
            <Spin spinning={this.props.loadingSignup} size="large">
              <div className="isoSignInForm">
                <div className="isoInputWrapper">
                  <Input
                    size="large"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={onEmailChange}
                    autoFocus
                  />
                </div>

                <div className="isoInputWrapper">
                  <Input
                    size="large"
                    type="password"
                    placeholder="Password"
                    value={this.state.pass}
                    onChange={onPassChange}
                    onKeyPress={this.onKeyPress}
                  />
                </div>

                <div className="isoInputWrapper isoLeftRightComponent">
                  <Button type="primary" onClick={this.handleLogin}>
                    <IntlMessages id="page.signInButton" />
                  </Button>
                </div>

                <div className="isoCenterComponent isoHelperWrapper">
                  {/* <Link to="/forgotpassword" className="isoForgotPass">
                    <IntlMessages id="page.signInForgotPass" />
                  </Link> */}
                  <Link to="/signup">
                    <IntlMessages id="page.signInCreateAccount" />
                  </Link>
                </div>
              </div>
            </Spin>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.myapp.profile.auth.isAuthenticated,
    loginError: state.myapp.profile.auth.errors,
    loadingSignup: state.myapp.profile.auth.loadingAuth
  }),
  { login, clearMenu, attemptLogin }
)(SignIn);
