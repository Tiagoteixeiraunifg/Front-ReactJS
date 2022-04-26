import React from 'react';
import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField/TextField";

export const SignUp = () => {
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
                        />
                    </div>
                    <div className="form-gp">
                        <TextField
                            type="text"
                            className="textbox"
                            placeholder="Sobrenome"
                            label="Sobrenome"
                            name="sobrenome"
                        />
                    </div>
                    <div className="form-gp">
                        <TextField
                            type="email"
                            className="textbox"
                            placeholder="Endereço do Email"
                            label="Endereço do Email"
                            name="email"
                        />
                    </div>
                    <div className="form-gp">
                        <TextField
                            type="password"
                            className="textbox"
                            placeholder="Digite a Senha"
                            label="Senha"
                            name="password"
                        />
                    </div>
                    <div className="form-gp">
                        <TextField
                            type="password"
                            className="textbox"
                            placeholder="Digite a Senha"
                            label="Confirme Senha"
                            name="confirmPassword"
                        />
                    </div>
                    <Button type="submit" variant="contained">
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
