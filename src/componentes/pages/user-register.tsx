import React, { DetailedHTMLProps, useEffect } from 'react';
import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField/TextField";
import apiAuth from "../util/Api";
import  axios from "axios";
import { useNavigate } from 'react-router-dom'

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

    const navegarPara = useNavigate();

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
        <section className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <h3>Cadastre-se</h3>
                    <div className="form-gp">
                        <TextField
                            type="text"
                            className="textbox"
                            placeholder="Nome"
                            label="Nome"
                            name="nome"
                            data-sb-validations="required"
                            id="name"
                            onChange={handleInput}
                            value={objUser.nome}
                        />
                        <div className="invalid-feedback" data-sb-feedback="name:required">O nome é requerido.</div>
                    </div>
                    
                    <div className="form-gp">
                        <TextField
                            type="text"
                            className="textbox"
                            placeholder="Sobrenome"
                            label="Sobrenome"
                            name="sobrenome"
                            data-sb-validations="required"
                            id="name"
                            onChange={handleInput}
                            value={objUser.sobrenome}
                        />
                         <div className="invalid-feedback" data-sb-feedback="name:required">O sobrenome é requerido.</div>
                    </div>
                    <div className="form-gp">
                        <TextField
                            type="email"
                            className="textbox"
                            placeholder="name@example.com"
                            label="Endereço do Email"
                            name="email"
                            data-sb-validations="required,email"
                            id="email"
                            onChange={handleInput}
                            value={objUser.email}
                        />
                        <div className="invalid-feedback" data-sb-feedback="email:required">Email é requerido.</div>
                        <div className="invalid-feedback" data-sb-feedback="email:email">Email não é valido.</div>
                    </div>
                    <div className="form-gp">
                        <TextField
                            type="password"
                            className="textbox"
                            placeholder="Digite a Senha"
                            label="Senha"
                            name="password"
                            data-sb-validations="required"
                            id="password"
                            onChange={handleInput}
                            value={objUser.password}
                        />
                         <div className="invalid-feedback" data-sb-feedback="password:required">É requerido uma senha.</div>
                    </div>
                    <div className="form-gp">
                        <TextField
                            type="password"
                            className="textbox"
                            placeholder="Digite a Senha"
                            label="Confirme Senha"
                            name="confirmPassword"
                            data-sb-validations="required"
                            id="confirmPassword"
                            onChange={handleInput}
                            value={objUser.confirmPassword}
                        />
                        <div className="invalid-feedback" data-sb-feedback="confirmPassword:required">É requerido que confirme a senha.</div>
                    </div>
                    <Button type="button" id="submitButton" onClick={submeter} >
                        Cadastrar
                    </Button>
                    <p className="forgot-password text-right">
                        Já é registrado <a href="/sign-in">faça o login?</a>
                    </p>
                </form>
            </div>
        </section>
    );
};
