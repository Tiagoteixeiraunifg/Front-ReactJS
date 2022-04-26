import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./componentes/css/styles.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SingIn } from "./componentes/pages/singin";
import { SignUp } from "./componentes/pages/userregister";
import { HomeMenu } from "./componentes/pages/homemenu";
import { CadastroCliente } from "./componentes/pages/clienteregister";
import { HomeFooter } from "./componentes/pages/homefooter";


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
