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
    userService.deleteVaga(this.state.data._id)
    window.location.reload(false);
  }


  render() {
    const { show , family} = this.state;
    const data = this.props
    return (

      <Col xs={8} md={8} lg={3} key={data.id} >
        <Card style={{ width: '20rem' }} onClick={() => this.setState({ show: true }) }>
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

            <p>Escolaridade: {data.escolaridade}</p>
            <p>Experiência: {data.experiencia}</p>
            <p>Filhos: {data.filhos}</p>
            <p>Descrição: {data.descricao}</p>
            <p>Natação: {data.natacao ? <span>Sim</span> : <span>Não</span>}</p>
            <p>Habilitação: {data.habilitacao ? <span>Sim</span> : <span>Não</span>}</p>
            <p>Carro: {data.carro ? <span>Sim</span> : <span>Não</span>}</p>


            {family ?                        <h3><button
              className="badge badge-danger mr-2"
              onClick={this.deleteVaga}
            >
              Deletar
            </button></h3> :            <h5><button
              className="badge badge-primary  mr-2"
              onClick={this.Candidatar}
            >
              Candidatar-se
            </button></h5>}

          </Modal.Body>
        </Modal>
      </Col>
    )
  }
}


