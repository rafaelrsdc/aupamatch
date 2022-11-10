import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import BoardUser from "./board-user.component";

import Navbar from "./Navbar";
import Button from 'react-bootstrap/Button';
import { Card, CardGroup, Col, Row, Modal, Form } from 'react-bootstrap/';
import RegisterVaga from "./register-vaga.component";
import Vaga from "./vaga.component";

export default class MinhasVagas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      family: true,
      show: false,
      setShow: false,
      successful :false
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();


    if (currentUser.roles.toString() !== "ROLE_FAMILY") this.setState({ family: false });
  }

  render() {
    const { show, family } = this.state;

    return (
      <div>
          <div>
            {family && <Button variant="primary" onClick={() => this.setState({ show: true })}>
              Cadastrar uma Vaga
            </Button>}

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
              <h2>Minhas Vagas</h2></> : <h2>Vagas Disponíveis</h2>}

            <span class="hidden ">
              <BoardUser /></span>
            <Vaga />

          </div>

      </div>



    );
  }
}
