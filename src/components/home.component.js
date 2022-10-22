/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import Herojpg from '../assets/site.png'
import UserService from "../services/user.service";
import {Link, Navigate} from "react-router-dom"

import AuthService from "../services/auth.service";


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data,
          currentUser : undefined
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );

    const currentUser = AuthService.getCurrentUser();

    if (currentUser) this.setState({ redirect: "/profile" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    return (
      <div>
        <section className="bg-stone-100">
          <div className="container flex flex-col-reverse md:flex-row items-center px-6 mx-auto space-y-0 md:space-y-0">
            <div class="flex flex-col mb-32 space-y-12 lg:w-1/2">
              <h1 className="max-w-md text-4xl font-bold text-left md:text-5xl md:text-left">
                Plataforma para Famílias, Aupairs e Agências
              </h1>
              <p className="max-w-sm text-center text-gray-500 md:text-left">
                Uma plataforma simples e fácil para fazer o match entre Aupairs e Famílias. Faça o seu cadastro e conheça o site.
              </p>
              <div className="flex justify-center md:justify-start">
              <Link to={"/register"}>
                <button class="bg-blue-500 hover:bg-blue-700 border-2 border-blue-500 hover:border-blue-700 text-white font-bold py-2 px-4 rounded">
                  Cadastre-se
                </button>
              </Link>
              </div>
            </div>
            <div className="md:w-4/5 ml-5">
              <img src={Herojpg}></img>
            </div>
            </div>
        </section>
        <section id="features">
      {/* <!-- Flex container --> */}
      <div
        class="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row"
      >
        {/* <!-- What's Different --> */}
        <div class="flex flex-col space-y-12 md:w-1/2">
          <h2 class="max-w-md text-4xl font-bold text-center md:text-left">
            Qual o Diferencial da AupaMatch?
          </h2>
          <p class="ml-5 max-w-sm text-center text-darkGrayishBlue md:text-left">
          A plataforma tem como objetivo ampliar as ofertas
          de todos os sujeitos envolvidos no contexto au pair, quais sejam: famílias anfitriãs, agências
          e candidatos au pairs.
          </p>
        </div>

        {/* <!-- Numbered List --> */}
        <div class="flex flex-col space-y-8 md:w-1/2">
          {/* <!-- List Item 1 --> */}
          <div
            class="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row"
          >
            {/* <!-- Heading --> */}
            <div class="rounded-l-full bg-brightRedSupLight md:bg-transparent">
              <div class="flex items-center space-x-2">
                <div
                  class="px-4 py-2 text-white rounded-full md:py-1 bg-brightRed"
                >
                  01
                </div>
                <h3 class="text-base font-bold md:mb-4 md:hidden">
                Aplicar candidatura em vagas
                </h3>
              </div>
            </div>

            <div>
              <h3 class="hidden mb-4 text-lg font-bold md:block">
              Aplicar candidatura em vagas
              </h3>
              <p class="text-darkGrayishBlue">
              Au pair pode se candidatar em uma ou mais vagas. Agilizando o processo de match entre famílias e aupairs.
              </p>
            </div>
          </div>

          {/* <!-- List Item 2 --> */}
          <div
            class="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row"
          >
            {/* <!-- Heading --> */}
            <div class="rounded-l-full bg-brightRedSupLight md:bg-transparent">
              <div class="flex items-center space-x-2">
                <div
                  class="px-4 py-2 text-white rounded-full md:py-1 bg-brightRed"
                >
                  02
                </div>
                <h3 class="text-base font-bold md:mb-4 md:hidden">
                Gerenciador de anúncio de vaga
                </h3>
              </div>
            </div>

            <div>
              <h3 class="hidden mb-4 text-lg font-bold md:block">
              Gerenciador de anúncio de vaga
              </h3>
              <p class="text-darkGrayishBlue">
              A AupaMatch fornece toda a funcionalidade para que você anuncie uma vaga da sua preferência, sem complexidade. Nosso software é feito sob medida para o que você mais precisa.
              </p>
            </div>
          </div>

          {/* <!-- List Item 3 --> */}
          <div
            class="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row"
          >
            {/* <!-- Heading --> */}
            <div class="rounded-l-full bg-brightRedSupLight md:bg-transparent">
              <div class="flex items-center space-x-2">
                <div
                  class="px-4 py-2 text-white rounded-full md:py-1 bg-brightRed"
                >
                  03
                </div>
                <h3 class="text-base font-bold md:mb-4 md:hidden">
                  Filtro de busca 
                </h3>
              </div>
            </div>

            <div>
              <h3 class="hidden mb-4 text-lg font-bold md:block">
               Filtro de busca 
              </h3>
              <p class="text-darkGrayishBlue">
              Pare de pular de um serviço para outro para encontrar uma Aupair ou família ideal. A AupaMatch oferece filtro de busca para você encontrar o perfil ideal de candidato.
              Tudo em uma mesma solução.
              </p>
            </div>
          </div>
        </div>
      </div>
      </section>

       </div>

    );
  }
}