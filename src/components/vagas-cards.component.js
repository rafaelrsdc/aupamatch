import React, { Component } from "react";
import { Card, Modal, Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col';
import AuthService from "../services/auth.service"
import EventBus from "../common/EventBus";

import userService from "../services/user.service";

export default class Cardminhasvagas extends Component {
    constructor(props) {
        super(props)
        this.deleteVaga = this.deleteVaga.bind(this);
        this.candidatar = this.candidatar.bind(this);
        this.getprofile = this.getprofile.bind(this);
        this.deleteCandidatura = this.deleteCandidatura.bind(this);

        this.state = {
            family: true,
            show: false,
            show1: false,
            data: this.props,
            loading: false,
            successful: false,
            message: "",
            pathmatch: true,
            userReady: false,
            content: "",
            currentUser: { username: "" },
            userprofile: null
        };
    }



    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })

        const pathname = window.location.pathname;

        if (pathname === "/dashboard/matches") {
            this.setState({
                pathmatch: false
            });

        }
        if (currentUser.roles.toString() !== "ROLE_FAMILY") this.setState({ family: false });

    }

    getprofile() {
        userService.getprofile(this.state.profileid).then(
            response => {
                this.setState({
                    show: false,
                    content: response.data,
                });
            }
        );
    }
    deleteVaga() {
        this.setState({
            successful: true,
            loading: true
        });

        userService.deleteVaga(this.state.data._id).then(
            response => {
                this.setState({
                    message: response.data.message,
                    successful: true,
                    loading: false
                });
                setTimeout(function () {
                    window.location.reload(1);
                }, 500)
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
        userService.deleteCandidatura(this.state.data._id, this.state.currentUser.id).then(
            response => {
                this.setState({
                    message: response.data.message,
                    successful: true,
                    loading: false
                });
                setTimeout(function () {
                    window.location.reload(1);
                }, 500)
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
        userService.candidatar(this.state.data._id, this.state.currentUser.id, this.state.data.user[0]).then(
            response => {
                this.setState({
                    message: response.data.message,
                    successful: true,
                    loading: false
                })
                setTimeout(function () {
                    window.location.reload(1);
                }, 500)
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
        const { show, family, show1, currentUser } = this.state;
        const { currentIndex } = this.state;
        const data = this.props
        return (
            <div>
                <Col xs={8} md={8} lg={4} key={data.id} >
                    {family ? (
                        <div>
                            {data.escolha ?
                                <Card border="success" onClick={() => this.setState({ show: true })} id="familycard">
                                    <Card.Header>
                                        <Card.Title>
                                            Vaga para {data.quantidade_criancas} {(data.quantidade_criancas) === "01" ? <span>filho</span> : <span>filhos</span>}
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <div>
                                                <div>
                                                    <p>ID: {data._id}</p>
                                                    <p>Escolaridade: {data.escolaridade}</p>
                                                    <p>Filhos: {data.quantidade_criancas}</p>
                                                    <p>Descrição: {data.descricao}</p>
                                                    <p>Natação: {data.natacao ? <span>Sim</span> : <span>Não</span>}</p>
                                                    <p>Habilitação: {data.habilitacao ? <span>Sim</span> : <span>Não</span>}</p>
                                                    <p>Carro: {data.carro_exclusivo ? <span>Sim</span> : <span>Não</span>}</p>
                                                </div>
                                                <hr></hr>
                                                {family ?
                                                    <div className="form-group">
                                                        <div
                                                            className={
                                                                "alert alert-success"
                                                            }
                                                            role="alert"
                                                        >
                                                            Match Feito
                                                        </div>
                                                    </div> : !this.state.pathmatch ? null :
                                                        window.location.pathname === "/dashboard/candidaturas" ? <h5><button
                                                            className="badge badge-danger mr-2"
                                                            onClick={this.deleteCandidatura}
                                                        >
                                                            Cancelar Candidatura
                                                        </button></h5> :
                                                            <h5><button
                                                                className="badge badge-primary  mr-2"
                                                                onClick={this.candidatar}
                                                            >
                                                                Candidatar-se
                                                            </button></h5>}
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card> :
                                <Card onClick={() => this.setState({ show: true })} id="familycard">
                                    <Card.Header>
                                        <Card.Title>
                                            Vaga para {data.quantidade_criancas} {(data.quantidade_criancas) === "01" ? <span>filho</span> : <span>filhos</span>}
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <div>
                                                <div>
                                                    <p>ID: {data._id}</p>
                                                    <p>Escolaridade: {data.escolaridade}</p>
                                                    <p>Filhos: {data.quantidade_criancas}</p>
                                                    <p>Descrição: {data.descricao}</p>
                                                    <p>Natação: {data.natacao ? <span>Sim</span> : <span>Não</span>}</p>
                                                    <p>Habilitação: {data.habilitacao ? <span>Sim</span> : <span>Não</span>}</p>
                                                    <p>Carro: {data.carro_exclusivo ? <span>Sim</span> : <span>Não</span>}</p>
                                                </div>
                                                <hr></hr>
                                                {family ? <h3><button
                                                    className="badge badge-danger mr-2"
                                                    onClick={this.deleteVaga}
                                                >
                                                    Deletar Vaga
                                                </button></h3> : !this.state.pathmatch ? null :
                                                    window.location.pathname === "/dashboard/candidaturas" ? <h5><button
                                                        className="badge badge-danger mr-2"
                                                        onClick={this.deleteCandidatura}
                                                    >
                                                        Cancelar Candidatura
                                                    </button></h5> :
                                                        <h5><button
                                                            className="badge badge-primary  mr-2"
                                                            onClick={this.candidatar}
                                                        >
                                                            Candidatar-se
                                                        </button></h5>}
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            }
                        </div>
                    ) :
                        <Card style={{ width: '20rem' }} onClick={() => this.setState({ show: true })} id="vagascard">
                            <Card.Header>
                                <Card.Title>
                                    Vaga para {data.quantidade_criancas} {(data.quantidade_criancas) === "01" ? <span>filho</span> : <span>filhos</span>}
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <div>
                                        <p> {data.descricao}</p>
                                        <hr></hr>
                                        <h5><button
                                            className="badge badge-primary  mr-2"
                                            onClick={this.candidatar}
                                        >
                                            Candidatar-se
                                        </button></h5>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    }
                    <Modal
                        show={show}
                        onHide={() => this.setState({ show: false })}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Vaga para {data.quantidade_criancas} {(data.quantidade_criancas) === "01" ? <span>filho</span> : <span>filhos</span>}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="w-full h-full justify-center bg-gray-50 border-b-2 border-gray-100" >
                                <div className="col-md-12">
                                    <div className="card card-container bg-white">
                                        {this.state.loading && (
                                            <div class="d-flex justify-content-center">
                                                <div class="spinner-border" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                            </div>)}
                                        {!this.state.successful && (
                                            <div>
                                                <p>ID: {data._id}</p>
                                                <p>Escolaridade: {data.escolaridade}</p>
                                                <p>Filhos: {data.quantidade_criancas}</p>
                                                <p>Descrição: {data.descricao}</p>
                                                <p>Natação: {data.natacao ? <span>Sim</span> : <span>Não</span>}</p>
                                                <p>Habilitação: {data.habilitacao ? <span>Sim</span> : <span>Não</span>}</p>
                                                <p>Carro: {data.carro_exclusivo ? <span>Sim</span> : <span>Não</span>}</p>
                                                {family ?

                                                    <div>
                                                        {data.escolha ?
                                                            <div
                                                                className={
                                                                    "alert alert-success"
                                                                }
                                                                role="alert"
                                                            >
                                                                Match Feito
                                                            </div> :
                                                            <h4><button
                                                                className="badge badge-danger mr-2"
                                                                onClick={this.deleteVaga}
                                                            >
                                                                Deletar Vaga
                                                            </button></h4>

                                                        }



                                                    </div>


                                                    : !this.state.pathmatch ? null :
                                                        window.location.pathname === "/dashboard/candidaturas" ? <h5><button
                                                            className="badge badge-danger mr-2"
                                                            onClick={this.deleteCandidatura}
                                                        >
                                                            Cancelar Candidatura
                                                        </button></h5> :
                                                            <h5><hr></hr><button
                                                                className="badge badge-primary  mr-2"
                                                                onClick={this.candidatar}
                                                            >
                                                                Candidatar-se
                                                            </button></h5>}

                                                {family && <div>                                                    <hr></hr>
                                                    <h6>Candidaturas</h6>
                                                    {data.aupair.map((x, i) =>
                                                        <div className="flex justify-end mb-3">
                                                            <div className="mr-auto"><button onClick={() => this.setState({ profileid: x, show1: true })}>Aupair {i} : {x}</button></div>
                                                            <div className="">
                                                                <button
                                                                    className="badge badge-primary mr-4"
                                                                    onClick={this.match}
                                                                >
                                                                    Escolher
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}</div>}
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


                    <Modal
                        show={show1}
                        onHide={() => this.setState({ show1: false })}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                        onEntering={this.getprofile}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                <strong>{this.state.content.name}</strong> Profile
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {(this.state.userReady) ?
                                <div >
                                    <p>
                                        <strong>Id:</strong>{" "}
                                        {this.state.content._id}
                                    </p>
                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {this.state.content.email}
                                    </p>
                                    <p>
                                        <strong>Name:</strong>{" "}
                                        {this.state.content.name}
                                    </p>
                                    <button
                                        className="badge badge-primary mr-4"
                                        onClick={this.match}
                                    >
                                        Escolher
                                    </button>
                                </div>
                                : null}
                        </Modal.Body>
                    </Modal>

                </Col>
            </div>

        )
    }
}


