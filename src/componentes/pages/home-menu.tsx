import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Stack, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faRightToBracket, faUserPlus, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from "../../redux/hooks/useAppSelector";




export const HomeMenu = () => {
        
    const [nomeLogin, setNomeLogin] = useState("Login");
    const userLogin = useAppSelector(state => state.userLogin);
    

    
    const navegarPara = useNavigate();

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
        if (userLogin.logado) {
            navegarPara("/sign-in");
            alert("Necessário acessar o sistema para cadastrar cliente!");
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
        <Navbar bg="dark" expand="lg" fixed='top' id="mainNav"
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
                    <FontAwesomeIcon  className='fa-xl' icon={faHouseChimney} />
                </Button>
                <Button
                    className="navbar-toggler text-uppercase font-weight-bold bg-secondary text-white rounded color-nav"
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
                        <Stack direction="horizontal" gap={3}>      
                            <li className="nav-item mx-0 mx-lg-1">
                                <Button
                                    type="button"
                                    variant="text"
                                    className="nav-link py-3 px-0 px-lg-3 rounded text-white"
                                    onClick={handleNavegarCadLogin}
                                >
                                <FontAwesomeIcon className='fa-xl pe-2' icon={faRightToBracket} />
                                    Entrar
                                </Button>
                            </li>
                        </Stack>
                        <Stack direction="horizontal" gap={3}>
                            <li className="nav-item mx-0 mx-lg-1">
                                
                                <Button
                                    type="button"
                                    variant="text"
                                    className="nav-link py-3 px-0 px-lg-3 rounded text-white"
                                    onClick={handleNavegarCadUser}
                                >
                                    <FontAwesomeIcon className='fa-xl pe-2' icon={faUserPlus} />
                                    Cadastre-se
                                </Button>
                            </li>
                        </Stack>
                        <Stack direction="horizontal" gap={3}>
                            <li className="nav-item mx-0 mx-lg-1">
                                <Button
                                    type="button"
                                    variant="text"
                                    className="nav-link py-3 px-0 px-lg-3 rounded text-white"
                                    onClick={handleNavegarCadCli}
                                >
                                    <FontAwesomeIcon className='fa-xl pe-2' icon={faAddressCard} />
                                    Cadastro Cliente
                                </Button>
                            </li>
                        </Stack>
                        <Stack direction="horizontal" gap={3}>
                            <li className="nav-item mx-0 mx-lg-1">
                                <Navbar.Text className='text-white'>
                                    Usuário logado: <a href="#" className='text-white ps-2'>{userLogin.nome}</a>
                                </Navbar.Text>
                            </li>
                        </Stack>
                    </ul>
                </div>
            </Container>
        </Navbar>
    );
};
