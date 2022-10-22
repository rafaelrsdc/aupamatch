/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import UserService from "../services/user.service";
import {Navigate} from "react-router-dom"

import AuthService from "../services/auth.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data,
          currentUser : undefined
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );

    const currentUser = AuthService.getCurrentUser();

    if (currentUser) this.setState({ redirect: "/profile" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
  }
}