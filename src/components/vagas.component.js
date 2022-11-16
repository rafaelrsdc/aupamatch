import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import BoardUser from "./board-user.component";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import Button from 'react-bootstrap/Button';
import { Card, CardGroup, Col, Row, Modal, Form } from 'react-bootstrap/';
import RegisterVaga from "./register-vaga.component";
import Cardminhasvagas from "./vagas-cards.component";

export default class MinhasVagas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      family: true,
      loading: true,
      show: false,
      setShow: false,
      successful: false,
      content: false,
      vagas: true
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    UserService.getVagas(currentUser).then(
      response => {
        if (response.data.length === 0) {
          this.setState({
            vagas: false,
          });
        }
        this.setState({
          content: response.data,
          successful: true,
          message: "",
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
          loading: false,
          message: resMessage
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      },
    );
    if (currentUser)
      if (currentUser.roles.toString() !== "ROLE_FAMILY") this.setState({ family: false });
  }
  render() {
    const { show, family, content } = this.state;
    return (
      <div>
        <div>
          {(!this.state.vagas) ? <div>
            {family && (
              <Button variant="primary" onClick={() => this.setState({ show: true })}>
                Cadastrar uma Vaga
              </Button>
            )
            }</div> : null}
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
          {(this.state.vagas) ?
            <div>
              {family ? <>
                <hr></hr>
                <h2 className="">Minha Vaga</h2></>
                :
                <><h2>Vagas Disponíveis</h2> <hr></hr></>}
            </div> :
            <div
              className={
                "alert alert-dark my-3"

              }
              role="alert"
            >
              Não há vagas cadastradas no momento.
            </div>
          }
          <div>
          {this.state.loading && (
              <div class="spinner-border m-5" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            )}
            {this.state.successful && (
              <div >
                <div className='row-wrapper'>
                  <Row>
                    {content.map(product => (
                      <Cardminhasvagas data={content} key={product.id} {...product} />
                    ))}
                  </Row>
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
          </div>
        </div>
      </div>
    );
  }
}
