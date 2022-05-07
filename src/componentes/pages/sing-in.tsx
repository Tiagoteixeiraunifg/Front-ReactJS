import React, { useEffect, useState } from 'react';
import { Container, Row, Form, Col, Button, FormCheck } from 'react-bootstrap';
import apiAuth from "../services/Api";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import {userLogin, userSingIn} from '../../interfaces/userInterface';
import { userLoginType } from '../../types/userLoginType';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setId, setNome, setSobrenome, setEmail, setPassword, setToken, setUserPerfil, setLogado } from '../../redux/reducers/userReducer';
import { ErrorMessage } from '../MainComponents';


export const SingIn = () => {

  
  const userLogin = useAppSelector(state => state.userLogin);
  const [error, setError] = useState("");
  const redirectUrl = useNavigate();
  const userStore = useDispatch();
   
  useEffect(() => {
    if(userLogin.logado){
      userStore(setNome(userBd.nome));
    }
  },[userLogin.logado])

  function atualizaLogado(){
      userStore(setLogado(true));
  }

  const upReducerStore = () => {
    userStore(setId(userBd.id));
    userStore(setNome(userBd.nome));
    userStore(setSobrenome(userBd.sobrenome));
    userStore(setEmail(userBd.email));
    userStore(setPassword(userBd.password));
    userStore(setUserPerfil(userBd.userperfil));
    userStore(setToken(userBd.token));
  }

  const [userBd, setUserBd] = React.useState<userLoginType>({
    id: 0,
    nome: '',
    sobrenome: '',
    email: '',
    password: '',
    token: '',
    userperfil: '',
  });


  const [objUser, setUser] = useState<userSingIn>({
    email: '',
    password: '',
  });

  const alertaMensagem = () => {
    alert("Bem vindo! " + userBd.nome + " " + userBd.sobrenome);
  }

  const loginBanco = async (objLogin: userSingIn) => {
  
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objLogin)
        };
        await fetch('http://localhost:8080/api/v1/user/auth', requestOptions)
        
        .then( response => {
            return response.json();  
        })
        .then((json) => {
          setUserBd(json.data);
          console.log(json.data.toJSON());
          atualizaLogado();
          alertaMensagem();
          redirectUrl('/');
        })
        .catch(error => {
            setError(error.toString());
            console.error('error!', error);
        });
}

  const verifyOnDb = async () => {
    let dado; 
    await apiAuth.post("/v1/user/auth", objUser)
    .then(json => {
      dado = json.data;
      console.log(json.data);
      console.log(userBd)
      setUserBd(dado)
      atualizaLogado();
      alertaMensagem();
      redirectUrl('/');
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status == 400) {
          setError(err.response.message);
          alert("Precisa preencher os dados corretamente");
          return err;
        }
      }
    })
    return dado;
  }


  const fazerLogin = () => {
      if(!objUser.email || !objUser.password){  
          setError("Digite Email e Senha!");
      }else{
        setError("");
        loginBanco(objUser);
        //setUserBd(verifyOnDb());
        console.log(userBd);
      }
  }

  const insereUser = (response: any) => {
    setUserBd(response);
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
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
                <br />
                { error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
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
                      className="textbox"
                      required
                    />
                  </Col>
                </Row>
                <br />
                <Row form>
                  <Col md="12" className="form-group">
                    <label htmlFor='fePassword'> <FontAwesomeIcon className='fa-sm' icon={faKey} /> Senha </label>
                    <Form.Control
                      name="password"
                      id='fePassword'
                      type="password"
                      onChange={handleInput}
                      className="textbox"
                      required
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

                <div className="forgot-password text-right">
                  Esqueceu a <a href="#">senha?</a>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
