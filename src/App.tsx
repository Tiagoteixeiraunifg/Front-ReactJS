import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./componentes/css/styles.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SingIn } from "./componentes/pages/singin";
import { SignUp } from "./componentes/pages/userRegister";
import { HomeMenu } from "./componentes/pages/homeMenu";
import { CadastroCliente } from "./componentes/pages/clientRegister";
import { HomeFooter } from "./componentes/pages/homeFooter";


function App() {
  return (
    <section className="App">
      <HomeMenu />
      <div className="row py-5"></div>
      <div className="container">
          <Routes>
            <Route path="/" element={<SingIn />} />

            <Route path="/sign-in" element={<SingIn />} />

            <Route path="/sign-up" element={<SignUp />} />

            <Route path="/cad-cli" element={<CadastroCliente email="" permissao="" />}
            />
          </Routes>
      </div>
      <HomeFooter />
    </section>
  );
}

export default App;
