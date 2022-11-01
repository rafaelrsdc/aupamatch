import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link, Navigate } from "react-router-dom"
import AuthService from "../services/auth.service";
import { withRouter } from '../common/with-router';

import { Translation } from "react-i18next"

import showPwdImg from "../assets/show-password.svg"
import hidePwdImg from "../assets/hide-password.svg"


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
      currentUser: undefined,
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

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.router.navigate("/");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
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
    const { currentUser } = this.state;
    const { t } = this.props
    return (
      <div className="flex flex-auto">
        {currentUser ? (<Navigate to="/profile" />

        ) : (<div></div>)}

        <div className="w-full h-screen justify-center bg-bookmark-grey" >
          <div className="card card-container bg-white">
            <Form
              onSubmit={this.handleLogin}
              ref={c => {
                this.form = c;
              }}
            >
              <div className="form-group">
                <label htmlFor="username" className="font-medium">
                  <Translation>
                    {
                      t => <>{t("user")}</>
                    }
                  </Translation>
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required]}
                />
              </div>

              <div className="form-group mb-1">
                <label htmlFor="password" className="font-medium">
                  <Translation>
                    {
                      t => <>{t("password")}</>
                    }
                  </Translation></label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required]}
                />
              </div>

              <div class="text-sm mb-4">
                <a href="#" class="font-medium text-indigo-400 hover:text-indigo-500">
                <Translation>
                    {
                      t => <>{t("forgot")}</>
                    }
                  </Translation>
                </a>
              </div>

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
                        t => <>{t('login')}</>
                      }
                    </Translation></span>
                </button>
              </div>

              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
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

              <p class="mt-3 text-xs text-center font-light text-gray-500">
                
              <Translation>
                      {
                        t => <>{t('noACC')}</>
                      }
                    </Translation><Link to="/register" class="ml-1 font-medium text-indigo-400 hover:text-indigo-500"><Translation>
                      {
                        t => <>{t('register')}</>
                      }
                    </Translation></Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);