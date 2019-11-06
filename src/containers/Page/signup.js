import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/uielements/input";
import Button from "../../components/uielements/button";
import authAction from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";
import IntlMessages from "../../components/utility/intlMessages";
import SignUpStyleWrapper from "./signup.style";
import Spin from '../Feedback/Spin/spin.style';

import {attemptSignup} from '../../redux/_store/profileContainer/auth/actions'

const { signup } = authAction;
const { clearMenu } = appActions;

class SignUp extends Component {
  state = {
    redirectToReferrer: false,
    firstName: '',
    lastName: '',
    email: '',
    pass: '',
    passConf: ''
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleSignup = () => {
    const { signup, clearMenu } = this.props;
    this.props.attemptSignup(this.state.email, this.state.pass, this.state.firstName, this.state.lastName, this.props.history)
    clearMenu();
    // this.props.history.push("/dashboard/settings");
  };
  render() {

    const onFirstNameChange = event => {
      const value = event.target.value;
      this.setState({ firstName: value });
    };
    const onLastNameChange = event => {
      const value = event.target.value;
      this.setState({ lastName: value });
    };
    const onEmailChange = event => {
      const value = event.target.value;
      this.setState({ email: value });
    };
    const onPassChange = event => {
      const value = event.target.value;
      this.setState({ pass: value });
    };
    const onPassConfChange = event => {
      const value = event.target.value;
      this.setState({ passConf: value });
    };

    return (
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="Sign Up for EDURain" />
              </Link>
            </div>
            {this.props.signupError && (<div style={{color: 'red'}}>
                <p>Error: Could not signup</p>
                <p>{this.props.signupError.message}</p>
              </div>)}
            <Spin spinning={this.props.loadingSignup} size="large">
              <div className="isoSignUpForm">
                <div className="isoInputWrapper isoLeftRightComponent">
                  <Input size="large" placeholder="First name" value={this.state.firstName} onChange={onFirstNameChange}/>
                  <Input size="large" placeholder="Last name" value={this.state.lastName} onChange={onLastNameChange}/>
                </div>

                <div className="isoInputWrapper">
                  <Input type="email" size="large" placeholder="Email" value={this.state.email} onChange={onEmailChange}/>
                </div>

                <div className="isoInputWrapper">
                  <Input size="large" type="password" placeholder="Password" value={this.state.pass} onChange={onPassChange}/>
                </div>

                <div className="isoInputWrapper">
                  <Input
                    size="large"
                    type="password"
                    placeholder="Confirm Password"
                    value={this.state.passConf} onChange={onPassConfChange}
                  />
                </div>

                <div className="isoInputWrapper">
                  <Button type="primary" onClick={this.handleSignup}>
                    <IntlMessages id="page.signUpButton" />
                  </Button>
                </div>

                <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                  <Link to="/signin">
                    <IntlMessages id="page.signUpAlreadyAccount" />
                  </Link>
                </div>
              </div>
            </Spin>
          </div>
        </div>
      </SignUpStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.myapp.profile.auth.isAuthenticated,
    signupError: state.myapp.profile.auth.errors,
    loadingSignup: state.myapp.profile.auth.loadingAuth
  }),
  { signup, clearMenu, attemptSignup }
)(SignUp);
