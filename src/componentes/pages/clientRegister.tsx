import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Stack,
} from 'react-bootstrap';
import ComboBox from '../comboBox';
import {useNavigate}  from 'react-router-dom';



export const PageCliente = () => {

const [habilitado, setHabilitado] = useState(true);
  
const navegarPara = useNavigate();

return(
  <div className="auth-wrapper">
  <div className="auth-inner-cli">
    <Container className="mb-8">
      <Row>
        <Col>
          <Form>
            <Stack >
              <br />
              <br />
              <h3> CADASTRO DE CLIENTES </h3>
            </Stack>
            <Row form>
              {/* Nome */}
              <Col md="6" className="form-group">
                <label htmlFor="feFirstName">Nome</label>
                <Form.Control
                  id="feFirstName"
                  placeholder="Primeiro nome"
                  name="nome"
                  onChange={() => { }}
                  className="textbox"
                  disabled={habilitado}
                />
              </Col>
              {/* Sobre Nome */}
              <Col md="6" className="form-group">
                <label htmlFor="feLastName">Sobrenome</label>
                <Form.Control
                  id="feLastName"
                  placeholder="Segundo nome"
                  name="sobrenome"
                  onChange={() => { }}
                  className="textbox"
                  disabled={habilitado}
                />
              </Col>
            </Row>
            <Row form>
              {/* CPF */}
              <Col md="3" className="form-group">
                <label htmlFor="feCpf">CPF</label>
                <Form.Control
                  id="feCpf"
                  placeholder="000.000.000-00"
                  name="CPF"
                  onChange={() => { }}
                  className="textbox"
                  disabled={habilitado}  
                />
              </Col>
              {/* Celular */}
              <Col md="3" className="form-group">
                <label htmlFor="feCelPhone">Celular</label>
                <Form.Control
                  id="feCelPhone"
                  placeholder="(00)00000-0000"
                  name="telefone"
                  onChange={() => { }}
                  className="textbox"
                  disabled={habilitado}
                />
              </Col>
              {/* Email */}
              <Col md="6" className="form-group">
                <label htmlFor="feEmail">Email</label>
                <Form.Control
                  type="email"
                  id="feEmail"
                  placeholder="exemplo@exemplo.com"
                  onChange={() => { }}
                  autoComplete="email"
                  className="textbox"
                  disabled={habilitado}
                />
              </Col>
            </Row>
            <Row form>
              {/* Endereço */}
              <Col md="8" className="form-group">
                <label htmlFor="feEndereco">Endereço</label>
                <Form.Control
                  type="text"
                  id="feEndereco"
                  placeholder="Endereço Rua, Av, Travessa"
                  onChange={() => { }}
                  className="textbox"
                  disabled={habilitado}
                />
              </Col>
              {/* Numero */}
              <Col md="4" className="form-group">
                <label htmlFor="feNumber">Número</label>
                <Form.Control
                  id="feNumber"
                  type="text"
                  placeholder="Nº 123456"
                  name='numero'
                  onChange={() => { }}
                  className="textbox"
                  disabled={habilitado}
                />
              </Col>
            </Row>
            {/* Complemento */}
            <Row form>
              <Col md="12" className="form-group">
                <label htmlFor="feComplemento">Complemento</label>
                <Form.Control
                  type="text"
                  id="feComplemento"
                  placeholder="Complemento do Endereço"
                  onChange={() => { }}
                  className="textbox"
                  disabled={habilitado}
                />
              </Col>
            </Row>
            <Row form>
              {/* Cidade */}
              <Col md="4" className="form-group">
                <label htmlFor="feCity">Cidade</label>
                <Form.Control
                  id="feCity"
                  placeholder="Cidade"
                  onChange={() => { }}
                  className="textbox"
                  disabled={habilitado}
                />
              </Col>
              {/* Estado */}
              <Col md="4" className="form-group">
                <label htmlFor="feInputState">Estado</label>
                <ComboBox disabled={habilitado}/>
              </Col>
              {/* CEP */}
              <Col md="4" className="form-group">
                <label htmlFor="feZipCode">CEP</label>
                <Form.Control
                  id="feZipCode"
                  placeholder="CEP"
                  onChange={() => { }}
                  className="textbox"
                  disabled={habilitado}
                />
              </Col>
            </Row>
            <br />
            <br />
            <Stack direction="horizontal" gap={3}>
              <Button variant="secondary" type="button" onClick={()=>{ setHabilitado(false)}} >Novo</Button>
              <Button variant="secondary" type="button" onClick={()=>{ setHabilitado(true); navegarPara('/cli-reg') }}>Gravar</Button>
              <Button variant="secondary" type="button"onClick={()=> navegarPara('/cli-reg')} >Listar Meus Clientes</Button>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  </div>
</div>
 )
  
 };

PageCliente.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

PageCliente.defaultProps = {
  title: "Account Details"
};

