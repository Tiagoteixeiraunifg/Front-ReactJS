import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {Login} from './componentes/pages/login';
import SignUp from './componentes/pages/cadastro';
import {CadastroCliente} from './componentes/pages/cadastro-cliente';

function App() {
  return (
    
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Entrar</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link color-nav" to={"/sign-up"}>Cadastre-se</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link color-nav" to={"/cad-cli"}>Cadastro Cliente</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/cad-cli" element={<CadastroCliente email = "tiago@tt.com" permissao = "admin"/> } />
            </Routes>
          </div>
        </div>
        <footer className="footer-css"> Direitos Reservados Equipe A3 Tiago Teixeira</footer>
    </div>
    
  );
}

export default App;
