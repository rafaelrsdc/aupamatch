import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, password, roles) {
    return axios.post(API_URL + "signup", {
      name,
      email,
      password,
      roles,
    });
  }

  criarVaga(escolaridade, experiencia, filhos, descricao, natacao, carro, habilitacao, id) {
    return axios.post(API_URL + "vaga", {
      headers: authHeader(),
      escolaridade,
      experiencia,
      filhos,
      descricao,
      natacao,
      carro,
      habilitacao,
      id
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
