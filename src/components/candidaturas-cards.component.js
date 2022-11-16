import React, { Component } from "react";
import { Card, Modal, Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col';
import AuthService from "../services/auth.service"

import userService from "../services/user.service";

export default class CandidaturaCard extends Component {
    constructor(props) {
        super(props)
        this.deleteVaga = this.deleteVaga.bind(this);
        this.candidatar = this.candidatar.bind(this);
        this.deleteCandidatura = this.deleteCandidatura.bind(this);
        this.match = this.match.bind(this);

        this.state = {
            family: true,
            show: false,
            setShow: false,
            data: this.props,
            loading: true,
            successful: false,
            message: "",
            pathmatch: true,
            content: "",
            userprofile: null,
            vaga: []
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        const pathname = window.location.pathname;



        if (pathname === "/dashboard/matches") {
            this.setState({
                pathmatch: false
            });

        }
        var id
        if (user.roles.toString() !== "ROLE_FAMILY") {
            id = this.state.data.user[0]
            this.setState({ family: false });
        }
        else {
            id = this.state.data.aupair[0]
        }

        userService.getprofile(id).then(
            response => {
                this.setState({
                    content: response.data,
                    successful: false,
                    loading: false,
                });
            }
        );

        userService.vaga(this.state.data.vaga[0]).then(
            response => {
                this.setState({
                    vaga: response.data,
                });
            }
        );
    }

    if(user) {
        this.setState({
            currentUser: user,
        });
    }
    handleRegister(e) {
        e.preventDefault();
    }

    deleteVaga() {
        this.setState({
            successful: false,
            loading: true
        });
        userService.deleteVaga(this.state.data._id).then(
            response => {
                this.setState({
                    message: response.data.message,
                    successful: false,
                    loading: false
                });
                setTimeout(function () {
                    window.location.reload(1);
                }, 1000)
            },

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

    match() {
        this.setState({
            successful: true,
            loading: true
        });
        userService.match(this.state.data._id, this.state.data.vaga[0]).then(
            response => {
                this.setState({
                    message: response.data.message,
                    successful: true,
                    loading: false
                })
                setTimeout(function () {
                    window.location.reload(1);
                }, 1000)
            },
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

    deleteCandidatura() {
        this.setState({
            successful: true,
            loading: true
        });

        userService.deleteCandidatura(this.state.data.vaga[0], this.state.data.aupair[0]).then(
            response => {
                this.setState({
                    message: response.data.message,
                    successful: true,
                    loading: false
                });
                setTimeout(function () {
                    window.location.reload(1);
                }, 1000)
            },

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

    candidatar() {
        this.setState({
            successful: true,
            loading: true
        });
        userService.candidatar(this.state.data._id, this.state.currentUser.id).then(
            response => {
                this.setState({
                    message: response.data.message,
                    successful: true,
                    loading: false
                })
                setTimeout(function () {
                    window.location.reload(1);
                }, 1000)
            },
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
        const { show, family, vaga } = this.state;
        const data = this.props
        return (
            <div>
                <div>
                    <Col xs={8} md={8} lg={4} key={data.id} >
                        {this.state.data.escolha ?
                            <Card style={{ width: '20rem' }} border="success" onClick={() => this.setState({ show: true })}>
                                <Card.Header>
                                    <Card.Title>
                                        {!this.state.loading ? <div>{!family ? (<div>Candidatura para {this.state.content.name}</div>) : (<div>Candidatura de {this.state.content.name}</div>)} </div> : null}
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        {!this.state.loading &&
                                            <div className="form-group">
                                                <div
                                                    className={
                                                        "alert alert-success"
                                                    }
                                                    role="alert"
                                                >
                                                    Match Feito
                                                </div>
                                            </div>
                                        }
                                    </Card.Text>
                                </Card.Body>
                            </Card> :
                            <Card style={{ width: '20rem' }} onClick={() => this.setState({ show: true })}>
                                <Card.Header>
                                    <Card.Title>
                                        {!this.state.loading ? <div>{!family ? (<div>Candidatura para {this.state.content.name}</div>) : (<div>Candidatura de {this.state.content.name}</div>)} </div> : null}
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        {!this.state.successful &&
                                            <div>
                                                {family ? <div className="flex">
                                                    <h4>
                                                        {!this.state.loading &&
                                                            <button
                                                                className="badge badge-primary mr-2"
                                                                onClick={this.match}>
                                                                Escolher
                                                            </button>
                                                        }
                                                    </h4>
                                                    <h4>
                                                        {!this.state.loading &&
                                                            <button
                                                                className="badge badge-danger mr-2"
                                                                onClick={this.deleteCandidatura}>
                                                                Dispensar
                                                            </button>
                                                        }
                                                    </h4>
                                                </div>
                                                    :
                                                    <h5>
                                                        {!this.state.loading &&
                                                            <button
                                                                className="badge badge-danger mr-2"
                                                                onClick={this.deleteCandidatura}>
                                                                Cancelar Candidatura
                                                            </button>
                                                        }

                                                    </h5>
                                                }
                                            </div>
                                        }
                                    </Card.Text>
                                </Card.Body>
                            </Card>}
                    </Col>
                    <Modal
                        show={show}
                        onHide={() => this.setState({ show: false })}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                {!family ? (<div>Candidatura para {this.state.content.name}</div>) : (<div>Candidatura de {this.state.content.name}</div>)}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.loading && (
                                <div class="d-flex justify-content-center">
                                    <div class="spinner-border" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>)}
                            {!this.state.successful &&
                                <div className="col-md-12">
                                    <p>Nome: {this.state.content.name}</p>
                                    <p>Email: {this.state.content.email}</p>
                                    <hr></hr>
                                    {!data.escolha ?
                                        <div className="flex">
                                            {family ? <div className="flex">
                                                <h4>
                                                    <button
                                                        className="badge badge-primary mr-2"
                                                        onClick={this.match}>
                                                        Escolher
                                                    </button>
                                                </h4>
                                                <h4>
                                                    <button
                                                        className="badge badge-danger mr-2"
                                                        onClick={this.deleteCandidatura}>
                                                        Dispensar
                                                    </button>
                                                </h4>
                                            </div>
                                                :
                                                <div>
                                                    <p>Escolaridade: {vaga.escolaridade}</p>
                                                    <p>Experiência: {vaga.experiencia}</p>
                                                    <p>Filhos: {vaga.filhos}</p>
                                                    <p>Descrição: {vaga.descricao}</p>
                                                    <p>Natação: {vaga.natacao ? <span>Sim</span> : <span>Não</span>}</p>
                                                    <p>Habilitação: {vaga.habilitacao ? <span>Sim</span> : <span>Não</span>}</p>
                                                    <p>Carro: {vaga.carro ? <span>Sim</span> : <span>Não</span>}</p>
                                                    <hr></hr>
                                                    <h5>
                                                        <button
                                                            className="badge badge-danger mr-2"
                                                            onClick={this.deleteCandidatura}>
                                                            Cancelar Candidatura
                                                        </button>
                                                    </h5>
                                                </div>
                                            }
                                        </div> : (

                                            <div className="form-group">
                                                <p>Escolaridade: {vaga.escolaridade}</p>
                                                <p>Experiência: {vaga.experiencia}</p>
                                                <p>Filhos: {vaga.filhos}</p>
                                                <p>Descrição: {vaga.descricao}</p>
                                                <p>Natação: {vaga.natacao ? <span>Sim</span> : <span>Não</span>}</p>
                                                <p>Habilitação: {vaga.habilitacao ? <span>Sim</span> : <span>Não</span>}</p>
                                                <p>Carro: {vaga.carro ? <span>Sim</span> : <span>Não</span>}</p>
                                                <hr></hr>
                                                <div
                                                    className={
                                                        "alert alert-success"
                                                    }
                                                    role="alert "
                                                >
                                                    Match Feito
                                                </div>
                                                <h5>
                                                    <button
                                                        className="badge badge-danger mr-2"
                                                        onClick={this.deleteCandidatura}>
                                                        Cancelar Match
                                                    </button>
                                                </h5>
                                            </div>
                                        )
                                    }
                                </div>
                            }
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
                        </Modal.Body>
                    </Modal>
                </div>
            </div>

        )
    }
}


