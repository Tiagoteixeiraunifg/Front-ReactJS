import React from 'react';

export const HomeFooter = () => {

    return(
        <footer className="footer bg-dark text-center d-flex flex-wrap">
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
                <h4 className="text-uppercase mb-4">visite nossas redes</h4>
                <a className="btn btn-outline-light btn-floating mx-1" href="https://www.linkedin.com/in/tiago-teixeira-3146a4b6/" role="button"><i className="fab fa-fw fa-linkedin-in"></i></a>
                <a className="btn btn-outline-light btn-floating mx-1" href="https://github.com/Tiagoteixeiraunifg" role="button"><i className="fab fa-fw fa-github"></i></a>
                <a className="btn btn-outline-light btn-floating mx-1" href="tiagoteixeiragbi@gmail.com" role="button"><i className="fab fa-fw fa-google"></i></a>
                <a className="btn btn-outline-light btn-floating mx-1" href="https://contate.me/tiagoteixeiradev" role="button"><i className="fab fa-fw fa-whatsapp"></i></a>
              </div>
              <div className="col-lg-4">
                <h4 className="text-uppercase mb-4">Contato</h4>
                <p className="lead mb-0">
                  Projeto desenvolvido para fins acadêmicos reservando o direito a erros de formatação e estilização
                  <a href="https://devtiagoteixeira.com.br">Acesse</a>
                  .
                </p>
              </div>
            </div>
          </div>
        </footer>    
      )

}