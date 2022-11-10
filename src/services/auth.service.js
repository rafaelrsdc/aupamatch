import axios from "axios";

const API_URL = "https://aupamatch-api2.onrender.com/api/auth/";

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
