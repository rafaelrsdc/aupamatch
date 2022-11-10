import React, { Component } from "react";
import {Row} from "react-bootstrap"
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import VagaCard from "./VagaCard";

export default class Vaga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      currentIndex: -1,
    };
  }

  displayVaga = (vagas) => {
    if (!vagas.length) return "null";

    return vagas.map((vaga, index) => (
      <div key={index} >
        <h3>{vaga.filhos}</h3>
      </div>
    ))
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    UserService.getVaga(currentUser).then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {

    const { content, currentIndex } = this.state;
    console.log(content)
    return (
      <div >

        <div className='row-wrapper'>
          <Row>
            {content.map(product => (
              <VagaCard data = {content} key={product.id} {...product} />
            ))}
          </Row>
        </div>

      </div>
    );
  }
}
