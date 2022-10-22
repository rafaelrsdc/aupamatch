import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://ec2-54-88-18-242.compute-1.amazonaws.com/api/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  async getUserBoard() {
	const ret=  await axios.get(API_URL + 'users/verify_credentials/', { headers: authHeader() }).data;

    return ret;
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
