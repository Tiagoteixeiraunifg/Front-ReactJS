import React, { useEffect, useState } from 'react';
import { Container, Row, Form, Col, Button, FormCheck, Spinner } from 'react-bootstrap';
import apiAuth from "../../services/Api";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import {IUserLogin, IUserSingIn} from '../../interfaces/UserInterface';
import { userLoginType } from '../../types/userLoginType';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setId, setNome, setSobrenome, setEmail, setPassword, setToken, setUserPerfil, setLogado } from '../../redux/reducers/userReducer';
import { ErrorMessage } from '../MainComponents';


export const SingIn = () => {


  const [loading, setLoading] = useState(false);
  const userLogin = useAppSelector(state => state.userLogin);
  const [error, setError] = useState("");
  const redirectUrl = useNavigate();
  const userStore = useDispatch();
   

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

  const [objUser, setUser] = useState<IUserSingIn>({
    email: '',
    password: '',
  });

  useEffect(() => {
    if(userBd.id > 0){
      atualizaLogado();
      upReducerStore();
      redirectUrl('/');
    }
  },[userBd])
 
  const verifyOnDb = async () => {
    setLoading(true);
    await apiAuth.post("/v1/user/auth", objUser)
    .then(json => {
      setUserBd(json.data.data);
      setLoading(false);
    })
    .catch((err) => {
      if (err) {
        setLoading(false);
        if (err.response.status >= 400) {
          setError("Usuário ou senha inválidos!");
        }
      }
    });
  }


  const fazerLogin = () => {
      if(!objUser.email || !objUser.password){  
          setError("Digite Email e Senha!");
      }else{
        setError("");
        verifyOnDb();
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
                  {loading &&
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  }
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
