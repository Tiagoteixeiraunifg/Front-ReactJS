import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import React from 'react';
import { HomeMenu } from "./componentes/pages/home-menu";
import { HomeFooter } from "./componentes/pages/home-footer";
import { RoutersSistema } from './Routers/RoutersSistema'

function App() {
  return (
    <section className="App">
      <HomeMenu />
      <div className="row py-3"></div>
      <div className="container">
            <RoutersSistema />
      </div>
      <div className="row py-3"></div>
      <HomeFooter />
    </section>
  )
}

export default App;
