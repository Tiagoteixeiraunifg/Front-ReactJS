import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { SingIn } from "../componentes/pages/sing-in";
import { SignUp } from "../componentes/pages/user-register";
import { HomePrincipal } from "../componentes/pages/home-principal"
import { TabelaCliente } from "../componentes/pages/client-registered";
import { PageCliente } from "../componentes/pages/clientRegister";

export const RoutersSistema = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePrincipal />} />

            <Route path="/cli-reg" element={<TabelaCliente />} />

            <Route path="/sign-in" element={<SingIn />} />

            <Route path="/sign-up" element={<SignUp />} />

            <Route path="/cad-cli" element={<PageCliente />} />

        </Routes>
    )


}