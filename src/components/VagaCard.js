import React, { Component } from "react";
import { Card, Modal, Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col';
import AuthService from "../services/auth.service"

import userService from "../services/user.service";



export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.deleteVaga = this.deleteVaga.bind(this);

    this.state = {
      family: true,
      show: false,
      setShow: false,
      data: this.props,
      loading: false,
      successful: false,
      message: "",
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user.roles.toString() !== "ROLE_FAMILY") this.setState({ family: false });

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }


  deleteVaga() {
    userService.deleteVaga(this.state.data._id).then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true,
          loading: false
        });
      },
      setTimeout(function () {
        window.location.reload(1);
      }, 1000),
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
    )
  }


  render() {
    const { show, family } = this.state;
    const data = this.props
    return (

      <Col xs={8} md={8} lg={4} key={data.id} >
        <Card style={{ width: '20rem' }} onClick={() => this.setState({ show: true })}>
          <Card.Header>
            <Card.Title>
              Vaga para {data.filhos} {(data.filhos) === "01" ? <span>filho</span> : <span>filhos</span>}
            </Card.Title>
          </Card.Header>
          <Card.Body>

            <Card.Text>
              <p>{data.descricao}</p>
            </Card.Text>


          </Card.Body>
        </Card>


        <Modal
          show={show}
          onHide={() => this.setState({ show: false })}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Vaga para {data.filhos} {(data.filhos) === "01" ? <span>filho</span> : <span>filhos</span>}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="w-full h-full justify-center bg-gray-50 border-b-2 border-gray-100" >
              <div className="col-md-12">
                <div className="card card-container bg-white">
                  {!this.state.successful && (
                    <div>
                      <p>Escolaridade: {data.escolaridade}</p>
                      <p>Experiência: {data.experiencia}</p>
                      <p>Filhos: {data.filhos}</p>
                      <p>Descrição: {data.descricao}</p>
                      <p>Natação: {data.natacao ? <span>Sim</span> : <span>Não</span>}</p>
                      <p>Habilitação: {data.habilitacao ? <span>Sim</span> : <span>Não</span>}</p>
                      <p>Carro: {data.carro ? <span>Sim</span> : <span>Não</span>}</p>


                      {family ? <h3><button
                        className="badge badge-danger mr-2"
                        onClick={this.deleteVaga}
                      >
                        Deletar
                      </button></h3> : <h5><button
                        className="badge badge-primary  mr-2"
                        onClick={this.Candidatar}
                      >
                        Candidatar-se
                      </button></h5>}

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
          </Modal.Body>
        </Modal>
      </Col>
    )
  }
}


