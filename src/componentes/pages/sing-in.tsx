import React from 'react';
import { Container, Row, Form, Col, Stack, Button, FormCheck } from 'react-bootstrap';

export const SingIn = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <Container className="mb-3">
          <Row>
            <Col>
              <Form>
                <br />
                <h3>ENTRAR NO SISTEMA</h3>
                <br />
                <br />
                <Row form>
                  {/* Email */}
                  <Col md="12" className="form-group">
                    <label htmlFor="feEmail"> Email </label>
                    <Form.Control
                       type="email"
                       id="feEmail"
                       placeholder="exemplo@exemplo.com"
                       onChange={() => { }}
                       autoComplete="email"
                       className="textbox"
                    />
                  </Col>
                </Row>
                <br/>
                <Row form>
                  <Col Col md="12" className="form-group">
                    <label htmlFor='fePassword'> Senha </label>
                    <Form.Control
                    id='fePassword'
                    type="password"
                    name='password'
                    onChange={() => { }}
                    className="textbox"
                    />
       
                  </Col>
                </Row>
                <div className="form-check">
                  <FormCheck id='feConected' />
                  <label htmlFor='feConected' className='form-check-label' > Manter Contectado? </label>
                </div>
                <br/>

                <Button variant="secondary" size="lg" type="submit">
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
