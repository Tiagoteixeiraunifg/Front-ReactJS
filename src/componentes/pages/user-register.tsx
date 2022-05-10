import React, { DetailedHTMLProps, useEffect } from 'react';
import apiAuth from "../services/Api";
import { useNavigate } from 'react-router-dom'
import { Container, Row, Form, Col, Stack, Button, FormCheck } from 'react-bootstrap';

interface userCad {
    nome: string;
    sobrenome: string;
    email: string;
    password: string;
    confirmPassword: string;
    userperfil: string;
}

interface erros {

    timestamp: string;
    details: string;

}


export const SignUp = () => {

    const navegarPara =  useNavigate();

    const [objError, setError] = React.useState<erros>({
        timestamp: '',
        details: '',
    });

    const [objUser, setValue] = React.useState<userCad>({
        nome: '',
        sobrenome: '',
        email: '',
        password: '',
        confirmPassword: '',
        userperfil: "USUARIO",
    });

    const verificaPassword = () => {
        if( objUser.password === objUser.confirmPassword){
            return true;
        }else{
            return false;
        }
    }    

    const submeter = async () => { 
        if (verificaPassword()) {
            await apiAuth.post("/v1/user", objUser)
                .then((json) => {
                    if(json.status == 200) {
                        setValue(json.data)
                        alert("Cadastrado com sucesso " + objUser.nome); 
                        navegarPara('/sign-in');
                    }
                })
                .catch((error) => {
                    if(error.response){
                        if(error.response.status == 400){
                            alert("Precisa preencher os dados corretamente")
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


    return (
        <div className="auth-wrapper">
        <div className="auth-inner">
          <Container className="mb-3">
            <Row>
              <Col>
                <Form>
                    <br/>
                    <h3>CADASTRE-SE</h3>
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
                        <div className="invalid-feedback" data-sb-feedback="name:required">O nome é requerido.</div>
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
                         <div className="invalid-feedback" data-sb-feedback="sobrenome:required">O sobrenome é requerido.</div>
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
                        <div className="invalid-feedback" data-sb-feedback="email:required">Email é requerido.</div>
                        <div className="invalid-feedback" data-sb-feedback="email:email">Email não é valido.</div>
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
                         <div className="invalid-feedback" data-sb-feedback="password:required">É requerido uma senha.</div>
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
                            onChange={handleInput}
                            value={objUser.confirmPassword}
                        />
                        <div className="invalid-feedback" data-sb-feedback="confirmPassword:required">É requerido que confirme a senha.</div>
                    </Col>
                    </Row>
                    <Button variant="secondary" type="button" id="submitButton" onClick={submeter} >
                        Cadastrar
                    </Button>

                    <p className="forgot-password text-right">
                        Já é registrado <a href="/sign-in">faça o login?</a>
                    </p>
                </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    );
};
