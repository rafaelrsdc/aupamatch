import React, { Component } from "react";
import { Outlet, Link, Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

import Button from 'react-bootstrap/Button';
import Profile from "./profile.component";

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
    if (!currentUser) this.setState({ redirect: "/home" })
    else {
      if (currentUser.roles.toString() !== "ROLE_FAMILY") this.setState({ family: false });
    }

    this.setState({ currentUser: currentUser, userReady: true })

  }
  render() {
    const { currentUser } = this.state;
    return (
      <div className="flex flex-auto">
        <div className="flex flex-auto h-full w-full bg-neutral-200">
          <section className="mt-2 lg:m-48 w-full h-4/5"><h1 className="">Dashboard</h1>
            <div class=" grid grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-5 min-h-full ">
              {/* <!--Card 1--> */}
              <div class="rounded overflow-hidden shadow-lg min-h-[1000px] bg-gray-100 p-4 col-span-3 row-span-2">
                <Outlet />
              </div>
              {/* <!--Card 2--> */}
              <div class="rounded overflow-hidden shadow-lg min-h-[300px] max-h-[400px] bg-gray-100 col-span-3 xl:col-span-1  ">
                <div className="m-6">
                  <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                  />
                </div>

                <div class="justify-center">
                  <h4 className="text-center">Сonta de {currentUser.name}</h4>
                </div>
                <div className="text-center mt-6">

                  <Link to="/profile" className="btn btn-primary">Editar Perfil</Link>

                </div>


              </div>

              {/* <!--Card 3--> */}
              <div class="rounded overflow-hidden shadow-lg bg-gray-100 min-h-[300px] max-h-[400px] col-span-3 xl:col-span-1 row-span-2">
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2 "></div>
                  <h2>Meus interesses</h2>
                  <hr></hr>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );

  }
}
