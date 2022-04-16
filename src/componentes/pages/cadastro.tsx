import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField/TextField";
import React, { Component } from "react";

export default class SignUp extends Component {
    render() {
        return (
            <form>
                
                <div className="container-fluid">
                <h3>Cadastre-se</h3>
                <div className="row justify-content-center ">
                <div className="col-12 col-xl-12 py-3">
                    <TextField type="text"  className="textbox2" placeholder="Nome" label="Nome" name="nome"/>
                </div>
                </div>
                <div className="row justify-content-center">
                <div className="col-12 col-xl-12 py-3">
                    <TextField type="text"  className="textbox2" placeholder="Sobrenome" label="Sobrenome" name="sobrenome"/>
                </div>
                </div>
                <div className="row justify-content-center">
                <div className="col-12 col-xl-12 py-3 ">
                    <TextField type="email"  className="textbox2" placeholder="Endereço do Email" label="Endereço do Email" name="email"/>
                </div>
                </div>
                <div className="row justify-content-center">
                <div className="col-12 col-xl-12 py-3 ">
                    <TextField type="password"  className="textbox2" placeholder="Digite a Senha" label="Senha" name="password"/>
                </div>
                </div>
                <div className="row justify-content-center">
                <div className="col-12 col-xl-12 py-3 ">
                    <TextField type="password"  className="textbox2" placeholder="Digite a Senha" label="Confirme Senha" name="confirmPassword"/>
                </div>
                </div>

                <Button type="submit" variant="contained" className="btn btn-primary btn-block">Cadastrar</Button>
                <p className="forgot-password text-right">
                    Já é registrado <a href="/sign-in">faça o login?</a>
                </p>
                </div>
            </form>
        );
    }
}