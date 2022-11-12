import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Link, Navigate } from "react-router-dom"
import { FormControl, FormLabel, RadioGroup, FormControlLabel } from "react-bootstrap"

import showPwdImg from "../assets/show-password.svg"
import hidePwdImg from "../assets/hide-password.svg"

import AuthService from "../services/auth.service";

import 'react-phone-input-2/lib/high-res.css'

import { Translation } from "react-i18next"

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class RegisterVaga extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeEscolaridade = this.onChangeEscolaridade.bind(this);
    this.onChangeExperiencia = this.onChangeExperiencia.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.onChangeFilhos = this.onChangeFilhos.bind(this);
    this.onChangeNatação = this.onChangeNatação.bind(this);
    this.onChangeCarro = this.onChangeCarro.bind(this);
    this.onChangeHabilitação = this.onChangeHabilitação.bind(this);

    this.state = {
      currentUser: undefined,
      username: "",
      name: "",
      email: "",
      password: "",
      loading: false,
      successful: true,
      message: "",
      group: "",
      escolaridade: "Ensino Fundamental",
      filhos: "01",
      natacao: false,
      habilitacao: false,
      carro: false,
      experiencia: "Inexperiente",
      descricao: ""
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        id: user.id,
      });
    }

  }

  onChangeEscolaridade(e) {
    this.setState({
      escolaridade: e.target.value
    })
  }

  onChangeExperiencia(e) {
    this.setState({
      experiencia: e.target.value
    })
  }

  onChangeHabilitação(e) {
    this.setState({
      habilitacao: e.target.checked
    })
  }

  onChangeFilhos(e) {
    this.setState({
      filhos: e.target.value
    })
  }

  onChangeDescricao(e) {
    this.setState({
      descricao: e.target.value
    })
  }

  onChangeNatação(e) {
    this.setState({
      natacao: e.target.checked
    })
  }

  onChangeCarro(e) {
    this.setState({
      carro: e.target.checked
    })
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {

      AuthService.criarVaga(
        this.state.escolaridade,
        this.state.experiencia,
        this.state.filhos,
        this.state.descricao,
        this.state.natacao,
        this.state.carro,
        this.state.habilitacao,
        this.state.id
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: false,
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
        },
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="flex flex-auto">

        <div className="w-full h-full justify-center bg-gray-50 border-b-2 border-gray-100" >
          <div className="col-md-12">
            <div className="card card-container bg-white">
              {this.state.loading && (
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>)}
              <h4 className="font-medium text-xl">
                <Translation>
                  {
                    t => <>{t("")}</>
                  }
                </Translation>
              </h4>

              <Form
                onSubmit={this.handleRegister}
                ref={c => {
                  this.form = c;
                }}
              >
                {this.state.successful && (
                  <div>
                    <p>Escolaridade da Aupair:</p>
                    <select onChange={this.onChangeEscolaridade} class="block appearance-none w-full  bg-white border border-gray-400 hover:border-gray-500 px-3 py-2 pr-8 rounded  leading-tight focus:outline-none focus:shadow-outline">
                      <option value="Ensino Fundamental">Ensino Fundamental</option>
                      <option value="Ensino Médio">Ensino Médio</option>
                      <option value="Ensino Superior">Ensino Superior</option>
                    </select>

                    <p className="my-3">Experiência da Aupair:</p>
                    <select onChange={this.onChangeExperiencia} class="block appearance-none w-full  bg-white border border-gray-400 hover:border-gray-500 px-3 py-2 pr-8 rounded  leading-tight focus:outline-none focus:shadow-outline">
                      <option value="Inexperiente">Inexperiente</option>
                      <option value="Pouca Experiência">Pouca Experiência</option>
                      <option value="Muita Experiência">Muita Experiência</option>
                    </select>

                    <p className="my-3">Quantidade de Filhos:</p>
                    <select onChange={this.onChangeFilhos} class="block appearance-none  bg-white border border-gray-400 hover:border-gray-500 px-3 py-2 pr-8 rounded  leading-tight focus:outline-none focus:shadow-outline">
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                    </select>

                    <label for="name">Descrição:</label>

                    <textarea type="text" onChange={this.onChangeDescricao} class="w-full h-20   bg-white border border-gray-400 hover:border-gray-500 px-3 py-2 pr-8 rounded  focus:outline-none focus:shadow-outline" id="name" name="name" required
                      minlength="4" />

                    <div class="flex items-center my-1">
                      <input onChange={this.onChangeNatação} defaultChecked={this.state.natacao} type="checkbox" />
                      <label for="default-checkbox" class="ml-2 ">Natação</label>
                    </div>
                    <div class="flex items-center mb-1">
                      <input onChange={this.onChangeHabilitação} defaultChecked={this.state.habilitacao} type="checkbox" />
                      <label for="default-checkbox" class="ml-2 ">Habilitação</label>
                    </div>
                    <div class="flex items-center mb-1">
                      <input onChange={this.onChangeCarro} defaultChecked={this.state.carro} type="checkbox" />
                      <label for="default-checkbox" class="ml-2 ">Carro Próprio</label>
                    </div>


                    <div className="form-group">
                      <button
                        className=" whitespace-nowrap rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-600"
                        disabled={this.state.loading}
                      >
                        {this.state.loading && (
                          <span className="spinner-border spinner-border-sm mr-2"></span>
                        )}
                        <span>
                          <Translation>
                            {
                              t => <>{t("createVaga")}</>
                            }
                          </Translation>
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {this.state.message && (
                  <div className="form-group">
                    <div
                      className={
                        this.state.successful
                          ? "alert alert-danger"
                          : "alert alert-success"
                      }
                      role="alert"
                    >
                      {this.state.message}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />
              </Form>


            </div>
          </div>
        </div>
      </div>
    );
  }
}
