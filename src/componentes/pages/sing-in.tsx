import React from 'react';
import { useState } from 'react';
import { Container, Row, Form, Col, Stack, Button, FormCheck } from 'react-bootstrap';
import apiAuth from "../util/Api";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { userLoginType } from '../../types/userLoginType';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setNome, setSobrenome, setEmail, setPassword, setToken, setUserPerfil, setLogado } from '../../redux/reducers/userReducer';


export const SingIn = () => {

  const userLogin = useAppSelector(state => state.userLogin);

  const redirectUrl = useNavigate();
  const userStore = useDispatch();
  userStore(setLogado(false));

  const [objUser, setValue] = React.useState<userLoginType>({
    id: 0,
    nome: '',
    sobrenome: '',
    email: '',
    password: '',
    userperfil: "USUARIO",
    token: '',
  });

  const alertaMensagem = () => {
    alert("Bem vindo! " + objUser.nome + " " + objUser.sobrenome);
  }

  const fazerLogin = async () => {

    await apiAuth.post("/v1/user/auth", objUser)
      .then((response) => {
        setValue(response.data);
        alertaMensagem();
        redirectUrl('/');
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status == 400) {
            alert("Precisa preencher os dados corretamente")
          }
        }
      })

  }


  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...objUser,
      [event.target.name]: event.target.value,
    });
  }

  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const user = useAppSelector(state => state.userLogin);



  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <Container className="mb-3">
          <Row>
            <Col>
              <Form noValidate validated={validated}>
                <br />
                
                <h3> <FontAwesomeIcon className='fa-xl' icon={faUserLock} /> ENTRAR NO SISTEMA</h3>
                <br />
                <br />
                <Row form>
                  {/* Email */}
                  <Col md="12" className="form-group">
                    <label htmlFor="feEmail">  <FontAwesomeIcon className='fa-sm' icon={faAt} /> Email </label>
                    <Form.Control
                      name="email"
                      type="email"
                      id="feEmail"
                      placeholder="exemplo@exemplo.com"
                      onChange={handleInput}
                      autoComplete="email"
                      className="textbox"
                    />
                  </Col>
                </Row>
                <br />
                <Row form>
                  <Col Col md="12" className="form-group">
                    <label htmlFor='fePassword'> <FontAwesomeIcon className='fa-sm' icon={faKey} /> Senha </label>
                    <Form.Control
                      name="password"
                      id='fePassword'
                      type="password"
                      onChange={handleInput}
                      className="textbox"
                    />

                  </Col>
                </Row>
                <div className="form-check">
                  <FormCheck id='feConected' />
                  <label htmlFor='feConected' className='form-check-label' > Manter Contectado? </label>
                </div>
                <br />

                <Button
                  variant="secondary"
                  size="lg"
                  type="button"
                  onClick={fazerLogin}
                >
                  Fazer Login
                </Button>

                <p className="forgot-password text-right">
                  Esqueceu a <a href="#">senha?</a>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
