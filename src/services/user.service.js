import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://aupamatch-api3.onrender.com/api/test/';

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

  getVaga(user){
    return axios.get(API_URL + 'vaga', {
      headers: authHeader(),

      params: {
        userID: user.id,
        roles: user.roles.toString()
      },
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

  match(vagaID, aupairID){
    return axios.get(API_URL + 'match', {
      headers: authHeader(),
      params: {
        vagaID: vagaID,
        aupairID: aupairID,
      },
    });
  }

  findmatches(user){
    return axios.get(API_URL + 'matches', {
      headers: authHeader(),
      params: {
        id : user.id,
        roles: user.roles.toString()
      },
    });
  }
}

export default new UserService();
