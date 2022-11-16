import React, { Component } from "react";
import { Card, Modal, Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col';
import AuthService from "../services/auth.service"

import userService from "../services/user.service";

export default class Cardminhasvagas extends Component {
    constructor(props) {
        super(props)
        this.deleteVaga = this.deleteVaga.bind(this);
        this.candidatar = this.candidatar.bind(this);
        this.deleteCandidatura = this.deleteCandidatura.bind(this);

        this.state = {
            family: true,
            show: false,
            setShow: false,
            show1: false,
            setShow1: false,
            data: this.props,
            loading: false,
            successful: false,
            message: "",
            pathmatch: true,
            userReady: false,
            currentUser: { username: "" }
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

    handleRegister(e) {
        e.preventDefault();
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
        userService.candidatar(this.state.data._id, this.state.currentUser.id).then(
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
        const data = this.props
        return (
                <Modal
                    show={show1}
                    onHide={() => this.setState({ show1: false })}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Vaga para {data.filhos} {(data.filhos) === "01" ? <span>filho</span> : <span>filhos</span>}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Modal
                            show={show1}
                            onHide={() => this.setState({ show1: false, show:true })}
                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-custom-modal-styling-title">
                                    Vaga para {data.filhos} {(data.filhos) === "01" ? <span>filho</span> : <span>filhos</span>}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {(this.state.userReady) ?
                                    <div className="bg-white jumbotron ">
                                        <h3>
                                            <strong>{currentUser.name}</strong> Profile
                                        </h3>
                                        <hr></hr>
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
                                        <p>
                                            <strong>Name:</strong>{" "}
                                            {currentUser.name}
                                        </p>
                                        <strong>Authorities:</strong>
                                        <ul>
                                            {currentUser.roles &&
                                                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                                        </ul>
                                    </div> : null}
                            </Modal.Body>
                        </Modal>
                    </Modal.Body>
                </Modal>

        )
    }
}


