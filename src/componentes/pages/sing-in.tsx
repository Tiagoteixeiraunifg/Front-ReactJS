import React from 'react';
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack/Stack";

export const SingIn = () => {
  return (
    <section className="auth-wrapper d-flex flex-wrap">
      <div className="auth-inner d-flex flex-wrap">
        <form>
          <h3>Entrar no Sistema</h3>
          <br />
          <div className="form-gp">
            <TextField
              type="email"
              className="textbox"
              label="Inserir Email"
            ></TextField>
          </div>
          <div className="form-gp">
            <TextField
              type="password"
              className="textbox"
              label="Digite a senha"
            ></TextField>
          </div>
          <Stack direction="row" spacing={0.1} margin-top={5}>
            <div>
              <Checkbox />
            </div>
            <div>
              <InputLabel>Manter Conectado</InputLabel>
            </div>
          </Stack>
          <Button variant="contained" type="submit">
            Fazer Login
          </Button>
          <p className="forgot-password text-right">
            Esqueceu a <a href="#">senha?</a>
          </p>
        </form>
      </div>
    </section>
  );
};
