import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import { Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";


// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import Dashboard from "./components/Dashboard";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import Section from "./components/Section";
import TranslationBar from "./components/TranslationBar";
import MinhasVagas from "./components/vagas.component";
import Candidaturas from "./components/candidaturas.component";


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
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
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

    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }

    return (
      <div>
        {currentUser ? (
          <>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
              
              <Navbar.Brand href="/">
                <h3 className="sm:ml-12">AupaMatch</h3>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="m-auto">
                  <div class="hidden md:flex flex-wrap justify-between items-center mx-auto">
                    <ul class="flex flex-col  md:flex-row ">
                      <li>
                        <a href="/dashboard" class="block pt-2 pr-4 pl-3 text-xl text-semibold text-gray-900 hover:text-blue-700" aria-current="page">Dashboard</a>
                      </li>
                      <li>
                        <a href="/dashboard/candidaturas" class="block pt-2 pr-4 pl-3 text-xl  text-gray-900 rounded hover:text-blue-700">Candidaturas</a>
                      </li>
                      
                    </ul>
                  </div>
                  <Dropdown className="hidden lg:flex mr-4">
                    <Dropdown.Menu>
                      <Dropdown.Item href="/profile">Perfil</Dropdown.Item>
                      <Dropdown.Item href="/user">Configurações</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="/home" onClick={this.logOut}>Sair</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="lg:hidden">
                    <Nav.Link href="/dashboard"><p>Dashboard</p></Nav.Link>
                    <Nav.Link href="/dashboard/matches"><p>Matches</p></Nav.Link>
                    <Nav.Link href="/profile"><p>Perfil</p></Nav.Link>
                    <Nav.Link href="/user"><p>Configurações</p></Nav.Link>
                    <NavDropdown.Divider />
                    <Nav.Link href="/home" onClick={this.logOut}>Sair</Nav.Link>
                    <NavDropdown.Divider />
                  </div>
                </Nav>
                <Menu as="div" className="hidden md:flex relative inline-block text-left mr-12">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    Olá {currentUser.name.split(' ')[0]}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Perfil
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/user"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Configurações
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/home"
                            onClick={this.logOut}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Sair
                          </a>
                        )}
                      </Menu.Item>

                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
                <div className="mr-10 md:mr-20"><TranslationBar /></div>
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
            <Route path="/dashboard" element={<Dashboard />} >
              <Route index element={<MinhasVagas />} />
              <Route path="candidaturas" element={<Candidaturas />} />
            </Route >
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Section />} />
            <Route path="/home" element={<Section />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>

        <Footer />

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
