import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';


import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import Busca from "./components/busca.component";
import Dashboard from "./components/Dashboard";
import Topbar from "./components/Topbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.groups.includes("ROLE_MODERATOR"),
        showAdminBoard: user.groups.includes("ROLE_ADMIN"),
      });
    }

    //cria um evento listener para logout
    EventBus.on("logout", () => {
      this.logOut();
    });
  }
  //remove o listener event
  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }
  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <div>


        {currentUser ? (
          <>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
              <Navbar.Brand href="#home">
                <h3>AupaMatch</h3>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                  <Dropdown className="hidden lg:flex mr-16">
                    <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                      {currentUser.username}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/profile">Perfil</Dropdown.Item>
                      <Dropdown.Item href="/user">Configuraçõces</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="/home" onClick={this.logOut}>Sair</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="lg:hidden">
                    <Nav.Link href="/"><p>Dashboard</p></Nav.Link>
                    <Nav.Link href="/busca"><p>Busca de Vaga</p></Nav.Link>
                    <Nav.Link href="/profile"><p>Perfil</p></Nav.Link>
                    <Nav.Link href="/user"><p>Configurações</p></Nav.Link>
                    <NavDropdown.Divider />
                    <Nav.Link href="/home" onClick={this.logOut}>Sair</Nav.Link>
                  </div>




                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </>
          // Se não estiver logado
        ) : (
          <>
            <Topbar />

          </>
        )}


        <div className="">
          <Routes>

            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/busca" element={<Busca />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
