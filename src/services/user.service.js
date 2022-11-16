import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://aupamatch-api3.onrender.com/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getVagas(user){
    return axios.get(API_URL + 'vagas', {
      headers: authHeader(),

      params: {
        userID: user.id,
        roles: user.roles.toString()
      },
    });
  }

  vaga(vagaID){
    return axios.get(API_URL + 'vaga', {
      headers: authHeader(),
      params: {
        vagaID: vagaID
      },
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

  deleteVaga(id){
    return axios.get(API_URL + 'del', {
      headers: authHeader(),
      params: {
        vagaID: id,
      },
    });
  }

  deleteCandidatura(vagaID, aupairID){
    return axios.get(API_URL + 'delcandidatura', {
      headers: authHeader(),
      params: {
        vagaID: vagaID,
        aupairID: aupairID,
      },
    });
  }

  candidatar(vagaID, aupairID, userID){
    return axios.get(API_URL + 'candidatar', {
      headers: authHeader(),
      params: {
        vagaID: vagaID,
        aupairID: aupairID,
        userID: userID
      },
    });
  }

  minhascandidaturas(user){
    return axios.get(API_URL + 'matches', {
      headers: authHeader(),
      params: {
        id : user.id,
        roles: user.roles.toString()
      },
    });
  }

  match(candidaturaID, vagaID){
    return axios.get(API_URL + 'match', {
      headers: authHeader(),
      params: {
        candidaturaID : candidaturaID,
        vagaID: vagaID,
      },
    });
  }

  getprofile(id){
    return axios.get(API_URL + 'userprofile', {
      headers: authHeader(),
      params: {
        userID : id,

      },
    });
  }

  getcandidaturas(user){
    return axios.get(API_URL + 'getcandidaturas', {
      headers: authHeader(),
      params: {
        id : user.id
      },
    });
  }
}

export default new UserService();
