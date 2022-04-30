import React from 'react';
import Button from "@mui/material/Button/Button";
import { useNavigate } from "react-router-dom";
import {Navbar, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

export const HomeMenu = () => {

    const navegarPara = useNavigate();
    const logado = true;

    window.addEventListener("DOMContentLoaded", (event) => {
        // Navbar shrink function
        var navbarShrink = function () {
            const navbarCollapsible = document.body.querySelector("#mainNav");
            if (!navbarCollapsible) {
                return;
            }
            if (window.scrollY === 0) {
                navbarCollapsible.classList.remove("navbar-shrink");
            } else {
                navbarCollapsible.classList.add("navbar-shrink");
            }
        };
        navbarShrink();
    });

    const handleNavegarCadCli = () => {
        if (!logado) {
            navegarPara("/sign-in");
            alert("Necessário acessar o sistema para cadastrar cliente!");
            //adicionar aqui um modal de aviso!
        } else {
            navegarPara("/cad-cli");
        }
    };

    const handleNavegarCadUser = () => {
        navegarPara("/sign-up");
    };

    const handleNavegarCadLogin = () => {
        navegarPara("/sign-in");
    };

    const handleNavegarPrincipal = () => {
        navegarPara("/");
    };

    return (
        <Navbar bg="dark" expand="lg"  fixed='top' id="mainNav" 
        className="navbar-light2 navbar-shrink"
        >
            <Container>
                <Button
                        className="navbar-brand text-white"
                        type="button"
                        variant="text"
                        onClick={handleNavegarPrincipal}
                        name=""
                    >
                        <FontAwesomeIcon  icon={faHouseChimney}/>
                        Início
                </Button>
                <Button
                    className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded color-nav"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    Menu
                    <i className="fas fa-bars"></i>
                </Button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item mx-0 mx-lg-1">
                            <Button
                                type="button"
                                variant="text"
                                className="nav-link py-3 px-0 px-lg-3 rounded text-white"
                                onClick={handleNavegarCadLogin}
                            >
                                <FontAwesomeIcon icon={faRightToBracket} />
                                Entrar
                            </Button>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                            <Button
                                type="button"
                                variant="text"
                                className="nav-link py-3 px-0 px-lg-3 rounded text-white"
                                onClick={handleNavegarCadUser}
                            >
                                Cadastre-se
                            </Button>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                            <Button
                                type="button"
                                variant="text"
                                className="nav-link py-3 px-0 px-lg-3 rounded text-white"
                                onClick={handleNavegarCadCli}
                            >
                                Cadastro Cliente
                            </Button>
                        </li>
                    </ul>
                </div>
            </Container>
        </Navbar>
    );
};
