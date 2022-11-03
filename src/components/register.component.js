import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Link, Navigate } from "react-router-dom"
import {FormControl, FormLabel, RadioGroup, FormControlLabel} from "react-bootstrap"

import showPwdImg from "../assets/show-password.svg"
import hidePwdImg from "../assets/hide-password.svg"

import AuthService from "../services/auth.service";

import 'react-phone-input-2/lib/high-res.css'

import { Translation } from "react-i18next"

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      currentUser: undefined,
      username: "",
      name: "",
      email: "",
      password: "",
      loading: false,
      successful: false,
      message: ""
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.name,
        this.state.email,
        this.state.password,
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true,
            loading: false
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
            loading: false
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    const { currentUser, passwordShown } = this.state;
    const { t } = this.props
    return (

      <div className="flex flex-auto">
        {currentUser ? (<Navigate to="/profile" />) : (<></>)}
        <div className="w-full h-full justify-center bg-gray-50 border-b-2 border-gray-100" >
          <div className="col-md-12">
            <div className="card card-container bg-white">
              <h4 className="font-medium text-xl">
                <Translation>
                  {
                    t => <>{t("")}</>
                  }
                </Translation>
              </h4>

              <Form
                onSubmit={this.handleRegister}
                ref={c => {
                  this.form = c;
                }}
              >
                {!this.state.successful && (
                  <div>
                    <div className="form-group mb-0 mt-3">
                      <label htmlFor="name" className="font-medium text-sm">                 
                        <Translation>
                          {
                            t => <>{t("name")}</>
                          }
                        </Translation>
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeName}
                      />
                    </div>
                  <span className="text-xs">
                    <Translation>
                      {
                        t => <>{t("namet")}</>
                      }
                    </Translation>
                  </span>





                  <div className="form-group">
                    <label htmlFor="email" className="font-medium text-sm">Email</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      validations={[required, email]}
                    />
                  </div>
                  <div className="form-group containerIMG mb-0">
                      <label htmlFor="password" className="font-medium text-sm">                  
                        <Translation>
                          {
                            t => <>{t("password")}</>
                          }
                        </Translation>
                      </label>
                      <div className="containerImg">
                        <Input
                          type={passwordShown ? "text" : "password"}
                          className="form-control input"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          validations={[required, vpassword]}
                        />
                        <img className="image"
                          title={passwordShown ? "Hide password" : "Show password"}
                          src={passwordShown ? hidePwdImg : showPwdImg}
                          onClick={() => this.setState({ passwordShown: !this.state.passwordShown })}
                        />
                      </div>
                  </div>
                  <span className="text-xs">                  
                    <Translation>
                      {
                        t => <>{t("passLen")}</>
                      }
                    </Translation>
                  </span>
                  <br></br>
                  <br></br>

                  <p className="text-xs">
                    <Translation>
                      {
                        t => <>{t("terms")}</>
                      }
                    </Translation>
                  </p>

                  <div className="form-group">
                    <button
                        className="w-100 whitespace-nowrap rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-600"
                        disabled={this.state.loading}
                        >
                        {this.state.loading && (
                          <span className="spinner-border spinner-border-sm mr-2"></span>
                        )}
                        <span>
                          <Translation>
                            {
                              t => <>{t("register")}</>
                            }
                          </Translation>
                        </span>
                    </button>
                  </div>
                </div>
                )}

                {this.state.message && (
                  <div className="form-group">
                    <div
                      className={
                        this.state.successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {this.state.message}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />
              </Form>

              <p class="mt-1 text-xs font-light text-gray-500">
                <Translation>
                  {
                    t => <>{t("registred")}</>
                  }
                </Translation>
                <Link to="/login" class="ml-1 font-medium text-indigo-400 hover:text-indigo-500">
                  <Translation>
                    {
                      t => <>{t("login")}</>
                    }
                  </Translation>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
