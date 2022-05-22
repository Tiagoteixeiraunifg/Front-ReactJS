import React, { DetailedHTMLProps, useEffect, useState } from 'react';
import apiAuth from "../../services/Api";
import { useNavigate } from 'react-router-dom'
import { Container, Row, Form, Col, Stack, Button, FormCheck, Spinner } from 'react-bootstrap';
import { IErros, IUserLogin } from '../../interfaces';
import SelectUserPerfil from '../comboBox/selectUserPerfil';
import { AcceptMessage, ErrorMessage } from '../MainComponents';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import {
    setId, setNome, setSobrenome, setEmail, setPassword,
    setToken, setUserPerfil, setLogado
} from '../../redux/reducers/userReducer';


export const SignUp = () => {

    const navegarPara = useNavigate();
    const userStore = useAppSelector(state => state.userLogin);
    const alteraStore = useDispatch();


    const [errors, setErrors] = useState<IErros>();
    const [confirPassword, setConfirmPassword] = useState<string>();

    const [logado, setLogado] = useState<boolean>(false);
    const [updated, setUpdated] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const [accept, setAccept] = useState<string>('');
    const [objUser, setValue] = useState<IUserLogin>({
        id: 0,
        nome: '',
        sobrenome: '',
        email: '',
        password: '',
        token: '',
        userperfil: "USUARIO",
    });

    useEffect(() => {
        if (userStore.logado) {
            setLogado(true);
            upObjUser();
        }
    }, [userStore.logado])


    useEffect(() => {
        if (!logado && updated) {
            upUserStoreReducer();
        }
    }, [objUser])

    useEffect(() => {
        objUser.userperfil = userStore.userperfil;
    }, [userStore.userperfil])


    const upObjUser = () => {
        setValue({
            id: userStore.id,
            nome: userStore.nome,
            sobrenome: userStore.sobrenome,
            email: userStore.email,
            password: '',
            token: userStore.token,
            userperfil: userStore.userperfil,
        });
        if (userStore.userperfil == 'ADMIN') {
            setIsAdmin(true);
        }
    }

    const upUserStoreReducer = () => {
        alteraStore(setId(objUser.id));
        alteraStore(setNome(objUser.nome));
        alteraStore(setSobrenome(objUser.sobrenome));
        alteraStore(setEmail(objUser.email));
        alteraStore(setPassword(objUser.password));
        alteraStore(setUserPerfil(objUser.userperfil));
        alteraStore(setToken(objUser.token));
    }

    const clearObjUser = () => {
        setValue({
            id: 0,
            nome: '',
            sobrenome: '',
            email: '',
            password: '',
            token: '',
            userperfil: "USUARIO",
        })
    }

    const verificaPassword = () => {
        if (objUser.password === confirPassword) {
            return true;
        } else {
            return false;
        }
    }

    const submeter = async () => {
        if (verificaPassword()) {
            setLoading(true);
            await apiAuth.post("/v1/user", objUser)
                .then((json) => {
                    if (json.status == 200) {
                        setValue(json.data.data)
                        setLoading(false);
                        setAccept("Cadastrado com sucesso!");
                        navegarPara('/sign-in');
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    if (error.response) {
                        if (error.response.status == 400) {
                            setErrors(error.response.data.errors);
                        } else if (error.response.status == 500) {
                            setErrors(error.response.data.errors);
                        }
                    }
                })
        } else {
            alert("Os passwords não conferem");
        }
    }

    const atualizar = async () => {
        if (verificaPassword()) {
            setLoadingUpdate(true);
            await apiAuth.put("/v1/users", objUser, {
                headers: {
                    'Content-Type': 'application/json', 'Accept': '*/*',
                    'Authorization': `Bearer ${userStore.token}`
                }
            })
                .then((json) => {
                    if (json.status == 200) {
                        setValue(json.data.data)
                        setLoadingUpdate(false);
                        setLogado(false);
                        setUpdated(true);
                        setAccept("Atualizado com sucesso!");
                    }
                })
                .catch((error) => {
                    setLoadingUpdate(false);
                    setLogado(false);
                    setUpdated(false);
                    if (error.response) {
                        if (error.response.status == 400) {
                            setErrors(error.response.data.errors);
                        } else if (error.response.status == 500) {
                            setErrors(error.response.data.errors);
                        }
                    }
                })
        } else {
            alert("Os passwords não conferem");
        }
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...objUser,
            [event.target.name]: event.target.value,
        });
    }

    const handleInputCnfirmPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(
            event.target.value
        )
    }

    return (

        <div className="auth-wrapper">
            <div className="auth-inner">
                <Container className="mb-3">
                    <Row>
                        <Col>
                            <Form>
                                <br />
                                <h3>CADASTRE-SE</h3>
                                <br />
                                {errors &&
                                    <ErrorMessage>{errors.details}</ErrorMessage>
                                }
                                {accept &&
                                    <AcceptMessage>{accept}</AcceptMessage>
                                }
                                <br />
                                <Row form>
                                    <Col md="12" className="form-group">
                                        <label htmlFor="name"> Nome </label>
                                        <Form.Control
                                            type="text"
                                            className="textbox"
                                            placeholder="Nome"
                                            name="nome"
                                            data-sb-validations="required"
                                            id="name"
                                            onChange={handleInput}
                                            value={objUser.nome}
                                        />
                                    </Col>

                                    <Col md="12" className="form-group">
                                        <label htmlFor="sobrenome"> Sobrenome </label>
                                        <Form.Control
                                            type="text"
                                            className="textbox"
                                            placeholder="Sobrenome"
                                            name="sobrenome"
                                            data-sb-validations="required"
                                            id="sobrenome"
                                            onChange={handleInput}
                                            value={objUser.sobrenome}
                                        />
                                    </Col>
                                    <Col md="12" className="form-group">
                                        <label htmlFor="email"> Email </label>
                                        <Form.Control
                                            type="email"
                                            className="textbox"
                                            placeholder="name@example.com"
                                            name="email"
                                            data-sb-validations="required,email"
                                            id="email"
                                            onChange={handleInput}
                                            value={objUser.email}
                                        />
                                    </Col>
                                    <Col md="12" className="form-group">
                                        <label htmlFor="password"> Senha </label>
                                        <Form.Control
                                            type="password"
                                            className="textbox"
                                            placeholder="Digite a Senha"
                                            name="password"
                                            data-sb-validations="required"
                                            id="password"
                                            onChange={handleInput}
                                            value={objUser.password}
                                        />
                                    </Col>
                                    <Col md="12" className="form-group">
                                        <label htmlFor="confirmPassword"> Confirmar Senha </label>
                                        <Form.Control
                                            type="password"
                                            className="textbox"
                                            placeholder="Digite a Senha"
                                            name="confirmPassword"
                                            data-sb-validations="required"
                                            id="confirmPassword"
                                            onChange={handleInputCnfirmPass}
                                            value={confirPassword}
                                        />

                                    </Col>

                                    {/*Caso o usuário seja administrador ele consegue alterar o perfil*/}
                                    {
                                        isAdmin &&
                                        <Col md="12" className="form-group">
                                            <label htmlFor="sobrenome"> Perfil do Usuário </label>
                                            <SelectUserPerfil id="" disabled={!isAdmin} />
                                        </Col>
                                    }
                                </Row>
                                <Button variant="secondary" className='me-2' type="button" onClick={submeter} >
                                    {loading &&
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    }
                                    Cadastrar
                                </Button>
                                {
                                    logado &&
                                    <Button variant="secondary" className='me-2' type="button" onClick={atualizar} >
                                        {loadingUpdate &&
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                        }
                                        Atualizar
                                    </Button>
                                }
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};
