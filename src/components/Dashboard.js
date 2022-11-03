import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import BoardUser from "./board-user.component";
import Navbar from "./Navbar";

export default class Dashboard extends Component {
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
      <div className="flex flex-auto">
        <div className="flex flex-auto h-full w-full bg-neutral-200">
          <Navbar />
          <section className="mt-2 lg:ml-80 xl:mr-10 w-full h-4/5"><h1 className="">Dashboard</h1>
            <div class=" grid grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-5 min-h-full ">
              {/* <!--Card 1--> */}
              <div class="rounded overflow-hidden shadow-lg min-h-[500px] bg-gray-100 p-4 col-span-3 row-span-2">
                <h2>Resumo</h2>
                <hr></hr>
                <span class="hidden ">
                <BoardUser /></span>
              </div>

              {/* <!--Card 2--> */}
              <div class="rounded overflow-hidden shadow-lg min-h-[300px] max-h-[400px] bg-gray-100 col-span-3 xl:col-span-1  ">
                <div class="px-6 py-4">
                  <h3>Perfil de {currentUser.name}</h3>

                  <hr></hr>
                  {(this.state.userReady) ?
                    <div className="">
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
                      <strong>Authorities:</strong>
                      <ul>
                        {currentUser.roles &&
                          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                      </ul>
                    </div> : null}


                </div>
              </div>
              <div class="rounded overflow-hidden shadow-lg bg-gray-100 min-h-[300px] max-h-[400px] col-span-3 xl:col-span-1 row-span-2">
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2 "></div>
                  <h2>Mensagens</h2>
                  <hr></hr>


                </div>
              </div>
              <div class="rounded overflow-hidden shadow-lg min-h-[450px] bg-gray-100 p-4 col-span-3  xl:flex">
                <h2></h2>
                <hr></hr>
              </div>



            </div>
          </section>
        </div>
      </div>
    );
  }
}
