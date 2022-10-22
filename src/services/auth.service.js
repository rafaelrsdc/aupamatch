import axios from "axios";


const API_URL = "http://ec2-54-88-18-242.compute-1.amazonaws.com/api/";

class AuthService {
  login(username, password) {

    return axios
      .post(API_URL + "token/", {
        username,
        password
      })
      .then(response => {
        if (response.data.access) {
          const token = response.data.access;
          return axios
	          .get(API_URL + "users/verify_credentials", { headers: { Authorization: 'Bearer ' + token } })
	          .then((r) => {
	            let user = r.data;
	            user["access"] = token;
	            user["refresh"] = response.data.refresh;

                localStorage.setItem("user", JSON.stringify(user));
              })
        }
        return response.data;
      })
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    const is_active = true;
    return axios.post(API_URL + "users/", {
      username,
      email,
      password,
      is_active
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
