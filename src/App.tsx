import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./componentes/css/styles.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SingIn } from "./componentes/pages/sing-in";
import { SignUp } from "./componentes/pages/user-register";
import { HomeMenu } from "./componentes/pages/home-menu";
import { CadastroCliente } from "./componentes/pages/cliente-register";
import { HomePrincipal } from "./componentes/pages/home-principal"
import { HomeFooter } from "./componentes/pages/home-footer";
import { TabelaCliente } from "./componentes/pages/client-registered";
import { UserAccountDetails } from "./componentes/pages/clientRegister";


function App() {
  return (
    <section className="App">
      <HomeMenu />
      <div className="row py-5"></div>
      <div className="container">
          <Routes>
            <Route path="/" element={<HomePrincipal/>} /> 

            <Route path="/cli-reg" element={<TabelaCliente/>} />

            <Route path="/sign-in" element={<SingIn />} />

            <Route path="/sign-up" element={<SignUp />} />

            <Route path="/cad-cli" element={<CadastroCliente email="" permissao="" />} />

            <Route path="/cad-cli2" element={<UserAccountDetails />} />

          </Routes>
      </div>
      <div className="row py-3"></div>
      <HomeFooter />
    </section>
  )
}

export default App;
