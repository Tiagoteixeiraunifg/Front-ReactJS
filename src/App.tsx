import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './componentes/css/styles.css';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate} from "react-router-dom";
import { Login } from './componentes/pages/login';
import SignUp from './componentes/pages/cadastro';
import { CadastroCliente } from './componentes/pages/cadastro-cliente';
import Button from '@mui/material/Button/Button';
import { Input, InputLabel } from '@mui/material';



interface login {
  email: string;
  senha: string;
  logged: boolean;
}

//renderizar
function App() {

const navegarPara = useNavigate();
const logado = false;

const handleNavegarCadCli = () => {
  if(!logado){
    navegarPara('/sign-in');
    alert('Necessário acessar o sistema para cadastrar cliente!');
    //adicionar aqui um modal de aviso!    
  }else{
    navegarPara('/cad-cli');
  }  
}

const handleNavegarCadUser = () => {
  navegarPara('/sign-up');
}

const handleNavegarCadLogin = () => {
  navegarPara('/sign-in');
}


  const [objLogin, setValue] = React.useState<login>({
    email: '',
    senha: '',
    logged: false,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...objLogin,
      [e.target.name]: e.target.value,
    });
  }


window.addEventListener('DOMContentLoaded', event => {

  // Navbar shrink function
  var navbarShrink = function () {
      const navbarCollapsible = document.body.querySelector('#mainNav');
      if (!navbarCollapsible) {
          return;
      }
      if (window.scrollY === 0) {
          navbarCollapsible.classList.remove('navbar-shrink')
      } else {
          navbarCollapsible.classList.add('navbar-shrink')
      }

  };
  navbarShrink();
});

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top navbar-light2" id="mainNav">
        <div className="container">
          <Button className="navbar-brand" type="button" variant="text"  onClick={handleNavegarCadLogin} name="">Página de Início</Button>
          <Button className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarResponsive" 
          aria-controls="navbarResponsive" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
            Menu
            <i className="fas fa-bars"></i>
          </Button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-0 mx-lg-1">
                <Button type="button" variant="text"
                  className="nav-link py-3 px-0 px-lg-3 rounded"  onClick={handleNavegarCadLogin} 
                  >Entrar</Button>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <Button type="button" variant="text"
                  className="nav-link py-3 px-0 px-lg-3 rounded" onClick={handleNavegarCadUser}
                   >Cadastre-se</Button>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <Button type="button" variant="text" className="nav-link py-3 px-0 px-lg-3 rounded" onClick={handleNavegarCadCli} 
                >Cadastro Cliente</Button>
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
            <Route path="/cad-cli" element={<CadastroCliente email="tiago@tt.com" permissao="admin" />} />
          </Routes>
        </div>
      </div>
      <div >
        <footer className="footer text-center">
          <div className="container" >
            <div className="row">
              <div className="col-lg-4 mb-5 mb-lg-0">
                <h4 className="text-uppercase mb-4">Localização</h4>
                <p className="lead mb-0">
                  Endereço Confidêncial
                  <br />
                  Editado
                </p>
              </div>

              <div className="col-lg-4 mb-5 mb-lg-0">
                <h4 className="text-uppercase mb-4">Siga em nossas redes</h4>
                <a className="btn btn-outline-light btn-social mx-1" href="#!"><i className="fab fa-fw fa-facebook-f"></i></a>
                <a className="btn btn-outline-light btn-social mx-1" href="#!"><i className="fab fa-fw fa-twitter"></i></a>
                <a className="btn btn-outline-light btn-social mx-1" href="#!"><i className="fab fa-fw fa-linkedin-in"></i></a>
                <a className="btn btn-outline-light btn-social mx-1" href="#!"><i className="fab fa-fw fa-dribbble"></i></a>
              </div>
              <div className="col-lg-4">
                <h4 className="text-uppercase mb-4">Contato</h4>
                <p className="lead mb-0">
                  Projeto desenvolvido para fins acadêmicos reservando o direito a erros de formatação e estilização
                  <a href="https://centrouniversitariounifg.edu.br">Acesse UniFG</a>
                  .
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}

export default App;
