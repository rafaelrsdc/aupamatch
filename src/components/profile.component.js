import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (<div className ="flex flex-auto">

    <div className="flex flex-auto h-screen w-full bg-neutral-200">
    <div className="m-10 lg:ml-80 w-full mt-8"  >
      {(this.state.userReady) ?
        <div className="bg-white jumbotron ">
              <h3>
                <strong>{currentUser.name}</strong> Profile
              </h3>
              <hr></hr>
              <p>
                <strong>Token:</strong>{" "}
                {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
              </p>
              <p>
                <strong>Id:</strong>{" "}
                {currentUser.id}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {currentUser.email}
              </p>
              <p>
                <strong>Name:</strong>{" "}
                {currentUser.name}
              </p>
              <strong>Authorities:</strong>
              <ul>
                {currentUser.roles &&
                  currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
              </ul>
      </div>: null}
    </div>
    </div>
  </div>);
  }
}
