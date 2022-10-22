import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import Navbar from "./Navbar";

export default class Busca extends Component {
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

    return (
        <div className="flex h-screen w-full bg-neutral-200">
        <Navbar />
        <div className="mt-3 xl:ml-64 flex flex-auto ">
          {(this.state.userReady) ?
            <div className="flex flex-wrap ">
                <div className="bg-white sm:w-1/2 lg:w-1/3">
                    <p className="h-full"></p>
                </div>


                
                
                
            </div>: null}
        </div>
      </div>
    );
  }
}
