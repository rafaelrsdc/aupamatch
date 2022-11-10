import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import BoardUser from "./board-user.component";

import Navbar from "./Navbar";
import Button from 'react-bootstrap/Button';
import { Card, CardGroup, Col, Row, Modal, Form } from 'react-bootstrap/';
import RegisterVaga from "./register-vaga.component";
import Vaga from "./vaga.component";


export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { name: "" },
      show: false,
      setShow: false,
      family: true,
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();


    if (currentUser.roles.toString() !== "ROLE_FAMILY") this.setState({ family: false  });
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  
  }

  render() {

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }


    const { currentUser, show, family } = this.state;

    return (

      <div className="flex flex-auto">
        <div className="flex flex-auto h-full w-full bg-neutral-200">
          <section className="mt-2 lg:ml-10 xl:mr-10 w-full h-4/5"><h1 className="">Dashboard</h1>
            <div class=" grid grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-5 min-h-full ">
              {/* <!--Card 1--> */}
              <div class="rounded overflow-hidden shadow-lg min-h-[1000px] bg-gray-100 p-4 col-span-3 row-span-2">
                {family && <Button variant="primary" onClick={() => this.setState({ show: true })}>
                  Cadastrar uma Vaga
                </Button> }
                

                <Modal
                  show={show}
                  onHide={() => this.setState({ show: false })}
                  dialogClassName="modal-90w"
                  aria-labelledby="example-custom-modal-styling-title"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                      Cadastrar uma Vaga
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <RegisterVaga />
                  </Modal.Body>
                </Modal>

                {family ? <><hr></hr>
                <h2>Minhas Vagas</h2></> : <h2>Vagas Disponíveis</h2> }
                
                <span class="hidden ">
                  <BoardUser /></span>

                <Vaga />


              </div>


              {/* <!--Card 2--> */}
              <div class="rounded overflow-hidden shadow-lg min-h-[300px] max-h-[400px] bg-gray-100 col-span-3 xl:col-span-1  ">
                <div class="px-6 py-4">
                  <h3>Сonta de {currentUser.name}</h3>

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
                  <h2>Perfil de {currentUser.name}</h2>                 <spam><Button variant="primary" onClick={null}>
                    Editar Perfil
                  </Button></spam>
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
